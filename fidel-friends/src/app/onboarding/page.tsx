// Onboarding flow for new users
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { en } from '@/data/copy/en';
import { LearnerProfile } from '@/types';
import { updateProfile } from '@/lib/storage';
import { generateId } from '@/lib/utils';

type OnboardingStep = 'name' | 'age' | 'goal' | 'language' | 'welcome';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<OnboardingStep>('name');
  const [profileData, setProfileData] = useState<Partial<LearnerProfile>>({
    name: '',
    ageRange: '7-8',
    learningGoal: '10min',
    languageMode: 'english-first',
  });

  const handleNameSubmit = () => {
    if (profileData.name?.trim()) {
      setStep('age');
    }
  };

  const handleAgeSelect = (ageRange: LearnerProfile['ageRange']) => {
    setProfileData({ ...profileData, ageRange });
    setStep('goal');
  };

  const handleGoalSelect = (learningGoal: LearnerProfile['learningGoal']) => {
    setProfileData({ ...profileData, learningGoal });
    setStep('language');
  };

  const handleLanguageSelect = (languageMode: LearnerProfile['languageMode']) => {
    setProfileData({ ...profileData, languageMode });
    setStep('welcome');
  };

  const handleFinish = () => {
    // Create complete profile
    const profile: LearnerProfile = {
      id: generateId(),
      name: profileData.name || 'Friend',
      ageRange: profileData.ageRange || '7-8',
      learningGoal: profileData.learningGoal || '10min',
      languageMode: profileData.languageMode || 'english-first',
      createdAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
    };

    // Save to localStorage
    updateProfile(profile);

    // Navigate to home
    router.push('/home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 via-white to-blue-50 flex items-center justify-center p-4">
      <Card className="max-w-lg w-full p-8 md:p-12">
        <AnimatePresence mode="wait">
          {step === 'name' && (
            <motion.div
              key="name"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                {en.onboarding.welcome}
              </h2>
              <p className="text-xl text-gray-600 mb-8 text-center">
                {en.onboarding.chooseName}
              </p>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                placeholder="Your name..."
                className="w-full text-2xl p-4 border-4 border-primary-200 rounded-2xl mb-6 focus:border-primary-500 focus:outline-none"
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
              />
              <Button onClick={handleNameSubmit} className="w-full">
                Next →
              </Button>
            </motion.div>
          )}

          {step === 'age' && (
            <motion.div
              key="age"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                {en.onboarding.chooseAge}
              </h2>
              <div className="space-y-4">
                <Button
                  variant={profileData.ageRange === '4-6' ? 'primary' : 'outline'}
                  onClick={() => handleAgeSelect('4-6')}
                  className="w-full text-xl py-6"
                >
                  {en.onboarding.ageRange4_6}
                </Button>
                <Button
                  variant={profileData.ageRange === '7-8' ? 'primary' : 'outline'}
                  onClick={() => handleAgeSelect('7-8')}
                  className="w-full text-xl py-6"
                >
                  {en.onboarding.ageRange7_8}
                </Button>
                <Button
                  variant={profileData.ageRange === '9-10' ? 'primary' : 'outline'}
                  onClick={() => handleAgeSelect('9-10')}
                  className="w-full text-xl py-6"
                >
                  {en.onboarding.ageRange9_10}
                </Button>
              </div>
            </motion.div>
          )}

          {step === 'goal' && (
            <motion.div
              key="goal"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                {en.onboarding.chooseGoal}
              </h2>
              <div className="space-y-4">
                <Button
                  variant={profileData.learningGoal === '5min' ? 'primary' : 'outline'}
                  onClick={() => handleGoalSelect('5min')}
                  className="w-full text-xl py-6"
                >
                  {en.onboarding.goal5min}
                </Button>
                <Button
                  variant={profileData.learningGoal === '10min' ? 'primary' : 'outline'}
                  onClick={() => handleGoalSelect('10min')}
                  className="w-full text-xl py-6"
                >
                  {en.onboarding.goal10min}
                </Button>
                <Button
                  variant={profileData.learningGoal === '15min' ? 'primary' : 'outline'}
                  onClick={() => handleGoalSelect('15min')}
                  className="w-full text-xl py-6"
                >
                  {en.onboarding.goal15min}
                </Button>
              </div>
            </motion.div>
          )}

          {step === 'language' && (
            <motion.div
              key="language"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                {en.onboarding.chooseLanguage}
              </h2>
              <div className="space-y-4">
                <Button
                  variant={profileData.languageMode === 'english-first' ? 'primary' : 'outline'}
                  onClick={() => handleLanguageSelect('english-first')}
                  className="w-full text-xl py-6"
                >
                  {en.onboarding.langEnglishFirst}
                </Button>
                <Button
                  variant={profileData.languageMode === 'amharic-first' ? 'primary' : 'outline'}
                  onClick={() => handleLanguageSelect('amharic-first')}
                  className="w-full text-xl py-6"
                >
                  {en.onboarding.langAmharicFirst}
                </Button>
              </div>
            </motion.div>
          )}

          {step === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="text-6xl mb-6">🎉</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {en.onboarding.welcomeCard.title}
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                {en.onboarding.welcomeCard.subtitle}
              </p>
              <Button onClick={handleFinish} className="w-full text-xl py-6">
                {en.onboarding.welcomeCard.startUnit1}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  );
}
