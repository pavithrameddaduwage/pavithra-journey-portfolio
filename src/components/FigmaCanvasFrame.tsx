import React, { useState } from 'react';
import confetti from 'canvas-confetti';

interface FigmaCanvasFrameProps {
  id: string;
  name: string;
  dimensionText?: string;
  isSelected: boolean;
  onSelect: () => void;
  children: React.ReactNode;
  distanceToNext?: number;
  isLightMode?: boolean;
}

export const FigmaCanvasFrame: React.FC<FigmaCanvasFrameProps> = ({
  id,
  name,
  dimensionText = '1280 × 740',
  isSelected,
  onSelect,
  children,
  distanceToNext = 32,
  isLightMode = false
}) => {
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const techName = e.dataTransfer.getData('text/plain');
    if (techName) {
      confetti({
        particleCount: 25,
        spread: 60,
        origin: {
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight
        }
      });
    }
  };

  return (
    <div
      id={id}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative rounded-xl transition-all duration-150 my-8 ${
        isSelected ? 'figma-selected ring-4 ring-[#0d99ff]/20' : 'hover:ring-1 hover:ring-[#383838]/40'
      } ${isDragOver ? 'figma-droppable-active ring-4 ring-[#0d99ff]' : ''}`}
    >
      {/* Figma Frame Top Label */}
      <div className="absolute -top-7 left-0 flex items-center gap-2 select-none z-20">
        <span
          className={`px-2 py-0.5 rounded text-[11px] font-mono font-medium transition-colors ${
            isSelected
              ? 'bg-[#0d99ff] text-white shadow-sm'
              : isLightMode
              ? 'text-slate-700 bg-white border border-slate-200 shadow-sm'
              : 'text-[#8c8c8c] hover:text-white bg-[#252525] border border-[#383838]'
          }`}
        >
          # {name}
        </span>
        <span className={`text-[10px] font-mono ${isLightMode ? 'text-slate-400' : 'text-[#666]'} hidden sm:inline`}>
          [{dimensionText}]
        </span>
      </div>

      {/* 8 Resize Handles when selected (Figma signature interaction) */}
      {isSelected && (
        <>
          <div className="figma-handle -top-[3.5px] -left-[3.5px] cursor-nwse-resize" />
          <div className="figma-handle -top-[3.5px] left-1/2 -translate-x-1/2 cursor-ns-resize" />
          <div className="figma-handle -top-[3.5px] -right-[3.5px] cursor-nesw-resize" />
          <div className="figma-handle top-1/2 -left-[3.5px] -translate-y-1/2 cursor-ew-resize" />
          <div className="figma-handle top-1/2 -right-[3.5px] -translate-y-1/2 cursor-ew-resize" />
          <div className="figma-handle -bottom-[3.5px] -left-[3.5px] cursor-nesw-resize" />
          <div className="figma-handle -bottom-[3.5px] left-1/2 -translate-x-1/2 cursor-ns-resize" />
          <div className="figma-handle -bottom-[3.5px] -right-[3.5px] cursor-nwse-resize" />
        </>
      )}

      {/* Frame Contents */}
      <div className={`rounded-xl overflow-hidden figma-frame-card`}>
        {children}
      </div>

      {/* Red Measurement Dimension Line to next frame when selected */}
      {isSelected && (
        <div className="relative h-8 flex items-center justify-center pointer-events-none select-none">
          <div className="w-px h-full bg-[#f24e1e]" />
          <div className="measurement-badge">
            {distanceToNext}px
          </div>
        </div>
      )}
    </div>
  );
};
