import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

const SHOW_AFTER_PX = 420;

export default function BackToTop() {
  const { lang } = useI18n();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      setIsVisible(window.scrollY > SHOW_AFTER_PX);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  const handleClick = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={lang === "en" ? "Back to top" : "Voltar ao topo"}
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      className={cn(
        "fixed bottom-[5.75rem] right-4 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full",
        "border border-white/14 bg-background/72 text-foreground shadow-[0_18px_55px_rgba(0,0,0,0.28)] backdrop-blur-xl",
        "transition duration-300 hover:border-secondary/55 hover:bg-secondary/12 hover:text-secondary",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "sm:bottom-6 sm:right-6 sm:h-12 sm:w-12",
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      )}
    >
      <ArrowUp className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
    </button>
  );
}
