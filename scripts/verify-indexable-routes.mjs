#!/usr/bin/env node
/**
 * Verifica a propriedade indexável do site estático.
 *
 * Propriedade: no host https://jacobjonsonlabs.com, a única resposta HTML 200
 * é o caminho canônico de uma página de `pages` em src/lib/routes.ts, e o
 * canonical / hreflang desse HTML são o par PT/EN dessa página. A forma sem
 * barra de uma página que existe é um 301 para o caminho canônico (Pretty
 * URLs, padrão da Netlify, não gravado no repositório). Qualquer outro
 * caminho não pode responder HTML 200.
 *
 * O comando executa o código real (routes.ts, seo.ts e o laço de
 * scripts/prerender.mjs). Não altera dist/. Código de saída: 0 ok, 1 a
 * propriedade falhou, 2 o verificador perdeu o código de vista (erro de modelo).
 */

import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";
import vm from "node:vm";
import ts from "typescript";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const HOST = "jacobjonsonlabs.com";
const MAX_SEGMENTS = 4;
const DECOYS = ["enterprise", "en-us", "energy", "no-such-page", "contact-us", "enx"];

class ModelError extends Error {}

const findings = [];

function failModel(message) {
  throw new ModelError(message);
}

function addFinding(finding) {
  findings.push(finding);
}

async function transpile(relativePath) {
  const source = await readFile(path.join(root, relativePath), "utf8");
  const { outputText, diagnostics } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
      importsNotUsedAsValues: ts.ImportsNotUsedAsValues.Remove,
      verbatimModuleSyntax: false,
    },
    fileName: relativePath,
    reportDiagnostics: true,
  });
  const errors = (diagnostics ?? []).filter((item) => item.category === ts.DiagnosticCategory.Error);
  if (errors.length) {
    failModel(
      `${relativePath} não compilou para o verificador: ${errors
        .map((item) => ts.flattenDiagnosticMessageText(item.messageText, " "))
        .join("; ")}`,
    );
  }
  return outputText;
}

async function importTranspiled(name, source) {
  const dir = await mkdtemp(path.join(tmpdir(), "jjl-verify-"));
  const file = path.join(dir, name);
  await writeFile(file, source);
  return import(pathToFileURL(file).href);
}

function specStrip(pathname) {
  if (!pathname || pathname === "/") return "/";
  return pathname.replace(/\/+$/, "");
}

function expectedLang(pathname) {
  const first = specStrip(pathname).split("/").filter(Boolean)[0];
  return first === "en" ? "en" : "pt";
}

function parseRedirectsFile(text) {
  const rules = [];
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const parts = line.split(/\s+/);
    if (parts.length < 2 || parts.length > 3) {
      failModel(`public/_redirects: linha fora do que o verificador modela: ${line}`);
    }
    let status = 301;
    let force = false;
    if (parts.length === 3) {
      const match = parts[2].match(/^(\d{3})(!)?$/);
      if (!match) failModel(`public/_redirects: status fora do modelo: ${line}`);
      status = Number(match[1]);
      force = Boolean(match[2]);
    }
    rules.push(normalizeRule({ from: parts[0], to: parts[1], status, force, source: "public/_redirects" }));
  }
  return rules;
}

function parseTomlValue(raw) {
  if (raw === "true") return true;
  if (raw === "false") return false;
  if (/^\d+$/.test(raw)) return Number(raw);
  if ((raw.startsWith('"') && raw.endsWith('"')) || (raw.startsWith("'") && raw.endsWith("'"))) {
    return raw.slice(1, -1);
  }
  failModel(`netlify.toml: valor de redirect fora do modelo: ${raw}`);
}

function parseTomlRedirects(text) {
  const rules = [];
  let current = null;
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const table = line.match(/^\[\[([^\]]+)\]\]$/);
    if (table) {
      if (current) rules.push(finishTomlRule(current));
      current = table[1] === "redirects" ? { source: "netlify.toml" } : null;
      continue;
    }
    if (!current) continue;
    if (line.startsWith("[")) {
      rules.push(finishTomlRule(current));
      current = null;
      continue;
    }
    const kv = line.match(/^([A-Za-z0-9_]+)\s*=\s*(.+)$/);
    if (!kv) failModel(`netlify.toml: linha de redirect ilegível: ${line}`);
    if (!["from", "to", "status", "force"].includes(kv[1])) {
      failModel(`netlify.toml: chave de redirect não modelada (${kv[1]}). Atualize o verificador se a regra nova for intencional.`);
    }
    current[kv[1]] = parseTomlValue(kv[2].trim());
  }
  if (current) rules.push(finishTomlRule(current));
  return rules;
}

