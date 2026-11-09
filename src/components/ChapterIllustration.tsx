import React from 'react';

interface SceneProps {
  theme: 'university' | 'internship' | 'frontend' | 'fullstack' | 'database';
  className?: string;
}

export const ChapterIllustration: React.FC<SceneProps> = ({ theme, className = '' }) => {
  if (theme === 'database') {
    // Horizon Group USA — Enterprise Data Engine & Cloud Pipelines
    return (
      <svg viewBox="0 0 540 320" className={`w-full h-auto drop-shadow-xl select-none ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="540" height="320" rx="14" fill="#0d1117" />
        <rect x="12" y="12" width="516" height="296" rx="10" stroke="#30363d" strokeDasharray="4 4" />

        {/* Database Tower 1 */}
        <g>
          <rect x="70" y="70" width="110" height="180" rx="8" fill="#161b22" stroke="#10b981" strokeWidth="1.5" />
          <path d="M70 100 C70 90 180 90 180 100 C180 110 70 110 70 100" stroke="#10b981" strokeWidth="1.5" />
          <path d="M70 140 C70 130 180 130 180 140 C180 150 70 150 70 140" stroke="#10b981" strokeWidth="1.5" />
          <path d="M70 180 C70 170 180 170 180 180 C180 190 70 190 70 180" stroke="#10b981" strokeWidth="1.5" />
          <circle cx="95" cy="90" r="3" fill="#10b981" />
          <circle cx="110" cy="90" r="3" fill="#38bdf8" />
          <text x="82" y="225" fill="#34d399" className="text-[10px] font-mono font-bold">PG_CLUSTER</text>
          <text x="82" y="240" fill="#6ee7b7" className="text-[8px] font-mono">B-Tree Partitioned</text>
        </g>

        {/* Central Ingestion Hub & Pipeline */}
        <g>
          <path d="M180 160 L240 160 C260 160 260 120 280 120 L340 120" stroke="#0d99ff" strokeWidth="2.5" strokeDasharray="6 4" className="schematic-wire" />
          <path d="M180 200 L250 200 C270 200 270 230 290 230 L340 230" stroke="#a855f7" strokeWidth="2.5" strokeDasharray="6 4" className="schematic-wire" />
          
          {/* Main Processing Cube */}
          <rect x="220" y="100" width="110" height="96" rx="10" fill="#161b22" stroke="#0d99ff" strokeWidth="2" />
          <rect x="232" y="115" width="86" height="20" rx="4" fill="#0d99ff" opacity="0.2" />
          <text x="238" y="129" fill="#38bdf8" className="text-[9px] font-mono font-bold">STREAM::INGEST</text>
          <text x="235" y="152" fill="#e2e8f0" className="text-[8px] font-mono">Hobby Lobby</text>
          <text x="235" y="165" fill="#e2e8f0" className="text-[8px] font-mono">Five Below POS</text>
          <text x="235" y="178" fill="#e2e8f0" className="text-[8px] font-mono">Kohl's • MSI</text>
        </g>

        {/* BI & Power BI Streamer Output */}
        <g>
          <rect x="340" y="80" width="130" height="170" rx="10" fill="#161b22" stroke="#f59e0b" strokeWidth="2" />
          <rect x="355" y="95" width="100" height="32" rx="6" fill="#f59e0b" opacity="0.2" />
          <text x="365" y="112" fill="#fbbf24" className="text-[10px] font-mono font-bold">POWER BI API</text>
          <text x="365" y="123" fill="#fde68a" className="text-[7.5px] font-mono">REST SYNC</text>
          
          {/* Chart Bars */}
          <rect x="365" y="170" width="14" height="45" rx="2" fill="#10b981" />
          <rect x="385" y="150" width="14" height="65" rx="2" fill="#0d99ff" />
          <rect x="405" y="165" width="14" height="50" rx="2" fill="#a855f7" />
          <rect x="425" y="140" width="14" height="75" rx="2" fill="#fbbf24" />
          
          <line x1="355" y1="225" x2="450" y2="225" stroke="#4b5563" strokeWidth="1.5" />
        </g>

        {/* Telemetry Badge */}
        <g transform="translate(370, 265)">
          <rect width="140" height="28" rx="6" fill="#0d99ff" opacity="0.15" stroke="#0d99ff" strokeWidth="1" />
          <text x="14" y="18" fill="#38bdf8" className="text-[10px] font-mono font-bold">MILLIONS PROCESSED</text>
        </g>
      </svg>
    );
  }

  if (theme === 'fullstack') {
    // Digisa — Client Scale Full Stack & ERP Building
    return (
      <svg viewBox="0 0 540 320" className={`w-full h-auto drop-shadow-xl select-none ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="540" height="320" rx="14" fill="#0d1117" />
        <rect x="12" y="12" width="516" height="296" rx="10" stroke="#30363d" strokeDasharray="4 4" />

        {/* Pharmacy ERP Window */}
        <g>
          <rect x="60" y="60" width="220" height="180" rx="8" fill="#161b22" stroke="#10b981" strokeWidth="1.5" />
          <rect x="60" y="60" width="220" height="28" rx="8" fill="#10b981" opacity="0.15" />
          <circle cx="80" cy="74" r="3.5" fill="#f43f5e" />
          <circle cx="92" cy="74" r="3.5" fill="#fbbf24" />
          <circle cx="104" cy="74" r="3.5" fill="#10b981" />
          <text x="120" y="78" fill="#cbd5e1" className="text-[9px] font-mono">eheliyagoda-pharmacy.app</text>
          
          <rect x="80" y="105" width="90" height="14" rx="3" fill="#10b981" opacity="0.25" />
          <rect x="80" y="127" width="130" height="8" rx="2" fill="#334155" />
          <rect x="80" y="141" width="110" height="8" rx="2" fill="#334155" />
          <rect x="80" y="155" width="140" height="8" rx="2" fill="#334155" />
          
          <rect x="80" y="180" width="80" height="24" rx="4" fill="#10b981" />
          <text x="92" y="196" fill="#fff" className="text-[9px] font-mono font-bold">SUB-SEC POS</text>
        </g>

        {/* AC Management ERP Field Operations */}
        <g>
          <rect x="260" y="100" width="210" height="160" rx="8" fill="#161b22" stroke="#0d99ff" strokeWidth="1.5" />
          <rect x="275" y="115" width="180" height="24" rx="4" fill="#0d99ff" opacity="0.15" />
          <text x="285" y="131" fill="#38bdf8" className="text-[10px] font-mono font-bold">AC SERVICE FIELD ERP</text>

          <g transform="translate(280, 150)">
            <rect width="80" height="42" rx="4" fill="#1f2937" stroke="#374151" />
            <circle cx="15" cy="16" r="6" fill="#fbbf24" />
            <text x="28" y="15" fill="#e2e8f0" className="text-[7.5px] font-mono">Tech #04</text>
            <text x="28" y="26" fill="#10b981" className="text-[6.5px] font-mono font-bold">DISPATCHED</text>
          </g>
          <g transform="translate(370, 150)">
            <rect width="80" height="42" rx="4" fill="#1f2937" stroke="#374151" />
            <circle cx="15" cy="16" r="6" fill="#38bdf8" />
            <text x="28" y="15" fill="#e2e8f0" className="text-[7.5px] font-mono">Tech #12</text>
            <text x="28" y="26" fill="#0d99ff" className="text-[6.5px] font-mono font-bold">ON SITE</text>
          </g>
          
          <rect x="280" y="205" width="170" height="18" rx="3" fill="#10b981" opacity="0.2" />
          <text x="290" y="217" fill="#34d399" className="text-[8px] font-mono font-bold">100% ON-TIME CLIENT DELIVERY</text>
        </g>
      </svg>
    );
  }

  if (theme === 'frontend') {
    // XESS Global — The Responsive Frontend Studio
    return (
      <svg viewBox="0 0 540 320" className={`w-full h-auto drop-shadow-xl select-none ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="540" height="320" rx="14" fill="#0d1117" />
        <rect x="12" y="12" width="516" height="296" rx="10" stroke="#30363d" strokeDasharray="4 4" />

        {/* Desktop Monitor */}
        <g>
          <rect x="80" y="55" width="230" height="145" rx="8" fill="#161b22" stroke="#0d99ff" strokeWidth="2" />
          <rect x="80" y="55" width="230" height="20" rx="8" fill="#0d99ff" opacity="0.15" />
          <rect x="175" y="200" width="40" height="25" fill="#334155" />
          <rect x="150" y="225" width="90" height="6" rx="3" fill="#475569" />
          
          <rect x="100" y="90" width="70" height="85" rx="4" fill="#fbbf24" opacity="0.2" />
          <rect x="180" y="90" width="110" height="25" rx="3" fill="#a855f7" opacity="0.25" />
          <rect x="180" y="125" width="110" height="50" rx="3" fill="#1f2937" />
        </g>

        {/* Tablet Screen */}
        <g>
          <rect x="280" y="95" width="120" height="150" rx="8" fill="#161b22" stroke="#a855f7" strokeWidth="2" />
          <rect x="295" y="110" width="90" height="15" rx="3" fill="#a855f7" opacity="0.2" />
          <rect x="295" y="135" width="90" height="60" rx="4" fill="#1f2937" />
          <circle cx="340" cy="232" r="4" fill="#475569" />
        </g>

        {/* Mobile Phone */}
        <g>
          <rect x="375" y="130" width="75" height="135" rx="10" fill="#161b22" stroke="#10b981" strokeWidth="2" />
          <rect x="395" y="136" width="35" height="4" rx="2" fill="#475569" />
          <rect x="385" y="150" width="55" height="40" rx="4" fill="#10b981" opacity="0.2" />
          <rect x="385" y="198" width="55" height="35" rx="4" fill="#0d99ff" opacity="0.25" />
          <circle cx="412" cy="252" r="3.5" fill="#475569" />
        </g>

        <g transform="translate(60, 265)">
          <text x="0" y="14" fill="#38bdf8" className="font-mono text-[9px] font-bold">
            Pixel-Perfect • 100% Mobile & Cross-Browser Parity
          </text>
        </g>
      </svg>
    );
  }

  if (theme === 'internship') {
    // CreativeHub — Headless Systems & GraphQL Apprentice
    return (
      <svg viewBox="0 0 540 320" className={`w-full h-auto drop-shadow-xl select-none ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="540" height="320" rx="14" fill="#0d1117" />
        <rect x="12" y="12" width="516" height="296" rx="10" stroke="#30363d" strokeDasharray="4 4" />

        {/* GraphQL Node Graph */}
        <g>
          <circle cx="120" cy="120" r="32" fill="#161b22" stroke="#a855f7" strokeWidth="2" />
          <text x="98" y="124" fill="#c084fc" className="text-[9px] font-mono font-bold">STRAPI</text>

          <circle cx="270" cy="80" r="36" fill="#161b22" stroke="#f43f5e" strokeWidth="2" />
          <text x="245" y="84" fill="#fb7185" className="text-[9px] font-mono font-bold">GRAPHQL</text>

          <circle cx="410" cy="120" r="32" fill="#161b22" stroke="#0d99ff" strokeWidth="2" />
          <text x="388" y="124" fill="#38bdf8" className="text-[9px] font-mono font-bold">REACT</text>

          <line x1="150" y1="110" x2="235" y2="90" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 3" className="schematic-wire" />
          <line x1="305" y1="90" x2="380" y2="110" stroke="#0d99ff" strokeWidth="2" strokeDasharray="4 3" className="schematic-wire" />
        </g>

        {/* Resonate Showcase */}
        <g>
          <rect x="140" y="150" width="260" height="110" rx="8" fill="#161b22" stroke="#10b981" strokeWidth="1.5" />
          <rect x="155" y="165" width="230" height="20" rx="4" fill="#10b981" opacity="0.2" />
          <text x="165" y="179" fill="#34d399" className="text-[9.5px] font-mono font-bold">www.resonate.cx • BACKEND APIS</text>
          
          <rect x="155" y="195" width="130" height="8" rx="2" fill="#334155" />
          <rect x="155" y="210" width="180" height="8" rx="2" fill="#334155" />

          <rect x="300" y="220" width="85" height="22" rx="4" fill="#0d99ff" opacity="0.2" stroke="#0d99ff" />
          <text x="312" y="234" fill="#38bdf8" className="text-[8px] font-mono font-bold">&lt; 100ms APIs</text>
        </g>
      </svg>
    );
  }

  // University — SLIIT Academic Roots
  return (
    <svg viewBox="0 0 540 320" className={`w-full h-auto drop-shadow-xl select-none ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="540" height="320" rx="14" fill="#0d1117" />
      <rect x="12" y="12" width="516" height="296" rx="10" stroke="#30363d" strokeDasharray="4 4" />

      {/* University Columns */}
      <g>
        <polygon points="270,50 120,95 420,95" fill="#161b22" stroke="#38bdf8" strokeWidth="2" />
        <rect x="140" y="95" width="20" height="110" rx="2" fill="#1f2937" stroke="#38bdf8" />
        <rect x="200" y="95" width="20" height="110" rx="2" fill="#1f2937" stroke="#38bdf8" />
        <rect x="260" y="95" width="20" height="110" rx="2" fill="#1f2937" stroke="#38bdf8" />
        <rect x="320" y="95" width="20" height="110" rx="2" fill="#1f2937" stroke="#38bdf8" />
        <rect x="380" y="95" width="20" height="110" rx="2" fill="#1f2937" stroke="#38bdf8" />
        <rect x="110" y="205" width="320" height="10" rx="2" fill="#38bdf8" />
      </g>

      {/* Degree Badge */}
      <g transform="translate(190, 115)">
        <rect width="160" height="85" rx="8" fill="#161b22" stroke="#fbbf24" strokeWidth="2" />
        <rect x="15" y="12" width="130" height="20" rx="4" fill="#fbbf24" opacity="0.2" />
        <text x="30" y="26" fill="#fbbf24" className="text-[10px] font-mono font-bold">SLIIT • BSc & MSc</text>
        <text x="18" y="48" fill="#e2e8f0" className="text-[8.5px] font-mono">BSc (Hons) IT (2020-2024)</text>
        <text x="18" y="65" fill="#34d399" className="text-[8.5px] font-mono font-bold">MSc IT (2025-Present)</text>
      </g>

      {/* Projects */}
      <g transform="translate(40, 230)">
        <rect width="190" height="40" rx="6" fill="#161b22" stroke="#a855f7" strokeWidth="1.5" />
        <text x="12" y="18" fill="#c084fc" className="text-[9px] font-mono font-bold">EVMS ERP • CAPSTONE</text>
        <text x="12" y="30" fill="#94a3b8" className="text-[8px] font-mono">NestJS + Angular + RBAC</text>
      </g>
      
      <g transform="translate(310, 230)">
        <rect width="190" height="40" rx="6" fill="#161b22" stroke="#10b981" strokeWidth="1.5" />
        <text x="12" y="18" fill="#34d399" className="text-[9px] font-mono font-bold">INDRA IMMIGRATION ERP</text>
        <text x="12" y="30" fill="#94a3b8" className="text-[8px] font-mono">Django + PostgreSQL Live</text>
      </g>
    </svg>
  );
};
