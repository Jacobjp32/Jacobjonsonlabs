import { useI18n } from '@/i18n'

export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { lang, setLang } = useI18n()

  return (
    <button
      onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold transition-all duration-300 hover:scale-105 ${
        lang === 'pt'
          ? 'border-primary/50 text-primary hover:bg-primary/10'
          : 'border-secondary/50 text-secondary hover:bg-secondary/10'
      } ${className}`}
      title={lang === 'pt' ? 'Switch to English' : 'Mudar para Português'}
    >
      <span className={`transition-opacity ${lang === 'pt' ? 'opacity-100' : 'opacity-40'}`}>🇧🇷</span>
      <span className="text-muted-foreground">/</span>
      <span className={`transition-opacity ${lang === 'en' ? 'opacity-100' : 'opacity-40'}`}>🇺🇸</span>
    </button>
  )
}
