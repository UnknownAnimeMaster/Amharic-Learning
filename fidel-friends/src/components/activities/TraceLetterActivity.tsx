// Trace Letter Activity - practice writing the letter
'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Letter } from '@/types';
import { Eraser, RotateCcw } from 'lucide-react';

interface TraceLetterActivityProps {
  letter: Letter;
  guideOpacity?: number;
  strokeWidth?: number;
  onComplete: () => void;
}

export const TraceLetterActivity = ({
  letter,
  guideOpacity = 0.3,
  strokeWidth = 8,
  onComplete,
}: TraceLetterActivityProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [lastPos, setLastPos] = useState<{ x: number; y: number } | null>(null);

  // Setup canvas on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match display size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Set stroke style
    ctx.strokeStyle = '#f4c40f'; // Primary yellow color
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, [strokeWidth]);

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent): { x: number; y: number } | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    
    let clientX: number;
    let clientY: number;

    if ('touches' in e) {
      if (e.touches.length === 0) return null;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const coords = getCoordinates(e);
    if (!coords) return;

    setIsDrawing(true);
    setLastPos(coords);
    setHasDrawn(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !lastPos) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    const coords = getCoordinates(e);
    if (!coords) return;

    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();

    setLastPos(coords);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setLastPos(null);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const handleComplete = () => {
    if (hasDrawn) {
      onComplete();
    }
  };

  return (
    <Card variant="activity" className="max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Trace the letter
        </h2>
        <p className="text-lg text-gray-600">
          Follow the faded guide below
        </p>
      </div>

      {/* Tracing canvas */}
      <div className="tracing-container bg-white aspect-square max-w-md mx-auto mb-6 relative">
        {/* Guide letter (faded background) */}
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          style={{ opacity: guideOpacity }}
        >
          <span className="amharic-letter text-[200px] md:text-[280px] text-gray-300">
            {letter.character}
          </span>
        </div>

        {/* Drawing canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full touch-none cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>

      {/* Action buttons */}
      <div className="flex gap-4 mb-6">
        <Button
          variant="outline"
          onClick={clearCanvas}
          className="flex-1 flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          Clear
        </Button>
        
        <Button
          onClick={handleComplete}
          disabled={!hasDrawn}
          className="flex-1"
        >
          {hasDrawn ? "I'm Done! ✓" : 'Trace the letter first'}
        </Button>
      </div>

      {/* Tips */}
      <div className="bg-primary-50 rounded-2xl p-4 text-center">
        <p className="text-gray-700">
          💡 Tip: Use your finger or mouse to trace over the letter. 
          Go slowly and follow the shape!
        </p>
      </div>
    </Card>
  );
};
