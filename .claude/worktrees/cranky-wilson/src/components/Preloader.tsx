import { useEffect, useState } from 'react'
import { useI18n } from "@/i18n"

export default function Preloader() {
  const { t } = useI18n()
  const [progress, setProgress] = useState(0)
  const [isDone, setIsDone] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    const duration = 1800
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const p = Math.min(elapsed / duration, 1)
      // Ease-in-out
      const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2
      setProgress(Math.floor(eased * 100))

      if (p < 1) {
        requestAnimationFrame(animate)
      } else {
        setProgress(100)
        setTimeout(() => setIsDone(true), 300)
        setTimeout(() => setIsHidden(true), 800)
      }
    }

    requestAnimationFrame(animate)
  }, [])

  if (isHidden) return null

  return (
    <div
      role="progressbar"
      aria-label={t('preloader.subtitle')}
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-live="polite"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[hsl(260,20%,6%)] transition-opacity duration-500 ${
        isDone ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Logo JJP */}
      <div className="relative mb-8">
        <h1
          className="text-7xl md:text-8xl font-bold font-orbitron tracking-wider"
          style={{
            background: 'linear-gradient(90deg, rgb(255,0,110), rgb(0,245,255), rgb(57,255,20))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: `drop-shadow(0 0 ${20 + progress * 0.3}px rgba(255,0,110,${0.3 + progress * 0.005}))`,
          }}
        >
          JJP
        </h1>
        {/* Glow ring */}
        <div
          className="absolute -inset-8 rounded-full opacity-30 blur-2xl"
          style={{
            background: `conic-gradient(from ${progress * 3.6}deg, rgb(255,0,110), rgb(0,245,255), rgb(57,255,20), transparent)`,
          }}
        />
      </div>

      {/* Subtitle */}
      <p className="text-sm text-[hsl(195,30%,60%)] tracking-[0.3em] uppercase mb-8 font-space">
        {t('preloader.subtitle')}
      </p>

      {/* Progress bar */}
      <div className="w-48 h-0.5 bg-[hsl(195,40%,15%)] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-100"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, rgb(255,0,110), rgb(0,245,255), rgb(57,255,20))',
            boxShadow: '0 0 10px rgba(0,245,255,0.5)',
          }}
        />
      </div>

      {/* Percentage */}
      <p className="mt-3 text-xs text-[hsl(195,30%,50%)] font-mono tabular-nums">
        {progress}%
      </p>
    </div>
  )
}
