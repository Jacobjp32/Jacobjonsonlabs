import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useI18n } from "@/i18n";
import { applyNotFoundSeo, applyPageSeo } from "@/lib/seo";
import { langFromPath, localizePath, navItems, pageFromPath, pages, type Lang, type PageId } from "@/lib/routes";

function LanguageSwitch() {
  const { lang, setLang, t } = useI18n();
  const location = useLocation();
  const navigate = useNavigate();
  const next: Lang = lang === "en" ? "pt" : "en";

  return (
    <button
      type="button"
      title={t("commercial.language.switch")}
      aria-label={t("commercial.language.switch")}
      className="inline-flex h-11 min-w-11 items-center justify-center border border-white/12 bg-white/[0.03] px-3 text-xs font-bold tracking-[0.14em] text-foreground/75 transition hover:border-primary/55 hover:text-primary"
      onClick={() => {
        setLang(next);
        const service = new URLSearchParams(location.search).get("service");
        const keepService =
          service &&
          ["web-development", "automation", "video-editing"].includes(service) &&
          pageFromPath(location.pathname) === "contact"
            ? `?service=${service}`
            : "";
        try {
          localStorage.setItem("lang-banner", next === "en" ? "accepted" : "dismissed");
        } catch {
          /* ignore storage failures */
        }
        navigate(`${localizePath(location.pathname, next)}${keepService}${location.hash}`);
      }}
    >
      {next.toUpperCase()}
    </button>
  );
}

