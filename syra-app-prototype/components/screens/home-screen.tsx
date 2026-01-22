'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

interface HomeScreenProps {
  onStartJournal: () => void
  selectedMood: string
}

const moods = [
  { emoji: '😊', label: 'Happy', value: 'happy' },
  { emoji: '😐', label: 'Neutral', value: 'neutral' },
  { emoji: '😔', label: 'Sad', value: 'sad' },
  { emoji: '😡', label: 'Angry', value: 'angry' },
  { emoji: '😴', label: 'Tired', value: 'tired' },
]

export default function HomeScreen({ onStartJournal, selectedMood }: HomeScreenProps) {
  const [currentMood, setCurrentMood] = useState<string>('')
  const userName = typeof window !== 'undefined' ? localStorage.getItem('userName') || 'Friend' : 'Friend'

  return (
    <div className="flex-1 flex flex-col w-full h-full overflow-y-auto pb-20">
      {/* Header */}
      <div className="px-4 sm:px-6 pt-6 sm:pt-8 pb-4 sm:pb-6 space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Hi, {userName} 👋
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          How are you feeling today?
        </p>
      </div>

      {/* Mood Selector */}
      <div className="px-4 sm:px-6 pb-6 sm:pb-8">
        <div className="flex justify-between gap-2 sm:gap-3">
          {moods.map(mood => (
            <button
              key={mood.value}
              onClick={() => setCurrentMood(mood.value)}
              className={`flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-300 flex-1 ${
                currentMood === mood.value
                  ? 'bg-primary/20 ring-2 ring-primary scale-105'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              <span className="text-2xl sm:text-3xl">{mood.emoji}</span>
              <span className="text-xs font-medium text-foreground text-center line-clamp-1">{mood.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Weekly Insight Card */}
      <div className="px-4 sm:px-6 pb-6 sm:pb-8">
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-lg sm:text-2xl">📊</span>
            <h3 className="font-semibold text-sm sm:text-base text-foreground">Your Weekly Insight</h3>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            You felt <span className="font-medium text-foreground">calm</span> most of this week 🌿. Keep up with your daily reflections to better understand your patterns.
          </p>
        </div>
      </div>

      {/* Quick stats */}
      <div className="px-4 sm:px-6 pb-6 sm:pb-8 grid grid-cols-2 gap-3 sm:gap-4">
        <div className="bg-card border border-border rounded-lg sm:rounded-xl p-3 sm:p-4 text-center space-y-1.5">
          <p className="text-xl sm:text-2xl font-bold text-primary">7</p>
          <p className="text-xs text-muted-foreground">Entries This Week</p>
        </div>
        <div className="bg-card border border-border rounded-lg sm:rounded-xl p-3 sm:p-4 text-center space-y-1.5">
          <p className="text-xl sm:text-2xl font-bold text-accent">24</p>
          <p className="text-xs text-muted-foreground">Days Streak</p>
        </div>
      </div>

      {/* Start Journal Button */}
      <div className="px-4 sm:px-6 pb-6 sm:pb-8 mt-auto">
        <Button
          onClick={onStartJournal}
          className="w-full h-10 sm:h-12 bg-primary hover:bg-primary/90 text-primary-foreground text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
        >
          <Plus className="w-4 sm:w-5 h-4 sm:h-5" />
          Write Journal
        </Button>
      </div>
    </div>
  )
}
