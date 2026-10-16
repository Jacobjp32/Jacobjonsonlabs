import { Check } from "lucide-react";
import FinalCta from "@/components/FinalCta";
import Layout from "@/components/Layout";
import ProcessSteps from "@/components/ProcessSteps";
import SectionHeading from "@/components/SectionHeading";
import { useI18n } from "@/i18n";

const practices = ["communication", "audiovisual", "creativeTech", "web", "automation", "appliedAi"] as const;
const stack = ["react", "typescript", "astro", "google", "appsScript", "premiere", "afterEffects", "figma"] as const;

export default function About() {
  const { t } = useI18n();
  return (
    <Layout page="about">
      <section className="border-b border-white/10 pt-[76px]">
        <div className="container grid gap-10 py-16 sm:py-20 lg:grid-cols-[.7fr_1.3fr] lg:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">ABOUT / JACOB JONSON</p>
          <div>
            <h1 className="max-w-4xl text-balance text-4xl leading-tight sm:text-6xl">{t("commercial.about.title")}</h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground">{t("commercial.about.description")}</p>
          </div>
        </div>
      </section>
      <section className="py-20 lg:py-28">
        <div className="container grid gap-12 lg:grid-cols-2 lg:items-start">
          <figure className="relative overflow-hidden border border-white/10">
            <img src="/IDEIA.webp" alt={t("commercial.about.imageAlt")} className="aspect-[4/5] w-full bg-black object-cover object-center" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 to-transparent p-6 pt-20 text-xs uppercase tracking-[0.18em] text-white/75">
              Jacob Jonson / Creative Technologist
            </figcaption>
          </figure>
          <div>
            <SectionHeading
              eyebrow={t("commercial.about.practice.eyebrow")}
              title={t("commercial.about.practice.title")}
              description={t("commercial.about.practice.description")}
            />
            <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
              {practices.map((item) => (
                <li key={item} className="flex items-center gap-3 py-4 text-base text-foreground/80">
                  <Check className="h-4 w-4 text-primary" aria-hidden="true" />
                  {t(`commercial.about.practice.${item}`)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="border-y border-white/10 bg-card/25 py-20 lg:py-28">
        <div className="container">
          <SectionHeading
            eyebrow={t("commercial.process.eyebrow")}
            title={t("commercial.about.method.title")}
            description={t("commercial.about.method.description")}
          />
          <ProcessSteps />
        </div>
      </section>
      <section className="py-20 lg:py-28">
        <div className="container grid gap-10 lg:grid-cols-[.65fr_1.35fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">SELECTED STACK</p>
            <h2 className="mt-4 text-3xl">{t("commercial.about.stack.title")}</h2>
          </div>
          <div className="grid grid-cols-2 border-l border-t border-white/10 sm:grid-cols-4">
            {stack.map((item) => (
              <p key={item} className="border-b border-r border-white/10 p-5 text-sm text-foreground/72">
                {t(`commercial.about.stack.${item}`)}
              </p>
            ))}
          </div>
        </div>
      </section>
      <FinalCta />
    </Layout>
  );
}
