import React, { useState } from 'react';
import {
  MousePointer,
  Hand,
  Square,
  PenTool,
  Type,
  MessageSquare,
  Play,
  Share2,
  ChevronDown,
  Moon,
  Sun,
  Code,
  ZoomIn,
  ZoomOut,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface FigmaTopToolbarProps {
  activeTool: 'select' | 'hand' | 'frame' | 'pen' | 'text' | 'comment';
  setActiveTool: (tool: 'select' | 'hand' | 'frame' | 'pen' | 'text' | 'comment') => void;
  zoomLevel: number;
  setZoomLevel: React.Dispatch<React.SetStateAction<number>>;
  isPreviewMode: boolean;
  setIsPreviewMode: (val: boolean) => void;
  isLightMode: boolean;
  setIsLightMode: (val: boolean) => void;
  isDevMode: boolean;
  setIsDevMode: (val: boolean) => void;
}

export const FigmaTopToolbar: React.FC<FigmaTopToolbarProps> = ({
  activeTool,
  setActiveTool,
  zoomLevel,
  setZoomLevel,
  isPreviewMode,
  setIsPreviewMode,
  isLightMode,
  setIsLightMode,
  isDevMode,
  setIsDevMode
}) => {
  const [copiedShare, setCopiedShare] = useState<boolean>(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    confetti({
      particleCount: 25,
      spread: 45,
      origin: { y: 0.1 }
    });
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const borderClass = isLightMode ? 'border-slate-200' : 'border-[#383838]';
  const hoverClass = isLightMode ? 'hover:bg-slate-100' : 'hover:bg-[#383838]';
  const textMutedClass = isLightMode ? 'text-slate-500' : 'text-[#8c8c8c]';
  const textMainClass = isLightMode ? 'text-slate-900' : 'text-white';

  return (
    <header className={`h-12 border-b ${borderClass} ${isLightMode ? 'bg-white' : 'bg-[#27272a]'} px-3 flex items-center justify-between text-xs select-none z-50 sticky top-0 shadow-sm transition-colors`}>
      {/* Left: Figma Icon & Tools Palette */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Figma Icon / Main Menu */}
        <div className={`flex items-center gap-1.5 px-2 py-1 rounded ${hoverClass} cursor-pointer`}>
          <svg className="w-4 h-6 shrink-0" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
            <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
            <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
            <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
            <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
          </svg>
          <span className="font-black text-[11px] tracking-wider px-1.5 py-0.5 rounded bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm font-mono">
            PM
          </span>
          <ChevronDown className={`w-3 h-3 ${textMutedClass}`} />
        </div>

        <div className={`h-4 w-px ${isLightMode ? 'bg-slate-200' : 'bg-[#383838]'} mx-1 hidden sm:block`} />

        {/* Tools Palette: Select, Hand, Frame, Pen, Text, Comment */}
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => setActiveTool('select')}
            title="Move / Select (V)"
            type="button"
            className={`p-1.5 rounded transition-colors ${
              activeTool === 'select'
                ? 'bg-[#0d99ff] text-white'
                : `${isLightMode ? 'text-slate-700' : 'text-[#d4d4d4]'} ${hoverClass}`
            }`}
          >
            <MousePointer className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setActiveTool('hand')}
            title="Hand / Pan (H)"
            type="button"
            className={`p-1.5 rounded transition-colors ${
              activeTool === 'hand'
                ? 'bg-[#0d99ff] text-white'
                : `${isLightMode ? 'text-slate-700' : 'text-[#d4d4d4]'} ${hoverClass}`
            }`}
          >
            <Hand className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setActiveTool('frame')}
            title="Frame / Region (F)"
            type="button"
            className={`p-1.5 rounded transition-colors ${
              activeTool === 'frame'
                ? 'bg-[#0d99ff] text-white'
                : `${isLightMode ? 'text-slate-700' : 'text-[#d4d4d4]'} ${hoverClass}`
            }`}
          >
            <Square className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setActiveTool('pen')}
            title="Pen / Architecture Path (P)"
            type="button"
            className={`hidden sm:flex p-1.5 rounded transition-colors ${
              activeTool === 'pen'
                ? 'bg-[#0d99ff] text-white'
                : `${isLightMode ? 'text-slate-700' : 'text-[#d4d4d4]'} ${hoverClass}`
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setActiveTool('text')}
            title="Text Annotate (T)"
            type="button"
            className={`p-1.5 rounded transition-colors ${
              activeTool === 'text'
                ? 'bg-[#0d99ff] text-white'
                : `${isLightMode ? 'text-slate-700' : 'text-[#d4d4d4]'} ${hoverClass}`
            }`}
          >
            <Type className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setActiveTool('comment')}
            title="Add Feedback Comment (C)"
            type="button"
            className={`hidden md:flex p-1.5 rounded transition-colors ${
              activeTool === 'comment'
                ? 'bg-[#0d99ff] text-white'
                : `${isLightMode ? 'text-slate-700' : 'text-[#d4d4d4]'} ${hoverClass}`
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Center: File Name & Cloud Status */}
      <div className="flex items-center gap-2">
        <div className={`flex items-center gap-1.5 px-2 py-1 rounded ${hoverClass} cursor-pointer`}>
          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#0d99ff]/15 text-[#0d99ff] border border-[#0d99ff]/30">
            PM
          </span>
          <span className={`font-semibold ${textMainClass} tracking-tight text-xs`}>
            pavithra-journey.fig
          </span>
          <ChevronDown className={`w-3 h-3 ${textMutedClass}`} />
        </div>
        <span className="hidden lg:flex items-center gap-1 text-[10px] text-[#0fa958] font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0fa958] animate-pulse" />
          Live Architecture Canvas
        </span>
      </div>

      {/* Right: Multiplayer, Dev Mode, Present, Share */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Multiplayer Collaborators */}
        <div className="flex items-center -space-x-1.5 mr-1 hidden sm:flex">
          <div
            title="PM — Pavithra Meddaduwage (Database Programmer & Full Stack Engineer)"
            className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-bold text-[10px] flex items-center justify-center border border-white dark:border-[#1e1e1e] ring-2 ring-[#0d99ff]/50 font-mono tracking-tighter"
          >
            PM
          </div>
          <div
            title="You (Visitor Collaborator)"
            className="w-6 h-6 rounded-full bg-[#9747ff] text-white font-bold text-[10px] flex items-center justify-center border border-white dark:border-[#1e1e1e]"
          >
            YOU
          </div>
        </div>

        {/* Dev Mode Toggle */}
        <button
          onClick={() => setIsDevMode(!isDevMode)}
          type="button"
          title="Toggle Figma Dev Mode (Code & Inspection)"
          className={`flex items-center gap-1 px-2 py-1 rounded font-mono text-[11px] font-semibold transition-colors ${
            isDevMode
              ? 'bg-[#10b981] text-white shadow-sm'
              : `${textMutedClass} ${hoverClass} hover:${textMainClass}`
          }`}
        >
          <Code className="w-3.5 h-3.5" />
          <span className="hidden md:inline">{isDevMode ? 'Dev Mode ON' : 'Dev Mode'}</span>
        </button>

        {/* Zoom Control */}
        <div className={`hidden md:flex items-center gap-0.5 rounded px-1.5 py-0.5 border ${borderClass} ${isLightMode ? 'bg-slate-100' : 'bg-[#202023]'}`}>
          <button
            onClick={() => setZoomLevel((z) => Math.max(50, z - 10))}
            type="button"
            className={`p-1 hover:${textMainClass} ${textMutedClass}`}
            title="Zoom Out (-)"
          >
            <ZoomOut className="w-3 h-3" />
          </button>
          <span className={`font-mono text-[10px] ${textMainClass} px-1 w-9 text-center font-bold`}>
            {zoomLevel}%
          </span>
          <button
            onClick={() => setZoomLevel((z) => Math.min(150, z + 10))}
            type="button"
            className={`p-1 hover:${textMainClass} ${textMutedClass}`}
            title="Zoom In (+)"
          >
            <ZoomIn className="w-3 h-3" />
          </button>
        </div>

        {/* Light / Dark Mode Workspace Toggle */}
        <button
          onClick={() => setIsLightMode(!isLightMode)}
          type="button"
          title={isLightMode ? 'Switch to Dark Canvas' : 'Switch to Light Canvas'}
          className={`p-1.5 rounded ${hoverClass} ${textMutedClass} hover:${textMainClass} transition-colors cursor-pointer`}
        >
          {isLightMode ? <Moon className="w-3.5 h-3.5 text-slate-800" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
        </button>

        {/* Present / Preview Mode Button */}
        <button
          onClick={() => setIsPreviewMode(!isPreviewMode)}
          type="button"
          title={isPreviewMode ? 'Exit Presentation Mode' : 'Present / Prototype Mode (▶)'}
          className={`flex items-center gap-1 px-2.5 py-1 rounded font-semibold text-xs transition-all ${
            isPreviewMode
              ? 'bg-[#0fa958] text-white shadow-sm'
              : `${isLightMode ? 'bg-slate-800 text-white hover:bg-slate-900' : 'bg-[#383838] hover:bg-[#444444] text-white'}`
          }`}
        >
          <Play className="w-3 h-3 fill-current" />
          <span className="hidden sm:inline">{isPreviewMode ? 'Canvas Mode' : 'Present'}</span>
        </button>

        {/* Share Button */}
        <button
          onClick={handleShare}
          type="button"
          className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#0d99ff] hover:bg-[#0084e6] text-white font-semibold text-xs transition-colors shadow-sm cursor-pointer"
        >
          {copiedShare ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
          <span>{copiedShare ? 'Copied' : 'Share'}</span>
        </button>
      </div>
    </header>
  );
};
