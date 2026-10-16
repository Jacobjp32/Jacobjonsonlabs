import { useState } from "react";
import { ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { useI18n } from "@/i18n";
import { pages } from "@/lib/routes";

const bandeira = {
  anchor: "bandeira-cravada",
  number: "01",
  videoId: "MvFCy0EIUWQ",
  poster: "/cases/bandeira-cravada-youtube.jpg",
  source: "https://www.behance.net/gallery/255859917/Bandeira-Cravada-Music-Video-VFX",
};

export default function VideoCase({ featured = false, reverse = false }: { featured?: boolean; reverse?: boolean }) {
  const { lang, t } = useI18n();
  const [playing, setPlaying] = useState(false);
  const copy = "commercial.av.bandeira";
  const watchUrl = `https://www.youtube.com/watch?v=${bandeira.videoId}`;

  return (
    <article
      id={bandeira.anchor}
      className={`scroll-mt-24 border-b border-white/10 py-16 lg:py-24 ${featured ? "bg-card/20" : ""}`}
    >
      <div className="container">
        <div className="flex items-center gap-4 text-primary" aria-hidden="true">
          <span className="font-sora text-sm">{bandeira.number}</span>
          <span className="h-px w-10 bg-current opacity-60" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.24em]">{t(`${copy}.marker`)}</span>
        </div>
        <div className={`mt-8 grid gap-7 lg:gap-x-12 ${featured ? "lg:grid-cols-[.9fr_1.1fr]" : "lg:grid-cols-2"}`}>
          <div className={`${reverse ? "lg:col-start-2" : "lg:col-start-1"} flex flex-col lg:row-start-1`}>
            <p className="order-2 mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary lg:order-1 lg:mt-0">
              {t(`${copy}.type`)}
            </p>
            <h2 className="order-1 max-w-3xl text-balance text-4xl leading-[1.07] sm:text-5xl lg:order-2 lg:mt-4">
              {t(`${copy}.title`)}
            </h2>
            <p className="order-3 mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg lg:mt-5">
              {t(`${copy}.summary`)}
            </p>
          </div>
          <figure className={`min-w-0 lg:row-span-2 lg:row-start-1 lg:self-center ${reverse ? "lg:col-start-1" : "lg:col-start-2"}`}>
            <div className="relative aspect-video overflow-hidden border border-white/10 bg-black">
              {playing ? (
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${bandeira.videoId}?rel=0`}
                  title={t(`${copy}.videoLabel`)}
                  loading="lazy"
                  allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              ) : (
                <button type="button" className="group relative block h-full w-full" onClick={() => setPlaying(true)} aria-label={t(`${copy}.playLabel`)}>
                  <img
                    src={bandeira.poster}
                    alt={t(`${copy}.imageAlt`)}
                    loading="lazy"
                    decoding="async"
                    width={1280}
                    height={720}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                  <span className="absolute inset-0 bg-black/15 transition group-hover:bg-black/30" aria-hidden="true" />
                  <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-black/65 text-white transition group-hover:bg-primary group-hover:text-background">
                    <Play className="ml-1 h-6 w-6" aria-hidden="true" />
                  </span>
                </button>
              )}
            </div>
            <figcaption className="mt-3 flex flex-wrap justify-between gap-x-4 gap-y-1 text-xs uppercase tracking-[0.14em] text-foreground/55">
              <span>{t(`${copy}.mediaCaption`)}</span>
              <span>{t("commercial.av.videoOnDemand")}</span>
            </figcaption>
          </figure>
          <div className={`${reverse ? "lg:col-start-2" : "lg:col-start-1"} lg:row-start-2`}>
            <dl className="divide-y divide-white/10 border-y border-white/10 lg:mt-8">
              {(["context", "role", "credits"] as const).map((field) => (
                <div key={field} className="grid gap-1 py-3 sm:grid-cols-[8rem_1fr] sm:gap-2 sm:py-4">
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/55">
                    {t(`commercial.av.label.${field}`)}
                  </dt>
                  <dd className="text-sm leading-6 text-foreground/80">{t(`${copy}.${field}`)}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-4 flex flex-wrap gap-x-7 gap-y-1 sm:mt-6 sm:gap-y-2">
              <a href={watchUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 font-semibold text-primary hover:text-primary/80">
                {t("commercial.av.watchYouTube")}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href={bandeira.source} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm text-foreground/75 hover:text-primary">
                {t(`${copy}.sourceLabel`)}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <Link to={pages.videoEditing[lang]} className="inline-flex min-h-11 items-center gap-2 text-sm text-foreground/75 hover:text-primary">
                {t("commercial.av.serviceCta")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
