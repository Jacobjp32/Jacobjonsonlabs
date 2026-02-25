import { Link } from "react-router-dom"
import { useI18n } from "@/i18n"
import { Home, ArrowLeft, AlertTriangle } from "lucide-react"
import GlowButton from "@/components/GlowButton"
import ParticleBackground from "@/components/ParticleBackground"
import { useEffect, useState } from "react"

// Glitch text effect
function GlitchText({ text, className = '' }: { text: string; className?: string }) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -translate-x-[2px] translate-y-[2px] text-primary/70 z-0 animate-pulse" aria-hidden="true">{text}</span>
      <span className="absolute top-0 left-0 translate-x-[2px] -translate-y-[1px] text-secondary/70 z-0 animate-pulse" style={{ animationDelay: '0.1s' }} aria-hidden="true">{text}</span>
    </span>
  )
}

export default function NotFound() {
  const { t } = useI18n()
  const [scramble, setScramble] = useState('')
  const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`01'
  
  useEffect(() => {
    const interval = setInterval(() => {
      const len = Math.floor(Math.random() * 20) + 10
      setScramble(Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join(''))
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      <ParticleBackground />
      
      {/* Scanlines overlay */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none opacity-[0.03]" 
        style={{ 
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,245,255,0.1) 2px, rgba(0,245,255,0.1) 4px)',
        }} 
      />
      
      <div className="container relative z-20 text-center space-y-6 px-4">
        {/* Scrambled text background */}
        <div className="text-xs font-mono text-primary/10 break-all max-w-lg mx-auto leading-tight mb-4 select-none" aria-hidden="true">
          {scramble}{scramble}{scramble}
        </div>

        {/* Warning icon */}
        <AlertTriangle className="h-16 w-16 mx-auto text-[rgb(255,214,10)] animate-pulse drop-shadow-[0_0_20px_rgba(255,214,10,0.5)]" />
        
        {/* 404 with glitch */}
        <h1 className="text-[10rem] md:text-[14rem] font-bold leading-none font-orbitron" style={{
          background: 'linear-gradient(135deg, rgb(255,0,110), rgb(0,245,255), rgb(57,255,20))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 0 40px rgba(255,0,110,0.4)) drop-shadow(0 0 80px rgba(0,245,255,0.2))',
        }}>
          <GlitchText text="404" />
        </h1>
        
        <div className="space-y-3">
          <h2 className="text-2xl md:text-4xl font-bold">
            <span className="text-secondary">[</span>
            <span className="text-foreground"> {t('404.subtitle')} </span>
            <span className="text-secondary">]</span>
          </h2>
          
          <p className="text-muted-foreground max-w-md mx-auto font-mono text-sm">
            <span className="text-primary">ERRO:</span> {t("404.desc")}
          </p>
        </div>
        
        {/* Terminal-like box */}
        <div className="max-w-md mx-auto bg-background/50 border border-secondary/30 rounded-lg p-4 font-mono text-xs text-left backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2 text-secondary/60">
            <span className="w-2 h-2 rounded-full bg-primary/60" />
            <span className="w-2 h-2 rounded-full bg-[rgb(255,214,10)]/60" />
            <span className="w-2 h-2 rounded-full bg-accent/60" />
            <span className="ml-2">terminal</span>
          </div>
          <p className="text-accent">$ locate page</p>
          <p className="text-muted-foreground">Searching...</p>
          <p className="text-primary">ERROR 404: File not found in /multiverse/</p>
          <p className="text-secondary">Redirecting to home base... <span className="animate-pulse">▋</span></p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Link to="/">
            <GlowButton size="lg" glowColor="pink">
              <Home className="mr-2 h-5 w-5" />
              Base Principal
            </GlowButton>
          </Link>
          
          <button onClick={() => window.history.back()}>
            <GlowButton size="lg" glowColor="cyan">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Voltar
            </GlowButton>
          </button>
        </div>

        {/* Scrambled text background bottom */}
        <div className="text-xs font-mono text-secondary/10 break-all max-w-lg mx-auto leading-tight mt-6 select-none" aria-hidden="true">
          {scramble}{scramble}
        </div>
      </div>
    </div>
  )
}
