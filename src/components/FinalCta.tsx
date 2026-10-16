import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useI18n } from "@/i18n";
import { pages } from "@/lib/routes";

export default function FinalCta() {
  const { lang, t } = useI18n();
  return (
    <section className="py-16 sm:py-20 lg:py-28">
      <div className="container">
        <div className="relative overflow-hidden border-y border-primary/30 py-12 sm:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            {t("commercial.final.eyebrow")}
          </p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h2 className="max-w-3xl text-balance text-3xl leading-tight sm:text-5xl">
                {t("commercial.final.title")}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                {t("commercial.final.description")}
              </p>
            </div>
            <Link
              to={pages.contact[lang]}
              className="inline-flex min-h-12 items-center justify-center gap-2 bg-primary px-6 font-semibold text-background transition hover:bg-primary/90"
            >
              {t("commercial.final.cta")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
