import { useEffect } from "react";
import { X } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  videoSrc: string;
  poster?: string;
  iframeSrc?: string;
  eyebrow?: string;
  closeLabel?: string;
  fallbackText?: string;
}

export default function VideoModal({
  isOpen,
  onClose,
  title,
  videoSrc,
  poster,
  iframeSrc,
  eyebrow = "Showreel & projetos",
  closeLabel = "Fechar vídeo",
  fallbackText = "Seu navegador não suporta reprodução de vídeo.",
}: VideoModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] bg-background/90 px-4 py-6 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div className="mx-auto flex h-full w-full max-w-5xl items-center justify-center">
        <div
          className="relative w-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-card/95 shadow-[0_0_60px_rgba(255,0,110,0.12)]"
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-background/80 text-foreground transition hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label={closeLabel}
          >
            <X className="h-5 w-5" />
          </button>

          <div className="border-b border-white/10 px-6 py-5 pr-16">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/70">
              {eyebrow}
            </p>
            <h3 className="mt-2 text-2xl font-bold text-foreground">{title}</h3>
          </div>

          <div className="bg-black">
            {iframeSrc ? (
              <iframe
                title={title}
                src={iframeSrc}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="aspect-video w-full"
              />
            ) : (
              <video
                controls
                autoPlay
                playsInline
                preload="metadata"
                poster={poster}
                className="aspect-video w-full"
              >
                <source src={videoSrc} type="video/mp4" />
                {fallbackText}
              </video>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