function finishTomlRule(rule) {
  if (!rule.from || !rule.to || rule.status == null) {
    failModel("netlify.toml: redirect sem from, to ou status.");
  }
  return normalizeRule({
    from: rule.from,
    to: rule.to,
    status: Number(rule.status),
    force: Boolean(rule.force),
    source: rule.source,
  });
}

function normalizeRule(rule) {
  let host = null;
  let pattern = rule.from;
  const absolute = rule.from.match(/^(https?:\/\/[^/]+)(\/.*)$/);
  if (absolute) {
    host = absolute[1].replace(/^https?:\/\//, "");
    pattern = absolute[2];
  }
  if (pattern.includes("?") || pattern.includes(" ")) {
    failModel(`${rule.source}: redirect com query ou espaço não modelado: ${rule.from}`);
  }
  if (pattern.includes(":") && !rule.from.includes("://")) {
    failModel(`${rule.source}: placeholder : não modelado: ${rule.from}`);
  }
  const star = pattern.indexOf("*");
  if (star !== -1 && star !== pattern.length - 1) {
    failModel(`${rule.source}: splat no meio do caminho não modelado: ${rule.from}`);
  }
  return { ...rule, host, pattern };
}

function matchPath(pattern, pathname) {
  if (pattern === "/*" || pattern === "*") {
    return { splat: pathname.replace(/^\//, "") };
  }
  if (pattern.endsWith("/*")) {
    const prefix = pattern.slice(0, -2) || "/";
    const pathKey = specStrip(pathname);
    const prefixKey = specStrip(prefix);
    const boundary = prefixKey === "/" ? "/" : `${prefixKey}/`;
    if (pathKey === prefixKey || pathKey.startsWith(boundary)) {
      const splat = pathKey === prefixKey ? "" : pathKey.slice(boundary.length);
      return { splat };
    }
    return null;
  }
  if (specStrip(pattern) === specStrip(pathname)) return { splat: "" };
  return null;
}

function classifyElement(element) {
  const compact = element.replace(/\s+/g, " ").trim();
  if (compact.startsWith("<NotFound")) return { kind: "not-found" };
  if (compact.startsWith("<LegacyRedirect") || compact.startsWith("<Navigate")) {
    return { kind: "client-redirect", element: compact };
  }
  const table = [
    [/^<Home \/>$/, "home"],
    [/^<Work \/>$/, "work"],
    [/^<Services \/>$/, "services"],
    [/^<ServiceDetail service="web" \/>$/, "webDevelopment"],
    [/^<ServiceDetail service="automation" \/>$/, "automationDetail"],
    [/^<VideoEditing \/>$/, "videoEditing"],
    [/^<Lab \/>$/, "lab"],
    [/^<About \/>$/, "about"],
    [/^<Contact \/>$/, "contact"],
  ];
  for (const [pattern, id] of table) {
    if (pattern.test(compact)) return { kind: "page", id };
  }
  failModel(
    `src/App.tsx: elemento de Route não modelado (${compact}). Se for uma página nova, associe o elemento ao id de pages e rode de novo.`,
  );
}

function parseAppRoutes(source) {
  const routes = [];
  const token = "<Route ";
  let index = 0;
  while (index < source.length) {
    const at = source.indexOf(token, index);
    if (at === -1) break;
    const head = source.slice(at).match(/^<Route\s+path="([^"]*)"\s+element=\{/);
    if (!head) failModel(`src/App.tsx: Route ilegível perto de: ${source.slice(at, at + 120).replace(/\s+/g, " ")}`);
    let cursor = at + head[0].length;
    let depth = 1;
    const start = cursor;
    while (cursor < source.length && depth > 0) {
      const char = source[cursor];
      if (char === "{") depth += 1;
      else if (char === "}") depth -= 1;
      cursor += 1;
    }
    if (depth !== 0) failModel("src/App.tsx: chaves de Route sem fechar.");
    const element = source.slice(start, cursor - 1).trim();
    routes.push({ path: head[1], ...classifyElement(element) });
    index = cursor;
  }
  if (!routes.length) failModel("src/App.tsx: nenhuma Route encontrada.");
  return routes;
}

function linkHrefs(html) {
  const read = (rel, hreflang) => {
    const pattern = hreflang
      ? new RegExp(`<link\\s+rel="${rel}"\\s+hreflang="${hreflang}"\\s+href="([^"]*)"`, "i")
      : new RegExp(`<link\\s+rel="${rel}"\\s+href="([^"]*)"`, "i");
    const match = pattern.exec(html);
    return match ? match[1] : null;
  };
  const lang = /<html[^>]*\slang="([^"]*)"/i.exec(html)?.[1] ?? null;
  return {
    lang,
    canonical: read("canonical"),
    "pt-BR": read("alternate", "pt-BR"),
    en: read("alternate", "en"),
    "x-default": read("alternate", "x-default"),
  };
}

