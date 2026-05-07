import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { getHomePath } from "@/lib/seo";

export default function Navbar() {
  const { lang } = useI18n();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const homePath = getHomePath(lang);
  const isHome = location.pathname === homePath;

  const labels =
    lang === "en"
      ? {
          brand: "Jacob Jonson",
          links: [
            { label: "What I Do", href: "#services" },
            { label: "AI Workflow", href: "#workflow" },
            { label: "Cases", href: "#projects" },
            { label: "Experiments", href: "#experiments" },
            { label: "Process", href: "#process" },
            { label: "Contact", href: "#contact" },
          ],
          cta: "Start brief",
          openMenu: "Open navigation",
          closeMenu: "Close navigation",
        }
      : {
          brand: "Jacob Jonson",
          links: [
            { label: "What I Do", href: "#services" },
            { label: "AI Workflow", href: "#workflow" },
            { label: "Cases", href: "#projects" },
            { label: "Experiments", href: "#experiments" },
            { label: "Processo", href: "#process" },
            { label: "Contato", href: "#contact" },
          ],
          cta: "Iniciar briefing",
          openMenu: "Abrir navegação",
          closeMenu: "Fechar navegação",
        };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsMobileMenuOpen(false);
  const resolveHref = (hash: string) => (isHome ? hash : `${homePath}${hash}`);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-white/10 bg-background/88 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-20 items-center justify-between gap-4">
        <a
          href={resolveHref("#hero")}
          className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.24em] text-foreground"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-base tracking-normal text-primary">
            J
          </span>
          <span className="hidden sm:block">{labels.brand}</span>
        </a>

        <div className="hidden items-center gap-6 lg:flex">
          {labels.links.map((link) => (
            <a
              key={link.href}
              href={resolveHref(link.href)}
              className="text-sm text-foreground/72 transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          <a
            href={resolveHref("#contact")}
            className="inline-flex h-11 items-center justify-center rounded-full border border-primary/30 bg-primary/10 px-5 text-sm font-semibold text-primary transition hover:border-primary/60 hover:bg-primary/15 hover:text-primary"
          >
            {labels.cta}
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen((current) => !current)}
            aria-label={isMobileMenuOpen ? labels.closeMenu : labels.openMenu}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="border-b border-white/10 bg-background/96 backdrop-blur-xl md:hidden">
          <div className="container space-y-3 py-5">
            {labels.links.map((link) => (
              <a
                key={link.href}
                href={resolveHref(link.href)}
                className="block rounded-xl px-1 py-2 text-base text-foreground/80 transition hover:text-foreground"
                onClick={closeMenu}
              >
                {link.label}
              </a>
            ))}
            <a
              href={resolveHref("#contact")}
              className="inline-flex w-full items-center justify-center rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm font-semibold text-primary"
              onClick={closeMenu}
            >
              {labels.cta}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
