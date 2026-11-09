import React, { useState } from 'react';
import { Briefcase, X, Sparkles, CheckCircle2, Shield, Zap, Coffee, Database, Cpu, Compass } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BagItem {
  id: string;
  name: string;
  category: string;
  icon: string;
  stat: string;
  rarity: 'Legendary' | 'Epic' | 'Essential';
  description: string;
  engineerLore: string;
}

const BAG_ITEMS: BagItem[] = [
  {
    id: 'pg-lens',
    name: 'PostgreSQL EXPLAIN ANALYZE Lens',
    category: 'Database Artifact',
    icon: '🔍',
    stat: '+95 Query Optimization',
    rarity: 'Legendary',
    description: 'An optical analyzer that dissects query execution trees into buffer hits, heap fetches, and nested loop joins.',
    engineerLore: 'Eliminated sequential table scans across multi-million row retail datasets at Horizon Group USA, trimming query latency from seconds down to milliseconds.'
  },
  {
    id: 'ceylon-tea',
    name: 'Misty Peak Ceylon Spiced Tea Flask',
    category: 'Essential Sustenance',
    icon: '☕',
    stat: '+100 Focus at 3:00 AM',
    rarity: 'Essential',
    description: 'High-grown Sri Lankan black tea with a touch of authentic Ceylon cinnamon. Vacuum-insulated for marathon engineering sessions.',
    engineerLore: 'The secret companion behind zero-downtime database migrations, midnight production rollouts, and MSc algorithm problem sets.'
  },
  {
    id: 'redis-flask',
    name: 'Redis In-Memory Lightning Vial',
    category: 'Systems Artifact',
    icon: '⚡',
    stat: 'Sub-3ms Cache Hydration',
    rarity: 'Epic',
    description: 'A pressurized container holding distributed idempotency keys, rate limiters, and high-velocity session caches.',
    engineerLore: 'Constructed throttled queue consumers for Amazon SP-APIs, shielding primary PostgreSQL clusters from sudden batch spikes.'
  },
  {
    id: 'docker-box',
    name: 'Docker Container Bento Box',
    category: 'DevOps & Tooling',
    icon: '🐳',
    stat: '100% Environment Parity',
    rarity: 'Epic',
    description: 'A multi-compartment carrier ensuring exact reproducible execution across macOS development, staging, and cloud production.',
    engineerLore: 'Containerized NestJS microservices and PostgreSQL seed databases for seamless team onboarding and automated CI/CD checks.'
  },
  {
    id: 'walkie-radio',
    name: 'Shortwave Walkie-Talkie Transceiver',
    category: 'Communications',
    icon: '📻',
    stat: 'Global Remote Uplink',
    rarity: 'Essential',
    description: 'Rugged communications device tuned to async team channels spanning North America, Europe, and Sri Lanka.',
    engineerLore: 'Enables crystal-clear async collaboration, proactive architecture roadmapping, and instant escalation handling.'
  },
  {
    id: 'sliit-parchment',
    name: 'SLIIT Knowledge Citadel Parchment',
    category: 'Academic Relic',
    icon: '📜',
    stat: 'BSc Hons + MSc Specialization',
    rarity: 'Legendary',
    description: 'Ancient parchment inscribed with formal proofs, relational calculus, distributed consensus theorems, and data structures.',
    engineerLore: 'The foundational bedrock: 4 years of rigorous BSc IT study + active MSc in Enterprise Architecture at Sri Lanka’s premier computing institute.'
  },
  {
    id: 'powerbi-prism',
    name: 'Power BI REST Automation Prism',
    category: 'Analytics & BI',
    icon: '📊',
    stat: '100% Automated Governance',
    rarity: 'Epic',
    description: 'A crystal that refracts raw relational rows into executive audit metrics and automated scheduled sync payloads.',
    engineerLore: 'Replaced manual multi-day Excel reporting with fully automated REST-driven audit pipelines for corporate compliance.'
  },
  {
    id: 'terminal-stamp',
    name: 'Bash Shell Deployment Stamp',
    category: 'Tactile Engineering',
    icon: '🏷️',
    stat: 'Zero Production Regressions',
    rarity: 'Essential',
    description: 'A hand-carved wooden rubber stamp marking builds as green and verified through automated end-to-end regression suites.',
    engineerLore: 'Delivered 5+ full-scale web platforms with a clean 100% on-time deployment record and zero emergency rollbacks.'
  }
];

