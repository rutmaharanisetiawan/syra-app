'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Lightbulb, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface InsightScreenProps {
  onBack: () => void
}

export default function InsightScreen({ onBack }: InsightScreenProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [insight, setInsight] = useState<any>(null)

  useEffect(() => {
    // Simulate AI analysis
    const timer = setTimeout(() => {
      setInsight({
        emotionalSummary: 'You seem overwhelmed but hopeful',
        keyThemes: ['stress', 'growth', 'resilience'],
        advice: 'Take short breaks and prioritize rest. Your mind is working hard on solving problems.',
        positiveNote: 'You showed great self-awareness today!',
        recommendation: 'Try a 10-minute meditation to calm your nervous system.',
      })
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex-1 flex flex-col w-full h-full bg-background">
      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-3 p-4 sm:p-6 pb-3 sm:pb-4 border-b border-border">
        <button
          onClick={onBack}
          className="text-primary hover:text-primary/80 transition-colors"
        >
          <ArrowLeft className="w-5 sm:w-6 h-5 sm:h-6" />
        </button>
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-foreground">AI Insight</h1>
          <p className="text-xs text-muted-foreground">Powered by SYRA</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6 pb-20">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center gap-4 py-12">
            <div className="w-10 sm:w-12 h-10 sm:h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            <p className="text-muted-foreground text-xs sm:text-sm">Analyzing your entry...</p>
          </div>
        ) : (
          <>
            {/* Emotional Summary */}
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-lg sm:rounded-2xl p-4 sm:p-6 space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg bg-primary/20 flex items-center justify-center text-base sm:text-lg">
                  🎯
                </div>
                <h3 className="font-semibold text-sm sm:text-base text-foreground">Emotional Summary</h3>
              </div>
              <p className="text-sm sm:text-base text-foreground leading-relaxed">
                {insight?.emotionalSummary}
              </p>
            </div>

            {/* Key Themes */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 sm:w-5 h-4 sm:h-5 text-primary" />
                <h3 className="font-semibold text-sm sm:text-base text-foreground">Key Themes</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {insight?.keyThemes?.map((theme: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium"
                  >
                    {theme}
                  </span>
                ))}
              </div>
            </div>

            {/* Personalized Advice */}
            <div className="bg-card border border-border rounded-lg sm:rounded-2xl p-4 sm:p-6 space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 sm:w-5 h-4 sm:h-5 text-accent" />
                <h3 className="font-semibold text-sm sm:text-base text-foreground">Suggestion</h3>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {insight?.advice}
              </p>
            </div>

            {/* Recommendation */}
            <div className="bg-secondary/10 border border-secondary/30 rounded-lg sm:rounded-2xl p-4 sm:p-6 space-y-2 sm:space-y-3">
              <h3 className="font-semibold text-sm sm:text-base text-foreground">Today's Recommendation</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {insight?.recommendation}
              </p>
            </div>

            {/* Positive Note */}
            <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg sm:rounded-2xl p-4 sm:p-6 space-y-2">
              <p className="text-xs sm:text-sm font-medium text-green-700 dark:text-green-300">
                ✨ {insight?.positiveNote}
              </p>
            </div>
          </>
        )}
      </div>

      {/* Back button */}
      <div className="px-4 sm:px-6 pb-6 sm:pb-8">
        <Button
          onClick={onBack}
          className="w-full h-10 sm:h-12 bg-muted hover:bg-muted/80 text-foreground text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl transition-all"
        >
          Back to Home
        </Button>
      </div>
    </div>
  )
}
