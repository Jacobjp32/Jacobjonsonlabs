import { MessageCircle } from "lucide-react"
import { useI18n } from "@/i18n"

interface WhatsAppButtonProps {
  phoneNumber?: string
}

export default function WhatsAppButton({ 
  phoneNumber = "5542988283963",
}: WhatsAppButtonProps) {
  const { t } = useI18n()

  const handleClick = () => {
    const encodedMessage = encodeURIComponent(t('whatsapp.message'))
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-24 right-8 z-50 group"
      aria-label={t('whatsapp.label')}
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
      
      <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg hover:bg-[#20BD5A] hover:scale-110 transition-all duration-300 hover:shadow-[0_0_25px_rgba(37,211,102,0.5)]">
        <MessageCircle className="h-7 w-7 text-white" fill="white" />
      </div>

      <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-background/90 backdrop-blur-sm border border-[#25D366]/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        <span className="text-sm font-medium text-foreground">{t('whatsapp.label')}</span>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-background border-r border-t border-[#25D366]/50 rotate-45" />
      </div>
    </button>
  )
}