function parseSitemap(xml) {
  const blocks = xml.split("<url>").slice(1);
  if (!blocks.length) failModel("sitemap sem entradas <url>.");
  return blocks.map((block) => {
    const loc = /<loc>([^<]*)<\/loc>/.exec(block)?.[1];
    if (!loc) failModel("sitemap: <url> sem <loc>.");
    const links = {};
    for (const tag of block.match(/<xhtml:link\b[^>]*>/g) ?? []) {
      const lang = /hreflang="([^"]*)"/.exec(tag)?.[1];
      const href = /href="([^"]*)"/.exec(tag)?.[1];
      if (!lang || !href) failModel(`sitemap: xhtml:link incompleto: ${tag}`);
      links[lang] = href;
    }
    return { loc, links };
  });
}

function oracleLinks(baseUrl, pages, id) {
  return {
    canonicalPt: `${baseUrl}${pages[id].pt}`,
    canonicalEn: `${baseUrl}${pages[id].en}`,
    pt: `${baseUrl}${pages[id].pt}`,
    en: `${baseUrl}${pages[id].en}`,
    xDefault: `${baseUrl}/`,
  };
}

function routeFromWrittenFile(filePath, distDir) {
  const relative = path.relative(distDir, filePath);
  if (relative === "index.html") return "/";
  if (relative.endsWith(`${path.sep}index.html`)) {
    const dir = relative.slice(0, -`${path.sep}index.html`.length);
    return `/${dir.split(path.sep).join("/")}/`;
  }
  return null;
}

async function runPrerender(indexHtml, pt, en) {
  const source = await readFile(path.join(root, "scripts/prerender.mjs"), "utf8");
  const start = source.indexOf('const BASE_URL = "https://jacobjonsonlabs.com"');
  const templateLine = 'const template = await readFile(path.join(distDir, "index.html"), "utf8");';
  const distLine = 'const distDir = path.resolve("dist");';
  if (start < 0) failModel("scripts/prerender.mjs: não achei const BASE_URL.");
  if (!source.includes(templateLine)) {
    failModel("scripts/prerender.mjs: a leitura de dist/index.html mudou. O verificador precisa continuar executando o laço real.");
  }
  if (!source.includes(distLine)) {
    failModel("scripts/prerender.mjs: distDir mudou. O verificador precisa capturar os arquivos que o laço grava.");
  }
  const chunk = source
    .slice(start)
    .replace(distLine, "const distDir = globalThis.__distDir;")
    .replace(templateLine, "const template = globalThis.__template;");
  const distDir = "/virtual-dist";
  const files = new Map();
  const context = {
    pt,
    en,
    path,
    mkdir: async () => {},
    writeFile: async (filePath, data) => {
      files.set(filePath, data);
    },
    __distDir: distDir,
    __template: indexHtml,
  };
  context.globalThis = context;
  try {
    const runner = vm.runInNewContext(`(async () => {\n${chunk}\nglobalThis.__base = BASE_URL;\n})()`, context);
    await runner;
  } catch (error) {
    if (error instanceof ModelError) throw error;
    failModel(
      `O laço real de scripts/prerender.mjs lançou ${error?.name || "Error"}: ${error?.message}. Se o código novo passou a depender de um import, entregue essa dependência ao verificador. Se o laço em si quebrou, é bug no prerender.`,
    );
  }
  if (!context.__base) failModel("scripts/prerender.mjs: BASE_URL não ficou visível depois do laço.");
  return { files, distDir, baseUrl: context.__base };
}

function installDocument() {
  const links = [];
  class FakeLink {
    constructor() {
      this.rel = "";
      this.hreflang = "";
      this.href = "";
    }
    setAttribute(name, value) {
      this[name] = value;
    }
  }
  const document = {
    title: "",
    documentElement: { lang: "" },
    head: { appendChild(node) { links.push(node); } },
    createElement() {
      return new FakeLink();
    },
    querySelector(selector) {
      if (!selector.startsWith("link")) return null;
      const rel = /rel="([^"]+)"/.exec(selector)?.[1];
      const hreflang = /hreflang="([^"]+)"/.exec(selector)?.[1];
      const notHreflang = selector.includes(":not([hreflang])");
      return (
        links.find((link) => {
          if (rel && link.rel !== rel) return false;
          if (hreflang && link.hreflang !== hreflang) return false;
          if (notHreflang && link.hreflang) return false;
          return true;
        }) ?? null
      );
    },
  };
  globalThis.document = document;
  return {
    reset() {
      links.length = 0;
      document.title = "";
      document.documentElement.lang = "";
    },
    links: () => links.slice(),
  };
}

