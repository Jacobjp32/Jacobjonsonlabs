import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import FinalCta from "@/components/FinalCta";
import Layout from "@/components/Layout";
import { useI18n } from "@/i18n";
import { pages } from "@/lib/routes";

const lists = {
  fit: ["fit1", "fit2", "fit3"],
  input: ["input1", "input2", "input3"],
  output: ["output1", "output2", "output3", "output4"],
  process: ["process1", "process2", "process3", "process4"],
} as const;

export default function VideoEditing() {
  const { lang, t } = useI18n();
  return (
    <Layout page="videoEditing">
      <section className="border-b border-white/10 pt-[76px]">
        <div className="container py-16 sm:py-20 lg:py-28">
          <Link to={pages.services[lang]} className="inline-flex min-h-11 items-center gap-2 text-sm text-foreground/70 hover:text-primary">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {t("commercial.video.back")}
          </Link>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-primary">{t("commercial.video.eyebrow")}</p>
          <h1 className="mt-4 max-w-4xl text-balance text-4xl leading-tight sm:text-6xl">{t("commercial.video.title")}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{t("commercial.video.lead")}</p>
        </div>
      </section>
      <section className="border-b border-white/10 py-16 lg:py-24">
        <div className="container grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{t("commercial.video.mainCaseLabel")}</p>
            <h2 className="mt-4 text-4xl">{t("commercial.video.casesTitle")}</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">{t("commercial.video.casesIntro")}</p>
            <p className="mt-4 text-sm leading-6 text-foreground/75">{t("commercial.av.bandeira.summary")}</p>
            <Link to={`${pages.work[lang]}#bandeira-cravada`} className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-primary">
              {t("commercial.video.viewCase")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <img
            src="/cases/bandeira-cravada-youtube.jpg"
            alt={t("commercial.av.bandeira.imageAlt")}
            className="aspect-video w-full border border-white/10 object-cover"
          />
        </div>
      </section>
      <CopyList title={t("commercial.video.fitTitle")} items={lists.fit.map((item) => t(`commercial.video.${item}`))} />
      <CopyList title={t("commercial.video.inputTitle")} intro={t("commercial.video.inputIntro")} items={lists.input.map((item) => t(`commercial.video.${item}`))} />
      <CopyList title={t("commercial.video.outputTitle")} intro={t("commercial.video.outputIntro")} items={lists.output.map((item) => t(`commercial.video.${item}`))} />
      <CopyList title={t("commercial.video.processTitle")} items={lists.process.map((item) => t(`commercial.video.${item}`))} />
      <section className="border-y border-white/10 bg-card/25 py-16">
        <div className="container max-w-3xl">
          <h2 className="text-2xl">{t("commercial.video.boundaryTitle")}</h2>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">{t("commercial.video.boundary")}</p>
        </div>
      </section>
      <section className="py-16">
        <div className="container">
          <h2 className="max-w-3xl text-3xl">{t("commercial.video.ctaTitle")}</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">{t("commercial.video.ctaText")}</p>
          <Link
            to={`${pages.contact[lang]}?service=video-editing#brief`}
            className="mt-8 inline-flex min-h-12 items-center gap-2 bg-primary px-6 font-semibold text-background"
          >
            {t("commercial.video.cta")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
      <FinalCta />
    </Layout>
  );
}

function CopyList({ title, intro, items }: { title: string; intro?: string; items: string[] }) {
  return (
    <section className="border-b border-white/10 py-16">
      <div className="container">
        <h2 className="text-3xl">{title}</h2>
        {intro ? <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">{intro}</p> : null}
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <li key={item} className="border border-white/10 p-5 text-sm leading-6 text-foreground/80">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
