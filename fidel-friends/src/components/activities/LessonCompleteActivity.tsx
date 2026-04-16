// Lesson Complete Activity - celebration screen
'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Star, Trophy, Sparkles } from 'lucide-react';

interface LessonCompleteActivityProps {
  xpReward: number;
  starsEarned: number;
  celebrationMessage: string;
  onNext: () => void;
}

export const LessonCompleteActivity = ({
  xpReward,
  starsEarned,
  celebrationMessage,
  onNext,
}: LessonCompleteActivityProps) => {
  return (
    <Card variant="reward" className="max-w-2xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Celebration icon */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mb-6"
        >
          <Trophy className="w-32 h-32 mx-auto text-yellow-500" />
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
        >
          Lesson Complete! 🎉
        </motion.h2>

        {/* Celebration message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-2xl text-primary-600 font-bold mb-8"
        >
          {celebrationMessage}
        </motion.p>

        {/* Stars earned */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center gap-4 mb-8"
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ 
                rotate: 0, 
                opacity: 1,
                scale: i < starsEarned ? 1 : 0.7
              }}
              transition={{ 
                delay: 1 + i * 0.2,
                type: 'spring',
                stiffness: 200
              }}
            >
              <Star
                className={`w-16 h-16 ${
                  i < starsEarned
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'fill-gray-300 text-gray-300'
                }`}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* XP earned */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="bg-white rounded-2xl p-6 mb-8 inline-block"
        >
          <div className="flex items-center gap-4">
            <Sparkles className="w-12 h-12 text-yellow-500" />
            <div>
              <p className="text-gray-600 font-bold">XP Earned</p>
              <p className="text-4xl font-bold text-yellow-500">+{xpReward}</p>
            </div>
          </div>
        </motion.div>

        {/* Confetti effect (simplified) */}
        <div className="relative h-20 overflow-hidden mb-6">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="confetti absolute w-3 h-3 rounded-full"
              style={{
                backgroundColor: ['#f4c40f', '#22c55e', '#3b82f6', '#ef4444', '#a855f7'][
                  i % 5
                ],
                left: `${Math.random() * 100}%`,
              }}
              initial={{ y: -100, opacity: 1 }}
              animate={{ y: 100, opacity: 0 }}
              transition={{
                duration: 2 + Math.random() * 2,
                delay: Math.random() * 0.5,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}
        </div>

        {/* Continue button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          <Button onClick={onNext} className="w-full text-xl py-6">
            Continue →
          </Button>
        </motion.div>
      </motion.div>
    </Card>
  );
};
