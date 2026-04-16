// Word Find Activity - find letter in words
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { VocabularyWord } from '@/types';

interface WordFindActivityProps {
  prompt: string;
  targetLetter: string; // Letter ID or character
  words: VocabularyWord[];
  onNext: () => void;
  onAnswerCorrect: () => void;
  onAnswerIncorrect: () => void;
}

export const WordFindActivity = ({
  prompt,
  targetLetter,
  words,
  onNext,
  onAnswerCorrect,
  onAnswerIncorrect,
}: WordFindActivityProps) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const containsTargetLetter = (word: string): boolean => {
    return word.includes(targetLetter);
  };

  const handleSelect = (wordAmharic: string) => {
    if (selected.includes(wordAmharic)) {
      setSelected(selected.filter((w) => w !== wordAmharic));
    } else {
      setSelected([...selected, wordAmharic]);
    }
  };

  const handleSubmit = () => {
    const correctWords = words.filter((w) => containsTargetLetter(w.amharic));
    const selectedCorrect = selected.every((s) =>
      containsTargetLetter(s)
    );
    const allCorrectSelected =
      selected.length === correctWords.length && selectedCorrect;

    if (allCorrectSelected) {
      setShowFeedback('correct');
      onAnswerCorrect();
    } else {
      setShowFeedback('incorrect');
      onAnswerIncorrect();
    }
  };

  const handleContinue = () => {
    setSelected([]);
    setShowFeedback(null);
    onNext();
  };

  return (
    <Card variant="activity" className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          {prompt}
        </h2>
        <p className="text-lg text-gray-600">
          Tap all words that contain: <span className="amharic-letter text-4xl text-primary-500">{targetLetter}</span>
        </p>
      </div>

      {/* Words grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {words.map((word, index) => {
          const isSelected = selected.includes(word.amharic);
          const isCorrect = containsTargetLetter(word.amharic);
          
          let buttonStyle = 'bg-white border-4 border-primary-200 hover:border-primary-400';
          
          if (showFeedback === 'correct' && isCorrect) {
            buttonStyle = 'bg-green-100 border-4 border-green-500';
          } else if (showFeedback === 'incorrect' && isSelected && !isCorrect) {
            buttonStyle = 'bg-red-100 border-4 border-red-500';
          } else if (isSelected) {
            buttonStyle = 'bg-primary-100 border-4 border-primary-500';
          }

          return (
            <motion.button
              key={word.amharic}
              className={`p-6 rounded-2xl transition-all ${buttonStyle}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={!showFeedback ? { scale: 1.02 } : {}}
              whileTap={!showFeedback ? { scale: 0.98 } : {}}
              onClick={() => handleSelect(word.amharic)}
              disabled={showFeedback !== null}
            >
              <p className="amharic-letter text-4xl text-primary-600 mb-2">
                {word.amharic}
              </p>
              <p className="text-gray-600 font-bold">{word.english}</p>
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
              {showFeedback === 'correct' 
                ? '✓ Perfect! You found them all!' 
                : '✗ Keep looking! Some are missing.'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action buttons */}
      {!showFeedback ? (
        <Button 
          onClick={handleSubmit} 
          className="w-full"
          disabled={selected.length === 0}
        >
          Check Answer
        </Button>
      ) : (
        <Button onClick={handleContinue} className="w-full">
          Next →
        </Button>
      )}
    </Card>
  );
};
