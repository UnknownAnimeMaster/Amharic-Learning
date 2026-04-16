// Home Dashboard - Main app screen after onboarding
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { StreakBadge } from '@/components/ui/StreakBadge';
import { XPBadge } from '@/components/ui/XPBadge';
import { en } from '@/data/copy/en';
import { units } from '@/data/curriculum';
import { getProgressState } from '@/lib/storage';
import { ProgressState } from '@/types';
import { BookOpen, Star, Trophy, Flame, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const [progress, setProgress] = useState<ProgressState | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load progress from localStorage
    const state = getProgressState();
    setProgress(state);
    setIsLoading(false);
  }, []);

  if (isLoading || !progress) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-bold text-gray-600">{en.common.loading}</div>
      </div>
    );
  }

  const profile = progress.profile;
  const currentUnit = units[0]; // Unit 1 for MVP
  const completedLessons = Object.keys(progress.completedLessons).length;
  const totalLessons = currentUnit.lessons.length;
  const lessonProgress = (completedLessons / totalLessons) * 100;

  // Get random motivational message
  const motivationalMessage = en.home.motivation[Math.floor(Math.random() * en.home.motivation.length)];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 via-white to-blue-50 pb-24">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
                <span className="amharic-letter text-lg text-white">ሀ</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">{en.appName}</h1>
                {profile && (
                  <p className="text-sm text-gray-600">
                    {en.home.greeting}, {profile.name}! 👋
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <StreakBadge streak={progress.currentStreak} />
              <XPBadge xp={progress.totalXP} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {/* Motivational Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary-400 to-primary-500 rounded-3xl p-6 text-white text-center"
        >
          <p className="text-2xl font-bold">{motivationalMessage}</p>
        </motion.div>

        {/* Today's Goal */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">{en.home.todayGoal}</h2>
            <span className="text-gray-600">{progress.dailyGoalProgress} / 10 min</span>
          </div>
          <ProgressBar progress={(progress.dailyGoalProgress / 10) * 100} showLabel={false} color="green" />
        </Card>

        {/* Continue Lesson */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Card className="p-6 cursor-pointer" onClick={() => router.push('/lesson/lesson-1-1')}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{en.home.continueLesson}</h3>
                  <p className="text-gray-600">{currentUnit.titleAmharic}</p>
                </div>
              </div>
              <ArrowRight className="w-8 h-8 text-primary-500" />
            </div>
          </Card>
        </motion.div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="secondary"
            onClick={() => router.push('/review')}
            className="py-6 flex flex-col gap-2 h-auto"
          >
            <Star className="w-8 h-8" />
            <span>{en.home.dailyReview}</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={() => router.push('/rewards')}
            className="py-6 flex flex-col gap-2 h-auto"
          >
            <Trophy className="w-8 h-8" />
            <span>{en.home.rewards}</span>
          </Button>
        </div>

        {/* Lesson Path Preview */}
        <Card className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            {en.lessonPath.unit} 1: {currentUnit.titleAmharic}
          </h3>
          <div className="space-y-4">
            {currentUnit.lessons.slice(0, 3).map((lesson, index) => {
              const isCompleted = progress.completedLessons[lesson.id]?.completed;
              return (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-4 p-4 rounded-2xl border-2 ${
                    isCompleted
                      ? 'bg-green-50 border-green-300'
                      : 'bg-white border-primary-200'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isCompleted
                        ? 'bg-accent-green text-white'
                        : 'bg-primary-500 text-white'
                    }`}
                  >
                    {isCompleted ? <Trophy className="w-6 h-6" /> : index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">{lesson.title}</p>
                    <p className="text-sm text-gray-600">{lesson.description}</p>
                  </div>
                  {isCompleted && (
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-yellow-600">
                        {progress.completedLessons[lesson.id]?.starsEarned}
                      </span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
          <Button
            variant="outline"
            onClick={() => router.push('/learn')}
            className="w-full mt-4"
          >
            View All Lessons →
          </Button>
        </Card>

        {/* Recently Learned Letters */}
        {completedLessons > 0 && (
          <Card className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">{en.home.recentLetters}</h3>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {['ሀ', 'ለ', 'ሐ', 'መ'].slice(0, completedLessons).map((letter, index) => (
                <motion.div
                  key={letter}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex-shrink-0 w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center"
                >
                  <span className="amharic-letter text-4xl text-primary-600">{letter}</span>
                </motion.div>
              ))}
            </div>
          </Card>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-pb">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-around py-3">
            <button
              onClick={() => router.push('/home')}
              className="flex flex-col items-center gap-1 text-primary-600"
            >
              <BookOpen className="w-6 h-6" />
              <span className="text-xs font-medium">{en.nav.home}</span>
            </button>
            <button
              onClick={() => router.push('/learn')}
              className="flex flex-col items-center gap-1 text-gray-500 hover:text-primary-600"
            >
              <Star className="w-6 h-6" />
              <span className="text-xs font-medium">{en.nav.learn}</span>
            </button>
            <button
              onClick={() => router.push('/review')}
              className="flex flex-col items-center gap-1 text-gray-500 hover:text-primary-600"
            >
              <Flame className="w-6 h-6" />
              <span className="text-xs font-medium">{en.nav.review}</span>
            </button>
            <button
              onClick={() => router.push('/rewards')}
              className="flex flex-col items-center gap-1 text-gray-500 hover:text-primary-600"
            >
              <Trophy className="w-6 h-6" />
              <span className="text-xs font-medium">{en.nav.rewards}</span>
            </button>
            <button
              onClick={() => router.push('/parent')}
              className="flex flex-col items-center gap-1 text-gray-500 hover:text-primary-600"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-xs font-medium">{en.nav.parent}</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
