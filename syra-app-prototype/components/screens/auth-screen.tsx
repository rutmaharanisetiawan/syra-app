'use client'

import React from "react"

import { useState } from 'react'
import { Mail, Lock, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AuthScreenProps {
  onComplete: (name: string) => void
}

type AuthMode = 'login' | 'register'

export default function AuthScreen({ onComplete }: AuthScreenProps) {
  const [mode, setMode] = useState<AuthMode>('login')
  const [isLoading, setIsLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    const userName = mode === 'register' ? formData.name : formData.email.split('@')[0]
    onComplete(userName)
  }

  const isFormValid = mode === 'login'
    ? formData.email && formData.password
    : formData.name && formData.email && formData.password && formData.password === formData.confirmPassword

  return (
    <div className="flex-1 flex flex-col w-full h-full bg-background overflow-y-auto">
      {/* Header */}
      <div className="p-4 sm:p-6 pb-3 sm:pb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1 sm:mb-2">Welcome to SYRA</h1>
        <p className="text-xs sm:text-sm text-muted-foreground">Start your journey of self-discovery</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col px-4 sm:px-6 gap-4 sm:gap-6">
        {/* Register name field */}
        {mode === 'register' && (
          <div className="space-y-1.5 sm:space-y-2">
            <label className="text-xs sm:text-sm font-medium text-foreground flex items-center gap-2">
              <User className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-primary" />
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Your full name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full h-10 sm:h-12 px-3 sm:px-4 text-sm sm:text-base rounded-lg sm:rounded-xl bg-muted border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
        )}

        {/* Email field */}
        <div className="space-y-1.5 sm:space-y-2">
          <label className="text-xs sm:text-sm font-medium text-foreground flex items-center gap-2">
            <Mail className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-primary" />
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full h-10 sm:h-12 px-3 sm:px-4 text-sm sm:text-base rounded-lg sm:rounded-xl bg-muted border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>

        {/* Password field */}
        <div className="space-y-1.5 sm:space-y-2">
          <label className="text-xs sm:text-sm font-medium text-foreground flex items-center gap-2">
            <Lock className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-primary" />
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full h-10 sm:h-12 px-3 sm:px-4 text-sm sm:text-base rounded-lg sm:rounded-xl bg-muted border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>

        {/* Confirm password field (register only) */}
        {mode === 'register' && (
          <div className="space-y-1.5 sm:space-y-2">
            <label className="text-xs sm:text-sm font-medium text-foreground flex items-center gap-2">
              <Lock className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-primary" />
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full h-10 sm:h-12 px-3 sm:px-4 text-sm sm:text-base rounded-lg sm:rounded-xl bg-muted border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
        )}

        {/* Error message */}
        {mode === 'register' && formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
          <div className="text-xs sm:text-sm text-destructive">Passwords do not match</div>
        )}

        {/* Submit button */}
        <Button
          type="submit"
          disabled={!isFormValid || isLoading}
          className="w-full h-10 sm:h-12 bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl transition-all mt-2 sm:mt-4"
        >
          {isLoading ? 'Loading...' : mode === 'login' ? 'Login' : 'Create Account'}
        </Button>
      </form>

      {/* Toggle mode */}
      <div className="px-4 sm:px-6 py-4 sm:py-6 text-center border-t border-border">
        <p className="text-xs sm:text-sm text-muted-foreground">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            type="button"
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className="font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            {mode === 'login' ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  )
}
