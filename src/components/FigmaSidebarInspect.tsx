import React, { useState } from 'react';
import {
  Code,
  Copy,
  Check,
  Activity
} from 'lucide-react';
import { CAREER_CHAPTERS } from '../data/portfolioData';

interface FigmaSidebarInspectProps {
  selectedFrameId: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isDevMode: boolean;
  isLightMode?: boolean;
}

export const FigmaSidebarInspect: React.FC<FigmaSidebarInspectProps> = ({
  selectedFrameId,
  isOpen,
  setIsOpen,
  isDevMode,
  isLightMode = false
}) => {
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'design' | 'dev'>('design');

  const selectedChapter = CAREER_CHAPTERS.find((c) => c.id === selectedFrameId);

  const getCodeSnippet = () => {
    if (selectedFrameId === 'frame-hero') {
      return `// Pavithra Meddaduwage — Software Engineer Specs
export const candidate = {
  name: "Pavithra Meddaduwage",
  role: "Database Programmer & Full Stack Engineer",
  experience: "3+ Years Enterprise Experience",
  availability: "Immediate (Global & Remote)",
  coreEngines: ["PostgreSQL", "NestJS", "Angular", "Redis", "TypeScript"]
};`;
    }
    if (selectedChapter) {
      return `// Architecture Blueprint: ${selectedChapter.title}
@Injectable()
export class ${selectedChapter.title.replace(/[^a-zA-Z]/g, '')}Service {
  constructor(
    private readonly pgCluster: DatabaseService,
    private readonly cache: RedisService
  ) {}

  async processHighVolumeTransactions(batch: RetailDataset): Promise<PipelineStatus> {
    const validated = await this.sanitizeVendorSchemas(batch);
    return this.pgCluster.batchInsert(validated);
  }
}`;
    }
    return `// PostgreSQL Query Optimization
EXPLAIN (ANALYZE, BUFFERS)
SELECT partner, count(*)
FROM horizon_transactions
WHERE status = 'OPTIMIZED'
GROUP BY partner;`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(getCodeSnippet());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 1800);
  };

  const borderClass = isLightMode ? 'border-slate-200' : 'border-[#383838]';
  const bgClass = isLightMode ? 'bg-white' : 'bg-[#202023]';
  const textMutedClass = isLightMode ? 'text-slate-500' : 'text-[#8c8c8c]';
  const textMainClass = isLightMode ? 'text-slate-900' : 'text-white';
  const cardBgClass = isLightMode ? 'bg-slate-100 border-slate-200' : 'bg-[#18181b] border-[#383838]';

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        title="Open Inspect & Dev Mode Panel (⌥2)"
        className={`fixed right-2 top-14 z-40 p-2 rounded ${bgClass} border ${borderClass} ${textMutedClass} hover:${textMainClass} shadow-lg cursor-pointer`}
      >
        <Code className="w-4 h-4" />
      </button>
    );
  }

  return (
    <aside className={`w-72 border-l ${borderClass} ${bgClass} flex flex-col z-30 select-none text-xs shrink-0 transition-colors`}>
      {/* Header Tabs: Design / Dev Mode */}
      <div className={`flex items-center justify-between px-3 h-10 border-b ${borderClass}`}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('design')}
            type="button"
            className={`font-semibold transition-colors cursor-pointer ${
              activeTab === 'design'
                ? `${textMainClass} border-b-2 border-[#0d99ff] pb-2 pt-2`
                : `${textMutedClass} hover:${textMainClass}`
            }`}
          >
            Design
          </button>
          <button
            onClick={() => setActiveTab('dev')}
            type="button"
            className={`font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
              activeTab === 'dev' || isDevMode
                ? 'text-[#10b981] border-b-2 border-[#10b981] pb-2 pt-2'
                : `${textMutedClass} hover:${textMainClass}`
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Dev Mode</span>
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

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {/* Frame Identification */}
        <div className={`p-2.5 rounded ${cardBgClass} border`}>
          <span className={`text-[10px] font-mono ${textMutedClass} uppercase block mb-1`}>
            Selected Frame
          </span>
          <h4 className={`font-semibold ${textMainClass} truncate text-xs`}>
            {selectedChapter ? selectedChapter.title : 'Hero & Core Architecture'}
          </h4>
          <span className="text-[10px] font-mono text-[#0d99ff] font-bold">
            {selectedChapter ? `# ${selectedChapter.id}` : '# frame-hero'}
          </span>
        </div>

        {/* Geometry & Alignment Metrics */}
        <div className={`space-y-2 border-t ${borderClass} pt-3`}>
          <span className={`text-[10px] font-mono ${textMutedClass} uppercase tracking-wider block`}>
            Frame Transform & Layout
          </span>
          <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
            <div className={`p-1.5 rounded ${cardBgClass} border flex justify-between`}>
              <span className={textMutedClass}>W:</span>
              <span className={textMainClass}>1280px</span>
            </div>
            <div className={`p-1.5 rounded ${cardBgClass} border flex justify-between`}>
              <span className={textMutedClass}>H:</span>
              <span className={textMainClass}>Auto (Fit)</span>
            </div>
            <div className={`p-1.5 rounded ${cardBgClass} border flex justify-between`}>
              <span className={textMutedClass}>Radius:</span>
              <span className={textMainClass}>16px</span>
            </div>
            <div className={`p-1.5 rounded ${cardBgClass} border flex justify-between`}>
              <span className={textMutedClass}>Gap:</span>
              <span className={textMainClass}>24px</span>
            </div>
          </div>
        </div>

        {/* Architecture & Engineering Metrics */}
        <div className={`space-y-2 border-t ${borderClass} pt-3`}>
          <span className={`text-[10px] font-mono ${textMutedClass} uppercase tracking-wider block flex items-center gap-1`}>
            <Activity className="w-3 h-3 text-[#10b981]" />
            <span>Architecture Telemetry</span>
          </span>

          <div className="space-y-1.5 font-mono text-[11px]">
            <div className={`p-2 rounded ${cardBgClass} border flex items-center justify-between`}>
              <span className={textMutedClass}>Query Latency</span>
              <span className="text-[#10b981] font-bold">&lt; 80ms</span>
            </div>
            <div className={`p-2 rounded ${cardBgClass} border flex items-center justify-between`}>
              <span className={textMutedClass}>Data Accuracy</span>
              <span className="text-[#0d99ff] font-bold">100% Zero Loss</span>
            </div>
            <div className={`p-2 rounded ${cardBgClass} border flex items-center justify-between`}>
              <span className={textMutedClass}>Deploy Regressions</span>
              <span className="text-[#a855f7] font-bold">0 Rollbacks</span>
            </div>
          </div>
        </div>

        {/* Code Snippet / Dev Mode Inspection */}
        <div className={`space-y-2 border-t ${borderClass} pt-3`}>
          <div className="flex items-center justify-between">
            <span className={`text-[10px] font-mono ${textMutedClass} uppercase tracking-wider`}>
              Dev Mode Code
            </span>
            <button
              onClick={handleCopyCode}
              type="button"
              className={`${textMutedClass} hover:${textMainClass} flex items-center gap-1 font-mono text-[10px] transition-colors cursor-pointer`}
            >
              {copiedCode ? <Check className="w-3 h-3 text-[#10b981]" /> : <Copy className="w-3 h-3" />}
              <span>{copiedCode ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <pre className={`p-2.5 rounded ${isLightMode ? 'bg-slate-900 text-teal-300' : 'bg-[#121214] text-[#2dd4bf]'} border ${borderClass} text-[10.5px] font-mono overflow-x-auto leading-relaxed max-h-48`}>
            <code>{getCodeSnippet()}</code>
          </pre>
        </div>
      </div>
    </aside>
  );
};
