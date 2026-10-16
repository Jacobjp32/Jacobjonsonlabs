import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import FinalCta from "@/components/FinalCta";
import Layout from "@/components/Layout";
import ProcessSteps from "@/components/ProcessSteps";
import Showreel from "@/components/Showreel";
import { useI18n } from "@/i18n";
import { pages } from "@/lib/routes";

const proof = ["web", "automation", "audiovisual", "qa"] as const;
const capabilities = ["web", "automation", "audiovisual"] as const;
const rescueItems = ["mobile", "forms", "performance", "seo", "deploy", "accessibility"] as const;
const labItems = [
  { id: "creativeos", image: "/cases/creativeos-pipeline-demo.webp" },
  { id: "motion", image: "/JACOBESTUDIO2.webp" },
  { id: "editing", image: "/JACOBTIME.webp" },
] as const;

export default function Home() {
  const { lang, t } = useI18n();

  return (
    <Layout page="home">
      <section className="v2-hero">
        <div className="premium-grid v2-hero__grid" aria-hidden="true" />
        <div className="v2-hero__media" aria-hidden="true">
          <img src="/JACOBASTRONAUTA.webp" alt="" width={1920} height={1075} />
          <div className="v2-hero__media-shade" />
        </div>
        <div className="editorial-frame v2-hero__inner">
          <div className="v2-hero__meta">
            <span>JACOB JONSON LABS</span>
            <span>CREATIVE TECHNOLOGY</span>
            <span>REMOTE / 2026</span>
          </div>
          <div className="v2-hero__copy">
            <p className="v2-kicker">{t("commercial.hero.eyebrow")}</p>
            <h1>
              <span>{t("commercial.hero.title.line1")}</span>
              <strong>{t("commercial.hero.title.line2")}</strong>
            </h1>
            <p className="v2-hero__lead">{t("commercial.hero.lead")}</p>
            <div className="v2-actions">
              <Link to={pages.work[lang]} className="v2-button v2-button--primary">
                {t("commercial.hero.primaryCta")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link to={pages.contact[lang]} className="v2-button v2-button--ghost">
                {t("commercial.hero.secondaryCta")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section aria-label={t("commercial.proof.label")} className="v2-proof-strip">
        <div className="editorial-frame">
          {proof.map((item, index) => (
            <p key={item}>
              <span>0{index + 1}</span>
              {t(`commercial.proof.${item}`)}
            </p>
          ))}
        </div>
      </section>

      <section className="v2-showreel" aria-labelledby="home-showreel-title">
        <Showreel />
        <div className="editorial-frame v2-showreel__content">
          <div className="flex items-center gap-4 text-primary" aria-hidden="true">
            <span className="font-sora text-sm">02</span>
            <span className="h-px w-10 bg-current opacity-60" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.24em]">AUDIOVISUAL / EDITING</span>
          </div>
          <div className="v2-showreel__copy">
            <p className="v2-kicker">{t("commercial.case.showreel.category")}</p>
            <h2 id="home-showreel-title">{t("commercial.home.showreel.title")}</h2>
            <p>{t("commercial.case.showreel.summary")}</p>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.12em] text-white/85">
              {t("commercial.home.showreel.caseLine")}
            </p>
            <Link to={`${pages.work[lang]}?filter=audiovisual`} className="v2-button v2-button--light">
              {t("commercial.home.showreel.cta")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="v2-section v2-capabilities" aria-labelledby="home-capabilities-title">
        <div className="editorial-frame">
          <div className="v2-section-heading v2-capabilities__heading">
            <div className="v2-capabilities__intro">
              <p className="v2-kicker">{t("commercial.home.services.eyebrow")}</p>
              <h2 id="home-capabilities-title">{t("commercial.home.services.title")}</h2>
            </div>
            <p className="v2-capabilities__description">{t("commercial.home.services.description")}</p>
          </div>
          <div className="v2-capabilities__list">
            {capabilities.map((item, index) => (
              <article key={item}>
                <span>0{index + 1}</span>
                <h3>{t(`commercial.home.services.${item}.title`)}</h3>
                <p>{t(`commercial.home.services.${item}.description`)}</p>
              </article>
            ))}
          </div>
          <Link to={pages.services[lang]} className="v2-text-link">
            {t("commercial.home.services.cta")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="v2-section v2-rescue" aria-labelledby="home-rescue-title">
        <div className="editorial-frame">
          <div className="v2-rescue__grid">
            <div>
              <p className="v2-kicker v2-kicker--copper">SITE RESCUE</p>
              <h2 id="home-rescue-title">{t("commercial.rescue.title")}</h2>
              <p className="v2-rescue__lead">{t("commercial.rescue.description")}</p>
              <ul>
                {rescueItems.map((item) => (
                  <li key={item}>{t(`commercial.service.rescue.item.${item}`)}</li>
                ))}
              </ul>
              <Link to={`${pages.services[lang]}#site-rescue`} className="v2-button v2-button--copper">
                {t("commercial.rescue.cta")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="v2-rescue__system">
              <div className="v2-rescue__stages">
                {(["problem", "diagnosis", "resolution"] as const).map((stage, index) => (
                  <div key={stage}>
                    <span>0{index + 1}</span>
                    <h3>{t(`commercial.rescue.stage.${stage}`)}</h3>
                    <p>{t(`commercial.rescue.stage.${stage}.description`)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="v2-section v2-process" aria-labelledby="home-process-title">
        <div className="editorial-frame">
          <div className="v2-section-heading">
            <div>
              <p className="v2-kicker">{t("commercial.process.eyebrow")}</p>
              <h2 id="home-process-title" className="v2-process__heading">
                {t("commercial.process.title")}
              </h2>
            </div>
            <p>{t("commercial.process.description")}</p>
          </div>
          <ProcessSteps />
        </div>
      </section>

      <section className="v2-section v2-lab" aria-labelledby="home-lab-title">
        <div className="editorial-frame">
          <div className="v2-section-heading">
            <div>
              <p className="v2-kicker v2-kicker--purple">LAB / EXPERIMENTS</p>
              <h2 id="home-lab-title">{t("commercial.home.lab.title")}</h2>
            </div>
            <p>{t("commercial.home.lab.description")}</p>
          </div>
          <div className="v2-lab__mosaic" aria-label={t("commercial.lab.products.eyebrow")}>
            {labItems.map((item, index) => (
              <article key={item.id} className={`v2-lab__item ${item.id === "creativeos" ? "v2-lab__item--creativeos" : ""}`}>
                <img src={item.image} alt={t(`commercial.lab.product.${item.id}.alt`)} loading="lazy" />
                <div>
                  <span>
                    0{index + 1} / {t(`commercial.lab.product.${item.id}.tag`)}
                  </span>
                  <h3>{t(`commercial.lab.product.${item.id}.title`)}</h3>
                  <p>{t(`commercial.lab.product.${item.id}.description`)}</p>
                </div>
              </article>
            ))}
          </div>
          <Link to={pages.lab[lang]} className="v2-text-link v2-text-link--purple">
            {t("commercial.home.lab.cta")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="v2-about-strip" aria-labelledby="home-about-title">
        <div className="editorial-frame">
          <div className="v2-about-strip__content">
            <figure className="v2-about-strip__portrait">
              <img src="/IDEIA.webp" alt="" loading="lazy" />
            </figure>
            <div>
              <h2 id="home-about-title">{t("commercial.about.title")}</h2>
              <p>{t("commercial.about.description")}</p>
              <Link to={pages.about[lang]} className="v2-text-link v2-text-link--copper">
                {t("commercial.about.cta")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <FinalCta />
    </Layout>
  );
}
