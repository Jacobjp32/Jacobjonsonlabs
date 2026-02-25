import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  baseVx: number
  baseVy: number
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    const particles: Particle[] = []
    
    const isMobile = window.innerWidth <= 768
    const PARTICLE_COUNT = isMobile ? 15 : 80
    const MAX_DISTANCE = isMobile ? 100 : 150
    const MOUSE_RADIUS = 200
    const MOUSE_REPEL_FORCE = 3
    const TARGET_FPS = isMobile ? 24 : 60
    const FRAME_INTERVAL = 1000 / TARGET_FPS

    const colors = [
      'rgba(255, 0, 110, 0.6)',
      'rgba(0, 245, 255, 0.6)',
      'rgba(57, 255, 20, 0.4)',
    ]

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      particles.length = 0
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const vx = (Math.random() - 0.5) * 0.5
        const vy = (Math.random() - 0.5) * 0.5
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx, vy,
          baseVx: vx,
          baseVy: vy,
        })
      }
    }

    // Mouse tracking global
    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    let lastTime = 0

    const drawParticles = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(drawParticles)

      const deltaTime = currentTime - lastTime
      if (deltaTime < FRAME_INTERVAL) return
      lastTime = currentTime - (deltaTime % FRAME_INTERVAL)

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const mouse = mouseRef.current

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i]

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < MAX_DISTANCE) {
            const opacity = (1 - distance / MAX_DISTANCE) * 0.5

            if (isMobile) {
              ctx.strokeStyle = `rgba(0, 245, 255, ${opacity})`
            } else {
              const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y)
              gradient.addColorStop(0, colors[i % colors.length].replace(/[\d.]+\)$/, `${opacity})`))
              gradient.addColorStop(1, colors[j % colors.length].replace(/[\d.]+\)$/, `${opacity})`))
              ctx.strokeStyle = gradient
            }

            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }

        // Mouse interaction: connection lines + repulsion
        if (!isMobile) {
          const dx = p1.x - mouse.x
          const dy = p1.y - mouse.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < MOUSE_RADIUS) {
            const opacity = (1 - distance / MOUSE_RADIUS) * 0.8
            ctx.strokeStyle = `rgba(255, 0, 110, ${opacity})`
            ctx.lineWidth = 1.5
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.stroke()

            // Repulsion effect
            const force = (1 - distance / MOUSE_RADIUS) * MOUSE_REPEL_FORCE
            const angle = Math.atan2(dy, dx)
            p1.vx += Math.cos(angle) * force * 0.1
            p1.vy += Math.sin(angle) * force * 0.1
          } else {
            p1.vx += (p1.baseVx - p1.vx) * 0.02
            p1.vy += (p1.baseVy - p1.vy) * 0.02
          }
        }
      }

      particles.forEach((particle, index) => {
        ctx.fillStyle = colors[index % colors.length]
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2)
        ctx.fill()

        const maxSpeed = 2
        const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy)
        if (speed > maxSpeed) {
          particle.vx = (particle.vx / speed) * maxSpeed
          particle.vy = (particle.vy / speed) * maxSpeed
        }

        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        particle.y = Math.max(0, Math.min(canvas.height, particle.y))
      })
    }

    resize()
    createParticles()
    animationFrameId = requestAnimationFrame(drawParticles)

    const onResize = () => { resize(); createParticles() }
    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ opacity: 0.3, zIndex: 0 }}
      aria-hidden="true"
    />
  )
}