function Header() {
  const { lang, t } = useI18n();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition duration-300 ${
        scrolled || open
          ? "border-white/10 bg-background/92 shadow-[0_12px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl"
          : "border-transparent bg-background/35 backdrop-blur-sm"
      }`}
    >
      <div className="container flex h-[76px] items-center justify-between gap-4">
        <NavLink to={pages.home[lang]} end className="group inline-flex min-h-11 items-center gap-3" aria-label="Jacob Jonson Labs">
          <span className="grid h-10 w-10 place-items-center border border-primary/35 bg-primary/8 font-sora text-sm font-bold text-primary transition group-hover:border-primary/70">
            JJL
          </span>
          <span className="hidden text-xs font-semibold uppercase tracking-[0.22em] text-foreground sm:block">
            Jacob Jonson Labs
          </span>
        </NavLink>
        <nav aria-label={t("commercial.nav.primary")} className="hidden items-center gap-5 xl:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.page}
              to={pages[item.page][lang]}
              end={item.page === "home"}
              className={({ isActive }) =>
                `relative py-3 text-xs font-semibold uppercase tracking-[0.13em] transition ${
                  isActive ? "text-primary" : "text-foreground/66 hover:text-foreground"
                }`
              }
            >
              {t(item.labelKey)}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitch />
          <NavLink
            to={pages.contact[lang]}
            className="hidden min-h-11 items-center border border-primary/45 bg-primary/10 px-4 text-sm font-semibold text-primary transition hover:border-primary hover:bg-primary/15 md:inline-flex"
          >
            {t("commercial.nav.cta")}
          </NavLink>
          <button
            type="button"
            className="inline-grid h-11 w-11 place-items-center border border-white/12 bg-white/[0.03] text-foreground xl:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={t(open ? "commercial.nav.close" : "commercial.nav.open")}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>
      {open ? (
        <nav id="mobile-navigation" aria-label={t("commercial.nav.mobile")} className="border-t border-white/10 bg-background/98 xl:hidden">
          <div className="container grid gap-px py-3">
            {navItems.map((item, index) => (
              <NavLink
                key={item.page}
                to={pages[item.page][lang]}
                end={item.page === "home"}
                className={({ isActive }) =>
                  `flex min-h-12 items-center justify-between border-b border-white/8 py-3 text-base ${
                    isActive ? "text-primary" : "text-foreground/80"
                  }`
                }
              >
                <span>{t(item.labelKey)}</span>
                <span className="text-xs text-muted-foreground" aria-hidden="true">
                  0{index + 1}
                </span>
              </NavLink>
            ))}
            <NavLink
              to={pages.contact[lang]}
              className="mt-3 inline-flex min-h-12 items-center justify-center gap-2 bg-primary px-5 font-semibold text-background"
            >
              {t("commercial.nav.cta")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </NavLink>
          </div>
        </nav>
      ) : null}
    </header>
  );
}

const BANNER_KEY = "lang-banner";

function browserPrefersEnglish() {
  const locales = navigator.languages?.length ? navigator.languages : [navigator.language];
  return String(locales[0] || "").toLowerCase().startsWith("en");
}

function LanguageBanner() {
  const { lang, setLang } = useI18n();
  const location = useLocation();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (langFromPath(location.pathname) !== "pt") {
      setVisible(false);
      return;
    }
    try {
      const choice = localStorage.getItem(BANNER_KEY);
      if (choice === "dismissed" || choice === "accepted") {
        setVisible(false);
        return;
      }
    } catch {
      setVisible(false);
      return;
    }
    setVisible(browserPrefersEnglish());
  }, [location.pathname]);

  if (!visible || lang !== "pt") return null;

  const accept = () => {
    try {
      localStorage.setItem(BANNER_KEY, "accepted");
    } catch {
      /* ignore storage failures */
    }
    setLang("en");
    const service = new URLSearchParams(location.search).get("service");
    const keepService =
      service &&
      ["web-development", "automation", "video-editing"].includes(service) &&
      pageFromPath(location.pathname) === "contact"
        ? `?service=${service}`
        : "";
    navigate(`${localizePath(location.pathname, "en")}${keepService}${location.hash}`);
  };

  const dismiss = () => {
    try {
      localStorage.setItem(BANNER_KEY, "dismissed");
    } catch {
      /* ignore storage failures */
    }
    setVisible(false);
  };

  return (
    <aside
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-background"
      aria-label="Language"
    >
      <div className="container flex items-center justify-between gap-3 py-3">
        <button type="button" className="min-h-11 px-1 text-sm font-semibold text-primary" onClick={accept}>
          View in English
        </button>
        <button type="button" className="min-h-11 px-3 text-sm text-foreground/65" onClick={dismiss}>
          Not now
        </button>
      </div>
    </aside>
  );
}

function Footer() {
  const { lang, t } = useI18n();
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="container grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <Link to={pages.home[lang]} className="font-sora text-lg font-bold text-foreground">
            Jacob Jonson Labs
          </Link>
          <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">{t("commercial.footer.description")}</p>
        </div>
        <nav aria-label={t("commercial.footer.navigation")} className="flex flex-wrap gap-x-5 gap-y-3 text-sm">
          {navItems.slice(1).map((item) => (
            <Link key={item.page} to={pages[item.page][lang]} className="text-foreground/65 transition hover:text-primary">
              {t(item.labelKey)}
            </Link>
          ))}
        </nav>
      </div>
      <div className="container mt-8 border-t border-white/8 pt-5 text-xs uppercase tracking-[0.16em] text-muted-foreground/70">
        © {new Date().getFullYear()} Jacob Jonson Labs · {t("commercial.footer.note")}
      </div>
    </footer>
  );
}

export default function Layout({
  page,
  children,
  unlisted = false,
}: {
  page: PageId;
  children: React.ReactNode;
  unlisted?: boolean;
}) {
  const { lang, setLang, t } = useI18n();
  const location = useLocation();

  useEffect(() => {
    const pathLang = langFromPath(location.pathname);
    if (pathLang !== lang) setLang(pathLang);
  }, [lang, location.pathname, setLang]);

  useEffect(() => {
    if (unlisted) {
      applyNotFoundSeo(lang);
      return;
    }
    applyPageSeo({
      lang,
      title: t(`commercial.seo.${page}.title`),
      description: t(`commercial.seo.${page}.description`),
      path: pages[page][lang],
      alternate: pages[page],
    });
  }, [lang, page, t, unlisted]);

  return (
    <>
      <a className="skip-link" href="#main-content">
        {t("commercial.a11y.skip")}
      </a>
      <Header />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <LanguageBanner />
    </>
  );
}