function rememberShortest(bucket, value, limit) {
  bucket.count += 1;
  bucket.examples.push(value);
  bucket.examples.sort((a, b) => a.length - b.length || a.localeCompare(b));
  if (bucket.examples.length > limit) bucket.examples.length = limit;
}

function pagesByKey(pages) {
  const map = new Map();
  for (const [id, localized] of Object.entries(pages)) {
    for (const lang of ["pt", "en"]) {
      const route = localized[lang];
      if (typeof route !== "string" || !route.startsWith("/")) {
        addFinding({
          id: "caminho-invalido",
          summary: `pages.${id}.${lang} não é um caminho absoluto.`,
          steps: [`src/lib/routes.ts define pages.${id}.${lang} como ${JSON.stringify(route)}.`],
        });
        continue;
      }
      const key = specStrip(route);
      const previous = map.get(key);
      if (previous) {
        addFinding({
          id: "caminho-duplicado",
          summary: `${previous.id}/${previous.lang} e ${id}/${lang} normalizam para o mesmo caminho ${key}.`,
          steps: [
            `src/lib/routes.ts tem pages.${previous.id}.${previous.lang} = ${JSON.stringify(previous.route)} e pages.${id}.${lang} = ${JSON.stringify(route)}.`,
            "pageFromPath devolve só a primeira. Canonical e hreflang deixam de ter uma página só.",
          ],
        });
      }
      map.set(key, { id, lang, route });
    }
  }
  return map;
}

function resolveRequest(pathname, published, rules) {
  const key = specStrip(pathname);
  const file = published.get(key) ?? null;
  if (file && pathname !== file.route) {
    return { status: 301, kind: "pretty", location: file.route, file };
  }
  for (const rule of rules) {
    if (rule.host && rule.host !== HOST) continue;
    const matched = matchPath(rule.pattern, pathname);
    if (!matched) continue;
    if (!rule.force && file) continue;
    const target = rule.to.replaceAll(":splat", matched.splat);
    if (rule.status === 200) {
      const body =
        target === "/index.html" || target === "/index.html/"
          ? published.get("/") ?? null
          : published.get(specStrip(target.replace(/\/index\.html$/, "") || "/")) ?? null;
      return { status: 200, kind: "rewrite", rule, target, body };
    }
    return { status: rule.status, kind: "redirect", rule, target };
  }
  if (file) return { status: 200, kind: "file", file };
  return { status: 404, kind: "missing" };
}

function segmentsOf(pathname) {
  return specStrip(pathname)
    .split("/")
    .filter(Boolean);
}

