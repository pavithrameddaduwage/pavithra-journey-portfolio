import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO, CAREER_CHAPTERS, CareerChapter, ProjectItem } from './data/portfolioData';
import { FigmaTopToolbar } from './components/FigmaTopToolbar';
import { FigmaSidebarLayers } from './components/FigmaSidebarLayers';
import { FigmaSidebarInspect } from './components/FigmaSidebarInspect';
import { FigmaCanvasFrame } from './components/FigmaCanvasFrame';
import { FigmaMultiplayerCursors } from './components/FigmaMultiplayerCursors';
import { FigmaSystematicsArrows } from './components/FigmaSystematicsArrows';
import { FigmaKeyboardBar } from './components/FigmaKeyboardBar';
import { ProjectArtShowcase } from './components/ProjectArtShowcase';
import { QuerySandbox } from './components/QuerySandbox';
import { SkillsAtlas } from './components/SkillsAtlas';
import { BlueprintModal } from './components/BlueprintModal';
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  ChevronDown,
  Terminal,
  Code2,
  Phone
} from 'lucide-react';
import confetti from 'canvas-confetti';

const ALL_FRAME_IDS = [
  'frame-hero',
  'frame-systematics',
  'chapter-horizon',
  'chapter-digisa',
  'chapter-xess',
  'chapter-creativehub',
  'chapter-sliit',
  'frame-sql-sandbox',
  'frame-skills-atlas',
  'frame-contact'
];

