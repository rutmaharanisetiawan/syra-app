'use client'

import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface OnboardingScreenProps {
  onComplete: () => void
}

const slides = [
  {
    id: 1,
    emoji: '🧠',
    title: 'Understand Yourself Better',
    description: 'Catat perasaan dan refleksi harian dengan bantuan AI.',
    color: 'from-primary/20 to-accent/10',
  },
  {
    id: 2,
    emoji: '📔',
    title: 'Journal Made Simple',
    description: 'Tulis, refleksi, dan pahami emosi dengan nyaman.',
    color: 'from-accent/20 to-secondary/10',
  },
  {
    id: 3,
    emoji: '🤖',
    title: 'AI That Understands You',
    description: 'SYRA membantu memberi insight untuk hidup lebih seimbang.',
    color: 'from-secondary/20 to-primary/10',
  },
]

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slide = slides[currentSlide]

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      onComplete()
    }
  }

  const handleSkip = () => {
    onComplete()
  }

  return (
    <div className="flex-1 flex flex-col w-full h-full bg-background">
      {/* Header with skip button */}
      <div className="flex justify-between items-center p-4 sm:p-6 pb-3 sm:pb-4">
        <div className="w-10 sm:w-12" />
        <div className="flex gap-1">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'w-6 sm:w-8 bg-primary' : 'w-2 bg-border'
              }`}
            />
          ))}
        </div>
        <button
          onClick={handleSkip}
          className="text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Slide content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 gap-6 sm:gap-8">
        {/* Background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${slide.color} pointer-events-none`} />

        {/* Emoji */}
        <div className="relative text-5xl sm:text-7xl animate-bounce mb-2 sm:mb-4" style={{ animationDuration: '2s' }}>
          {slide.emoji}
        </div>

        {/* Title */}
        <div className="relative z-10 text-center space-y-3 sm:space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-balance">
            {slide.title}
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base text-muted-foreground text-balance leading-relaxed">
            {slide.description}
          </p>
        </div>
      </div>

      {/* Bottom button */}
      <div className="px-4 sm:px-6 pb-6 sm:pb-8 pt-3 sm:pt-4">
        <Button
          onClick={handleNext}
          className="w-full h-10 sm:h-12 bg-primary hover:bg-primary/90 text-primary-foreground text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
        >
          {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
          <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5" />
        </Button>
      </div>
    </div>
  )
}
