import React, { useState } from 'react';
import { Terminal, Play, Check, Database, Copy } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QueryResult {
  columns: string[];
  rows: (string | number)[][];
  planningTime: string;
  executionTime: string;
  buffers: string;
  notes?: string;
}

interface QuerySandboxProps {
  isLightMode?: boolean;
}

const PRESET_QUERIES: { label: string; sql: string; result: QueryResult }[] = [
  {
    label: 'High-Scale POS Ingestion',
    sql: "SELECT partner, records_processed, latency_ms, status FROM horizon_pipelines WHERE status = 'OPTIMIZED';",
    result: {
      columns: ['partner', 'records_processed', 'latency_ms', 'status'],
      rows: [
        ['Retail Partner Alpha', '2,450,000+', 48, 'OPTIMIZED'],
        ['Retail Partner Beta', '3,800,000+', 54, 'OPTIMIZED'],
        ['Enterprise POS Stream', '1,920,000+', 62, 'OPTIMIZED']
      ],
      planningTime: '0.042 ms',
      executionTime: '0.118 ms',
      buffers: 'shared hit=842 read=0 written=0',
      notes: 'Composite B-Tree index scan used. Zero sequential table scans.'
    }
  },
  {
    label: 'Database & Systems Mastery',
    sql: "EXPLAIN ANALYZE SELECT skill, proficiency_score, category FROM engineering_atlas WHERE proficiency_score >= 90;",
    result: {
      columns: ['skill', 'proficiency_score', 'category'],
      rows: [
        ['PostgreSQL & SQL Tuning', 95, 'Database Systems'],
        ['NestJS Microservices', 95, 'Backend Architecture'],
        ['TypeScript & Node.js', 95, 'Core Engineering'],
        ['Power BI REST APIs', 90, 'Business Intelligence'],
        ['Angular Enterprise', 90, 'Frontend Architecture'],
        ['Next.js & React', 92, 'Full Stack Web']
      ],
      planningTime: '0.038 ms',
      executionTime: '0.094 ms',
      buffers: 'shared hit=314 read=0 written=0',
      notes: 'Index Only Scan using idx_skills_proficiency. Zero disk I/O.'
    }
  },
  {
    label: 'Why Hire Pavithra?',
    sql: "SELECT candidate, availability, track_record, superpower FROM candidates WHERE candidate = 'Pavithra Meddaduwage';",
    result: {
      columns: ['candidate', 'availability', 'track_record', 'superpower'],
      rows: [
        [
          'Pavithra Meddaduwage',
          'Immediate (Global Remote)',
          '100% On-time deployments & 0 rollbacks',
          'Turns 4-hour batch lags into sub-second stream pipelines'
        ]
      ],
      planningTime: '0.015 ms',
      executionTime: '0.045 ms',
      buffers: 'shared hit=12',
      notes: 'Candidate meets 100% of enterprise reliability criteria.'
    }
  }
];

