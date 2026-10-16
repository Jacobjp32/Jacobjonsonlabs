import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import FinalCta from "@/components/FinalCta";
import Layout from "@/components/Layout";
import { useI18n } from "@/i18n";
import { pages, type PageId } from "@/lib/routes";

const copy = {
  web: {
    page: "webDevelopment" as PageId,
    eyebrow: "WEB DEVELOPMENT",
    service: "web-development",
    items: ["landing", "institutional", "redesign", "responsive", "forms", "seo", "analytics", "deploy", "qa"],
    prefix: "commercial.service.web",
  },
  automation: {
    page: "automationDetail" as PageId,
    eyebrow: "WORKFLOW AUTOMATION",
    service: "automation",
    items: ["forms", "sheets", "script", "dashboards", "pdf", "certificates", "emails", "internal", "reports", "integrations"],
    prefix: "commercial.service.automation",
  },
};

export default function ServiceDetail({ service }: { service: "web" | "automation" }) {
  const { lang, t } = useI18n();
  const config = copy[service];
  return (
    <Layout page={config.page}>
      <section className="border-b border-white/10 pt-[76px]">
        <div className="container py-16 sm:py-20 lg:py-28">
          <Link to={pages.services[lang]} className="inline-flex min-h-11 items-center gap-2 text-sm text-foreground/70 hover:text-primary">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {t("commercial.nav.services")}
          </Link>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-primary">{config.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-balance text-4xl leading-tight sm:text-6xl">{t(`${config.prefix}.title`)}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{t(`commercial.seo.${config.page}.description`)}</p>
          <p className="mt-6 max-w-3xl text-base leading-7 text-foreground/78">{t(`${config.prefix}.description`)}</p>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {config.items.map((item) => (
              <li key={item} className="flex items-start gap-3 border border-white/10 p-4 text-sm leading-6 text-foreground/78">
                <Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {t(`${config.prefix}.item.${item}`)}
              </li>
            ))}
          </ul>
          <Link
            to={`${pages.contact[lang]}?service=${config.service}#brief`}
            className="mt-10 inline-flex min-h-12 items-center gap-2 bg-primary px-6 font-semibold text-background"
          >
            {t("commercial.final.cta")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
      <FinalCta />
    </Layout>
  );
}
