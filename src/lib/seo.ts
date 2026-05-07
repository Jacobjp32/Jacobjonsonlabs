export type SeoLang = "pt" | "en";

const BASE_URL = "https://jacobjonsonfilmmaker.netlify.app";

const htmlLangByLocale: Record<SeoLang, string> = {
  pt: "pt-BR",
  en: "en",
};

const ogLocaleByLang: Record<SeoLang, string> = {
  pt: "pt_BR",
  en: "en_US",
};

const getBasePath = (pathname: string) => {
  if (!pathname) return "/";
  return pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
};

export const getPathLang = (pathname: string): SeoLang | null => {
  const basePath = getBasePath(pathname);

  if (basePath === "/" || !basePath) {
    return null;
  }

  if (basePath === "/en" || basePath.startsWith("/en/")) {
    return "en";
  }

  if (
    ["/servicos", "/ativos-digitais", "/automacao-ia"].includes(basePath)
  ) {
    return "pt";
  }

  if (
    ["/services", "/digital-assets", "/ai-automation"].includes(basePath)
  ) {
    return "en";
  }

  return null;
};

export const isLegacyServicesPath = (pathname: string) => {
  const basePath = getBasePath(pathname);
  return ["/servicos", "/services", "/en/services"].includes(basePath);
};

export const getLocalizedPath = (pathname: string, lang: SeoLang) => {
  const basePath = getBasePath(pathname);

  switch (basePath) {
    case "/en":
      return lang === "en" ? "/en" : "/";
    case "/digital-assets":
    case "/en/digital-assets":
    case "/ativos-digitais":
      return lang === "en" ? "/en/digital-assets" : "/ativos-digitais";
    case "/ai-automation":
    case "/en/ai-automation":
    case "/automacao-ia":
      return lang === "en" ? "/en/ai-automation" : "/automacao-ia";
    case "/":
      return lang === "en" ? "/en" : "/";
    default:
      return basePath;
  }
};

export const getHomePath = (lang: SeoLang) => getLocalizedPath("/", lang);

const buildLocalizedUrl = (pathname: string, lang: SeoLang) => {
  const localizedPath = getLocalizedPath(pathname, lang);
  return `${BASE_URL}${localizedPath}`;
};

const updateMetaTag = (selector: string, content: string) => {
  const element = document.querySelector(selector);
  if (element) {
    element.setAttribute("content", content);
  }
};

const ensureAlternateLink = (hreflang: string, href: string) => {
  let link = document.querySelector(
    `link[rel="alternate"][hreflang="${hreflang}"]`
  ) as HTMLLinkElement | null;

  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "alternate");
    link.setAttribute("hreflang", hreflang);
    document.head.appendChild(link);
  }

  link.setAttribute("href", href);
};

export const applyPageSeo = ({
  lang,
  title,
  description,
  pathname,
}: {
  lang: SeoLang;
  title: string;
  description: string;
  pathname: string;
}) => {
  const ptUrl = buildLocalizedUrl(pathname, "pt");
  const enUrl = buildLocalizedUrl(pathname, "en");
  const currentUrl = lang === "pt" ? ptUrl : enUrl;

  document.title = title;
  document.documentElement.lang = htmlLangByLocale[lang];

  updateMetaTag('meta[name="description"]', description);
  updateMetaTag('meta[name="language"]', htmlLangByLocale[lang]);
  updateMetaTag('meta[property="og:title"]', title);
  updateMetaTag('meta[property="og:description"]', description);
  updateMetaTag('meta[property="og:url"]', currentUrl);
  updateMetaTag('meta[property="og:locale"]', ogLocaleByLang[lang]);
  updateMetaTag('meta[name="twitter:title"]', title);
  updateMetaTag('meta[name="twitter:description"]', description);

  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.setAttribute("href", currentUrl);
  }

  ensureAlternateLink("pt-BR", ptUrl);
  ensureAlternateLink("en", enUrl);
  ensureAlternateLink("x-default", `${BASE_URL}/`);
};
