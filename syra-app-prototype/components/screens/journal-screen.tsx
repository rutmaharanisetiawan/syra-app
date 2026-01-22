'use client'

import { useState } from 'react'
import { ArrowLeft, Save, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface JournalScreenProps {
  onAnalyze: () => void
}

export default function JournalScreen({ onAnalyze }: JournalScreenProps) {
  const [content, setContent] = useState('')
  const [mood, setMood] = useState('😊')
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    if (!content.trim()) return
    
    setIsSaving(true)
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    localStorage.setItem('lastJournal', JSON.stringify({
      content,
      mood,
      date: new Date().toISOString(),
    }))
    
    setIsSaving(false)
  }

  const handleAnalyze = async () => {
    await handleSave()
    onAnalyze()
  }

  const moods = ['😊', '😐', '😔', '😡', '😴', '😨', '🤗', '😡']

  return (
    <div className="flex-1 flex flex-col w-full h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 sm:p-6 pb-3 sm:pb-4 border-b border-border">
        <div className="flex items-center gap-2 sm:gap-3">
          <button className="text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft className="w-5 sm:w-6 h-5 sm:h-6" />
          </button>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-foreground">Today's Entry</h1>
            <p className="text-xs text-muted-foreground">{new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Mood Selector */}
      <div className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 space-y-2 sm:space-y-3">
        <p className="text-xs sm:text-sm font-medium text-foreground">How are you feeling?</p>
        <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-2">
          {moods.map((m, idx) => (
            <button
              key={idx}
              onClick={() => setMood(m)}
              className={`flex-shrink-0 w-10 sm:w-12 h-10 sm:h-12 rounded-full transition-all duration-200 flex items-center justify-center text-base sm:text-lg ${
                mood === m
                  ? 'bg-primary/20 ring-2 ring-primary scale-105'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Journal textarea */}
      <div className="flex-1 flex flex-col px-4 sm:px-6 py-3 sm:py-4 gap-3 sm:gap-4 min-h-0">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write what you feel today... No judgments, just flow..."
          className="flex-1 w-full px-3 sm:px-4 py-3 sm:py-4 rounded-lg sm:rounded-xl bg-muted border border-border text-sm sm:text-base text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />
        
        {/* Character count */}
        <div className="text-right text-xs text-muted-foreground">
          {content.length} characters
        </div>
      </div>

      {/* Action buttons */}
      <div className="px-4 sm:px-6 pb-6 sm:pb-8 space-y-2 sm:space-y-3">
        <Button
          onClick={handleAnalyze}
          disabled={!content.trim() || isSaving}
          className="w-full h-10 sm:h-12 bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl flex items-center justify-center gap-2 transition-all"
        >
          <Sparkles className="w-4 sm:w-5 h-4 sm:h-5" />
          Analyze with AI
        </Button>
        
        <Button
          onClick={handleSave}
          disabled={!content.trim() || isSaving}
          variant="outline"
          className="w-full h-10 sm:h-12 border border-border text-foreground text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl flex items-center justify-center gap-2 hover:bg-muted transition-all bg-transparent"
        >
          <Save className="w-4 sm:w-5 h-4 sm:h-5" />
          {isSaving ? 'Saving...' : 'Save Journal'}
        </Button>
      </div>
    </div>
  )
}
