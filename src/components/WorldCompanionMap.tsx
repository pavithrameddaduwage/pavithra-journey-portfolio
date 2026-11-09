import React, { useState } from 'react';
import { Map, MapPin, Compass, Navigation, ChevronDown, ChevronUp, Flag, CheckCircle } from 'lucide-react';
import { CAREER_CHAPTERS } from '../data/portfolioData';

interface WorldCompanionMapProps {
  activeChapterId: string;
  onNavigateChapter: (chapterId: string) => void;
  scrollProgress: number;
}

export const WorldCompanionMap: React.FC<WorldCompanionMapProps> = ({
  activeChapterId,
  onNavigateChapter,
  scrollProgress
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div className="relative">
      {/* Map Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        type="button"
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-mono font-bold transition-all shadow-sm cursor-pointer"
        title="Toggle World Companion Map"
      >
        <Map className="w-3.5 h-3.5 text-amber-600 dark:text-teal-400" />
        <span className="hidden sm:inline">World Map</span>
        <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300">
          {Math.round(scrollProgress)}%
        </span>
        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
      </button>

      {/* Expanded Map Drawer */}
      {isExpanded && (
        <div className="absolute right-0 top-12 z-50 w-76 sm:w-96 rounded-3xl bg-[#fffdf9] dark:bg-[#111827] border-2 border-stone-300 dark:border-stone-700 shadow-2xl p-5 animate-in slide-in-from-top-3 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800 mb-4">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-600 dark:text-teal-400 animate-spin" style={{ animationDuration: '10s' }} />
              <div>
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
                  Cartographer's Chart
                </h4>
                <p className="text-[10px] font-mono text-stone-400">5 Chapters of Software Craftsmanship</p>
              </div>
            </div>
            <span className="text-[11px] font-mono font-bold text-amber-700 dark:text-teal-400">
              {Math.round(scrollProgress)}% Explored
            </span>
          </div>

          {/* Chapters Timeline List */}
          <div className="relative pl-6 space-y-4">
            {/* Connecting Vertical Track */}
            <div className="absolute left-2.5 top-2 bottom-3 w-0.5 bg-stone-200 dark:bg-stone-800" />
            <div
              className="absolute left-2.5 top-2 w-0.5 bg-amber-600 dark:bg-teal-400 transition-all duration-300"
              style={{ height: `${scrollProgress}%` }}
            />

            {CAREER_CHAPTERS.map((chapter, index) => {
              const isActive = activeChapterId === chapter.id;
              return (
                <button
                  key={chapter.id}
                  onClick={() => {
                    onNavigateChapter(chapter.id);
                    setIsExpanded(false);
                  }}
                  type="button"
                  className={`w-full text-left relative flex items-start gap-3 p-2 rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-50 dark:bg-teal-950/50 border border-amber-300 dark:border-teal-700/60 shadow-sm'
                      : 'hover:bg-stone-100 dark:hover:bg-stone-800/60 border border-transparent'
                  }`}
                >
                  {/* Waypoint Dot */}
                  <div
                    className={`absolute -left-6 top-3 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                      isActive
                        ? 'bg-amber-600 dark:bg-teal-400 border-white dark:border-stone-900 shadow-md scale-110'
                        : 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600'
                    }`}
                  >
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-amber-700 dark:text-teal-400 uppercase">
                        Chapter {chapter.number}
                      </span>
                      <span className="text-[9px] font-mono text-stone-400">
                        {chapter.timeframe.split('–')[0]}
                      </span>
                    </div>

                    <h5 className="font-serif text-xs font-bold text-stone-900 dark:text-stone-100 truncate">
                      {chapter.title}
                    </h5>

                    <p className="text-[11px] font-sans text-stone-500 dark:text-stone-400 truncate">
                      {chapter.subtitle.split('•')[0]}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Footer Coordinates */}
          <div className="mt-4 pt-3 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-[10px] font-mono text-stone-400">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-red-500" />
              SL (Colombo / Badulla)
            </span>
            <span>Remote Global Ready</span>
          </div>
        </div>
      )}
    </div>
  );
};