export const QuerySandbox: React.FC<QuerySandboxProps> = ({ isLightMode = false }) => {
  const [selectedPreset, setSelectedPreset] = useState<number>(0);
  const [customSql, setCustomSql] = useState<string>(PRESET_QUERIES[0].sql);
  const [activeResult, setActiveResult] = useState<QueryResult>(PRESET_QUERIES[0].result);
  const [copied, setCopied] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const handleSelectPreset = (index: number) => {
    setSelectedPreset(index);
    setCustomSql(PRESET_QUERIES[index].sql);
    setActiveResult(PRESET_QUERIES[index].result);
  };

  const handleExecute = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      confetti({
        particleCount: 20,
        spread: 45,
        origin: { y: 0.9 }
      });
    }, 250);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(customSql);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const borderClass = isLightMode ? 'border-slate-200' : 'border-[#2c2c2c]';
  const textMutedClass = isLightMode ? 'text-slate-500' : 'text-[#8c8c8c]';
  const textMainClass = isLightMode ? 'text-slate-900' : 'text-white';
  const btnBgClass = isLightMode ? 'bg-slate-100 hover:bg-slate-200 text-slate-800' : 'bg-[#1e1e1e] hover:bg-[#2c2c2c] text-white';

  return (
    <section className="p-6 sm:p-10 select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#2c2c2c] gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold mb-2">
            <Database className="w-3.5 h-3.5" />
            <span>Interactive SQL Terminal • PostgreSQL 16</span>
          </div>
          <h3 className={`font-sans text-2xl sm:text-3xl font-black ${textMainClass}`}>
            Query the Database of Experience
          </h3>
          <p className={`text-xs sm:text-sm ${textMutedClass} mt-1 font-mono`}>
            Execute live relational queries against Pavithra's career milestones and metrics.
          </p>
        </div>

        {/* Quick preset selector buttons */}
        <div className="flex flex-wrap gap-2">
          {PRESET_QUERIES.map((preset, idx) => (
            <button
              key={preset.label}
              onClick={() => handleSelectPreset(idx)}
              type="button"
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                selectedPreset === idx
                  ? 'bg-[#0d99ff] text-white shadow-sm'
                  : `${btnBgClass} border border-transparent`
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* SQL Input Area */}
      <div className="mt-6 rounded-2xl bg-[#090d16] border border-[#2c2c2c] p-4 font-mono text-sm shadow-inner relative">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" />
            <span className="ml-2 font-bold text-slate-300">psql (PostgreSQL 16.2 — production)</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              type="button"
              className="hover:text-white transition-colors cursor-pointer"
              title="Copy query"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        <textarea
          value={customSql}
          onChange={(e) => setCustomSql(e.target.value)}
          rows={3}
          className="w-full bg-transparent text-emerald-300 focus:outline-none resize-none font-mono text-xs sm:text-sm leading-relaxed"
          spellCheck={false}
        />

        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <span className="text-[10px] text-slate-500 font-mono">
            Press Run to compile query plan
          </span>
          <button
            onClick={handleExecute}
            disabled={isRunning}
            type="button"
            className="px-4 py-1.5 rounded-xl bg-[#0d99ff] hover:bg-[#0084e6] text-white text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md"
          >
            <Play className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? 'Analyzing...' : 'Execute Query'}</span>
          </button>
        </div>
      </div>

      {/* Query Result Table */}
      <div className={`mt-6 overflow-x-auto rounded-2xl border ${borderClass} ${isLightMode ? 'bg-white' : 'bg-[#121215]'} shadow-sm`}>
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className={`${isLightMode ? 'bg-slate-100 text-slate-700' : 'bg-[#18181b] text-slate-400'} border-b ${borderClass}`}>
              {activeResult.columns.map((col) => (
                <th key={col} className="px-4 py-2.5 font-bold uppercase tracking-wider">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={`divide-y ${borderClass} ${isLightMode ? 'text-slate-800' : 'text-slate-200'}`}>
            {activeResult.rows.map((row, rIdx) => (
              <tr key={rIdx} className={`${isLightMode ? 'hover:bg-slate-50' : 'hover:bg-white/[0.02]'} transition-colors`}>
                {row.map((val, cIdx) => (
                  <td key={cIdx} className="px-4 py-2.5 whitespace-nowrap">
                    {typeof val === 'number' ? (
                      <span className="font-bold text-[#0d99ff]">{val}</span>
                    ) : (
                      <span>{val}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Telemetry Footer */}
      <div className={`mt-4 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] font-mono ${textMutedClass} gap-2 px-1`}>
        <div className="flex items-center gap-3">
          <span>⏱️ Planning: <strong className={textMainClass}>{activeResult.planningTime}</strong></span>
          <span>⚡ Execution: <strong className="text-emerald-400">{activeResult.executionTime}</strong></span>
          <span className="hidden md:inline">💾 {activeResult.buffers}</span>
        </div>
        {activeResult.notes && (
          <span className="text-[#0d99ff] italic">
            ✦ {activeResult.notes}
          </span>
        )}
      </div>
    </section>
  );
};
