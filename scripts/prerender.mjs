import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const pt = JSON.parse(await readFile(new URL("../src/i18n/pt.json", import.meta.url), "utf8"));
const en = JSON.parse(await readFile(new URL("../src/i18n/en.json", import.meta.url), "utf8"));

const BASE_URL = "https://jacobjonsonlabs.com";
const SOCIAL_IMAGE_URL = `${BASE_URL}/og.jpg`;
const distDir = path.resolve("dist");
const dictionaries = { pt, en };
const keywords = {
  pt: "creative technologist, AI video producer, vídeo com IA para empresas, experiências digitais, automação, edição de vídeo, Jacob Jonson",
  en: "creative technologist, AI video producer, AI video for companies, digital experiences, automation, video editing, Jacob Jonson",
};

const pages = [
  ["home", "/", "pt"],
  ["home", "/en/", "en"],
  ["work", "/work/", "pt"],
  ["work", "/en/work/", "en"],
  ["services", "/services/", "pt"],
  ["services", "/en/services/", "en"],
  ["webDevelopment", "/services/web-development/", "pt"],
  ["webDevelopment", "/en/services/web-development/", "en"],
  ["automationDetail", "/services/automation/", "pt"],
  ["automationDetail", "/en/services/automation/", "en"],
  ["videoEditing", "/services/video-editing/", "pt"],
  ["videoEditing", "/en/services/video-editing/", "en"],
  ["lab", "/lab/", "pt"],
  ["lab", "/en/lab/", "en"],
  ["about", "/about/", "pt"],
  ["about", "/en/about/", "en"],
  ["contact", "/contact/", "pt"],
  ["contact", "/en/contact/", "en"],
];

const alternates = {
  home: { pt: "/", en: "/en/" },
  work: { pt: "/work/", en: "/en/work/" },
  services: { pt: "/services/", en: "/en/services/" },
  webDevelopment: { pt: "/services/web-development/", en: "/en/services/web-development/" },
  automationDetail: { pt: "/services/automation/", en: "/en/services/automation/" },
  videoEditing: { pt: "/services/video-editing/", en: "/en/services/video-editing/" },
  lab: { pt: "/lab/", en: "/en/lab/" },
  about: { pt: "/about/", en: "/en/about/" },
  contact: { pt: "/contact/", en: "/en/contact/" },
};

const escapeAttr = (value) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escapeHtml = (value) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const replaceMeta = (html, name, content) =>
  html.replace(new RegExp(`(<meta\\s+(?:name|property)="${name}"\\s+content=")[^"]*(")`, "i"), `$1${escapeAttr(content)}$2`);

const replaceLink = (html, rel, href, hreflang) => {
  const pattern = hreflang
    ? new RegExp(`(<link\\s+rel="${rel}"\\s+hreflang="${hreflang}"\\s+href=")[^"]*(")`, "i")
    : new RegExp(`(<link\\s+rel="${rel}"\\s+href=")[^"]*(")`, "i");
  return html.replace(pattern, `$1${escapeAttr(href)}$2`);
};

const schemaFor = (url, description) => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Jacob Jonson Labs",
  url,
  image: SOCIAL_IMAGE_URL,
  description,
  founder: {
    "@type": "Person",
    name: "Jacob Jonson Portela",
    jobTitle: "Creative Technologist & AI Video Producer",
  },
  areaServed: "Worldwide",
  availableLanguage: ["pt-BR", "en"],
  sameAs: [
    "https://www.linkedin.com/in/jacob-jonson-portela-742b9a128/",
    "https://www.instagram.com/jacobjonsonportela/",
  ],
  serviceType: [
    "Creative technology",
    "AI video producer",
    "Vídeo com IA para empresas",
    "Experiências digitais",
    "Automação de processos",
    "Edição e pós-produção",
  ],
});

const headingFor = (id, lang) => {
  const dict = dictionaries[lang];
  if (id === "home") {
    return `${dict["commercial.hero.title.line1"]} ${dict["commercial.hero.title.line2"]}`;
  }
  return dict[`commercial.seo.${id}.title`].replace(/\s+\|\s+.*$/, "");
};

const template = await readFile(path.join(distDir, "index.html"), "utf8");

