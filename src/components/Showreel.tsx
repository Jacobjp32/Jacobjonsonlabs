import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { useI18n } from "@/i18n";

export default function Showreel({ compact = false }: { compact?: boolean }) {
  const { lang, t } = useI18n();
  const figureRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "320px 0px" },
    );
    if (figureRef.current) observer.observe(figureRef.current);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (ready && !reducedMotion) {
      videoRef.current?.play().catch(() => setPlaying(false));
    }
  }, [ready, reducedMotion]);

  const toggle = async () => {
    const video = videoRef.current;
    if (!video) return;
    if (!ready) {
      setReady(true);
      window.requestAnimationFrame(() => {
        video.play().catch(() => setPlaying(false));
      });
      return;
    }
    if (video.paused) {
      await video.play().catch(() => setPlaying(false));
    } else {
      video.pause();
    }
  };

  const label = playing
    ? lang === "en"
      ? "Pause showreel"
      : "Pausar showreel"
    : lang === "en"
      ? "Play showreel"
      : "Reproduzir showreel";

  return (
    <figure ref={figureRef} className={`cinematic-media ${compact ? "cinematic-media--compact" : ""}`}>
      <video
        ref={videoRef}
        src={ready ? "/showreel.mp4" : undefined}
        poster="/JACOBESTUDIO.webp"
        muted
        loop
        playsInline
        preload={ready ? "metadata" : "none"}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        aria-hidden="true"
        tabIndex={-1}
      />
      <div className="cinematic-media__shade" aria-hidden="true" />
      <button type="button" className="cinematic-media__control" onClick={toggle} aria-label={label}>
        {playing ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
      </button>
      <figcaption>
        <span>{t("commercial.case.showreel.caption")}</span>
        <span>00:00 — 00:06</span>
      </figcaption>
    </figure>
  );
}