async function main() {
  const routesJs = await transpile("src/lib/routes.ts");
  const seoJs = await transpile("src/lib/seo.ts");
  const routes = await importTranspiled("routes.mjs", routesJs);
  const seo = await importTranspiled("seo.mjs", seoJs);
  const { pages, pageFromPath, langFromPath, localizePath } = routes;
  if (!pages || typeof pageFromPath !== "function" || typeof langFromPath !== "function" || typeof localizePath !== "function") {
    failModel("src/lib/routes.ts não exportou pages, pageFromPath, langFromPath e localizePath.");
  }
  if (typeof seo.applyPageSeo !== "function" || typeof seo.BASE_URL !== "string") {
    failModel("src/lib/seo.ts não exportou applyPageSeo e BASE_URL.");
  }

  const layout = await readFile(path.join(root, "src/components/Layout.tsx"), "utf8");
  if (!layout.includes("path: pages[page][lang]") || !layout.includes("alternate: pages[page]")) {
    failModel(
      "src/components/Layout.tsx não chama applyPageSeo com path: pages[page][lang] e alternate: pages[page]. Leia a chamada. Se ela mudou de forma e ainda passa a página corrente, atualize este ancoramento. Se passou a gravar outro caminho, a propriedade quebrou.",
    );
  }
  const notFound = await readFile(path.join(root, "src/pages/NotFound.tsx"), "utf8");
  const notFoundUsesHome = notFound.includes('page="home"');

  const indexHtml = await readFile(path.join(root, "index.html"), "utf8");
  const pt = JSON.parse(await readFile(path.join(root, "src/i18n/pt.json"), "utf8"));
  const en = JSON.parse(await readFile(path.join(root, "src/i18n/en.json"), "utf8"));
  const rendered = await runPrerender(indexHtml, pt, en);
  if (rendered.baseUrl !== seo.BASE_URL) {
    addFinding({
      id: "base-url",
      summary: `BASE_URL divergente: seo.ts tem ${seo.BASE_URL} e prerender.mjs tem ${rendered.baseUrl}.`,
      steps: [
        "src/lib/seo.ts exporta BASE_URL, usado por applyPageSeo no canonical do cliente.",
        "scripts/prerender.mjs declara outro BASE_URL e grava o canonical do HTML estático.",
        "Os dois deixam de apontar para o mesmo host.",
      ],
    });
  }
  const baseUrl = seo.BASE_URL;

  const pageKey = pagesByKey(pages);
  const published = new Map();
  let generatedSitemap = null;
  for (const [filePath, data] of rendered.files) {
    const route = routeFromWrittenFile(filePath, rendered.distDir);
    if (!route) {
      if (filePath.endsWith(`${path.sep}sitemap.xml`) || filePath.endsWith("/sitemap.xml")) generatedSitemap = data;
      continue;
    }
    const identity = pageKey.get(specStrip(route)) ?? null;
    const previous = published.get(specStrip(route));
    if (previous) {
      addFinding({
        id: "prerender-colisao",
        summary: `O prerender gravou dois HTML para o caminho ${specStrip(route)}.`,
        steps: [`Arquivos: ${previous.file} e ${filePath}.`],
      });
    }
    published.set(specStrip(route), {
      route,
      file: filePath,
      id: identity?.id ?? null,
      lang: identity?.lang ?? null,
      html: data,
    });
  }
  if (!generatedSitemap) failModel("O laço de prerender.mjs não gravou sitemap.xml.");

  for (const file of published.values()) {
    if (!file.id) {
      addFinding({
        id: "arquivo-fora-de-pages",
        summary: `prerender.mjs grava HTML 200 para ${file.route}, que não está em pages.`,
        steps: [
          `scripts/prerender.mjs escreve ${file.file}.`,
          `src/lib/routes.ts pages não tem esse caminho.`,
          "O host serve esse arquivo com status 200 porque ele existe, à frente da reescrita.",
        ],
      });
      continue;
    }
    const links = linkHrefs(file.html);
    const expected = oracleLinks(baseUrl, pages, file.id);
    const expectedCanonical = file.lang === "en" ? expected.canonicalEn : expected.canonicalPt;
    const expectedHtmlLang = file.lang === "pt" ? "pt-BR" : "en";
    const problems = [];
    if (links.canonical !== expectedCanonical) problems.push(`canonical ${JSON.stringify(links.canonical)} em vez de ${expectedCanonical}`);
    if (links["pt-BR"] !== expected.pt) problems.push(`hreflang pt-BR ${JSON.stringify(links["pt-BR"])} em vez de ${expected.pt}`);
    if (links.en !== expected.en) problems.push(`hreflang en ${JSON.stringify(links.en)} em vez de ${expected.en}`);
    if (links["x-default"] !== expected.xDefault) problems.push(`hreflang x-default ${JSON.stringify(links["x-default"])} em vez de ${expected.xDefault}`);
    if (links.lang !== expectedHtmlLang) problems.push(`html lang ${JSON.stringify(links.lang)} em vez de ${expectedHtmlLang}`);
    if (problems.length) {
      addFinding({
        id: "canonical-prerender",
        summary: `O HTML estático de ${file.route} (${file.id}/${file.lang}) não carrega o par PT/EN dessa página.`,
        steps: [
          "scripts/prerender.mjs copia index.html e troca canonical, hreflang e html lang nesse arquivo.",
          ...problems.map((problem) => problem),
        ],
      });
    }
  }

  for (const [key, identity] of pageKey) {
    if (!published.has(key)) {
      addFinding({
        id: "pagina-sem-html",
        summary: `pages.${identity.id}.${identity.lang} (${identity.route}) não ganha HTML no prerender.`,
        steps: [
          `src/lib/routes.ts lista ${identity.route}.`,
          "scripts/prerender.mjs não grava o index.html desse caminho.",
          "No host, o pedido cai na reescrita /* → /index.html 200 e sai com o HTML da home.",
        ],
      });
    }
  }

  const dom = installDocument();
  for (const [id, localized] of Object.entries(pages)) {
    for (const lang of ["pt", "en"]) {
      dom.reset();
      seo.applyPageSeo({
        lang,
        title: "t",
        description: "d",
        path: localized[lang],
        alternate: localized,
      });
      const links = dom.links();
      const href = (rel, hreflang) =>
        links.find((link) => link.rel === rel && (hreflang ? link.hreflang === hreflang : !link.hreflang))?.href ?? null;
      const expected = oracleLinks(baseUrl, pages, id);
      const expectedCanonical = lang === "en" ? expected.canonicalEn : expected.canonicalPt;
      const problems = [];
      if (href("canonical") !== expectedCanonical) problems.push(`canonical ${JSON.stringify(href("canonical"))} em vez de ${expectedCanonical}`);
      if (href("alternate", "pt-BR") !== expected.pt) problems.push(`hreflang pt-BR ${JSON.stringify(href("alternate", "pt-BR"))}`);
      if (href("alternate", "en") !== expected.en) problems.push(`hreflang en ${JSON.stringify(href("alternate", "en"))}`);
      if (href("alternate", "x-default") !== expected.xDefault) problems.push(`hreflang x-default ${JSON.stringify(href("alternate", "x-default"))}`);
      if (problems.length) {
        addFinding({
          id: "canonical-cliente",
          summary: `applyPageSeo(${id}, ${lang}) não grava o par PT/EN dessa página.`,
          steps: ["src/lib/seo.ts applyPageSeo, chamado por Layout com pages[page].", ...problems],
        });
      }
    }
  }

  const sitemapOracle = [];
  for (const [id, localized] of Object.entries(pages)) {
    for (const lang of ["pt", "en"]) {
      const expected = oracleLinks(baseUrl, pages, id);
      sitemapOracle.push({
        loc: lang === "en" ? expected.canonicalEn : expected.canonicalPt,
        links: { "pt-BR": expected.pt, en: expected.en, "x-default": expected.xDefault },
      });
    }
  }
  const compareSitemap = (label, entries) => {
    const wanted = new Map(sitemapOracle.map((entry) => [entry.loc, entry]));
    const seen = new Set();
    for (const entry of entries) {
      const expected = wanted.get(entry.loc);
      if (!expected) {
        addFinding({
          id: "sitemap",
          summary: `${label} lista ${entry.loc}, que não é uma página de pages.`,
          steps: [`${label} contém <loc>${entry.loc}</loc>.`, "src/lib/routes.ts não tem esse caminho."],
        });
        continue;
      }
      seen.add(entry.loc);
      for (const lang of ["pt-BR", "en", "x-default"]) {
        if (entry.links[lang] !== expected.links[lang]) {
          addFinding({
            id: "sitemap",
            summary: `${label} grava hreflang ${lang} de ${entry.loc} como ${entry.links[lang] || "(ausente)"}, não ${expected.links[lang]}.`,
            steps: [`A entrada de ${entry.loc} em ${label} não usa o par pages dessa página.`],
          });
        }
      }
    }
    for (const loc of wanted.keys()) {
      if (!seen.has(loc)) {
        addFinding({
          id: "sitemap",
          summary: `${label} não lista ${loc}.`,
          steps: [`pages tem esse caminho e ${label} não.`],
        });
      }
    }
  };
  compareSitemap("o sitemap gerado por scripts/prerender.mjs", parseSitemap(generatedSitemap));
  compareSitemap("public/sitemap.xml", parseSitemap(await readFile(path.join(root, "public/sitemap.xml"), "utf8")));

  const appRoutes = parseAppRoutes(await readFile(path.join(root, "src/App.tsx"), "utf8"));
  const splat = appRoutes.filter((route) => route.path === "*");
  if (splat.length !== 1 || splat[0].kind !== "not-found") {
    addFinding({
      id: "rota-app",
      summary: 'A rota "*" de App.tsx não renderiza NotFound.',
      steps: ["src/App.tsx Route path=\"*\" precisa cair em NotFound para um caminho desconhecido não virar outra página depois do JavaScript."],
    });
  }
  const clientRedirects = appRoutes.filter((route) => route.kind === "client-redirect");
  for (const [key, identity] of pageKey) {
    const variants = new Set([identity.route, specStrip(identity.route)]);
    for (const variant of variants) {
      const hits = appRoutes.filter((route) => route.path === variant);
      if (hits.length !== 1 || hits[0].kind !== "page" || hits[0].id !== identity.id) {
        addFinding({
          id: "rota-app",
          summary: `App.tsx não monta ${identity.id} em ${variant}.`,
          steps: [
            `src/lib/routes.ts pages.${identity.id}.${identity.lang} = ${JSON.stringify(identity.route)}.`,
            `src/App.tsx ${hits.length ? `tem ${hits.map((hit) => hit.kind + (hit.id ? `:${hit.id}` : "")).join(", ")}` : "não tem Route"} para ${variant}.`,
            "Depois da hidratação, Layout/applyPageSeo grava o canonical da rota que montou, não o do HTML estático.",
          ],
        });
      }
    }
  }
  for (const route of appRoutes) {
    if (route.kind !== "page" || route.path === "*") continue;
    const identity = pageKey.get(specStrip(route.path));
    if (!identity || identity.id !== route.id) {
      addFinding({
        id: "rota-app",
        summary: `App.tsx monta ${route.id} em ${route.path}, que não é essa página em pages.`,
        steps: [`Route path="${route.path}" element de ${route.id}.`, "pages não tem esse par caminho/página."],
      });
    }
  }

  const redirectsText = await readFile(path.join(root, "public/_redirects"), "utf8");
  const tomlText = await readFile(path.join(root, "netlify.toml"), "utf8");
  const rules = [...parseRedirectsFile(redirectsText), ...parseTomlRedirects(tomlText)];
  const fallbackRules = rules.filter(
    (rule) => rule.status === 200 && !rule.force && (rule.pattern === "/*" || rule.pattern === "*") && rule.to === "/index.html",
  );

  const alphabet = new Set(DECOYS);
  const addSegments = (pathname) => {
    if (!pathname || pathname === "*") return;
    for (const segment of segmentsOf(pathname)) {
      if (!/^[a-z0-9-]+$/.test(segment)) {
        failModel(`Segmento fora do alfabeto modelado (${segment} em ${pathname}). Se a rota nova for intencional, inclua o segmento no limite.`);
      }
      alphabet.add(segment);
    }
  };
  for (const route of pageKey.values()) addSegments(route.route);
  for (const route of appRoutes) addSegments(route.path);
  for (const route of published.values()) addSegments(route.route);
  const segments = [...alphabet].sort();
  const legacyKeys = new Set(clientRedirects.map((route) => specStrip(route.path)));

  const soft = { count: 0, legacy: new Set(), unknown: { count: 0, examples: [] }, enDecoy: false };
  const identity = { count: 0, examples: [] };
  const otherHost = [];
  let checked = 0;
  const required = new Set(["/", "/servicos", "/servicos/", "/en/no-such-page", "/enterprise", "/work", "/work/"]);
  for (const route of appRoutes) {
    if (route.path !== "*") required.add(route.path);
  }
  for (const route of pageKey.values()) {
    required.add(route.route);
    required.add(specStrip(route.route));
  }

  const visit = (pathname) => {
    checked += 1;
    required.delete(pathname);
    const key = specStrip(pathname);
    const expected = pageKey.get(key) ?? null;
    const gotId = pageFromPath(pathname);
    const gotLang = langFromPath(pathname);
    const wantLang = expectedLang(pathname);
    const identityProblems = [];
    if ((gotId ?? null) !== (expected?.id ?? null)) {
      identityProblems.push(`pageFromPath devolveu ${JSON.stringify(gotId)} e pages diz ${JSON.stringify(expected?.id ?? null)}`);
    }
    if (gotLang !== wantLang) {
      identityProblems.push(`langFromPath devolveu ${JSON.stringify(gotLang)} e o primeiro segmento diz ${JSON.stringify(wantLang)}`);
    }
    if (expected) {
      if (localizePath(pathname, "pt") !== pages[expected.id].pt) {
        identityProblems.push(`localizePath(..., "pt") devolveu ${JSON.stringify(localizePath(pathname, "pt"))} em vez de ${pages[expected.id].pt}`);
      }
      if (localizePath(pathname, "en") !== pages[expected.id].en) {
        identityProblems.push(`localizePath(..., "en") devolveu ${JSON.stringify(localizePath(pathname, "en"))} em vez de ${pages[expected.id].en}`);
      }
    }
    if (identityProblems.length) {
      rememberShortest(
        identity,
        `${pathname}: ${identityProblems.join("; ")} (src/lib/routes.ts).`,
        12,
      );
    }

    const answer = resolveRequest(pathname, published, rules);
    if (answer.status === 200 && answer.kind === "file") {
      if (!expected || answer.file.id !== expected.id || answer.file.lang !== expected.lang) {
        if (otherHost.length < 20) {
          otherHost.push({ pathname, reason: `arquivo 200 de ${answer.file.route}, pages diz ${expected ? `${expected.id}/${expected.lang}` : "nenhuma página"}` });
        }
      }
      return;
    }
    if (answer.status === 200) {
      const samePage = expected && answer.body && answer.body.id === expected.id && answer.body.lang === expected.lang;
      if (!samePage) {
        soft.count += 1;
        if (legacyKeys.has(key)) soft.legacy.add(key);
        else rememberShortest(soft.unknown, pathname, 8);
        if (pathname === "/en/no-such-page") soft.enDecoy = true;
      }
      return;
    }
    if (expected && !(answer.kind === "pretty" && specStrip(answer.location) === key)) {
      if (otherHost.length < 20) {
        otherHost.push({
          pathname,
          reason: `pages espera a página ${expected.id}/${expected.lang}, o host respondeu ${answer.status} ${answer.kind}${answer.location ? ` → ${answer.location}` : ""}`,
        });
      }
    }
  };

  visit("/");
  const walk = (depth, prefix) => {
    if (depth >= MAX_SEGMENTS) return;
    for (const segment of segments) {
      const next = `${prefix}/${segment}`;
      visit(next);
      visit(`${next}/`);
      walk(depth + 1, next);
    }
  };
  walk(0, "");
  if (required.size) {
    failModel(`O gerador não visitou caminhos obrigatórios: ${[...required].join(", ")}`);
  }

  if (identity.count) {
    addFinding({
      id: "identidade",
      summary: `pageFromPath, langFromPath ou localizePath discordam de pages em ${identity.count} caminhos do limite.`,
      steps: identity.examples,
      count: identity.count,
    });
  }
  if (soft.count) {
    const ruleText = fallbackRules.length
      ? fallbackRules.map((rule) => `${rule.source} \`${rule.pattern} ${rule.to} ${rule.status}\``).join(" e ")
      : "nenhuma regra /* → /index.html 200 foi encontrada; a resposta 200 veio de outra regra";
    const legacyList = [...soft.legacy].sort();
    const steps = [
      `Pedido GET /servicos em ${HOST}. pages não tem esse caminho e prerender.mjs não grava dist/servicos/index.html.`,
      `${ruleText}. _redirects vale primeiro e já casa; netlify.toml repete a mesma regra. O primeiro match responde 200 com /index.html, o HTML da home PT (a rota /). Apagar só uma das duas regras deixa a outra.`,
      "src/App.tsx tem LegacyRedirect de /servicos para a página de serviços, mas o redirect só roda no cliente, depois do 200.",
    ];
    if (soft.enDecoy) {
      steps.push(
        "Pedido GET /en/no-such-page. O mesmo fallback responde 200 com o HTML da home PT. langFromPath classifica esse caminho como inglês; o corpo servido é o da home portuguesa.",
      );
    }
    if (notFoundUsesHome) {
      steps.push(
        'src/App.tsx manda o desconhecido para NotFound. src/pages/NotFound.tsx usa Layout page="home", então applyPageSeo grava o canonical da home. O status HTTP continua 200.',
      );
    }
    steps.push(
      legacyList.length
        ? `No limite, ${soft.count} caminhos respondem assim. Redirects só de cliente (App.tsx), já normalizados: ${legacyList.join(", ")}.`
        : `No limite, ${soft.count} caminhos respondem assim. Nenhum deles é redirect só de cliente.`,
    );
    if (soft.unknown.examples.length) {
      steps.push(`Exemplos curtos que não são redirect de cliente: ${soft.unknown.examples.join(", ")}.`);
    }
    addFinding({
      id: "soft-200",
      summary: `${soft.count} caminhos do limite respondem HTML 200 com a home, sem serem uma página de pages.`,
      steps,
      count: soft.count,
    });
  }
  for (const item of otherHost.slice(0, 12)) {
    addFinding({
      id: "host-inesperado",
      summary: item.reason,
      steps: [`Caminho ${item.pathname}: ${item.reason}.`],
    });
  }
  if (otherHost.length > 12) {
    addFinding({
      id: "host-inesperado",
      summary: `Mais ${otherHost.length - 12} caminhos com resposta de host inesperada.`,
      steps: ["O verificador guardou só os 12 primeiros."],
      count: otherHost.length,
    });
  }

  console.log("Propriedade: uma resposta HTML 200 em jacobjonsonlabs.com só pode ser o caminho canônico de uma página de pages, com canonical e hreflang no par PT/EN dessa página.");
  console.log("Dano: uma URL desconhecida ou antiga sai com status 200 e o HTML da home, e o buscador indexa uma página que não existe.");
  console.log(`Limite: até ${MAX_SEGMENTS} segmentos; alfabeto de ${segments.length} segmentos, entre slugs do código e as iscas ${DECOYS.join(", ")}.`);
  console.log("Suposição: Pretty URLs da Netlify ligado (padrão; não está no repositório). Confirmado em produção para /work → 301 /work/ e para URL desconhecida → 200 da home. O comando não acessa a rede.");
  console.log(`Caminhos examinados: ${checked}`);
  console.log(`Páginas em pages: ${pageKey.size}. HTML prerenderizado: ${published.size}.`);
  if (!findings.length) {
    console.log("RESULTADO ok");
    return 0;
  }
  console.log(`RESULTADO falha`);
  console.log(`Classes: ${[...new Set(findings.map((finding) => finding.id))].join(", ")}`);
  for (const finding of findings) {
    console.log("");
    console.log(`ACHADO ${finding.id}${finding.count ? ` (${finding.count})` : ""}`);
    console.log(finding.summary);
    finding.steps.forEach((step, index) => console.log(`  ${index + 1}. ${step}`));
  }
  return 1;
}

main()
  .then((code) => {
    process.exitCode = code;
  })
  .catch((error) => {
    if (error instanceof ModelError) {
      console.error(`MODELO ${error.message}`);
      process.exitCode = 2;
      return;
    }
    console.error(error);
    process.exitCode = 2;
  });
