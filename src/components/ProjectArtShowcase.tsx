import React from 'react';
import { Database, Server, Layers, Cpu, CheckCircle2, Shield, Zap, Globe, BookOpen } from 'lucide-react';

interface ProjectArtShowcaseProps {
  theme: 'database' | 'fullstack' | 'frontend' | 'internship' | 'university';
  title: string;
  subtitle: string;
  metrics: string[];
  isLightMode?: boolean;
}

export const ProjectArtShowcase: React.FC<ProjectArtShowcaseProps> = ({
  theme,
  title,
  subtitle,
  metrics,
  isLightMode = false
}) => {
  const borderClass = isLightMode ? 'border-slate-200' : 'border-white/10';
  const cardBgClass = isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.03] border-white/10';
  const textMutedClass = isLightMode ? 'text-slate-500' : 'text-slate-400';
  const textMainClass = isLightMode ? 'text-slate-900' : 'text-white';

  // 1. Horizon Group USA — Enterprise Data Engine & Ingestion (Clean, Professional Tech Showcase)
  if (theme === 'database') {
    return (
      <div className={`relative w-full rounded-2xl overflow-hidden p-6 sm:p-8 ${isLightMode ? 'bg-gradient-to-br from-white via-slate-50 to-slate-100 border border-slate-200' : 'bg-gradient-to-br from-[#121622] via-[#0d101a] to-[#090b12] border border-white/10'} shadow-xl transition-all`}>
        {/* Header */}
        <div className={`flex flex-wrap items-center justify-between pb-4 border-b ${borderClass} gap-2`}>
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-500 dark:text-cyan-400">
              High-Throughput Data Ingestion & Storage Architecture
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-500 border border-cyan-500/30 text-[10px] font-mono font-bold">
              PostgreSQL
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-500 border border-purple-500/30 text-[10px] font-mono font-bold">
              NestJS
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 text-[10px] font-mono font-bold">
              Redis
            </span>
          </div>
        </div>

        {/* Core Architecture Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
          <div className={`p-4 rounded-xl ${cardBgClass} border`}>
            <span className={`text-[10px] font-mono ${textMutedClass} uppercase tracking-wider block mb-1`}>
              Data Ingestion Scale
            </span>
            <div className={`text-2xl font-bold font-mono ${textMainClass}`}>
              Millions of Records
            </div>
            <p className={`text-xs ${textMutedClass} mt-1.5 font-sans leading-relaxed`}>
              Multi-gigabyte transactional datasets ingested, sanitized, and stored with zero data loss.
            </p>
          </div>

          <div className={`p-4 rounded-xl ${cardBgClass} border`}>
            <span className={`text-[10px] font-mono ${textMutedClass} uppercase tracking-wider block mb-1`}>
              Query Optimization
            </span>
            <div className="text-2xl font-bold font-mono text-cyan-500">
              &lt; 50ms Target
            </div>
            <p className={`text-xs ${textMutedClass} mt-1.5 font-sans leading-relaxed`}>
              B-Tree composite indexes and table partitioning eliminating sequential scans.
            </p>
          </div>

          <div className={`p-4 rounded-xl ${cardBgClass} border`}>
            <span className={`text-[10px] font-mono ${textMutedClass} uppercase tracking-wider block mb-1`}>
              Governance & Automation
            </span>
            <div className="text-2xl font-bold font-mono text-emerald-500">
              100% Automated
            </div>
            <p className={`text-xs ${textMutedClass} mt-1.5 font-sans leading-relaxed`}>
              Power BI REST API connectors automating report syncs and access audit logs.
            </p>
          </div>
        </div>

        {/* Engineering Highlights Footer */}
        <div className={`pt-4 border-t ${borderClass} flex flex-wrap items-center justify-between text-xs font-mono gap-2`}>
          <span className={textMutedClass}>
            Core Focus: Data Validation Pipelines • Index Optimization • Background Processing Queues
          </span>
          <span className="text-emerald-500 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Verified Production Systems
          </span>
        </div>
      </div>
    );
  }

  // 2. Digisa — Commercial ERP Platforms & Inventory Systems
  if (theme === 'fullstack') {
    return (
      <div className={`relative w-full rounded-2xl overflow-hidden p-6 sm:p-8 ${isLightMode ? 'bg-gradient-to-br from-white via-slate-50 to-slate-100 border border-slate-200' : 'bg-gradient-to-br from-[#161220] via-[#100d18] to-[#0b0812] border border-white/10'} shadow-xl transition-all`}>
        {/* Header */}
        <div className={`flex flex-wrap items-center justify-between pb-4 border-b ${borderClass} gap-2`}>
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-500 dark:text-purple-400">
              Enterprise Resource Planning & POS Architecture
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-500 border border-purple-500/30 text-[10px] font-mono font-bold">
              Next.js
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-500 border border-cyan-500/30 text-[10px] font-mono font-bold">
              PostgreSQL
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/30 text-[10px] font-mono font-bold">
              Prisma
            </span>
          </div>
        </div>

        {/* ERP Architecture Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
          <div className={`p-4 rounded-xl ${cardBgClass} border`}>
            <span className={`text-[10px] font-mono ${textMutedClass} uppercase tracking-wider block mb-1`}>
              Inventory & POS Registers
            </span>
            <div className={`text-xl font-bold font-mono ${textMainClass}`}>
              Real-Time Stock
            </div>
            <p className={`text-xs ${textMutedClass} mt-1.5 font-sans leading-relaxed`}>
              Batch tracking, barcode scanning, thermal receipt generation, and offline-tolerant local cart sync.
            </p>
          </div>

          <div className={`p-4 rounded-xl ${cardBgClass} border`}>
            <span className={`text-[10px] font-mono ${textMutedClass} uppercase tracking-wider block mb-1`}>
              Field Operations & Dispatch
            </span>
            <div className="text-xl font-bold font-mono text-purple-500">
              Live Workorders
            </div>
            <p className={`text-xs ${textMutedClass} mt-1.5 font-sans leading-relaxed`}>
              Technician dispatching, spare parts billing, and automated recurring maintenance reminders.
            </p>
          </div>

          <div className={`p-4 rounded-xl ${cardBgClass} border`}>
            <span className={`text-[10px] font-mono ${textMutedClass} uppercase tracking-wider block mb-1`}>
              Delivery Track Record
            </span>
            <div className="text-xl font-bold font-mono text-emerald-500">
              100% On-Time
            </div>
            <p className={`text-xs ${textMutedClass} mt-1.5 font-sans leading-relaxed`}>
              5+ full-lifecycle web applications and custom management systems delivered with zero rollbacks.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className={`pt-4 border-t ${borderClass} flex flex-wrap items-center justify-between text-xs font-mono gap-2`}>
          <span className={textMutedClass}>
            Technologies: Next.js • Angular • PostgreSQL • NestJS • REST APIs
          </span>
          <span className="text-purple-500 font-bold">
            Zero Production Regressions
          </span>
        </div>
      </div>
    );
  }

  // 3. XESS Global — The Responsive Frontend Studio
  if (theme === 'frontend') {
    return (
      <div className={`relative w-full rounded-2xl overflow-hidden p-6 sm:p-8 ${isLightMode ? 'bg-gradient-to-br from-white via-slate-50 to-slate-100 border border-slate-200' : 'bg-gradient-to-br from-[#0c141f] via-[#090f18] to-[#05080e] border border-white/10'} shadow-xl transition-all`}>
        {/* Header */}
        <div className={`flex flex-wrap items-center justify-between pb-4 border-b ${borderClass} gap-2`}>
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-500 dark:text-sky-400">
              Responsive Design Studio & Commercial Web Platforms
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-500 border border-sky-500/30 text-[10px] font-mono font-bold">
              HTML5 / SCSS
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 text-[10px] font-mono font-bold">
              JavaScript
            </span>
          </div>
        </div>

        {/* Responsive Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
          <div className={`p-4 rounded-xl ${cardBgClass} border`}>
            <span className={`text-[10px] font-mono ${textMutedClass} uppercase tracking-wider block mb-1`}>
              Device Parity
            </span>
            <div className={`text-xl font-bold font-mono ${textMainClass}`}>
              100% Cross-Device
            </div>
            <p className={`text-xs ${textMutedClass} mt-1.5 font-sans leading-relaxed`}>
              Fluid layouts and strict responsive breakpoints spanning desktop, tablet, and mobile screens.
            </p>
          </div>

          <div className={`p-4 rounded-xl ${cardBgClass} border`}>
            <span className={`text-[10px] font-mono ${textMutedClass} uppercase tracking-wider block mb-1`}>
              Browser Testing
            </span>
            <div className="text-xl font-bold font-mono text-sky-500">
              All Major Engines
            </div>
            <p className={`text-xs ${textMutedClass} mt-1.5 font-sans leading-relaxed`}>
              Rigorous cross-browser verification across Chrome, Safari, Firefox, and Edge.
            </p>
          </div>

          <div className={`p-4 rounded-xl ${cardBgClass} border`}>
            <span className={`text-[10px] font-mono ${textMutedClass} uppercase tracking-wider block mb-1`}>
              Performance & a11y
            </span>
            <div className="text-xl font-bold font-mono text-emerald-500">
              High Lighthouse
            </div>
            <p className={`text-xs ${textMutedClass} mt-1.5 font-sans leading-relaxed`}>
              Accessible markup, semantic structure, and smooth animations without layout shifts.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className={`pt-4 border-t ${borderClass} flex flex-wrap items-center justify-between text-xs font-mono gap-2`}>
          <span className={textMutedClass}>
            Client Platforms: Commercial Brand Portals • Interactive Product Calculators
          </span>
          <span className="text-sky-500 font-bold">
            Pixel-Perfect Responsive Fidelity
          </span>
        </div>
      </div>
    );
  }

  // 4. CreativeHub — Headless Systems & Decoupled APIs
  if (theme === 'internship') {
    return (
      <div className={`relative w-full rounded-2xl overflow-hidden p-6 sm:p-8 ${isLightMode ? 'bg-gradient-to-br from-white via-slate-50 to-slate-100 border border-slate-200' : 'bg-gradient-to-br from-[#140c1a] via-[#0e0813] to-[#08040b] border border-white/10'} shadow-xl transition-all`}>
        {/* Header */}
        <div className={`flex flex-wrap items-center justify-between pb-4 border-b ${borderClass} gap-2`}>
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-pink-400 animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-pink-500 dark:text-pink-400">
              Headless CMS & GraphQL API Engineering
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-pink-500/10 text-pink-500 border border-pink-500/30 text-[10px] font-mono font-bold">
              GraphQL
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-500 border border-purple-500/30 text-[10px] font-mono font-bold">
              Strapi
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-500 border border-cyan-500/30 text-[10px] font-mono font-bold">
              Node.js
            </span>
          </div>
        </div>

        {/* Headless Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
          <div className={`p-4 rounded-xl ${cardBgClass} border`}>
            <span className={`text-[10px] font-mono ${textMutedClass} uppercase tracking-wider block mb-1`}>
              Decoupled Architecture
            </span>
            <div className={`text-xl font-bold font-mono ${textMainClass}`}>
              Headless Services
            </div>
            <p className={`text-xs ${textMutedClass} mt-1.5 font-sans leading-relaxed`}>
              Building headless content repositories with Strapi, custom schema hooks, and role-based publishing gates.
            </p>
          </div>

          <div className={`p-4 rounded-xl ${cardBgClass} border`}>
            <span className={`text-[10px] font-mono ${textMutedClass} uppercase tracking-wider block mb-1`}>
              API Optimization
            </span>
            <div className="text-xl font-bold font-mono text-pink-500">
              &lt; 100ms Responses
            </div>
            <p className={`text-xs ${textMutedClass} mt-1.5 font-sans leading-relaxed`}>
              Constructed GraphQL queries and REST endpoints for frontend consumption with strict schema contracts.
            </p>
          </div>

          <div className={`p-4 rounded-xl ${cardBgClass} border`}>
            <span className={`text-[10px] font-mono ${textMutedClass} uppercase tracking-wider block mb-1`}>
              Quality Assurance
            </span>
            <div className="text-xl font-bold font-mono text-emerald-500">
              Zero Regressions
            </div>
            <p className={`text-xs ${textMutedClass} mt-1.5 font-sans leading-relaxed`}>
              Automated database regression tests and backend QA suites protecting production environments.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className={`pt-4 border-t ${borderClass} flex flex-wrap items-center justify-between text-xs font-mono gap-2`}>
          <span className={textMutedClass}>
            Production Implementations: Resonate Global Ecosystem • Daily Publishing Infrastructure
          </span>
          <span className="text-pink-500 font-bold">
            Decoupled Microservice Contracts
          </span>
        </div>
      </div>
    );
  }

  // 5. SLIIT — Academic Foundations & Higher Education (Creative Academic Credential Card)
  return (
    <div className={`relative w-full rounded-2xl overflow-hidden p-6 sm:p-8 ${isLightMode ? 'bg-gradient-to-br from-white via-slate-50 to-slate-100 border border-slate-200' : 'bg-gradient-to-br from-[#18140e] via-[#110e08] to-[#0a0804] border border-amber-500/20'} shadow-xl transition-all`}>
      {/* Header */}
      <div className={`flex flex-wrap items-center justify-between pb-4 border-b ${borderClass} gap-2`}>
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-500">
            Higher Education & Theoretical Foundations
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/30 text-[10px] font-mono font-bold">
            BSc (Hons) IT
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/30 text-[10px] font-mono font-bold">
            MSc Candidate
          </span>
        </div>
      </div>

      {/* Degrees & Academic Mastery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        <div className={`p-5 rounded-xl ${cardBgClass} border`}>
          <div className="flex items-center gap-2 mb-1.5">
            <BookOpen className="w-4 h-4 text-amber-500" />
            <h4 className={`text-base font-bold ${textMainClass}`}>
              BSc (Hons) in Information Technology
            </h4>
          </div>
          <span className={`text-[11px] font-mono ${textMutedClass} block mb-3`}>
            SLIIT (Malabe, Sri Lanka) • 2020 – 2024
          </span>
          <p className={`text-xs ${textMutedClass} font-sans leading-relaxed`}>
            Rigorous 4-year study across relational database systems, algorithms, distributed systems, and modern software engineering principles.
          </p>
        </div>

        <div className={`p-5 rounded-xl ${cardBgClass} border`}>
          <div className="flex items-center gap-2 mb-1.5">
            <Layers className="w-4 h-4 text-amber-500" />
            <h4 className={`text-base font-bold ${textMainClass}`}>
              MSc in Information Technology
            </h4>
          </div>
          <span className={`text-[11px] font-mono ${textMutedClass} block mb-3`}>
            SLIIT (Malabe, Sri Lanka) • 2025 – Present
          </span>
          <p className={`text-xs ${textMutedClass} font-sans leading-relaxed`}>
            Advanced postgraduate specialization focusing on Enterprise Systems Architecture, Scalable Database Modeling, and Cloud Systems.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className={`pt-4 border-t ${borderClass} flex flex-wrap items-center justify-between text-xs font-mono gap-2`}>
        <span className={textMutedClass}>
          Theoretical Pillars: Relational Calculus • Index Data Structures • Distributed Architecture
        </span>
        <span className="text-amber-500 font-bold">
          Continuous Academic Mastery
        </span>
      </div>
    </div>
  );
};
