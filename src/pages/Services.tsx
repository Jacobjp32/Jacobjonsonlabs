import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import FinalCta from "@/components/FinalCta";
import Layout from "@/components/Layout";
import ProcessSteps from "@/components/ProcessSteps";
import SectionHeading from "@/components/SectionHeading";
import { useI18n } from "@/i18n";
import { pages } from "@/lib/routes";

const groups = {
  web: ["landing", "institutional", "redesign", "responsive", "forms", "seo", "analytics", "deploy", "qa"],
  rescue: ["mobile", "layout", "forms", "performance", "seo", "deploy", "hosting", "versions", "code", "assets", "bugs", "accessibility"],
  care: ["monitoring", "content", "fixes", "forms", "ssl", "deploy", "support"],
  automation: ["forms", "sheets", "script", "dashboards", "pdf", "certificates", "emails", "internal", "reports", "integrations"],
  audiovisual: ["raw", "editing", "motion", "vfx", "finishing", "vertical", "audio", "formats"],
} as const;

export default function Services() {
  const { lang, t } = useI18n();
  const contact = pages.contact[lang];

  return (
    <Layout page="services">
      <section className="border-b border-white/10 pt-[76px]">
        <div className="container py-16 sm:py-20 lg:py-28">
          <SectionHeading
            level="h1"
            eyebrow={t("commercial.services.eyebrow")}
            title={t("commercial.services.title")}
            description={t("commercial.services.description")}
          />
          <div className="mt-12 grid gap-px border-y border-white/10 bg-white/10 md:grid-cols-3">
            {(["web", "automation", "audiovisual"] as const).map((item, index) => (
              <a key={item} href={`#${item}`} className="group bg-background px-5 py-6 transition hover:bg-card/80 sm:px-7">
                <span className="font-mono text-xs text-primary">0{index + 1}</span>
                <span className="mt-3 flex items-center justify-between gap-3 font-sora text-lg text-foreground">
                  {t(`commercial.service.${item}.title`)}
                  <ArrowRight className="h-4 w-4 text-primary transition group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <ServiceBlock
        id="web"
        number="01"
        eyebrow="WEB DEVELOPMENT"
        title={t("commercial.service.web.title")}
        description={t("commercial.service.web.description")}
        items={groups.web.map((item) => t(`commercial.service.web.item.${item}`))}
      >
        <Link to={pages.webDevelopment[lang]} className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-primary">
          {lang === "en" ? "Explore website development" : "Conheça o desenvolvimento de sites"}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </ServiceBlock>

      <section id="site-rescue" className="scroll-mt-24 border-y border-accent/25 bg-[linear-gradient(135deg,rgba(184,115,51,.12),rgba(10,14,24,.96))] py-20 lg:py-28">
        <div className="container grid gap-12 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">SITE RESCUE</p>
            <h2 className="mt-5 max-w-2xl text-balance text-3xl leading-tight sm:text-5xl">{t("commercial.rescue.title")}</h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">{t("commercial.rescue.description")}</p>
            <Link to={`${contact}#brief`} className="mt-9 inline-flex min-h-12 items-center justify-center gap-2 bg-accent px-6 font-semibold text-background">
              {t("commercial.rescue.cta")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <ul className="grid gap-x-8 gap-y-3 border-y border-white/10 py-7 sm:grid-cols-2">
            {groups.rescue.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-6 text-foreground/78">
                <Check className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                {t(`commercial.service.rescue.item.${item}`)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="site-care" className="scroll-mt-24 py-20 lg:py-28">
        <div className="container grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">SITE CARE</p>
            <h2 className="mt-4 text-3xl sm:text-4xl">{t("commercial.service.care.title")}</h2>
          </div>
          <div>
            <p className="max-w-3xl text-lg leading-8 text-foreground/78">{t("commercial.service.care.description")}</p>
            <ul className="mt-7 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {groups.care.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-6 text-muted-foreground">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  {t(`commercial.service.care.item.${item}`)}
                </li>
              ))}
            </ul>
            <p className="mt-7 border-l border-primary/40 pl-4 text-sm leading-6 text-foreground/75">{t("commercial.service.care.scope")}</p>
          </div>
        </div>
      </section>

      <ServiceBlock
        id="automation"
        number="02"
        eyebrow="WORKFLOW AUTOMATION"
        title={t("commercial.service.automation.title")}
        description={t("commercial.service.automation.description")}
        items={groups.automation.map((item) => t(`commercial.service.automation.item.${item}`))}
        alternate
      >
        <p className="mt-6 max-w-3xl text-sm leading-6 text-muted-foreground">{t("commercial.service.automation.productDescription")}</p>
        <Link to={pages.automationDetail[lang]} className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-primary">
          {lang === "en" ? "Explore workflow automation" : "Conheça a automação de processos"}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </ServiceBlock>

      <ServiceBlock
        id="audiovisual"
        number="03"
        eyebrow="AUDIOVISUAL"
        title={t("commercial.service.audiovisual.title")}
        description={t("commercial.service.audiovisual.description")}
        items={groups.audiovisual.map((item) => t(`commercial.service.audiovisual.item.${item}`))}
      >
        <p className="mt-7 max-w-3xl border-l border-primary/40 pl-4 text-sm leading-6 text-foreground/75">
          {t("commercial.service.audiovisual.note")}
        </p>
        <div className="mt-7 flex flex-wrap gap-x-7 gap-y-2">
          <Link to={pages.videoEditing[lang]} className="inline-flex min-h-11 items-center gap-2 font-semibold text-primary">
            {t("commercial.service.audiovisual.detailCta")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link to={`${pages.work[lang]}?filter=audiovisual`} className="inline-flex min-h-11 items-center gap-2 text-sm text-foreground/75 hover:text-primary">
            {t("commercial.service.audiovisual.workCta")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </ServiceBlock>

      <section className="border-y border-white/10 bg-card/25 py-20 lg:py-24">
        <div className="container grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">WHITE LABEL</p>
          <div>
            <h2 className="text-3xl sm:text-4xl">{t("commercial.partner.title")}</h2>
            <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground">{t("commercial.partner.description")}</p>
            <Link to={`${contact}#brief`} className="mt-8 inline-flex min-h-11 items-center gap-2 font-semibold text-secondary">
              {t("commercial.partner.cta")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container">
          <SectionHeading
            eyebrow={t("commercial.process.eyebrow")}
            title={t("commercial.process.title")}
            description={t("commercial.process.description")}
          />
          <ProcessSteps />
        </div>
      </section>
      <FinalCta />
    </Layout>
  );
}

function ServiceBlock({
  id,
  number,
  eyebrow,
  title,
  description,
  items,
  alternate = false,
  children,
}: {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  items: string[];
  alternate?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section id={id} className={`scroll-mt-24 border-b border-white/10 py-20 lg:py-28 ${alternate ? "bg-card/25" : ""}`}>
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr]">
          <div>
            <p className="font-mono text-xs text-primary">{number}</p>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-primary">{eyebrow}</p>
            <h2 className="mt-4 text-3xl sm:text-5xl">{title}</h2>
          </div>
          <div>
            <p className="max-w-3xl text-base leading-7 text-foreground/78 sm:text-lg">{description}</p>
            <ul className="mt-8 grid gap-x-8 gap-y-3 border-y border-white/10 py-7 sm:grid-cols-2">
              {items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-6 text-muted-foreground">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
