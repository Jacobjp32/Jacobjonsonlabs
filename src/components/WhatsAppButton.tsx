import { MessageCircle } from "lucide-react";
import { useI18n } from "@/i18n";

interface WhatsAppButtonProps {
  phoneNumber?: string;
}

export default function WhatsAppButton({
  phoneNumber = "5542988283963",
}: WhatsAppButtonProps) {
  const { t } = useI18n();
  const encodedMessage = encodeURIComponent(t("whatsapp.message"));
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-6 z-50 group hidden md:block"
      aria-label={t("whatsapp.label")}
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />

      <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-all duration-300 hover:scale-110 hover:bg-[#20BD5A] hover:shadow-[0_0_30px_rgba(37,211,102,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-background">
        <MessageCircle className="h-7 w-7 text-white" fill="white" />
      </div>

      <div className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-lg border border-[#25D366]/40 bg-background/90 px-3 py-2 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
        <span className="text-sm font-medium text-foreground">{t("whatsapp.label")}</span>
        <div className="absolute right-0 top-1/2 h-2 w-2 translate-x-1/2 -translate-y-1/2 rotate-45 border-r border-t border-[#25D366]/40 bg-background" />
      </div>
    </a>
  );
}
