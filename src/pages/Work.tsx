import { ArrowRight } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import FinalCta from "@/components/FinalCta";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import Showreel from "@/components/Showreel";
import VideoCase from "@/components/VideoCase";
import { useI18n } from "@/i18n";
import { pages } from "@/lib/routes";

const filters = ["all", "web", "automation", "audiovisual", "lab"] as const;
type Filter = (typeof filters)[number];

const archive = [
  { image: "/JACOBHORIZONTEDEEVENTOS.webp", key: "frames" },
  { image: "/JACOBTIME.webp", key: "rhythm" },
] as const;

export default function Work() {
  const { lang, t } = useI18n();
  const [params, setParams] = useSearchParams();
  const requested = params.get("filter");
  const filter: Filter = filters.includes(requested as Filter) ? (requested as Filter) : "all";
  const show = (name: Filter) => filter === "all" || filter === name;

  return (
    <Layout page="work">
      <section className="border-b border-white/10 pt-[76px]">
        <div className="container py-16 sm:py-20 lg:py-28">
          <SectionHeading
            level="h1"
            eyebrow={t("commercial.work.eyebrow")}
            title={t("commercial.work.title")}
            description={t("commercial.seo.work.description")}
          />
          <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label={t("commercial.work.filterLabel")}>
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={filter === item}
                onClick={() => setParams(item === "all" ? {} : { filter: item })}
                className={`min-h-11 border px-4 text-xs font-semibold uppercase tracking-[0.13em] transition ${
                  filter === item
                    ? "border-primary bg-primary text-background"
                    : "border-white/12 text-foreground/65 hover:border-primary/50 hover:text-primary"
                }`}
              >
                {t(`commercial.work.filter.${item}`)}
              </button>
            ))}
          </div>
        </div>
      </section>
      <div aria-live="polite">
        {show("audiovisual") ? <VideoCase featured /> : null}
        {show("audiovisual") ? (
          <section id="showreel" className="scroll-mt-24 border-b border-white/10 bg-card/20 py-16 lg:py-20">
            <div className="container grid gap-8 lg:grid-cols-[.6fr_1.4fr] lg:items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl">{t("commercial.case.showreel.title")}</h2>
                <p className="mt-4 text-base leading-7 text-muted-foreground">{t("commercial.av.showreelIntro")}</p>
              </div>
              <Showreel compact />
            </div>
          </section>
        ) : null}
        {filter === "web" || filter === "automation" ? (
          <section className="border-b border-white/10 py-16">
            <div className="container">
              <p className="max-w-2xl text-base leading-7 text-muted-foreground">{t("commercial.work.empty")}</p>
              <Link to={pages.services[lang]} className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-primary">
                {t("commercial.nav.services")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </section>
        ) : null}
      </div>
      {show("lab") ? (
        <section className="border-y border-white/10 bg-card/25 py-20 lg:py-28">
          <div className="container">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                eyebrow={t("commercial.work.archive.eyebrow")}
                title={t("commercial.work.archive.title")}
                description={t("commercial.work.archive.description")}
              />
              <Link to={pages.lab[lang]} className="inline-flex min-h-11 shrink-0 items-center gap-2 font-semibold text-primary hover:text-primary/80">
                {t("commercial.work.archive.cta")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {archive.map((item) => (
                <figure key={item.image} className="group relative overflow-hidden bg-card">
                  <img
                    src={item.image}
                    alt={t(`commercial.lab.archive.${item.key}.alt`)}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 to-transparent p-4 pt-12 text-xs uppercase tracking-[0.14em] text-white/85">
                    {t(`commercial.lab.archive.${item.key}.title`)}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      ) : null}
      <FinalCta />
    </Layout>
  );
}
