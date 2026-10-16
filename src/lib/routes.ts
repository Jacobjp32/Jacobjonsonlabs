export type Lang = "pt" | "en";

export type PageId =
  | "home"
  | "work"
  | "services"
  | "webDevelopment"
  | "automationDetail"
  | "videoEditing"
  | "lab"
  | "about"
  | "contact";

export const pages: Record<PageId, Record<Lang, string>> = {
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

export const navItems: Array<{ page: PageId; labelKey: string }> = [
  { page: "home", labelKey: "commercial.nav.home" },
  { page: "work", labelKey: "commercial.nav.work" },
  { page: "services", labelKey: "commercial.nav.services" },
  { page: "lab", labelKey: "commercial.nav.lab" },
  { page: "about", labelKey: "commercial.nav.about" },
];

export const stripSlash = (pathname: string) => {
  if (!pathname || pathname === "/") return "/";
  return pathname.replace(/\/+$/, "");
};

export const langFromPath = (pathname: string): Lang => {
  const path = stripSlash(pathname);
  return path === "/en" || path.startsWith("/en/") ? "en" : "pt";
};

export const pageFromPath = (pathname: string): PageId | null => {
  const path = stripSlash(pathname) || "/";
  for (const [page, localized] of Object.entries(pages) as Array<[PageId, Record<Lang, string>]>) {
    if (stripSlash(localized.pt) === path || stripSlash(localized.en) === path) {
      return page;
    }
  }
  return null;
};

export const localizePath = (pathname: string, lang: Lang) => {
  const page = pageFromPath(pathname);
  if (!page) return lang === "en" ? "/en/" : "/";
  return pages[page][lang];
};
