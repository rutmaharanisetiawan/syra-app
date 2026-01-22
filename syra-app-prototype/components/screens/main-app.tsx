'use client'

import { useState } from 'react'
import { Home, BookOpen, Sparkles, User } from 'lucide-react'
import HomeScreen from '@/components/screens/home-screen'
import JournalScreen from '@/components/screens/journal-screen'
import InsightScreen from '@/components/screens/insight-screen'
import ProfileScreen from '@/components/screens/profile-screen'

type Screen = 'home' | 'journal' | 'insight' | 'profile'

interface MainAppProps {
  onLogout: () => void
}

export default function MainApp({ onLogout }: MainAppProps) {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home')
  const [selectedMood, setSelectedMood] = useState('')
  const [journalEntry, setJournalEntry] = useState('')

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onStartJournal={() => setCurrentScreen('journal')} selectedMood={selectedMood} />
      case 'journal':
        return <JournalScreen onAnalyze={() => setCurrentScreen('insight')} />
      case 'insight':
        return <InsightScreen onBack={() => setCurrentScreen('home')} />
      case 'profile':
        return <ProfileScreen onLogout={onLogout} />
      default:
        return <HomeScreen onStartJournal={() => setCurrentScreen('journal')} selectedMood={selectedMood} />
    }
  }

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'journal', label: 'Journal', icon: BookOpen },
    { id: 'insight', label: 'Insight', icon: Sparkles },
    { id: 'profile', label: 'Profile', icon: User },
  ]

  return (
    <div className="flex-1 flex flex-col w-full h-full bg-background">
      {/* Screen content */}
      <div className="flex-1 overflow-y-auto">
        {renderScreen()}
      </div>

      {/* Bottom Navigation */}
      <nav className="border-t border-border bg-card/50 backdrop-blur-sm sticky bottom-0">
        <div className="flex items-center justify-around">
          {navItems.map(item => {
            const Icon = item.icon
            const isActive = currentScreen === item.id
            return (
              <button
                key={item.id}
                onClick={() => setCurrentScreen(item.id as Screen)}
                className={`flex-1 flex flex-col items-center justify-center py-3 sm:py-4 gap-0.5 sm:gap-1 transition-all duration-200 ${
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="w-5 sm:w-6 h-5 sm:h-6" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