export const TravelerBagModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<BagItem>(BAG_ITEMS[0]);

  const handleOpen = () => {
    setIsOpen(true);
    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.85 }
    });
  };

  return (
    <>
      {/* Floating Bag Launcher Button (Sunny Wang style companion button) */}
      <button
        onClick={handleOpen}
        type="button"
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-100/90 dark:bg-stone-800 border border-amber-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 text-xs font-mono font-bold hover:bg-amber-200/90 dark:hover:bg-stone-700 transition-all shadow-sm cursor-pointer"
      >
        <Briefcase className="w-3.5 h-3.5 text-amber-700 dark:text-teal-400" />
        <span>Traveler's Bag</span>
        <span className="px-1.5 py-0.2 rounded-full bg-amber-600 dark:bg-teal-500 text-white text-[10px]">
          {BAG_ITEMS.length}
        </span>
      </button>

      {/* Bag Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 dark:bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl rounded-3xl bg-[#fffdf9] dark:bg-[#101726] border-2 border-stone-300 dark:border-stone-700 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-stone-200 dark:border-stone-800">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-teal-950 text-amber-800 dark:text-teal-300 text-[11px] font-mono font-bold mb-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Sunny Wang Style • Gear & Inventory</span>
                </div>
                <h3 className="font-serif text-2xl font-black text-stone-900 dark:text-stone-100">
                  Pavithra's Field Pack & Tech Gear
                </h3>
                <p className="text-xs font-sans text-stone-500 dark:text-stone-400 mt-1">
                  The tools, artifacts, and fuel carried along the software craftsmanship journey.
                </p>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                type="button"
                className="p-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Content Grid: Items Inventory (Left) + Detail Card (Right) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
              {/* Item Slots (Left) */}
              <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 gap-3">
                {BAG_ITEMS.map((item) => {
                  const isSelected = selectedItem.id === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      type="button"
                      className={`p-3 rounded-2xl border text-left transition-all duration-200 flex items-start gap-3 cursor-pointer ${
                        isSelected
                          ? 'border-amber-600 dark:border-teal-400 bg-amber-50/80 dark:bg-teal-950/40 shadow-md ring-2 ring-amber-500/30'
                          : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 bg-white dark:bg-stone-900/60'
                      }`}
                    >
                      <span className="text-2xl select-none">{item.icon}</span>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-mono text-xs font-bold text-stone-900 dark:text-stone-100 truncate">
                          {item.name}
                        </h4>
                        <span className="text-[10px] font-mono text-amber-700 dark:text-teal-400">
                          {item.category}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Detail Card (Right) */}
              <div className="md:col-span-5 rounded-2xl bg-stone-50 dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-4xl select-none">{selectedItem.icon}</span>
                    <span
                      className={`text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full ${
                        selectedItem.rarity === 'Legendary'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800'
                          : selectedItem.rarity === 'Epic'
                          ? 'bg-purple-100 text-purple-900 border border-purple-300 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800'
                          : 'bg-emerald-100 text-emerald-900 border border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800'
                      }`}
                    >
                      ★ {selectedItem.rarity}
                    </span>
                  </div>

                  <h4 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100 mb-1">
                    {selectedItem.name}
                  </h4>
                  <div className="text-xs font-mono font-bold text-teal-700 dark:text-teal-300 mb-3">
                    ⚡ {selectedItem.stat}
                  </div>

                  <p className="text-xs font-sans text-stone-600 dark:text-stone-300 leading-relaxed mb-4">
                    {selectedItem.description}
                  </p>

                  <div className="p-3 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
                    <span className="text-[10px] font-mono uppercase font-bold text-stone-400 block mb-1">
                      Engineer's Field Lore:
                    </span>
                    <p className="text-xs font-mono text-stone-700 dark:text-stone-300 leading-relaxed">
                      "{selectedItem.engineerLore}"
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-[11px] font-mono text-stone-500">
                  <span>Equipped & Battle-Tested</span>
                  <span className="text-amber-700 dark:text-teal-400 font-bold">Slot Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

