'use client'

import { useState, useEffect } from 'react'
import SplashScreen from '@/components/screens/splash-screen'
import OnboardingScreen from '@/components/screens/onboarding-screen'
import AuthScreen from '@/components/screens/auth-screen'
import MainApp from '@/components/screens/main-app'

type AppScreen = 'splash' | 'onboarding' | 'auth' | 'main'

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('splash')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check localStorage for user state
    const timer = setTimeout(() => {
      const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding')
      const isLoggedIn = localStorage.getItem('isLoggedIn')

      if (isLoggedIn === 'true') {
        setCurrentScreen('main')
      } else if (hasSeenOnboarding === 'true') {
        setCurrentScreen('auth')
      } else {
        setCurrentScreen('onboarding')
      }
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading && currentScreen === 'splash') {
    return <SplashScreen />
  }

  const handleOnboardingComplete = () => {
    localStorage.setItem('hasSeenOnboarding', 'true')
    setCurrentScreen('auth')
  }

  const handleAuthComplete = (name: string) => {
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('userName', name)
    setCurrentScreen('main')
  }

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userName')
    setCurrentScreen('auth')
  }

  return (
    <>
      {currentScreen === 'onboarding' && (
        <OnboardingScreen onComplete={handleOnboardingComplete} />
      )}
      {currentScreen === 'auth' && (
        <AuthScreen onComplete={handleAuthComplete} />
      )}
      {currentScreen === 'main' && (
        <MainApp onLogout={handleLogout} />
      )}
    </>
  )
}
