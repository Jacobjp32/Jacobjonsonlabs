import { useNavigate, useLocation } from 'react-router-dom'
import { useI18n } from '@/i18n'
import { getHomePath, getLocalizedPath, isLegacyServicesPath } from '@/lib/seo'

export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { lang, setLang } = useI18n()
  const navigate = useNavigate()
  const location = useLocation()
  const isEn = lang === 'en'
  const nextLang = isEn ? 'pt' : 'en'

  const handleToggleLanguage = () => {
    const targetPath = isLegacyServicesPath(location.pathname)
      ? getHomePath(nextLang)
      : getLocalizedPath(location.pathname, nextLang)
    const targetHash = isLegacyServicesPath(location.pathname) ? '#services' : location.hash

    setLang(nextLang)
    navigate(
      {
        pathname: targetPath,
        search: '',
        hash: targetHash,
      },
      { replace: true }
    )
  }

  return (
    <button
      onClick={handleToggleLanguage}
      title={isEn ? 'Mudar para Português' : 'Switch to English'}
      className={`relative flex items-center gap-0 h-7 rounded-sm overflow-hidden border transition-all duration-300 hover:scale-105 select-none ${
        isEn
          ? 'border-[hsl(195_100%_50%/0.4)] hover:border-[hsl(195_100%_50%/0.7)]'
          : 'border-[hsl(330_100%_50%/0.4)] hover:border-[hsl(330_100%_50%/0.7)]'
      } ${className}`}
      aria-label={isEn ? 'Mudar para Português' : 'Switch to English'}
    >
      {/* PT option */}
      <span
        className={`flex items-center gap-1 px-2.5 h-full text-[11px] font-bold tracking-widest transition-all duration-300 ${
          !isEn
            ? 'bg-[hsl(330_100%_50%/0.15)] text-[hsl(330_100%_65%)]'
            : 'text-white/25 hover:text-white/40'
        }`}
      >
        PT
      </span>

      {/* Divider */}
      <span className="w-px h-3/4 bg-white/10 flex-shrink-0" />

      {/* EN option */}
      <span
        className={`flex items-center gap-1 px-2.5 h-full text-[11px] font-bold tracking-widest transition-all duration-300 ${
          isEn
            ? 'bg-[hsl(195_100%_50%/0.15)] text-[hsl(195_100%_65%)]'
            : 'text-white/25 hover:text-white/40'
        }`}
      >
        EN
      </span>
    </button>
  )
}
