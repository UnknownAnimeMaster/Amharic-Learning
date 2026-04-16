// Intro Card Activity - shows a new letter with examples
'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Letter } from '@/types';
import { Volume2 } from 'lucide-react';

interface IntroCardActivityProps {
  letter: Letter;
  onNext: () => void;
}

export const IntroCardActivity = ({ letter, onNext }: IntroCardActivityProps) => {
  const handlePlaySound = () => {
    // Placeholder for audio playback
    console.log(`Playing sound for letter ${letter.character}`);
  };

  return (
    <Card variant="activity" className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        {/* Giant letter display */}
        <div className="mb-8">
          <motion.div
            className="amharic-letter text-primary-500 cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePlaySound}
          >
            {letter.character}
          </motion.div>
          
          {/* Sound button */}
          <Button
            variant="outline"
            size="sm"
            className="mt-4 rounded-full w-12 h-12 p-0 flex items-center justify-center"
            onClick={handlePlaySound}
          >
            <Volume2 className="w-6 h-6" />
          </Button>
        </div>

        {/* Letter name and sound hint */}
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {letter.specialName || letter.name}
        </h2>
        <p className="text-xl text-gray-600 mb-4">
          Sounds like: <span className="font-bold text-primary-600">{letter.soundHint}</span>
        </p>

        {/* Kid-friendly explanation */}
        <p className="text-lg text-gray-700 mb-8 bg-primary-50 rounded-2xl p-4">
          {letter.kidExplanation}
        </p>

        {/* Example words */}
        {letter.exampleWords.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-700 mb-4">Example Words:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {letter.exampleWords.map((word, index) => (
                <motion.div
                  key={index}
                  className="bg-white border-2 border-primary-200 rounded-2xl p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <p className="amharic-letter text-4xl text-primary-600 mb-2">
                    {word.amharic}
                  </p>
                  <p className="text-gray-600 font-bold">{word.english}</p>
                  {word.transliteration && (
                    <p className="text-sm text-gray-500 italic">{word.transliteration}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Continue button */}
        <Button onClick={onNext} className="w-full mt-4">
          Next →
        </Button>
      </motion.div>
    </Card>
  );
};