export const App: React.FC = () => {
  const [selectedFrameId, setSelectedFrameId] = useState<string>('frame-hero');
  const [activeTool, setActiveTool] = useState<'select' | 'hand' | 'frame' | 'pen' | 'text' | 'comment'>('select');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);
  const [isLightMode, setIsLightMode] = useState<boolean>(false);
  const [isDevMode, setIsDevMode] = useState<boolean>(false);
  const [isLayersOpen, setIsLayersOpen] = useState<boolean>(true);
  const [isInspectOpen, setIsInspectOpen] = useState<boolean>(true);
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [droppedBadges, setDroppedBadges] = useState<string[]>([]);

  // Keyboard navigation between frames (Up / Down arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'ArrowDown' || e.key === 'j') {
        e.preventDefault();
        navigateToNextFrame();
      } else if (e.key === 'ArrowUp' || e.key === 'k') {
        e.preventDefault();
        navigateToPrevFrame();
      } else if (e.key === 'v' || e.key === 'V') {
        setActiveTool('select');
      } else if (e.key === 'h' || e.key === 'H') {
        setActiveTool('hand');
      } else if (e.key === 'f' || e.key === 'F') {
        if (!e.metaKey && !e.ctrlKey) {
          setIsPreviewMode((prev) => !prev);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedFrameId]);

  const currentFrameIndex = ALL_FRAME_IDS.indexOf(selectedFrameId);

  const navigateToNextFrame = () => {
    const nextIdx = (currentFrameIndex + 1) % ALL_FRAME_IDS.length;
    const nextId = ALL_FRAME_IDS[nextIdx];
    scrollToFrame(nextId);
  };

  const navigateToPrevFrame = () => {
    const prevIdx = (currentFrameIndex - 1 + ALL_FRAME_IDS.length) % ALL_FRAME_IDS.length;
    const prevId = ALL_FRAME_IDS[prevIdx];
    scrollToFrame(prevId);
  };

  const scrollToFrame = (frameId: string) => {
    setSelectedFrameId(frameId);
    const el = document.getElementById(frameId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleDropTechBadge = (badgeName: string) => {
    setDroppedBadges((prev) => [...prev, badgeName]);
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.8 }
    });
  };

  // Color classes according to isLightMode
  const textMutedClass = isLightMode ? 'text-slate-500' : 'text-[#8c8c8c]';
  const textMainClass = isLightMode ? 'text-slate-900' : 'text-white';
  const frameCardBgClass = isLightMode ? 'bg-white' : 'bg-[#141418]';
  const borderClass = isLightMode ? 'border-slate-200' : 'border-[#2c2c2c]';
  const badgeBgClass = isLightMode ? 'bg-slate-100 text-slate-800 border-slate-200' : 'bg-[#1e1e1e] text-stone-200 border-[#383838]';

  return (
    <div className={`min-h-screen flex flex-col ${isLightMode ? 'light-workspace bg-[#f4f4f5] text-slate-900' : 'bg-[#18181b] text-white'} transition-colors duration-200`}>
      {/* Top Figma Workspace Toolbar */}
      <FigmaTopToolbar
        activeTool={activeTool}
        setActiveTool={setActiveTool}
        zoomLevel={zoomLevel}
        setZoomLevel={setZoomLevel}
        isPreviewMode={isPreviewMode}
        setIsPreviewMode={setIsPreviewMode}
        isLightMode={isLightMode}
        setIsLightMode={setIsLightMode}
        isDevMode={isDevMode}
        setIsDevMode={setIsDevMode}
      />

      {/* Main Workspace Workspace (Layers Sidebar + Canvas + Inspect Sidebar) */}
      <div className="flex-1 flex relative overflow-hidden">
        {/* Left Sidebar: Layers & Asset Palette (Hidden in Presentation Mode) */}
        {!isPreviewMode && (
          <FigmaSidebarLayers
            selectedFrameId={selectedFrameId}
            onSelectFrame={scrollToFrame}
            isOpen={isLayersOpen}
            setIsOpen={setIsLayersOpen}
            onDropTechBadge={handleDropTechBadge}
            isLightMode={isLightMode}
          />
        )}

        {/* The Central Infinite Dot Grid Canvas */}
        <main
          onClick={() => setSelectedFrameId('')}
          className="flex-1 figma-canvas-grid overflow-y-auto px-4 sm:px-8 py-10 flex flex-col items-center select-none"
          style={{
            cursor: activeTool === 'hand' ? 'grab' : 'default'
          }}
        >
          <div
            className="w-full max-w-5xl transition-transform duration-200"
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
          >
            {/* Dropped Components Staging Ribbon */}
            {droppedBadges.length > 0 && (
              <div className={`mb-6 p-3 rounded-xl ${isLightMode ? 'bg-white border-cyan-400' : 'bg-[#202025] border-[#0d99ff]/50'} border flex items-center justify-between shadow-xl animate-in fade-in`}>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#0d99ff] animate-ping" />
                  <span className={`text-xs font-mono font-bold ${textMainClass}`}>
                    Workspace Live Components ({droppedBadges.length}):
                  </span>
                  <div className="flex flex-wrap gap-1.5 ml-2">
                    {droppedBadges.map((badge, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-[#0d99ff]/15 text-[#0d99ff] border border-[#0d99ff]/30 text-[10px] font-mono font-bold"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setDroppedBadges([])}
                  type="button"
                  className={`text-[10px] font-mono ${textMutedClass} hover:${textMainClass} cursor-pointer`}
                >
                  Clear Staging
                </button>
              </div>
            )}

            {/* --- FRAME 00: HERO & SYSTEM IDENTITY --- */}
            <FigmaCanvasFrame
              id="frame-hero"
              name="00 Hero & Core Architecture"
              dimensionText="1280 × 740"
              isSelected={selectedFrameId === 'frame-hero'}
              onSelect={() => setSelectedFrameId('frame-hero')}
              distanceToNext={32}
              isLightMode={isLightMode}
            >
              <div className={`p-8 sm:p-14 relative overflow-hidden ${isLightMode ? 'bg-gradient-to-br from-white via-slate-50 to-slate-100' : 'bg-gradient-to-br from-[#16161c] to-[#0c0d12]'}`}>
                {/* Figma Canvas Component Tag */}
                <div className={`flex items-center justify-between mb-8 pb-4 border-b ${borderClass}`}>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d99ff]/10 border border-[#0d99ff]/30 text-[#0d99ff] text-xs font-mono font-bold">
                    <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                    <span>Database Programmer & Full Stack Engineer</span>
                  </div>

                  <span className={`text-[11px] font-mono ${textMutedClass} hidden sm:inline`}>
                    Status: Available Immediately (Remote & Global)
                  </span>
                </div>

                <h1 className={`text-3xl sm:text-5xl md:text-6xl font-black tracking-tight ${textMainClass} mb-6 leading-[1.08]`}>
                  Architecting <br className="hidden sm:inline" />
                  <span className="bg-gradient-to-r from-[#0d99ff] via-[#9747ff] to-[#10b981] bg-clip-text text-transparent">
                    High-Throughput Data Engines
                  </span> <br />
                  & Resilient Web Systems
                </h1>

                <p className={`max-w-2xl ${isLightMode ? 'text-slate-600' : 'text-stone-300'} text-sm sm:text-base leading-relaxed mb-8 font-sans`}>
                  I am <strong className={`${textMainClass} font-bold`}>{PERSONAL_INFO.name}</strong>. Over 3+ years, I've designed and operated high-scale database clusters, mission-critical ERP platforms, and automated data ingestion pipelines processing millions of records for Fortune 500 retail partners.
                </p>

                {/* Key Performance Metrics Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
                  <div className={`p-3.5 rounded-xl ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#1f1f26] border-[#383838]'} border`}>
                    <span className={`text-[10px] font-mono ${textMutedClass} block uppercase`}>Experience</span>
                    <span className={`text-xl font-black ${textMainClass} font-mono`}>3+ Years</span>
                    <span className="text-[10px] text-[#10b981] block mt-0.5 font-bold">Enterprise Cloud</span>
                  </div>

                  <div className={`p-3.5 rounded-xl ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#1f1f26] border-[#383838]'} border`}>
                    <span className={`text-[10px] font-mono ${textMutedClass} block uppercase`}>Data Scale</span>
                    <span className="text-xl font-black text-[#0d99ff] font-mono">Millions+</span>
                    <span className="text-[10px] text-[#0d99ff] block mt-0.5 font-bold">POS Records Unified</span>
                  </div>

                  <div className={`p-3.5 rounded-xl ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#1f1f26] border-[#383838]'} border`}>
                    <span className={`text-[10px] font-mono ${textMutedClass} block uppercase`}>Deployments</span>
                    <span className="text-xl font-black text-[#10b981] font-mono">100%</span>
                    <span className="text-[10px] text-[#10b981] block mt-0.5 font-bold">Zero Rollbacks</span>
                  </div>

                  <div className={`p-3.5 rounded-xl ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#1f1f26] border-[#383838]'} border`}>
                    <span className={`text-[10px] font-mono ${textMutedClass} block uppercase`}>P99 Latency</span>
                    <span className="text-xl font-black text-[#a855f7] font-mono">&lt; 80ms</span>
                    <span className="text-[10px] text-[#a855f7] block mt-0.5 font-bold">Index Optimized</span>
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => scrollToFrame('chapter-horizon')}
                    className="px-5 py-2.5 rounded-xl bg-[#0d99ff] hover:bg-[#0084e6] text-white text-xs sm:text-sm font-mono font-bold inline-flex items-center gap-2 shadow-lg transition-all cursor-pointer"
                  >
                    <span>Inspect Milestones</span>
                    <ChevronDown className="w-4 h-4 animate-bounce" />
                  </button>

                  <button
                    onClick={() => scrollToFrame('frame-sql-sandbox')}
                    className={`px-4 py-2.5 rounded-xl ${isLightMode ? 'bg-slate-100 hover:bg-slate-200 text-slate-800' : 'bg-[#1e1e24] hover:bg-[#2c2c34] text-white'} border ${borderClass} text-xs sm:text-sm font-mono font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer`}
                  >
                    <Terminal className="w-4 h-4 text-[#10b981]" />
                    <span>Run Live SQL Terminal</span>
                  </button>

                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 py-2.5 rounded-xl ${isLightMode ? 'bg-slate-100 hover:bg-slate-200 text-slate-800' : 'bg-[#1e1e24] hover:bg-[#2c2c34] text-white'} border ${borderClass} text-xs sm:text-sm font-mono font-semibold inline-flex items-center gap-2 transition-colors`}
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>

                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 py-2.5 rounded-xl ${isLightMode ? 'bg-slate-100 hover:bg-slate-200 text-slate-800' : 'bg-[#1e1e24] hover:bg-[#2c2c34] text-white'} border ${borderClass} text-xs sm:text-sm font-mono font-semibold inline-flex items-center gap-2 transition-colors`}
                  >
                    <Linkedin className="w-4 h-4 text-[#0d99ff]" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </FigmaCanvasFrame>

            {/* --- FRAME SYSTEMATICS: ARCHITECTURE FLOW & SCHEMATICS --- */}
            <FigmaCanvasFrame
              id="frame-systematics"
              name="Architecture Systematics & Data Flow"
              dimensionText="1280 × 380"
              isSelected={selectedFrameId === 'frame-systematics'}
              onSelect={() => setSelectedFrameId('frame-systematics')}
              distanceToNext={32}
              isLightMode={isLightMode}
            >
              <FigmaSystematicsArrows isLightMode={isLightMode} />
            </FigmaCanvasFrame>

            {/* --- 5 CAREER CHAPTERS AS FIGMA FRAMES --- */}
            {CAREER_CHAPTERS.map((chapter) => (
              <FigmaCanvasFrame
                key={chapter.id}
                id={chapter.id}
                name={`Chapter ${chapter.number}: ${chapter.title}`}
                dimensionText="1280 × 860"
                isSelected={selectedFrameId === chapter.id}
                onSelect={() => setSelectedFrameId(chapter.id)}
                distanceToNext={32}
                isLightMode={isLightMode}
              >
                <div className={`p-6 sm:p-10 ${frameCardBgClass}`}>
                  {/* Top Chapter Metadata */}
                  <div className={`flex flex-wrap items-center justify-between pb-4 border-b ${borderClass} gap-3 mb-6`}>
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-[#0d99ff] text-white font-mono font-bold text-sm flex items-center justify-center">
                        {chapter.number}
                      </span>
                      <div>
                        <h2 className={`text-xl sm:text-2xl font-black ${textMainClass}`}>
                          {chapter.title}
                        </h2>
                        <p className={`text-xs font-mono ${textMutedClass}`}>
                          {chapter.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className={`flex items-center gap-2 text-xs font-mono ${textMutedClass}`}>
                      <span className={`px-2.5 py-1 rounded ${badgeBgClass} border`}>
                        📅 {chapter.timeframe}
                      </span>
                      <span className={`px-2.5 py-1 rounded ${badgeBgClass} border`}>
                        📍 {chapter.location}
                      </span>
                    </div>
                  </div>

                  {/* Dynamic Product Art Showcase (No ugly diagrams!) */}
                  <div className="mb-8 rounded-xl overflow-hidden shadow-md">
                    <ProjectArtShowcase
                      theme={chapter.sceneTheme}
                      title={chapter.title}
                      subtitle={chapter.subtitle}
                      metrics={chapter.projects[0]?.metrics || []}
                      isLightMode={isLightMode}
                    />
                  </div>

                  {/* Narrative & Breakthroughs */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
                    <div className="lg:col-span-7">
                      <h3 className="text-xs font-mono uppercase text-[#0d99ff] font-bold mb-2">
                        System Overview & Scope
                      </h3>
                      <p className={`text-sm sm:text-base ${isLightMode ? 'text-slate-600' : 'text-stone-300'} leading-relaxed font-sans`}>
                        {chapter.overview}
                      </p>
                    </div>

                    <div className={`lg:col-span-5 p-4 rounded-xl ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-[#1a1a20] border-[#2c2c2c]'} border`}>
                      <h4 className={`text-xs font-mono uppercase ${textMainClass} font-bold mb-3 flex items-center gap-1.5`}>
                        <Code2 className="w-3.5 h-3.5 text-[#10b981]" /> Architectural Breakthroughs
                      </h4>
                      <ul className={`space-y-2 text-xs font-mono ${isLightMode ? 'text-slate-700' : 'text-stone-300'}`}>
                        {chapter.keyLearnings.map((learning, lIdx) => (
                          <li key={lIdx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0d99ff] mt-1.5 shrink-0" />
                            <span>{learning}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Project Cards Grid */}
                  <div>
                    <h4 className={`text-xs font-mono uppercase tracking-wider ${textMutedClass} font-bold mb-4 flex items-center gap-1.5`}>
                      <Terminal className="w-3.5 h-3.5 text-[#0d99ff]" /> Systems Case Studies & Code Blueprints
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {chapter.projects.map((proj) => (
                        <div
                          key={proj.id}
                          onClick={() => setActiveProject(proj)}
                          className={`group p-5 rounded-xl ${isLightMode ? 'bg-slate-50 hover:bg-slate-100 border-slate-200' : 'bg-[#1a1a20] hover:bg-[#202028] border-[#2c2c2c]'} border hover:border-[#0d99ff] shadow-md transition-all cursor-pointer relative`}
                        >
                          <div className={`flex items-center justify-between text-[11px] font-mono ${textMutedClass} mb-2`}>
                            <span className={`px-2 py-0.5 rounded ${isLightMode ? 'bg-white text-[#0d99ff] border-slate-200' : 'bg-[#25252b] text-[#38bdf8] border-[#383838]'} border font-medium`}>
                              {proj.category}
                            </span>
                            <span>{proj.period}</span>
                          </div>

                          <h5 className={`font-bold text-base ${textMainClass} group-hover:text-[#0d99ff] transition-colors mb-2`}>
                            {proj.title}
                          </h5>

                          <p className={`text-xs ${isLightMode ? 'text-slate-600' : 'text-stone-400'} leading-relaxed mb-4 line-clamp-2`}>
                            {proj.summary}
                          </p>

                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {proj.techStack.map((tech) => (
                              <span
                                key={tech}
                                className={`text-[10px] font-mono px-2 py-0.5 rounded ${isLightMode ? 'bg-white text-slate-700 border-slate-200' : 'bg-[#16161c] text-stone-300 border-[#383838]'} border`}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center text-xs font-mono font-semibold text-[#0d99ff] group-hover:translate-x-1 transition-transform">
                            <span>Inspect Blueprint Specs</span>
                            <ArrowRight className="w-3.5 h-3.5 ml-1" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FigmaCanvasFrame>
            ))}

            {/* --- FRAME: LIVE SQL TERMINAL --- */}
            <FigmaCanvasFrame
              id="frame-sql-sandbox"
              name="Live Interactive SQL Terminal (psql / Neon)"
              dimensionText="1280 × 680"
              isSelected={selectedFrameId === 'frame-sql-sandbox'}
              onSelect={() => setSelectedFrameId('frame-sql-sandbox')}
              distanceToNext={32}
              isLightMode={isLightMode}
            >
              <QuerySandbox isLightMode={isLightMode} />
            </FigmaCanvasFrame>

            {/* --- FRAME: COMPETENCIES MATRIX --- */}
            <FigmaCanvasFrame
              id="frame-skills-atlas"
              name="Skills & Architecture Matrix (Component Library)"
              dimensionText="1280 × 720"
              isSelected={selectedFrameId === 'frame-skills-atlas'}
              onSelect={() => setSelectedFrameId('frame-skills-atlas')}
              distanceToNext={32}
              isLightMode={isLightMode}
            >
              <SkillsAtlas isLightMode={isLightMode} />
            </FigmaCanvasFrame>

            {/* --- FRAME: EPILOGUE & CONTACT --- */}
            <FigmaCanvasFrame
              id="frame-contact"
              name="Epilogue & Global Engineering Contact"
              dimensionText="1280 × 440"
              isSelected={selectedFrameId === 'frame-contact'}
              onSelect={() => setSelectedFrameId('frame-contact')}
              distanceToNext={0}
              isLightMode={isLightMode}
            >
              <div className={`p-8 sm:p-12 text-center ${frameCardBgClass}`}>
                <span className="px-3 py-1 text-xs font-mono font-bold uppercase rounded-full bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/30 inline-block mb-3">
                  Production Ready • Global & Remote
                </span>

                <h2 className={`text-3xl sm:text-4xl font-black ${textMainClass} tracking-tight mb-4`}>
                  Let's Build High-Throughput Systems Together
                </h2>

                <p className={`max-w-xl mx-auto text-xs sm:text-sm ${isLightMode ? 'text-slate-600' : 'text-stone-300'} font-sans mb-8 leading-relaxed`}>
                  Available for database programming, query optimization, high-scale microservices, and full-stack engineering roles.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3.5 mb-8">
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="px-6 py-3 rounded-xl bg-[#0d99ff] hover:bg-[#0084e6] text-white font-mono text-xs sm:text-sm font-bold shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer"
                  >
                    <Mail className="w-4 h-4" />
                    <span>{PERSONAL_INFO.email}</span>
                  </a>

                  <a
                    href={`tel:${PERSONAL_INFO.phone}`}
                    className={`px-5 py-3 rounded-xl ${isLightMode ? 'bg-slate-100 hover:bg-slate-200 text-slate-800' : 'bg-[#1e1e24] hover:bg-[#2c2c34] text-white'} border ${borderClass} font-mono text-xs sm:text-sm font-semibold transition-colors inline-flex items-center gap-2`}
                  >
                    <Phone className="w-4 h-4 text-[#10b981]" />
                    <span>{PERSONAL_INFO.phone}</span>
                  </a>
                </div>

                <div className={`flex items-center justify-center gap-6 ${textMutedClass} text-xs font-mono`}>
                  <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className={`hover:${textMainClass} transition-colors`}>
                    GitHub
                  </a>
                  <span>•</span>
                  <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className={`hover:${textMainClass} transition-colors`}>
                    LinkedIn
                  </a>
                  <span>•</span>
                  <a href={PERSONAL_INFO.portfolioUrl} target="_blank" rel="noopener noreferrer" className={`hover:${textMainClass} transition-colors`}>
                    Live Netlify Portfolio
                  </a>
                </div>
              </div>
            </FigmaCanvasFrame>
          </div>
        </main>

        {/* Right Sidebar: Design & Dev Mode Inspect (Hidden in Presentation Mode) */}
        {!isPreviewMode && (
          <FigmaSidebarInspect
            selectedFrameId={selectedFrameId}
            isOpen={isInspectOpen}
            setIsOpen={setIsInspectOpen}
            isDevMode={isDevMode}
            isLightMode={isLightMode}
          />
        )}
      </div>

      {/* Floating Multiplayer Cursors (Pavithra & Visitor) */}
      <FigmaMultiplayerCursors />

      {/* Floating Bottom Keyboard & Navigation Bar */}
      <FigmaKeyboardBar
        onPrevFrame={navigateToPrevFrame}
        onNextFrame={navigateToNextFrame}
        currentFrameIndex={currentFrameIndex !== -1 ? currentFrameIndex : 0}
        totalFrames={ALL_FRAME_IDS.length}
        isLightMode={isLightMode}
      />

      {/* Architecture Blueprint Modal */}
      <BlueprintModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </div>
  );
};
