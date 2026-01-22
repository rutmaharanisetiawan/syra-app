'use client'

import { useEffect, useState } from 'react'

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="flex-1 flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-primary/10 via-background to-accent/10 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 sm:top-20 right-5 sm:right-10 w-40 sm:w-64 h-40 sm:h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 sm:bottom-20 left-5 sm:left-10 w-32 sm:w-48 h-32 sm:h-48 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Logo and text */}
      <div className="relative z-10 flex flex-col items-center gap-3 sm:gap-4 animate-fade-in px-4">
        {/* SYRA Logo */}
        <div className="text-5xl sm:text-6xl font-bold text-primary mb-2 sm:mb-4 animate-bounce" style={{ animationDuration: '2s' }}>
          ✨
        </div>

        {/* App Name */}
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight text-balance text-center">
          SYRA
        </h1>

        {/* Tagline */}
        <p className="text-xs sm:text-sm font-medium text-muted-foreground mt-1 sm:mt-2 text-center text-balance">
          Smartly Reflect, Live Better
        </p>

        {/* Loading indicator */}
        <div className="mt-8 sm:mt-12 flex gap-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </div>
  )
}
