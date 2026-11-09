import React, { useState, useEffect } from 'react';

const PAVITHRA_MESSAGES = [
  'Refining PostgreSQL composite B-Tree indexes...',
  'Checking POS microservice data ingest queues...',
  'Drop any tech badge from the left panel onto the canvas!',
  'Press [↑] or [↓] to jump between architecture frames.',
  'Inspecting live Power BI REST sync latency...',
  '100% on-time deployment track record verified.'
];

export const FigmaMultiplayerCursors: React.FC = () => {
  const [visitorPos, setVisitorPos] = useState<{ x: number; y: number } | null>(null);
  const [pavithraPos, setPavithraPos] = useState<{ x: number; y: number }>({ x: 340, y: 280 });
  const [pavithraMsgIndex, setPavithraMsgIndex] = useState<number>(0);

  // Track visitor's real mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setVisitorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Autonomous Pavithra collaborator cursor movement
  useEffect(() => {
    const interval = setInterval(() => {
      setPavithraPos({
        x: Math.min(window.innerWidth - 200, Math.max(120, Math.random() * window.innerWidth * 0.7)),
        y: Math.min(window.innerHeight - 100, Math.max(120, Math.random() * window.innerHeight * 0.6))
      });
      setPavithraMsgIndex((prev) => (prev + 1) % PAVITHRA_MESSAGES.length);
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Pavithra (Collaborator Cursor) */}
      <div
        className="absolute transition-all duration-1000 ease-out flex flex-col items-start"
        style={{ left: `${pavithraPos.x}px`, top: `${pavithraPos.y}px` }}
      >
        {/* Figma Cursor Arrow */}
        <svg className="w-5 h-5 text-[#0d99ff] drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
          <path d="M5.5 3.2L18.5 13.5L12.5 14.5L9.5 20.8L7.2 19.6L10.2 13.5L5.5 13.2V3.2Z" />
        </svg>

        {/* Name Tag & Status Bubble */}
        <div className="flex flex-col gap-1 -mt-1 ml-4 select-none">
          <span className="px-2 py-0.5 rounded-full bg-[#0d99ff] text-white text-[10px] font-mono font-bold shadow-md">
            Pavithra (Dev)
          </span>
          <div className="px-2.5 py-1 rounded-xl bg-[#1e1e1e]/95 text-stone-200 border border-[#383838] text-[10px] font-mono shadow-xl backdrop-blur max-w-xs animate-in fade-in">
            {PAVITHRA_MESSAGES[pavithraMsgIndex]}
          </div>
        </div>
      </div>

      {/* Visitor's Cursor Tag */}
      {visitorPos && (
        <div
          className="absolute hidden md:flex items-center gap-1.5 transition-transform duration-75 pointer-events-none"
          style={{
            transform: `translate(${visitorPos.x + 14}px, ${visitorPos.y + 14}px)`
          }}
        >
          <span className="px-2 py-0.5 rounded-full bg-[#9747ff] text-white text-[10px] font-mono font-bold shadow-md">
            Visitor (You)
          </span>
        </div>
      )}
    </div>
  );
};

