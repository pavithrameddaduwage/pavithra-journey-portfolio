import React from 'react';
import { ArrowUp, ArrowDown, Sparkles } from 'lucide-react';

interface FigmaKeyboardBarProps {
  onPrevFrame: () => void;
  onNextFrame: () => void;
  currentFrameIndex: number;
  totalFrames: number;
  isLightMode?: boolean;
}

export const FigmaKeyboardBar: React.FC<FigmaKeyboardBarProps> = ({
  onPrevFrame,
  onNextFrame,
  currentFrameIndex,
  totalFrames,
  isLightMode = false
}) => {
  const bgClass = isLightMode ? 'bg-white/95 border-slate-200 text-slate-800' : 'bg-[#1e1e1e]/90 border-[#383838] text-[#d4d4d4]';
  const textMutedClass = isLightMode ? 'text-slate-500' : 'text-[#8c8c8c]';
  const textMainClass = isLightMode ? 'text-slate-900' : 'text-white';
  const hoverClass = isLightMode ? 'hover:bg-slate-100' : 'hover:bg-[#333]';
  const kbdClass = isLightMode ? 'bg-slate-100 border-slate-300 text-slate-800' : 'bg-[#2c2c2c] border-[#444] text-white';

  return (
    <div className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 p-1.5 rounded-full ${bgClass} border shadow-2xl backdrop-blur-md text-[11px] font-mono select-none transition-colors`}>
      {/* Frame Counter & Arrow Controls */}
      <div className="flex items-center gap-1 pl-2 pr-1">
        <span className={textMutedClass}>Frame</span>
        <span className="text-[#0d99ff] font-bold">
          {currentFrameIndex + 1}/{totalFrames}
        </span>
        
        <button
          onClick={onPrevFrame}
          type="button"
          title="Previous Frame (↑)"
          className={`p-1 rounded ${hoverClass} ${textMutedClass} hover:${textMainClass} transition-colors cursor-pointer`}
        >
          <ArrowUp className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onNextFrame}
          type="button"
          title="Next Frame (↓)"
          className={`p-1 rounded ${hoverClass} ${textMutedClass} hover:${textMainClass} transition-colors cursor-pointer`}
        >
          <ArrowDown className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className={`h-3.5 w-px ${isLightMode ? 'bg-slate-200' : 'bg-[#383838]'}`} />

      {/* Keyboard Shortcuts Hint */}
      <div className={`hidden sm:flex items-center gap-3 pr-2 text-[10px] ${textMutedClass}`}>
        <span className="flex items-center gap-1">
          <kbd className={`px-1.5 py-0.5 rounded border ${kbdClass}`}>V</kbd>
          <span>Select</span>
        </span>
        <span className="flex items-center gap-1">
          <kbd className={`px-1.5 py-0.5 rounded border ${kbdClass}`}>H</kbd>
          <span>Hand</span>
        </span>
        <span className="flex items-center gap-1">
          <kbd className={`px-1.5 py-0.5 rounded border ${kbdClass}`}>Space</kbd>
          <span>Drag</span>
        </span>
        <span className="hidden md:flex items-center gap-1 text-[#10b981]">
          <Sparkles className="w-3 h-3" />
          <span>Figma Workspace</span>
        </span>
      </div>
    </div>
  );
};
