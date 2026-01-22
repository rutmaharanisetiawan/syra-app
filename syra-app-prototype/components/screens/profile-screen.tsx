'use client'

import { useState } from 'react'
import { LogOut, Settings, BookOpen, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ProfileScreenProps {
  onLogout: () => void
}

export default function ProfileScreen({ onLogout }: ProfileScreenProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const userName = typeof window !== 'undefined' ? localStorage.getItem('userName') || 'User' : 'User'
  const userEmail = typeof window !== 'undefined' ? localStorage.getItem('userEmail') || 'user@email.com' : 'user@email.com'

  const stats = [
    { label: 'Total Journals', value: '42', icon: '📔' },
    { label: 'Streak Days', value: '24', icon: '🔥' },
    { label: 'Insights', value: '156', icon: '✨' },
    { label: 'Growth %', value: '87%', icon: '📈' },
  ]

  const handleLogout = async () => {
    setIsLoggingOut(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    onLogout()
  }

  return (
    <div className="flex-1 flex flex-col w-full h-full bg-background overflow-y-auto pb-20">
      {/* Header */}
      <div className="px-4 sm:px-6 pt-6 sm:pt-8 pb-4 sm:pb-6 space-y-3 sm:space-y-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Profile</h1>

        {/* User info card */}
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-lg sm:rounded-2xl p-4 sm:p-6 space-y-2 sm:space-y-3">
          <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-primary/20 flex items-center justify-center text-2xl sm:text-3xl">
            👤
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-foreground">{userName}</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">{userEmail}</p>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="px-4 sm:px-6 pb-6 sm:pb-8">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-card border border-border rounded-lg sm:rounded-xl p-3 sm:p-4 text-center space-y-1.5 sm:space-y-2">
              <p className="text-lg sm:text-2xl">{stat.icon}</p>
              <p className="text-lg sm:text-2xl font-bold text-primary">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Menu items */}
      <div className="flex-1 px-4 sm:px-6 space-y-1.5 sm:space-y-2">
        <button className="w-full flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-muted transition-all">
          <Settings className="w-4 sm:w-5 h-4 sm:h-5 text-primary" />
          <span className="text-sm sm:text-base font-medium text-foreground">Settings</span>
        </button>

        <button className="w-full flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-muted transition-all">
          <BookOpen className="w-4 sm:w-5 h-4 sm:h-5 text-primary" />
          <span className="text-sm sm:text-base font-medium text-foreground">My Journals</span>
        </button>

        <button className="w-full flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-muted transition-all">
          <Zap className="w-4 sm:w-5 h-4 sm:h-5 text-primary" />
          <span className="text-sm sm:text-base font-medium text-foreground">Premium</span>
        </button>
      </div>

      {/* Logout button */}
      <div className="px-4 sm:px-6 pb-6 sm:pb-8 space-y-2 sm:space-y-3">
        <Button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full h-10 sm:h-12 bg-destructive/20 hover:bg-destructive/30 text-destructive text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl flex items-center justify-center gap-2 transition-all"
        >
          <LogOut className="w-4 sm:w-5 h-4 sm:h-5" />
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          SYRA v1.0
        </p>
      </div>
    </div>
  )
}
