// Fidel Friends - Main Landing Page
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Star, BookOpen, Calendar, Trophy } from 'lucide-react';
import { en } from '@/data/copy/en';

export default function LandingPage() {
  const router = useRouter();
  const [isDemoMode] = useState(false);

  const handleStartLearning = () => {
    router.push('/onboarding');
  };

  const handleTryDemo = () => {
    // Demo mode would skip onboarding and go to home with sample data
    router.push('/home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 via-white to-blue-50">
      {/* Header */}
      <header className="py-6 px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 bg-primary-500 rounded-2xl flex items-center justify-center">
              <span className="amharic-letter text-2xl text-white">ሀ</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{en.appName}</h1>
              <p className="text-sm text-gray-600">{en.tagline}</p>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="px-4 md:px-8 pb-16">
        <div className="max-w-6xl mx-auto">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12 md:py-20"
          >
            {/* Hero illustration placeholder */}
            <div className="mb-8">
              <div className="inline-block bg-gradient-to-br from-primary-400 to-primary-600 rounded-full p-8 shadow-2xl">
                <BookOpen className="w-24 h-24 md:w-32 md:h-32 text-white" />
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 max-w-4xl mx-auto">
              {en.landing.heroTitle}
            </h2>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Perfect for Ethiopian kids in America learning their heritage language
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button onClick={handleStartLearning} className="text-xl px-12 py-6">
                {en.landing.startLearning}
              </Button>
              <Button 
                variant="outline" 
                onClick={handleTryDemo}
                className="text-xl px-12 py-6"
              >
                {en.landing.tryDemo}
              </Button>
            </div>
          </motion.section>

          {/* Feature Cards */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            <Card className="text-center p-8">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {en.landing.features.learnLetters}
              </h3>
              <p className="text-gray-600">
                Learn Amharic letters one by one with fun activities
              </p>
            </Card>

            <Card className="text-center p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {en.landing.features.practiceDaily}
              </h3>
              <p className="text-gray-600">
                Build a daily habit with short, engaging practice sessions
              </p>
            </Card>

            <Card className="text-center p-8">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {en.landing.features.earnStars}
              </h3>
              <p className="text-gray-600">
                Earn stars and badges as you progress through lessons
              </p>
            </Card>
          </motion.section>

          {/* Why Section */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mb-16"
          >
            <Card className="p-8 md:p-12">
              <h3 className="text-3xl font-bold text-gray-800 text-center mb-8">
                {en.landing.whyTitle}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {en.landing.whyPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-10 h-10 bg-accent-green rounded-full flex items-center justify-center flex-shrink-0">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-lg text-gray-700 font-medium">{point}</p>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.section>

          {/* Footer */}
          <footer className="text-center text-gray-500 py-8">
            <p>Made with ❤️ for Ethiopian families everywhere</p>
            <p className="text-sm mt-2">Version 1.0.0 MVP</p>
          </footer>
        </div>
      </main>
    </div>
  );
}
