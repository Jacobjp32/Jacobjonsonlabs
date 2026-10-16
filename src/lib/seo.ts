import type { Lang } from "./routes";

export const BASE_URL = "https://jacobjonsonlabs.com";
export const SOCIAL_IMAGE_PATH = "/og.jpg";
export const SOCIAL_IMAGE_URL = `${BASE_URL}${SOCIAL_IMAGE_PATH}`;
export const SOCIAL_IMAGE_WIDTH = "1200";
export const SOCIAL_IMAGE_HEIGHT = "630";

const SOCIAL_IMAGE_ALT: Record<Lang, string> = {
  pt: "Jacob Jonson, creative technologist e AI video producer",
  en: "Jacob Jonson, creative technologist and AI video producer",
};

export const KEYWORDS: Record<Lang, string> = {
  pt: "creative technologist, AI video producer, vídeo com IA para empresas, experiências digitais, automação, edição de vídeo, Jacob Jonson",
  en: "creative technologist, AI video producer, AI video for companies, digital experiences, automation, video editing, Jacob Jonson",
};

const htmlLang: Record<Lang, string> = { pt: "pt-BR", en: "en" };
const ogLocale: Record<Lang, string> = { pt: "pt_BR", en: "en_US" };

const abs = (path: string) => `${BASE_URL}${path === "/" ? "/" : path}`;

const setMeta = (selector: string, content: string) => {
  const element = document.querySelector(selector);
  if (element) element.setAttribute("content", content);
};

const setLink = (rel: string, href: string, hreflang?: string) => {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let link = document.querySelector(selector) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.rel = rel;
    if (hreflang) link.hreflang = hreflang;
    document.head.appendChild(link);
  }
  link.href = href;
};

export const applyPageSeo = ({
  lang,
  title,
  description,
  path,
  alternate,
}: {
  lang: Lang;
  title: string;
  description: string;
  path: string;
  alternate: { pt: string; en: string };
}) => {
  const current = abs(path);
  document.title = title;
  document.documentElement.lang = htmlLang[lang];
  setMeta('meta[name="description"]', description);
  setMeta('meta[name="keywords"]', KEYWORDS[lang]);
  setMeta('meta[name="language"]', htmlLang[lang]);
  setMeta('meta[property="og:title"]', title);
  setMeta('meta[property="og:description"]', description);
  setMeta('meta[property="og:url"]', current);
  setMeta('meta[property="og:locale"]', ogLocale[lang]);
  setMeta('meta[property="og:image"]', SOCIAL_IMAGE_URL);
  setMeta('meta[property="og:image:secure_url"]', SOCIAL_IMAGE_URL);
  setMeta('meta[property="og:image:type"]', "image/jpeg");
  setMeta('meta[property="og:image:width"]', SOCIAL_IMAGE_WIDTH);
  setMeta('meta[property="og:image:height"]', SOCIAL_IMAGE_HEIGHT);
  setMeta('meta[property="og:image:alt"]', SOCIAL_IMAGE_ALT[lang]);
  setMeta('meta[name="twitter:title"]', title);
  setMeta('meta[name="twitter:description"]', description);
  setMeta('meta[name="twitter:image"]', SOCIAL_IMAGE_URL);
  setMeta('meta[name="twitter:image:alt"]', SOCIAL_IMAGE_ALT[lang]);
  setLink("canonical", current);
  setLink("alternate", abs(alternate.pt), "pt-BR");
  setLink("alternate", abs(alternate.en), "en");
  setLink("alternate", `${BASE_URL}/`, "x-default");
};