for (const [id, route, lang] of pages) {
  const dict = dictionaries[lang];
  const title = dict[`commercial.seo.${id}.title`];
  const description = dict[`commercial.seo.${id}.description`];
  const currentUrl = `${BASE_URL}${route}`;
  const alternate = alternates[id];
  let html = template;
  html = html.replace(/<html lang="[^"]*">/i, `<html lang="${lang === "pt" ? "pt-BR" : "en"}">`);
  html = html.replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);
  html = replaceMeta(html, "description", description);
  html = replaceMeta(html, "keywords", keywords[lang]);
  html = replaceMeta(html, "language", lang === "pt" ? "pt-BR" : "en");
  html = replaceMeta(html, "og:title", title);
  html = replaceMeta(html, "og:description", description);
  html = replaceMeta(html, "og:url", currentUrl);
  html = replaceMeta(html, "og:locale", lang === "pt" ? "pt_BR" : "en_US");
  html = replaceMeta(html, "og:image", SOCIAL_IMAGE_URL);
  html = replaceMeta(html, "og:image:secure_url", SOCIAL_IMAGE_URL);
  html = replaceMeta(html, "og:image:alt", lang === "pt"
    ? "Jacob Jonson, creative technologist e AI video producer"
    : "Jacob Jonson, creative technologist and AI video producer");
  html = replaceMeta(html, "twitter:title", title);
  html = replaceMeta(html, "twitter:description", description);
  html = replaceMeta(html, "twitter:image", SOCIAL_IMAGE_URL);
  html = replaceMeta(html, "twitter:image:alt", lang === "pt"
    ? "Jacob Jonson, creative technologist e AI video producer"
    : "Jacob Jonson, creative technologist and AI video producer");
  html = replaceLink(html, "canonical", currentUrl);
  html = replaceLink(html, "alternate", `${BASE_URL}${alternate.pt}`, "pt-BR");
  html = replaceLink(html, "alternate", `${BASE_URL}${alternate.en}`, "en");
  html = replaceLink(html, "alternate", `${BASE_URL}/`, "x-default");
  html = html.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script type="application/ld+json">\n${JSON.stringify(schemaFor(currentUrl, description), null, 2)}\n    </script>`,
  );
  html = html.replace(
    /window\.__INITIAL_LANG__ = lang;/,
    `window.__INITIAL_LANG__ = "${lang}";`,
  );
  const staticMain = `<main data-prerender-content="true" style="max-width:72rem;margin:0 auto;padding:7rem 1.25rem 4rem;color:#edf0f4;background:#0a0e18;font-family:system-ui,sans-serif"><p style="color:#d4a574;font-size:.75rem;letter-spacing:.18em;text-transform:uppercase">JACOB JONSON LABS</p><h1 style="max-width:58rem;font-size:clamp(2.5rem,7vw,5.5rem);line-height:1;margin:1.5rem 0">${escapeHtml(headingFor(id, lang))}</h1><p style="max-width:48rem;color:#aeb4bf;font-size:1.1rem;line-height:1.7">${escapeHtml(description)}</p></main>`;
  html = html.replace('<div id="root"></div>', `<div id="root">${staticMain}</div>`);

  const filePath = route === "/" ? path.join(distDir, "index.html") : path.join(distDir, route, "index.html");
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, html, "utf8");
}

const priorityFor = (id, route) => {
  if (id === "home" && route === "/") return "1.0";
  if (id === "home") return "0.9";
  if (id === "work" || id === "services") return "0.8";
  if (id === "lab" || id === "about") return "0.6";
  return "0.7";
};

const urlEntry = (id, route) => {
  const alternate = alternates[id];
  const loc = `${BASE_URL}${route}`;
  return `  <url>
    <loc>${loc}</loc>
    <xhtml:link rel="alternate" hreflang="pt-BR" href="${BASE_URL}${alternate.pt}" />
    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}${alternate.en}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/" />
    <changefreq>${id === "home" ? "weekly" : "monthly"}</changefreq>
    <priority>${priorityFor(id, route)}</priority>
  </url>`;
};

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages.map(([id, route]) => urlEntry(id, route)).join("\n")}
</urlset>
`;

await writeFile(path.join(distDir, "sitemap.xml"), sitemap, "utf8");
await writeFile(
  path.join(distDir, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${BASE_URL}/sitemap.xml\n`,
  "utf8",
);
