import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import FinalCta from "@/components/FinalCta";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { useI18n } from "@/i18n";
import { pages } from "@/lib/routes";

const products = [
  { id: "creativeos", image: "/cases/creativeos-pipeline-demo.webp", href: "https://creativeopsmvp.netlify.app/" },
  { id: "motion", image: "/JACOBESTUDIO2.webp" },
  { id: "editing", image: "/JACOBTIME.webp" },
  { id: "ai", image: "/JACOBBRAIN.webp" },
] as const;

const archive = [
  { key: "worlds", image: "/JACOBCYBER2.webp" },
  { key: "identity", image: "/JACOBMULHERCYBER.webp" },
  { key: "frames", image: "/JACOBHORIZONTEDEEVENTOS.webp" },
  { key: "rhythm", image: "/JACOBTIME.webp" },
  { key: "editorial", image: "/IDEIA.webp" },
] as const;

export default function Lab() {
  const { lang, t } = useI18n();
  return (
    <Layout page="lab">
      <section className="border-b border-white/10 pt-[76px]">
        <div className="container py-16 sm:py-20 lg:py-28">
          <SectionHeading level="h1" eyebrow="LAB" title={t("commercial.lab.title")} description={t("commercial.lab.description")} />
        </div>
      </section>
      <section className="border-b border-white/10 py-16 lg:py-24">
        <div className="container grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{t("commercial.lab.creativeos.eyebrow")}</p>
            <h2 className="mt-4 text-4xl">{t("commercial.lab.creativeos.title")}</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">{t("commercial.lab.creativeos.description")}</p>
            <p className="mt-4 text-sm leading-6 text-foreground/75">{t("commercial.lab.creativeos.features")}</p>
            <a
              href="https://creativeopsmvp.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-primary"
            >
              {t("commercial.lab.creativeos.cta")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
          <figure>
            <img src={products[0].image} alt={t("commercial.lab.creativeos.alt")} className="w-full border border-white/10" />
            <figcaption className="mt-3 text-xs uppercase tracking-[0.14em] text-foreground/55">
              {t("commercial.lab.creativeos.caption")}
            </figcaption>
          </figure>
        </div>
      </section>
      <section className="py-16 lg:py-24">
        <div className="container">
          <SectionHeading
            eyebrow={t("commercial.lab.products.eyebrow")}
            title={t("commercial.lab.products.title")}
            description={t("commercial.lab.products.description")}
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {products.slice(1).map((item) => (
              <article key={item.id} className="border border-white/10 bg-card/40">
                <img src={item.image} alt={t(`commercial.lab.product.${item.id}.alt`)} className="aspect-[4/3] w-full object-cover" />
                <div className="p-5">
                  <p className="text-xs uppercase tracking-[0.16em] text-primary">{t(`commercial.lab.product.${item.id}.tag`)}</p>
                  <h3 className="mt-3 text-2xl">{t(`commercial.lab.product.${item.id}.title`)}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{t(`commercial.lab.product.${item.id}.description`)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="border-t border-white/10 bg-card/25 py-16 lg:py-24">
        <div className="container">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow={t("commercial.lab.archive.eyebrow")}
              title={t("commercial.lab.archive.title")}
              description={t("commercial.lab.archive.description")}
            />
            <Link to={pages.work[lang]} className="inline-flex min-h-11 items-center gap-2 font-semibold text-primary">
              {t("commercial.lab.archive.cta")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-5">
            {archive.map((item) => (
              <figure key={item.key} className="relative overflow-hidden">
                <img src={item.image} alt={t(`commercial.lab.archive.${item.key}.alt`)} className="aspect-[4/5] w-full object-cover" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background to-transparent p-3 pt-10 text-xs uppercase tracking-[0.14em]">
                  {t(`commercial.lab.archive.${item.key}.title`)}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <FinalCta />
    </Layout>
  );
}
