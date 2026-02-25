import { useEffect, useCallback } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface LightboxProps {
  isOpen: boolean
  onClose: () => void
  images: { src: string; title: string }[]
  currentIndex: number
  onNavigate: (index: number) => void
}

export default function Lightbox({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNavigate,
}: LightboxProps) {
  const handlePrevious = useCallback(() => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1
    onNavigate(newIndex)
  }, [currentIndex, images.length, onNavigate])

  const handleNext = useCallback(() => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1
    onNavigate(newIndex)
  }, [currentIndex, images.length, onNavigate])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      
      switch (e.key) {
        case "Escape":
          onClose()
          break
        case "ArrowLeft":
          handlePrevious()
          break
        case "ArrowRight":
          handleNext()
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose, handlePrevious, handleNext])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!isOpen) return null

  const currentImage = images[currentIndex]

  return (
    <div 
      className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md flex items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[rgba(255,0,110,0.2)] border border-[rgba(255,0,110,0.5)] hover:bg-[rgba(255,0,110,0.3)] transition-colors"
        aria-label="Fechar"
      >
        <X className="h-6 w-6 text-[rgb(255,0,110)]" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation()
          handlePrevious()
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-[rgba(255,0,110,0.2)] border border-[rgba(255,0,110,0.5)] hover:bg-[rgba(255,0,110,0.3)] transition-colors"
        aria-label="Imagem anterior"
      >
        <ChevronLeft className="h-6 w-6 text-[rgb(255,0,110)]" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation()
          handleNext()
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-[rgba(255,0,110,0.2)] border border-[rgba(255,0,110,0.5)] hover:bg-[rgba(255,0,110,0.3)] transition-colors"
        aria-label="Próxima imagem"
      >
        <ChevronRight className="h-6 w-6 text-[rgb(255,0,110)]" />
      </button>

      <div 
        className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentImage.src}
          alt={currentImage.title}
          className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-[0_0_50px_rgba(255,0,110,0.3)]"
        />
        
        <div className="mt-4 text-center">
          <h3 className="text-xl font-bold bg-gradient-to-r from-[rgb(255,0,110)] via-[rgb(0,245,255)] to-[rgb(57,255,20)] bg-clip-text text-transparent">
            {currentImage.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {currentIndex + 1} / {images.length}
          </p>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto p-2 bg-background/50 backdrop-blur-sm rounded-lg">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation()
              onNavigate(index)
            }}
            className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
              index === currentIndex
                ? "border-[rgb(255,0,110)] shadow-[0_0_10px_rgba(255,0,110,0.5)]"
                : "border-transparent opacity-50 hover:opacity-100"
            }`}
          >
            <img
              src={img.src}
              alt={img.title}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
