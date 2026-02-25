import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface NeonCardProps {
  children: ReactNode
  className?: string
  borderColor?: 'pink' | 'cyan' | 'green' | 'yellow' | 'blue' | 'red'
  hover?: boolean
  onClick?: () => void
}

export default function NeonCard({ 
  children, 
  className, 
  borderColor = 'cyan',
  hover = true,
  onClick
}: NeonCardProps) {
  const borderColors = {
    pink: 'border-[rgba(255,0,110,0.3)] hover:border-[rgba(255,0,110,0.8)] hover:shadow-[0_0_30px_rgba(255,0,110,0.4)]',
    cyan: 'border-[rgba(0,245,255,0.3)] hover:border-[rgba(0,245,255,0.8)] hover:shadow-[0_0_30px_rgba(0,245,255,0.4)]',
    green: 'border-[rgba(57,255,20,0.3)] hover:border-[rgba(57,255,20,0.8)] hover:shadow-[0_0_30px_rgba(57,255,20,0.4)]',
    yellow: 'border-[rgba(255,214,10,0.3)] hover:border-[rgba(255,214,10,0.8)] hover:shadow-[0_0_30px_rgba(255,214,10,0.4)]',
    blue: 'border-[rgba(0,102,255,0.3)] hover:border-[rgba(0,102,255,0.8)] hover:shadow-[0_0_30px_rgba(0,102,255,0.4)]',
    red: 'border-[rgba(255,0,51,0.3)] hover:border-[rgba(255,0,51,0.8)] hover:shadow-[0_0_30px_rgba(255,0,51,0.4)]',
  }

  return (
    <div
      className={cn(
        "relative rounded-xl border-2 backdrop-blur-md",
        "bg-card/40 p-6 transition-all duration-300",
        hover && "hover:scale-[1.02] hover:bg-card/60",
        borderColors[borderColor],
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick() } : undefined}
    >
      {children}
    </div>
  )
}
