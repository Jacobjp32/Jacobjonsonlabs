import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const BASE_URL = "https://jacobjonsonfilmmaker.netlify.app";
const distDir = path.resolve("dist");
const templatePath = path.join(distDir, "index.html");

const routes = [
  {
    route: "/",
    lang: "pt-BR",
    ogLocale: "pt_BR",
    title: "Jacob Jonson | AI Creative Studio, Experiencias Digitais e Audiovisual Cinematografico",
    description:
      "Studio criativo premium unindo audiovisual cinematografico, IA generativa, design visual, branding, desenvolvimento web e automacoes para marcas, campanhas e experiencias digitais.",
    alternates: {
      pt: `${BASE_URL}/`,
      en: `${BASE_URL}/en`,
    },
  },
  {
    route: "/en",
    lang: "en",
    ogLocale: "en_US",
    title: "Jacob Jonson | AI Creative Studio, Digital Experiences and Cinematic Audiovisual",
    description:
      "Premium creative studio blending cinematic audiovisual, generative AI, visual design, branding, web development and automation for brands, campaigns and digital experiences.",
    alternates: {
      pt: `${BASE_URL}/`,
      en: `${BASE_URL}/en`,
    },
  },
  {
    route: "/ativos-digitais",
    lang: "pt-BR",
    ogLocale: "pt_BR",
    title: "Ativos digitais | Jacob Jonson",
    description:
      "Produtos digitais premium, templates e ativos prontos para criadores, editores, agências e marcas que precisam de velocidade com qualidade no Brasil e no exterior.",
    alternates: {
      pt: `${BASE_URL}/ativos-digitais`,
      en: `${BASE_URL}/en/digital-assets`,
    },
  },
  {
    route: "/en/digital-assets",
    lang: "en",
    ogLocale: "en_US",
    title: "Digital assets | Jacob Jonson",
    description:
      "Premium digital products, templates and ready-to-use assets for creators, editors, agencies and brands that need speed with quality in Brazil and internationally.",
    alternates: {
      pt: `${BASE_URL}/ativos-digitais`,
      en: `${BASE_URL}/en/digital-assets`,
    },
  },
  {
    route: "/automacao-ia",
    lang: "pt-BR",
    ogLocale: "pt_BR",
    title: "Automação com IA | Jacob Jonson",
    description:
      "Automação com IA e fluxos inteligentes para atendimento, operação, comunicação e processos internos com foco prático de negócio no Brasil e no exterior.",
    alternates: {
      pt: `${BASE_URL}/automacao-ia`,
      en: `${BASE_URL}/en/ai-automation`,
    },
  },
  {
    route: "/en/ai-automation",
    lang: "en",
    ogLocale: "en_US",
    title: "AI automation | Jacob Jonson",
    description:
      "AI automation and intelligent workflows for service, operations, communication and internal processes with practical business focus in Brazil and internationally.",
    alternates: {
      pt: `${BASE_URL}/automacao-ia`,
      en: `${BASE_URL}/en/ai-automation`,
    },
  },
];

const escapeAttr = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const replaceMeta = (html, name, content) =>
  html.replace(
    new RegExp(`(<meta\\s+(?:name|property)="${name}"\\s+content=")[^"]*(")`, "i"),
    `$1${escapeAttr(content)}$2`
  );

const replaceLink = (html, rel, href, hreflang) => {
  const hreflangPart = hreflang ? `[^>]*hreflang="${hreflang}"[^>]*` : "";
  const pattern = new RegExp(
    `(<link\\s+rel="${rel}"${hreflangPart ? `\\s+${hreflangPart}` : ""}[^>]*href=")[^"]*(")`,
    "i"
  );

  return html.replace(pattern, `$1${escapeAttr(href)}$2`);
};

const replaceStructuredData = (html, currentUrl, description) =>
  html
    .replace(/"url":"[^"]*"/, `"url":${JSON.stringify(currentUrl)}`)
    .replace(/"description":"[^"]*"/, `"description":${JSON.stringify(description)}`);

const writeRouteHtml = async (template, config) => {
  const currentUrl = `${BASE_URL}${config.route}`;
  let html = template;

  html = html.replace(/<html lang="[^"]*">/i, `<html lang="${config.lang}">`);
  html = html.replace(/<title>.*?<\/title>/i, `<title>${config.title}</title>`);
  html = replaceMeta(html, "description", config.description);
  html = replaceMeta(html, "language", config.lang);
  html = replaceMeta(html, "og:title", config.title);
  html = replaceMeta(html, "og:description", config.description);
  html = replaceMeta(html, "og:url", currentUrl);
  html = replaceMeta(html, "og:locale", config.ogLocale);
  html = replaceMeta(html, "twitter:title", config.title);
  html = replaceMeta(html, "twitter:description", config.description);
  html = replaceLink(html, "canonical", currentUrl);
  html = replaceLink(html, "alternate", config.alternates.pt, "pt-BR");
  html = replaceLink(html, "alternate", config.alternates.en, "en");
  html = replaceLink(html, "alternate", `${BASE_URL}/`, "x-default");
  html = replaceStructuredData(html, currentUrl, config.description);

  const initialLangValue = config.lang === "pt-BR" ? "pt" : "en";
  html = html.replace(
    /window\.__INITIAL_LANG__ = lang;/,
    `window.__INITIAL_LANG__ = "${initialLangValue}";`
  );

  const filePath =
    config.route === "/"
      ? path.join(distDir, "index.html")
      : path.join(distDir, config.route.replace(/^\//, ""), "index.html");

  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, html, "utf8");
};

const template = await readFile(templatePath, "utf8");

for (const route of routes) {
  await writeRouteHtml(template, route);
}
