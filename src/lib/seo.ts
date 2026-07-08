import { getCaseByPath, getCaseLangByPath } from "@/data/caseStudies";

export type SeoLang = "pt" | "en";

export const BASE_URL = "https://jacobjonsonfilmmaker.netlify.app";
const SOCIAL_IMAGE_URL = `${BASE_URL}/JACOBCYBER1.webp`;
const SOCIAL_IMAGE_ALT =
  "Jacob Jonson em estética cyberpunk cinematográfica para AI Creative Studio";

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
  const caseLang = getCaseLangByPath(basePath);

  if (basePath === "/" || !basePath) {
    return null;
  }

  if (caseLang) {
    return caseLang;
  }

  if (basePath === "/en" || basePath.startsWith("/en/")) {
    return "en";
  }

  if (
    ["/servicos", "/ativos-digitais", "/automacao-ia", "/produtos", "/loja"].includes(basePath)
  ) {
    return "pt";
  }

  if (
    ["/services", "/digital-assets", "/ai-automation", "/products"].includes(basePath)
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
  const caseStudy = getCaseByPath(basePath);

  if (caseStudy) {
    return caseStudy.routes[lang];
  }

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
    case "/products":
    case "/en/products":
    case "/produtos":
    case "/loja":
      return lang === "en" ? "/en/products" : "/produtos";
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

const normalizeImageUrl = (imageUrl?: string) => {
  if (!imageUrl) return SOCIAL_IMAGE_URL;
  if (/^https?:\/\//i.test(imageUrl)) return imageUrl;
  return `${BASE_URL}${imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`}`;
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
  imageUrl,
  imageAlt,
}: {
  lang: SeoLang;
  title: string;
  description: string;
  pathname: string;
  imageUrl?: string;
  imageAlt?: string;
}) => {
  const ptUrl = buildLocalizedUrl(pathname, "pt");
  const enUrl = buildLocalizedUrl(pathname, "en");
  const currentUrl = lang === "pt" ? ptUrl : enUrl;
  const socialImageUrl = normalizeImageUrl(imageUrl);
  const socialImageAlt = imageAlt ?? SOCIAL_IMAGE_ALT;

  document.title = title;
  document.documentElement.lang = htmlLangByLocale[lang];

  updateMetaTag('meta[name="description"]', description);
  updateMetaTag('meta[name="language"]', htmlLangByLocale[lang]);
  updateMetaTag('meta[property="og:title"]', title);
  updateMetaTag('meta[property="og:description"]', description);
  updateMetaTag('meta[property="og:url"]', currentUrl);
  updateMetaTag('meta[property="og:locale"]', ogLocaleByLang[lang]);
  updateMetaTag('meta[property="og:image"]', socialImageUrl);
  updateMetaTag('meta[property="og:image:secure_url"]', socialImageUrl);
  updateMetaTag('meta[property="og:image:alt"]', socialImageAlt);
  updateMetaTag('meta[name="twitter:title"]', title);
  updateMetaTag('meta[name="twitter:description"]', description);
  updateMetaTag('meta[name="twitter:image"]', socialImageUrl);
  updateMetaTag('meta[name="twitter:image:alt"]', socialImageAlt);

  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.setAttribute("href", currentUrl);
  }

  ensureAlternateLink("pt-BR", ptUrl);
  ensureAlternateLink("en", enUrl);
  ensureAlternateLink("x-default", `${BASE_URL}/`);
};
