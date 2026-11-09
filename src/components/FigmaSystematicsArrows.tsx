import React from 'react';
import { Database, Server, Zap, Activity } from 'lucide-react';

interface FigmaSystematicsArrowsProps {
  isLightMode?: boolean;
}

export const FigmaSystematicsArrows: React.FC<FigmaSystematicsArrowsProps> = ({ isLightMode = false }) => {
  const bgClass = isLightMode ? 'bg-white border-slate-200' : 'bg-[#141418] border-[#2c2c2c]';
  const nodeBgClass = isLightMode ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-[#1a1a1f] border-[#383838] text-white';
  const textMutedClass = isLightMode ? 'text-slate-500' : 'text-[#8c8c8c]';
  const textMainClass = isLightMode ? 'text-slate-900' : 'text-white';
  const borderClass = isLightMode ? 'border-slate-200' : 'border-[#2c2c2c]';

  return (
    <div className={`p-6 rounded-2xl ${bgClass} border relative overflow-hidden select-none transition-colors`}>
      {/* Schematic Header */}
      <div className={`flex items-center justify-between pb-4 border-b ${borderClass} mb-6`}>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
          <h4 className={`font-mono text-xs font-bold uppercase tracking-wider ${textMainClass}`}>
            Architecture Systematics & Data Flow
          </h4>
        </div>
        <span className={`text-[10px] font-mono ${textMutedClass} border ${borderClass} px-2 py-0.5 rounded`}>
          Live Pipeline Flow
        </span>
      </div>

      {/* Responsive Systematics Flow Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
        {/* Node 1: Ingest Sources */}
        <div className={`p-4 rounded-xl ${nodeBgClass} border relative group hover:border-[#0d99ff] transition-all`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-[10px] font-mono ${textMutedClass}`}>01. INGEST SOURCE</span>
            <Activity className="w-3.5 h-3.5 text-[#0d99ff]" />
          </div>
          <h5 className={`font-bold ${textMainClass} text-sm`}>Retail POS Batches</h5>
          <p className={`text-[11px] ${textMutedClass} mt-1 font-mono`}>
            Multi-gigabyte Point-of-Sale data ingestion streams.
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-[10px] font-mono text-[#0d99ff]">
            <span>Rate: High-Volume Stream</span>
          </div>
        </div>

        {/* Node 2: NestJS Microservices */}
        <div className={`p-4 rounded-xl ${nodeBgClass} border relative group hover:border-[#9747ff] transition-all`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-[10px] font-mono ${textMutedClass}`}>02. PROCESSING CORE</span>
            <Server className="w-3.5 h-3.5 text-[#9747ff]" />
          </div>
          <h5 className={`font-bold ${textMainClass} text-sm`}>NestJS Microservices</h5>
          <p className={`text-[11px] ${textMutedClass} mt-1 font-mono`}>
            Schema validation, contract normalization & idempotent queue dispatch.
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-[10px] font-mono text-[#9747ff]">
            <span>Retries: Exponential Backoff</span>
          </div>
        </div>

        {/* Node 3: PostgreSQL Cluster */}
        <div className={`p-4 rounded-xl ${nodeBgClass} border relative group hover:border-[#10b981] transition-all`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-[10px] font-mono ${textMutedClass}`}>03. RELATIONAL ENGINE</span>
            <Database className="w-3.5 h-3.5 text-[#10b981]" />
          </div>
          <h5 className={`font-bold ${textMainClass} text-sm`}>PostgreSQL Cluster</h5>
          <p className={`text-[11px] ${textMutedClass} mt-1 font-mono`}>
            Partitioned tables, composite B-Tree indexes, zero sequential scans.
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-[10px] font-mono text-[#10b981]">
            <span>Latency: &lt; 80ms P99</span>
          </div>
        </div>

        {/* Node 4: Power BI & Client UIs */}
        <div className={`p-4 rounded-xl ${nodeBgClass} border relative group hover:border-[#f59e0b] transition-all`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-[10px] font-mono ${textMutedClass}`}>04. PRESENTATION & AUDIT</span>
            <Zap className="w-3.5 h-3.5 text-[#f59e0b]" />
          </div>
          <h5 className={`font-bold ${textMainClass} text-sm`}>Power BI REST & Angular</h5>
          <p className={`text-[11px] ${textMutedClass} mt-1 font-mono`}>
            Automated scheduled report pulls & real-time governance dashboards.
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-[10px] font-mono text-[#f59e0b]">
            <span>Sync: 100% Automated</span>
          </div>
        </div>
      </div>

      {/* SVG Connecting Wire Overlay with Animated Dashes */}
      <div className="hidden md:block mt-4 pt-2">
        <svg className="w-full h-8" viewBox="0 0 800 24" fill="none">
          <path
            d="M 100 12 L 300 12 L 500 12 L 700 12"
            stroke={isLightMode ? "#cbd5e1" : "#383838"}
            strokeWidth="2"
          />
          <path
            d="M 100 12 L 300 12 L 500 12 L 700 12"
            stroke="#0d99ff"
            strokeWidth="2"
            className="schematic-wire"
          />
          <circle cx="100" cy="12" r="4" fill="#0d99ff" />
          <circle cx="300" cy="12" r="4" fill="#9747ff" />
          <circle cx="500" cy="12" r="4" fill="#10b981" />
          <circle cx="700" cy="12" r="4" fill="#f59e0b" />
        </svg>
      </div>
    </div>
  );
};
