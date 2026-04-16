"use client";

import { useRef, useState } from "react";
import { TraceLetterActivity as TraceType } from "@/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function getPoint(event: React.PointerEvent<HTMLCanvasElement>, canvas: HTMLCanvasElement) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

export function TraceLetterActivity({
  activity,
  onNext,
  onAnswer
}: {
  activity: TraceType;
  onNext: () => void;
  onAnswer: (correct: boolean) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  function startDrawing(event: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const point = getPoint(event, canvas);
    ctx.beginPath();
    ctx.moveTo(point.x, point.y);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 10;
    ctx.strokeStyle = "#2B2D42";
    setIsDrawing(true);
    setHasDrawn(true);
    onAnswer(true);
  }

  function draw(event: React.PointerEvent<HTMLCanvasElement>) {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const point = getPoint(event, canvas);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
  }

  function stopDrawing() {
    setIsDrawing(false);
  }

  function reset() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  }

  return (
    <Card className="mx-auto max-w-4xl">
      <h2 className="text-center text-3xl font-black text-brand-ink">{activity.instruction}</h2>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        <div className="rounded-4xl bg-brand-cream p-6 text-center">
          <p className="text-sm font-semibold text-slate-500">Guide letter</p>
          <div className="mt-4 text-[160px] font-black leading-none text-brand-amharic/30">
            {activity.guideLetter}
          </div>
          <p className="text-sm text-slate-600">
            Practice mode: trace on top. You can also free-draw by using the blank space.
          </p>
        </div>

        <div className="rounded-4xl border-2 border-dashed border-brand-sky bg-white p-4">
          <canvas
            ref={canvasRef}
            width={800}
            height={500}
            className="h-[360px] w-full rounded-3xl bg-white touch-none"
            onPointerDown={startDrawing}
            onPointerMove={draw}
            onPointerUp={stopDrawing}
            onPointerLeave={stopDrawing}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Button variant="secondary" onClick={reset}>
          Reset
        </Button>
        <Button disabled={!hasDrawn} onClick={onNext}>
          {hasDrawn ? "Great, continue" : "Trace first"}
        </Button>
      </div>
    </Card>
  );
}
