import React, { useState } from 'react';
import {
  Layers,
  Component,
  Box,
  Terminal,
  Database,
  Cpu,
  Layout,
  GripVertical
} from 'lucide-react';
import { CAREER_CHAPTERS } from '../data/portfolioData';

interface FigmaSidebarLayersProps {
  selectedFrameId: string;
  onSelectFrame: (frameId: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onDropTechBadge?: (techName: string) => void;
  isLightMode?: boolean;
}

const DRAGGABLE_COMPONENTS = [
  { id: 'c-pg', name: 'PostgreSQL Cluster', category: 'Database', icon: '🗄️' },
  { id: 'c-nest', name: 'NestJS Microservices', category: 'Backend', icon: '⚡' },
  { id: 'c-ng', name: 'Angular Architecture', category: 'Frontend', icon: '🅰️' },
  { id: 'c-redis', name: 'Redis Cache Layer', category: 'In-Memory', icon: '⚡' },
  { id: 'c-docker', name: 'Docker Orchestration', category: 'DevOps', icon: '🐳' },
  { id: 'c-sql', name: 'SQL Query Optimizer', category: 'Performance', icon: '💎' },
  { id: 'c-pbi', name: 'Power BI REST Stream', category: 'Analytics', icon: '📊' }
];

export const FigmaSidebarLayers: React.FC<FigmaSidebarLayersProps> = ({
  selectedFrameId,
  onSelectFrame,
  isOpen,
  setIsOpen,
  onDropTechBadge,
  isLightMode = false
}) => {
  const [activeTab, setActiveTab] = useState<'layers' | 'assets'>('layers');

  const borderClass = isLightMode ? 'border-slate-200' : 'border-[#383838]';
  const bgClass = isLightMode ? 'bg-white' : 'bg-[#202023]';
  const textMutedClass = isLightMode ? 'text-slate-500' : 'text-[#8c8c8c]';
  const textMainClass = isLightMode ? 'text-slate-900' : 'text-white';
  const hoverClass = isLightMode ? 'hover:bg-slate-100' : 'hover:bg-[#2c2c30]';

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        title="Open Layers & Assets Panel (⌥1)"
        className={`fixed left-2 top-14 z-40 p-2 rounded ${bgClass} border ${borderClass} ${textMutedClass} hover:${textMainClass} shadow-lg cursor-pointer`}
      >
        <Layers className="w-4 h-4" />
      </button>
    );
  }

  return (
    <aside className={`w-64 border-r ${borderClass} ${bgClass} flex flex-col z-30 select-none text-xs shrink-0 transition-colors`}>
      {/* Panel Header & Tabs */}
      <div className={`flex items-center justify-between px-3 h-10 border-b ${borderClass}`}>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setActiveTab('layers')}
            type="button"
            className={`font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'layers' ? `${textMainClass} border-b-2 border-[#0d99ff] pb-2 pt-2` : `${textMutedClass} hover:${textMainClass}`
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Layers</span>
          </button>

          <button
            onClick={() => setActiveTab('assets')}
            type="button"
            className={`font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'assets' ? `${textMainClass} border-b-2 border-[#0d99ff] pb-2 pt-2` : `${textMutedClass} hover:${textMainClass}`
            }`}
          >
            <Component className="w-3.5 h-3.5" />
            <span>Assets</span>
          </button>
        </div>

        <button
          onClick={() => setIsOpen(false)}
          type="button"
          className={`${textMutedClass} hover:${textMainClass} p-1 rounded`}
          title="Collapse Panel"
        >
          ✕
        </button>
      </div>

      {/* Panel Body */}
      <div className="flex-1 overflow-y-auto p-2">
        {activeTab === 'layers' ? (
          <div className="space-y-1">
            <div className={`flex items-center justify-between px-2 py-1 text-[11px] font-mono ${textMutedClass} uppercase tracking-wider`}>
              <span>Canvas Pages</span>
              <span className="text-[10px]">9 Frames</span>
            </div>

            {/* Frame: Cover & Hero */}
            <button
              onClick={() => onSelectFrame('frame-hero')}
              type="button"
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded transition-all text-left cursor-pointer ${
                selectedFrameId === 'frame-hero'
                  ? 'bg-[#0d99ff] text-white font-medium shadow-sm'
                  : `${textMainClass} ${hoverClass}`
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <Box className="w-3.5 h-3.5 shrink-0 opacity-70" />
                <span className="truncate"># 00 Hero & Core Identity</span>
              </div>
              <span className="text-[10px] font-mono opacity-60">1280x720</span>
            </button>

            {/* Frame: Systematics */}
            <button
              onClick={() => onSelectFrame('frame-systematics')}
              type="button"
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded transition-all text-left cursor-pointer ${
                selectedFrameId === 'frame-systematics'
                  ? 'bg-[#0d99ff] text-white font-medium shadow-sm'
                  : `${textMainClass} ${hoverClass}`
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <Cpu className="w-3.5 h-3.5 shrink-0 text-cyan-500" />
                <span className="truncate"># Architecture Systematics</span>
              </div>
              <span className="text-[10px] font-mono text-cyan-500 font-bold">Flow</span>
            </button>

            {/* 5 Career Chapters as Frames */}
            {CAREER_CHAPTERS.map((ch) => {
              const isSelected = selectedFrameId === ch.id;
              return (
                <button
                  key={ch.id}
                  onClick={() => onSelectFrame(ch.id)}
                  type="button"
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded transition-all text-left cursor-pointer ${
                    isSelected
                      ? 'bg-[#0d99ff] text-white font-medium shadow-sm'
                      : `${textMainClass} ${hoverClass}`
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <Layout className="w-3.5 h-3.5 shrink-0 opacity-70" />
                    <span className="truncate">
                      # {ch.number} {ch.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono opacity-60">Frame</span>
                </button>
              );
            })}

            {/* Frame: Live SQL Playground */}
            <button
              onClick={() => onSelectFrame('frame-sql-sandbox')}
              type="button"
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded transition-all text-left cursor-pointer ${
                selectedFrameId === 'frame-sql-sandbox'
                  ? 'bg-[#0d99ff] text-white font-medium shadow-sm'
                  : `${textMainClass} ${hoverClass}`
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <Terminal className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
                <span className="truncate"># Live SQL Terminal</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-500 font-bold">psql</span>
            </button>

            {/* Frame: Competencies Matrix */}
            <button
              onClick={() => onSelectFrame('frame-skills-atlas')}
              type="button"
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded transition-all text-left cursor-pointer ${
                selectedFrameId === 'frame-skills-atlas'
                  ? 'bg-[#0d99ff] text-white font-medium shadow-sm'
                  : `${textMainClass} ${hoverClass}`
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <Database className="w-3.5 h-3.5 shrink-0 text-purple-500" />
                <span className="truncate"># Skills & Architecture Matrix</span>
              </div>
              <span className="text-[10px] font-mono opacity-60">Grid</span>
            </button>
          </div>
        ) : (
          /* Assets & Components Palette */
          <div className="space-y-3 p-1">
            <div className={`p-2.5 rounded ${isLightMode ? 'bg-slate-100' : 'bg-[#18181b]'} border ${borderClass}`}>
              <span className={`text-[11px] font-semibold ${textMainClass} block mb-1`}>
                Drag or Click to Drop Components
              </span>
              <p className={`text-[10px] ${textMutedClass} leading-relaxed`}>
                Add architectural nodes directly to Pavithra's active workspace canvas.
              </p>
            </div>

            <div className="space-y-2">
              {DRAGGABLE_COMPONENTS.map((comp) => (
                <div
                  key={comp.id}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('text/plain', comp.name);
                  }}
                  onClick={() => onDropTechBadge && onDropTechBadge(comp.name)}
                  className={`p-2.5 rounded-lg ${isLightMode ? 'bg-slate-50 hover:bg-slate-100' : 'bg-[#18181b] hover:bg-[#27272a]'} border ${borderClass} hover:border-[#0d99ff] transition-all flex items-center justify-between cursor-grab active:cursor-grabbing group shadow-sm`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base select-none">{comp.icon}</span>
                    <div>
                      <div className={`font-semibold ${textMainClass} group-hover:text-[#0d99ff] transition-colors text-xs`}>
                        {comp.name}
                      </div>
                      <span className={`text-[10px] ${textMutedClass} font-mono`}>
                        {comp.category}
                      </span>
                    </div>
                  </div>
                  <GripVertical className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0d99ff]" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Status */}
      <div className={`h-8 border-t ${borderClass} px-3 flex items-center justify-between text-[10px] ${textMutedClass} font-mono`}>
        <span>Figma V.124.0</span>
        <span className={textMainClass}>Auto Layout: ON</span>
      </div>
    </aside>
  );
};
