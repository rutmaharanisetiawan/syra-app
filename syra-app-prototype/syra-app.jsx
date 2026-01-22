'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight, ArrowLeft, Plus, Sparkles, Save, TrendingUp, Lightbulb, Settings, BookOpen, Zap, LogOut, Home, BookMarked, Zap as ZapIcon, User } from 'lucide-react';

// ============ SPLASH SCREEN ============
const SplashScreen = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-primary/10 via-background to-accent/10 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 sm:top-20 right-5 sm:right-10 w-40 sm:w-64 h-40 sm:h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 sm:bottom-20 left-5 sm:left-10 w-32 sm:w-48 h-32 sm:h-48 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-3 sm:gap-4 animate-fade-in px-4">
        <div className="text-5xl sm:text-6xl font-bold text-primary mb-2 sm:mb-4 animate-bounce" style={{ animationDuration: '2s' }}>
          ✨
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight text-balance text-center">
          SYRA
        </h1>
        <p className="text-xs sm:text-sm font-medium text-muted-foreground mt-1 sm:mt-2 text-center text-balance">
          Smartly Reflect, Live Better
        </p>
        <div className="mt-8 sm:mt-12 flex gap-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </div>
  );
};

// ============ ONBOARDING SCREEN ============
const OnboardingScreen = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      emoji: '📝',
      title: 'Understand Yourself Better',
      description: 'Reflect on your daily thoughts and emotions with SYRA.',
      color: 'from-blue-500/10 to-blue-400/10',
    },
    {
      emoji: '✍️',
      title: 'Journal Made Simple',
      description: 'Easy and beautiful interface for your journaling journey.',
      color: 'from-purple-500/10 to-purple-400/10',
    },
    {
      emoji: '🤖',
      title: 'AI That Understands You',
      description: 'Get personalized insights powered by advanced AI technology.',
      color: 'from-pink-500/10 to-pink-400/10',
    },
  ];

  const slide = slides[currentSlide];
  const handleNext = () => {
    if (currentSlide === slides.length - 1) {
      onComplete();
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handleSkip = () => onComplete();

  return (
    <div className="flex-1 flex flex-col w-full h-full bg-background">
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

      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 gap-6 sm:gap-8">
        <div className={`absolute inset-0 bg-gradient-to-br ${slide.color} pointer-events-none`} />
        <div className="relative text-5xl sm:text-7xl animate-bounce mb-2 sm:mb-4" style={{ animationDuration: '2s' }}>
          {slide.emoji}
        </div>
        <div className="relative z-10 text-center space-y-3 sm:space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-balance">
            {slide.title}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground text-balance leading-relaxed">
            {slide.description}
          </p>
        </div>
      </div>

      <div className="px-4 sm:px-6 pb-6 sm:pb-8 pt-3 sm:pt-4">
        <button
          onClick={handleNext}
          className="w-full h-10 sm:h-12 bg-primary hover:bg-primary/90 text-primary-foreground text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
        >
          {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
          <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5" />
        </button>
      </div>
    </div>
  );
};

// ============ AUTH SCREEN ============
const AuthScreen = ({ onLogin }) => {
  const [mode, setMode] = useState('login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isFormValid = mode === 'login'
    ? formData.email && formData.password
    : formData.name && formData.email && formData.password && formData.password === formData.confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsLoading(true);
    setTimeout(() => {
      onLogin(formData.name || formData.email.split('@')[0]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col w-full h-full bg-background overflow-y-auto">
      <div className="p-4 sm:p-6 pb-3 sm:pb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1 sm:mb-2">Welcome to SYRA</h1>
        <p className="text-xs sm:text-sm text-muted-foreground">Start your journey of self-discovery</p>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col px-4 sm:px-6 gap-4 sm:gap-6">
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

        <div className="space-y-1.5 sm:space-y-2">
          <label className="text-xs sm:text-sm font-medium text-foreground">Email</label>
          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full h-10 sm:h-12 px-3 sm:px-4 text-sm sm:text-base rounded-lg sm:rounded-xl bg-muted border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>

        <div className="space-y-1.5 sm:space-y-2">
          <label className="text-xs sm:text-sm font-medium text-foreground">Password</label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full h-10 sm:h-12 px-3 sm:px-4 text-sm sm:text-base rounded-lg sm:rounded-xl bg-muted border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>

        {mode === 'register' && (
          <div className="space-y-1.5 sm:space-y-2">
            <label className="text-xs sm:text-sm font-medium text-foreground">Confirm Password</label>
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

        {mode === 'register' && formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
          <div className="text-xs sm:text-sm text-destructive">Passwords do not match</div>
        )}

        <button
          type="submit"
          disabled={!isFormValid || isLoading}
          className="w-full h-10 sm:h-12 bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl transition-all mt-2 sm:mt-4"
        >
          {isLoading ? 'Loading...' : mode === 'login' ? 'Login' : 'Create Account'}
        </button>
      </form>

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
  );
};

// ============ HOME SCREEN ============
const HomeScreen = ({ userName, onStartJournal }) => {
  const [currentMood, setCurrentMood] = useState('😊');

  const moods = [
    { emoji: '😊', label: 'Happy', value: 'happy' },
    { emoji: '😌', label: 'Calm', value: 'calm' },
    { emoji: '😴', label: 'Tired', value: 'tired' },
    { emoji: '😔', label: 'Sad', value: 'sad' },
    { emoji: '😤', label: 'Angry', value: 'angry' },
  ];

  return (
    <div className="flex-1 flex flex-col w-full h-full overflow-y-auto pb-20">
      <div className="px-4 sm:px-6 pt-6 sm:pt-8 pb-4 sm:pb-6 space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Hi, {userName} 👋
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          How are you feeling today?
        </p>
      </div>

      <div className="px-4 sm:px-6 pb-6 sm:pb-8">
        <div className="flex justify-between gap-2 sm:gap-3">
          {moods.map(mood => (
            <button
              key={mood.value}
              onClick={() => setCurrentMood(mood.emoji)}
              className={`flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-300 flex-1 ${
                currentMood === mood.emoji
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

      <div className="px-4 sm:px-6 pb-6 sm:pb-8 mt-auto">
        <button
          onClick={onStartJournal}
          className="w-full h-10 sm:h-12 bg-primary hover:bg-primary/90 text-primary-foreground text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
        >
          <Plus className="w-4 sm:w-5 h-4 sm:h-5" />
          Write Journal
        </button>
      </div>
    </div>
  );
};

// ============ JOURNAL SCREEN ============
const JournalScreen = ({ onBack, onAnalyze }) => {
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('😊');
  const [isSaving, setIsSaving] = useState(false);

  const moods = ['😊', '😌', '😴', '😔', '😤'];

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      alert('Journal saved successfully!');
      setIsSaving(false);
      setContent('');
    }, 1000);
  };

  const handleAnalyze = () => {
    if (content.trim()) {
      onAnalyze();
    }
  };

  return (
    <div className="flex-1 flex flex-col w-full h-full bg-background">
      <div className="flex items-center justify-between p-4 sm:p-6 pb-3 sm:pb-4 border-b border-border">
        <div className="flex items-center gap-2 sm:gap-3">
          <button onClick={onBack} className="text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft className="w-5 sm:w-6 h-5 sm:h-6" />
          </button>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-foreground">Today's Entry</h1>
            <p className="text-xs text-muted-foreground">{new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>

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

      <div className="flex-1 flex flex-col px-4 sm:px-6 py-3 sm:py-4 gap-3 sm:gap-4 min-h-0">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write what you feel today... No judgments, just flow..."
          className="flex-1 w-full px-3 sm:px-4 py-3 sm:py-4 rounded-lg sm:rounded-xl bg-muted border border-border text-sm sm:text-base text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />
        
        <div className="text-right text-xs text-muted-foreground">
          {content.length} characters
        </div>
      </div>

      <div className="px-4 sm:px-6 pb-6 sm:pb-8 space-y-2 sm:space-y-3">
        <button
          onClick={handleAnalyze}
          disabled={!content.trim() || isSaving}
          className="w-full h-10 sm:h-12 bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl flex items-center justify-center gap-2 transition-all"
        >
          <Sparkles className="w-4 sm:w-5 h-4 sm:h-5" />
          Analyze with AI
        </button>
        
        <button
          onClick={handleSave}
          disabled={!content.trim() || isSaving}
          className="w-full h-10 sm:h-12 border border-border text-foreground text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl flex items-center justify-center gap-2 hover:bg-muted transition-all bg-transparent"
        >
          <Save className="w-4 sm:w-5 h-4 sm:h-5" />
          {isSaving ? 'Saving...' : 'Save Journal'}
        </button>
      </div>
    </div>
  );
};

// ============ INSIGHT SCREEN ============
const InsightScreen = ({ onBack }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [insight] = useState({
    emotionalSummary: 'Today you expressed feelings of reflection and contemplation. There\'s a sense of seeking clarity in your life.',
    keyThemes: ['Growth', 'Self-Discovery', 'Gratitude', 'Hope'],
    advice: 'Your writing shows introspection. Consider journaling more about what specifically you\'re grateful for to boost your mood.',
    recommendation: 'Try a 10-minute meditation or take a walk in nature to complement your reflective mood.',
    positiveNote: 'You\'re making progress in understanding yourself better each day!',
  });

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  return (
    <div className="flex-1 flex flex-col w-full h-full bg-background">
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

      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6 pb-20">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center gap-4 py-12">
            <div className="w-10 sm:w-12 h-10 sm:h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            <p className="text-muted-foreground text-xs sm:text-sm">Analyzing your entry...</p>
          </div>
        ) : (
          <>
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-lg sm:rounded-2xl p-4 sm:p-6 space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg bg-primary/20 flex items-center justify-center text-base sm:text-lg">
                  🎯
                </div>
                <h3 className="font-semibold text-sm sm:text-base text-foreground">Emotional Summary</h3>
              </div>
              <p className="text-sm sm:text-base text-foreground leading-relaxed">
                {insight.emotionalSummary}
              </p>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 sm:w-5 h-4 sm:h-5 text-primary" />
                <h3 className="font-semibold text-sm sm:text-base text-foreground">Key Themes</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {insight.keyThemes.map((theme, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium"
                  >
                    {theme}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg sm:rounded-2xl p-4 sm:p-6 space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 sm:w-5 h-4 sm:h-5 text-accent" />
                <h3 className="font-semibold text-sm sm:text-base text-foreground">Suggestion</h3>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {insight.advice}
              </p>
            </div>

            <div className="bg-secondary/10 border border-secondary/30 rounded-lg sm:rounded-2xl p-4 sm:p-6 space-y-2 sm:space-y-3">
              <h3 className="font-semibold text-sm sm:text-base text-foreground">Today's Recommendation</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {insight.recommendation}
              </p>
            </div>

            <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg sm:rounded-2xl p-4 sm:p-6 space-y-2">
              <p className="text-xs sm:text-sm font-medium text-green-700 dark:text-green-300">
                ✨ {insight.positiveNote}
              </p>
            </div>
          </>
        )}
      </div>

      <div className="px-4 sm:px-6 pb-6 sm:pb-8">
        <button
          onClick={onBack}
          className="w-full h-10 sm:h-12 bg-muted hover:bg-muted/80 text-foreground text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl transition-all"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

// ============ PROFILE SCREEN ============
const ProfileScreen = ({ userName, userEmail, onLogout }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const stats = [
    { icon: '📝', label: 'Total Journals', value: '24' },
    { icon: '🔥', label: 'Current Streak', value: '7 days' },
    { icon: '🌟', label: 'Insights Generated', value: '18' },
    { icon: '⏱️', label: 'Total Time', value: '8h 32m' },
  ];

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      onLogout();
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col w-full h-full bg-background overflow-y-auto pb-20">
      <div className="px-4 sm:px-6 pt-6 sm:pt-8 pb-4 sm:pb-6 space-y-3 sm:space-y-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Profile</h1>

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
          <ZapIcon className="w-4 sm:w-5 h-4 sm:h-5 text-primary" />
          <span className="text-sm sm:text-base font-medium text-foreground">Premium</span>
        </button>
      </div>

      <div className="px-4 sm:px-6 pb-6 sm:pb-8 space-y-2 sm:space-y-3">
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full h-10 sm:h-12 bg-destructive/20 hover:bg-destructive/30 text-destructive text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl flex items-center justify-center gap-2 transition-all"
        >
          <LogOut className="w-4 sm:w-5 h-4 sm:h-5" />
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </button>

        <p className="text-xs text-muted-foreground text-center">
          SYRA v1.0
        </p>
      </div>
    </div>
  );
};

// ============ MAIN APP ============
const SYRAApp = () => {
  const [appState, setAppState] = useState('splash'); // splash, onboarding, auth, main
  const [currentScreen, setCurrentScreen] = useState('home'); // home, journal, insight, profile
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setAppState('onboarding');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleOnboardingComplete = () => {
    setAppState('auth');
  };

  const handleLogin = (name) => {
    setUserName(name);
    setUserEmail('user@example.com');
    setAppState('main');
    setCurrentScreen('home');
  };

  const handleLogout = () => {
    setAppState('auth');
    setUserName('');
    setUserEmail('');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen userName={userName} onStartJournal={() => setCurrentScreen('journal')} />;
      case 'journal':
        return <JournalScreen onBack={() => setCurrentScreen('home')} onAnalyze={() => setCurrentScreen('insight')} />;
      case 'insight':
        return <InsightScreen onBack={() => setCurrentScreen('home')} />;
      case 'profile':
        return <ProfileScreen userName={userName} userEmail={userEmail} onLogout={handleLogout} />;
      default:
        return <HomeScreen userName={userName} onStartJournal={() => setCurrentScreen('journal')} />;
    }
  };

  if (appState === 'splash') return <SplashScreen />;
  if (appState === 'onboarding') return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  if (appState === 'auth') return <AuthScreen onLogin={handleLogin} />;

  return (
    <div className="flex-1 flex flex-col w-full h-full bg-background">
      <div className="flex-1 overflow-y-auto">
        {renderScreen()}
      </div>

      {appState === 'main' && (
        <nav className="border-t border-border bg-card/50 backdrop-blur-sm sticky bottom-0">
          <div className="flex items-center justify-around">
            {[
              { id: 'home', label: 'Home', icon: Home },
              { id: 'journal', label: 'Journal', icon: BookMarked },
              { id: 'insight', label: 'Insight', icon: ZapIcon },
              { id: 'profile', label: 'Profile', icon: User },
            ].map(item => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentScreen(item.id)}
                  className={`flex-1 flex flex-col items-center justify-center py-3 sm:py-4 gap-0.5 sm:gap-1 transition-all duration-200 ${
                    isActive
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="w-5 sm:w-6 h-5 sm:h-6" />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
};

export default SYRAApp;
