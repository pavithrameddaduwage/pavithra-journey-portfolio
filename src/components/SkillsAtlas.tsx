import React from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Database, Server, Layout, Cpu } from 'lucide-react';

interface SkillsAtlasProps {
  isLightMode?: boolean;
}

const iconMap: Record<string, React.ReactNode> = {
  Database: <Database className="w-5 h-5 text-[#10b981]" />,
  Server: <Server className="w-5 h-5 text-[#9747ff]" />,
  Layout: <Layout className="w-5 h-5 text-[#0d99ff]" />,
  Cpu: <Cpu className="w-5 h-5 text-[#f59e0b]" />
};

const barColors: Record<string, string> = {
  Database: 'bg-[#10b981]',
  Server: 'bg-[#9747ff]',
  Layout: 'bg-[#0d99ff]',
  Cpu: 'bg-[#f59e0b]'
};

export const SkillsAtlas: React.FC<SkillsAtlasProps> = ({ isLightMode = false }) => {
  const borderClass = isLightMode ? 'border-slate-200' : 'border-[#2c2c2c]';
  const textMutedClass = isLightMode ? 'text-slate-500' : 'text-[#8c8c8c]';
  const textMainClass = isLightMode ? 'text-slate-900' : 'text-white';
  const cardBgClass = isLightMode ? 'bg-slate-50 border-slate-200 hover:border-[#0d99ff]' : 'bg-[#141418] border-[#2c2c2c] hover:border-[#0d99ff]/60';
  const innerCardBgClass = isLightMode ? 'bg-white border-slate-200' : 'bg-[#1e1e1e] border-[#383838]';
  const trackBgClass = isLightMode ? 'bg-slate-200' : 'bg-[#202024]';

  return (
    <section id="skills-atlas" className="p-6 sm:p-10 select-none">
      {/* Chapter Title Badge */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b ${borderClass} mb-8 gap-4`}>
        <div>
          <span className="px-2.5 py-0.5 text-[11px] font-mono font-bold uppercase rounded bg-[#0d99ff]/10 text-[#0d99ff] border border-[#0d99ff]/30 inline-block mb-2">
            # Component Library & Capabilities
          </span>
          <h2 className={`text-2xl sm:text-3xl font-black ${textMainClass} tracking-tight`}>
            Engineering Matrix & System Core
          </h2>
          <p className={`max-w-2xl text-xs sm:text-sm ${textMutedClass} mt-1 font-mono`}>
            High-throughput PostgreSQL schemas, NestJS microservice pipelines, and responsive enterprise frontends.
          </p>
        </div>

        <div className={`flex items-center gap-2 text-[10px] font-mono ${textMutedClass}`}>
          <span className={`px-2 py-1 rounded ${innerCardBgClass} border`}>
            Auto-Layout: Flex-Grid
          </span>
          <span className={`px-2 py-1 rounded ${innerCardBgClass} border text-[#10b981] font-bold`}>
            4 Master Clusters
          </span>
        </div>
      </div>

      {/* Grid of 4 Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SKILL_CATEGORIES.map((category) => (
          <div
            key={category.title}
            className={`rounded-xl p-5 ${cardBgClass} border transition-all duration-200 group shadow-lg`}
          >
            {/* Top Bar with Icon */}
            <div className={`flex items-center justify-between mb-5 pb-3 border-b ${borderClass}`}>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${innerCardBgClass} border group-hover:scale-105 transition-transform`}>
                  {iconMap[category.iconName] || <Cpu className="w-5 h-5" />}
                </div>
                <h3 className={`font-bold text-base ${textMainClass} group-hover:text-[#0d99ff] transition-colors`}>
                  {category.title}
                </h3>
              </div>
              <span className={`text-[10px] font-mono ${textMutedClass} ${innerCardBgClass} px-2 py-0.5 rounded border`}>
                {category.skills.length} Nodes
              </span>
            </div>

            {/* List of Skills */}
            <div className="space-y-3.5">
              {category.skills.map((skill) => (
                <div key={skill.name} className="group/item">
                  <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                    <span className={`font-medium ${isLightMode ? 'text-slate-700' : 'text-stone-200'} flex items-center gap-2`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0d99ff]" />
                      {skill.name}
                    </span>
                    <div className="flex items-center gap-2">
                      {skill.tag && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#0d99ff]/10 text-[#0d99ff] border border-[#0d99ff]/20">
                          {skill.tag}
                        </span>
                      )}
                      <span className={`${textMutedClass} text-[11px] font-bold`}>
                        {skill.proficiency}%
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className={`h-1.5 w-full ${trackBgClass} rounded-full overflow-hidden`}>
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        barColors[category.iconName] || 'bg-[#0d99ff]'
                      }`}
                      style={{ width: `${skill.proficiency}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
