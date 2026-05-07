import { useEffect, useRef, useState } from 'react'

interface ScrollRevealOptions {
  threshold?: number
  rootMargin?: string
}

export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Once revealed, stop observing
          if (ref.current) observer.unobserve(ref.current)
        }
      },
      {
        threshold: options.threshold ?? 0.15,
        rootMargin: options.rootMargin ?? '0px 0px -50px 0px',
      }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}

// Wrapper component for scroll reveal
interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
}

export default function ScrollReveal({ children, className = '', delay = 0, direction = 'up' }: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal()
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const directionClasses = {
    up: 'translate-y-10',
    down: '-translate-y-10',
    left: 'translate-x-10',
    right: '-translate-x-10',
    none: '',
  }

  // Com prefers-reduced-motion, exibe o conteúdo diretamente sem animação
  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible
          ? 'opacity-100 translate-x-0 translate-y-0'
          : `opacity-0 ${directionClasses[direction]}`
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
