// Multiple Choice Activity - pick the correct letter
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, XCircle } from 'lucide-react';
import { shuffleArray } from '@/lib/utils';

interface MultipleChoiceActivityProps {
  question: string;
  correctAnswer: string;
  options: string[];
  onNext: () => void;
  onAnswerCorrect: () => void;
  onAnswerIncorrect: () => void;
}

export const MultipleChoiceActivity = ({
  question,
  correctAnswer,
  options,
  onNext,
  onAnswerCorrect,
  onAnswerIncorrect,
}: MultipleChoiceActivityProps) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);
  
  // Shuffle options for variety
  const shuffledOptions = shuffleArray([...options]);

  const handleSelect = (option: string) => {
    if (selected) return; // Prevent multiple selections
    
    setSelected(option);
    
    if (option === correctAnswer) {
      setShowFeedback('correct');
      onAnswerCorrect();
    } else {
      setShowFeedback('incorrect');
      onAnswerIncorrect();
    }
  };

  const handleContinue = () => {
    setSelected(null);
    setShowFeedback(null);
    onNext();
  };

  return (
    <Card variant="activity" className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          {question}
        </h2>
      </div>

      {/* Options grid */}
      <div className="grid grid-cols-2 gap-4 md:gap-6 mb-8">
        {shuffledOptions.map((option, index) => {
          const isSelected = selected === option;
          const isCorrect = option === correctAnswer;
          
          let buttonStyle = 'bg-white border-4 border-primary-200 hover:border-primary-400 hover:bg-primary-50';
          
          if (isSelected && showFeedback === 'correct') {
            buttonStyle = 'bg-green-100 border-4 border-green-500';
          } else if (isSelected && showFeedback === 'incorrect') {
            buttonStyle = 'bg-red-100 border-4 border-red-500';
          } else if (selected && isCorrect && showFeedback === 'incorrect') {
            // Show correct answer when wrong one is selected
            buttonStyle = 'bg-green-100 border-4 border-green-500';
          }

          return (
            <motion.button
              key={option}
              className={`amharic-letter text-5xl md:text-6xl p-8 rounded-3xl transition-all ${buttonStyle}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={!selected ? { scale: 1.05 } : {}}
              whileTap={!selected ? { scale: 0.95 } : {}}
              onClick={() => handleSelect(option)}
              disabled={selected !== null}
            >
              {option}
              
              {/* Feedback icons */}
              <AnimatePresence>
                {isSelected && showFeedback === 'correct' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-2 right-2"
                  >
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </motion.div>
                )}
                {isSelected && showFeedback === 'incorrect' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-2 right-2"
                  >
                    <XCircle className="w-8 h-8 text-red-500" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      {/* Feedback message */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`text-center p-4 rounded-2xl mb-6 ${
              showFeedback === 'correct'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            <p className="text-xl font-bold">
              {showFeedback === 'correct' ? '✓ Correct! Great job!' : '✗ Not quite, try again!'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Continue button */}
      {showFeedback && (
        <Button onClick={handleContinue} className="w-full">
          {showFeedback === 'correct' ? 'Next →' : 'Try Again'}
        </Button>
      )}
    </Card>
  );
};
