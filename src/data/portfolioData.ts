export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  period: string;
  role: string;
  summary: string;
  techStack: string[];
  metrics: string[];
  highlights: string[];
  architectureNotes?: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface CareerChapter {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  timeframe: string;
  location: string;
  landmark: string;
  sceneTheme: 'university' | 'internship' | 'frontend' | 'fullstack' | 'database';
  overview: string;
  keyLearnings: string[];
  projects: ProjectItem[];
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: { name: string; proficiency: number; tag?: string }[];
}

export const PERSONAL_INFO = {
  name: "Pavithra Meddaduwage",
  title: "Database Programmer & Full Stack Software Engineer",
  tagline: "Architecting high-throughput data pipelines, resilient microservices & mission-critical ERPs.",
  location: "Sri Lanka (Badulla / Colombo)",
  availability: "Available Immediately (Remote & Global)",
  email: "pavithrameddaduwage@gmail.com",
  phone: "+94 703 333 997",
  portfolioUrl: "https://pavithrameddaduwage.netlify.app",
  linkedin: "https://linkedin.com/in/pavithra-meddaduwage",
  github: "https://github.com/pavithrameddaduwage",
  about: `Full Stack Software Engineer & Database Programmer with 3+ years of battle-tested experience building high-throughput business applications, complex ERP systems, enterprise data processing engines, and automated reporting pipelines. Specialized in NestJS, Angular, Next.js, PostgreSQL, SQL Query Optimization, Redis, and Power BI REST APIs.`
};

export const CAREER_CHAPTERS: CareerChapter[] = [
  {
    id: "chapter-horizon",
    number: "05",
    title: "The Enterprise Data Engine",
    subtitle: "Horizon Group USA • Database Programmer / Full Stack Engineer",
    timeframe: "June 2024 – October 2026",
    location: "Remote (USA Team)",
    landmark: "Enterprise Cloud & High-Throughput Pipelines",
    sceneTheme: "database",
    overview: "Handled database programming, SQL optimization, and automated data ingestion pipelines processing millions of records for Fortune 500 retail partners.",
    keyLearnings: [
      "Engineered automated data ingestion and validation pipelines cutting manual Excel workflows by 100%",
      "Integrated Power BI REST APIs for real-time audit governance and automated report syncing",
      "Streamlined high-volume Amazon Seller and Retailer POS data processing into analytics-ready schemas"
    ],
    projects: [
      {
        id: "pos-pipeline",
        title: "Horizon POS Data Upload & Processing Engine",
        category: "Microservices & Distributed Data",
        period: "2024 – 2026",
        role: "Database Programmer / Backend Engineer",
        summary: "Engineered a microservice-based ingest and transform platform for multi-gigabyte Point-of-Sale datasets from enterprise retail partners.",
        techStack: ["NestJS", "Angular", "PostgreSQL", "Microservices", "Docker"],
        metrics: ["4 Major Retailers Unified", "Millions of records validated", "Zero data loss during spikes"],
        highlights: [
          "Dissected vendor-specific data structures with custom sanitization pipelines",
          "Built fault-tolerant batch processors outputting consistent downstream tables",
          "Automated reconciliation audits detecting missing sales transactions"
        ]
      },
      {
        id: "powerbi-governance",
        title: "Power BI Automation & Access Governance Portal",
        category: "Business Intelligence & Governance",
        period: "2024 – 2025",
        role: "Full Stack Engineer",
        summary: "Integrated enterprise Power BI REST APIs to retrieve, cleanse, and summarize reports while establishing real-time access monitoring for auditing.",
        techStack: ["NestJS", "Angular", "Power BI REST APIs", "PostgreSQL"],
        metrics: ["100% Automated report extraction", "Real-time security auditing", "Auditing anomaly alerts"],
        highlights: [
          "Automated scheduled report pulls directly into PostgreSQL warehouse storage",
          "Implemented comprehensive RBAC access tracking to detect credential anomalies",
          "Constructed reactive administrative dashboards in Angular"
        ]
      },
      {
        id: "amazon-api",
        title: "Amazon API Automation System",
        category: "API Orchestration & Background Queues",
        period: "2024",
        role: "Backend Engineer",
        summary: "Eliminated manual multi-day spreadsheet processing by constructing direct Amazon SP-API ingestion queues backed by Redis.",
        techStack: ["NestJS", "REST APIs", "Redis", "PostgreSQL"],
        metrics: ["100% Manual labor reduction", "Resilient exponential retries", "Sub-second queue dispatch"],
        highlights: [
          "Constructed throttled rate-limit compliant consumers for Amazon APIs",
          "Added distributed caching & idempotency keys in Redis",
          "Engineered automatic alert notification on schema contract breaks"
        ]
      },
      {
        id: "walmart-analysis",
        title: "Walmart POS & Inventory Analysis Engine",
        category: "Database & Analytical SQL",
        period: "2024",
        role: "Database Programmer",
        summary: "Analyzed millions of historical Walmart POS transactions against warehouse inventory records using advanced recursive and windowing SQL queries.",
        techStack: ["PostgreSQL", "SQL Window Functions", "Data Warehousing"],
        metrics: ["Pinpointed hidden shrinkage patterns", "Optimized stock forecasting accuracy", "90% faster query execution"],
        highlights: [
          "Authored multi-CTE queries calculating rolling inventory burn rates",
          "Identified discrepancies between physical scans and electronic POS tallies",
          "Prepared executive reporting dashboards with verified statistical variance"
        ]
      }
    ]
  },
  {
    id: "chapter-digisa",
    number: "04",
    title: "Client-Scale Full Stack & ERPs",
    subtitle: "Digisa • Full Stack Web Developer",
    timeframe: "November 2023 – June 2024",
    location: "Makola, Sri Lanka",
    landmark: "Boutique Software Atelier",
    sceneTheme: "fullstack",
    overview: "Delivered 5+ full-lifecycle web applications and custom management systems with 100% on-time delivery record and zero production rollbacks.",
    keyLearnings: [
      "Engineered bespoke inventory management and billing systems from initial requirements to server deployment",
      "Mastered end-to-end automated QA testing preventing regression in client workflows",
      "Designed normalized relational schemas optimized for high write-frequency transactions"
    ],
    projects: [
      {
        id: "eheliyagoda-pharmacy",
        title: "Eheliyagoda Pharmacy ERP & POS",
        category: "Enterprise Resource Planning",
        period: "2024",
        role: "Full Stack Engineer",
        summary: "Mission-critical pharmacy ERP managing real-time batch stock tracking, supplier payments, POS barcode registers, and receipt generation.",
        techStack: ["Next.js", "PostgreSQL", "Tailwind CSS", "Prisma"],
        metrics: ["Sub-second POS transaction checkouts", "Instant thermal receipt generation", "Accurate batch-expiry alerts"],
        highlights: [
          "Engineered inventory reconciliation preventing expired medicine sales",
          "Handled offline-tolerant local POS cart syncing",
          "Deployed zero-downtime database migrations on PostgreSQL"
        ]
      },
      {
        id: "ac-management-erp",
        title: "AC Management ERP & Field Operations",
        category: "Service ERP",
        period: "2024",
        role: "Full Stack Engineer",
        summary: "Field technician dispatching and maintenance lifecycle platform tracking service tickets, spare-part billing, and recurring contracts.",
        techStack: ["NestJS", "Angular", "PostgreSQL", "REST APIs"],
        metrics: ["Real-time job dispatching", "End-to-end workorder verification", "Complete invoice tracking"],
        highlights: [
          "Developed technician route scheduling and automated maintenance reminders",
          "Constructed Angular responsive client UI for warehouse and office admins"
        ]
      },
      {
        id: "arai-shop-system",
        title: "Arai Spare Parts Inventory & POS",
        category: "Commercial Inventory",
        period: "2023 – 2024",
        role: "Backend & Database Developer",
        summary: "Specialized automotive spare parts catalog and inventory tracking platform designed for fast lookup across tens of thousands of SKU numbers.",
        techStack: ["PHP", "Laravel", "MySQL", "Bootstrap"],
        metrics: ["10k+ SKUs cataloged", "100% On-time client delivery", "Zero stock count discrepancies"],
        highlights: [
          "Designed multi-tier categories and SKU cross-referencing algorithms",
          "Optimized relational query indices for instant autocomplete lookups"
        ]
      }
    ]
  },
  {
    id: "chapter-xess",
    number: "03",
    title: "The Responsive Frontend Craft",
    subtitle: "XESS Global • Front-End Developer",
    timeframe: "August 2023 – November 2023",
    location: "Kiribathgoda, Sri Lanka",
    landmark: "The Design & Performance Studio",
    sceneTheme: "frontend",
    overview: "Crafted sleek, mobile-first web experiences and user interfaces across client brands with rigorous cross-browser and QA testing.",
    keyLearnings: [
      "Built fluid, accessible UIs with strict responsive breakpoints across all screen form factors",
      "Integrated complex frontend components with RESTful backend endpoints",
      "Enforced rigorous cross-browser testing spanning Chrome, Safari, Firefox, and Edge"
    ],
    projects: [
      {
        id: "client-showcases",
        title: "High-Impact Commercial Web Platforms",
        category: "Responsive Web Engineering",
        period: "2023",
        role: "Frontend Developer",
        summary: "Developed modern responsive web frontends for brands including Indra Group Global, MercUK, Country Life Sri Lanka, and Green Mile Recycling.",
        techStack: ["HTML5", "CSS3 / SCSS", "JavaScript", "Bootstrap", "Responsive Design"],
        metrics: ["100% Cross-device parity", "Lightning fast Lighthouse scores", "Cross-browser consistency"],
        highlights: [
          "Built bespoke interactive calculators, dynamic product galleries, and inquiry forms",
          "Ensured complete accessibility (a11y) and strict mobile responsive fidelity"
        ],
        liveUrl: "https://indragroupglobal.com"
      }
    ]
  },
  {
    id: "chapter-creativehub",
    number: "02",
    title: "Backend Foundations & Headless Systems",
    subtitle: "CreativeHub • Back-End Developer Intern",
    timeframe: "September 2022 – April 2023",
    location: "Rajagiriya, Sri Lanka",
    landmark: "The Apprenticeship Crucible",
    sceneTheme: "internship",
    overview: "Formative industry internship immersing into headless CMS architectures, GraphQL APIs, custom e-commerce engines, and strict backend QA protocols.",
    keyLearnings: [
      "Transitioned from academic code to production headless architectures with Strapi and Node.js",
      "Engineered resilient GraphQL queries & RESTful endpoints for frontend consumption",
      "Implemented automated database sanity tests and backend test suites"
    ],
    projects: [
      {
        id: "resonate-backend",
        title: "Resonate Platform Headless Backend",
        category: "Headless CMS & GraphQL",
        period: "2022 – 2023",
        role: "Backend Developer Intern",
        summary: "Constructed headless backend services using Strapi, Node.js, and GraphQL, integrating server-rendered React components with strict schema validation.",
        techStack: ["Node.js", "Strapi", "GraphQL", "React.js", "REST APIs"],
        metrics: ["Production launch at resonate.cx", "Sub-100ms GraphQL query times", "Automated regression tests"],
        highlights: [
          "Structured content relationships and role-based publishing gates",
          "Executed backend QA testing protecting production databases"
        ],
        liveUrl: "https://www.resonate.cx"
      },
      {
        id: "celeste-daily",
        title: "Celeste Daily CMS & Publishing Engine",
        category: "Publishing Infrastructure",
        period: "2022 – 2023",
        role: "Backend Developer Intern",
        summary: "Engineered server-side logic, custom database hooks, and media endpoints for a daily lifestyle publication CMS.",
        techStack: ["PHP", "OpenCart / CMS", "MySQL", "REST APIs"],
        metrics: ["Smooth editorial workflow", "Secure media CDN handling"],
        highlights: [
          "Developed high-volume scheduled publication triggers",
          "Collaborated closely with the UI engineering team for seamless API contracts"
        ]
      }
    ]
  },
  {
    id: "chapter-sliit",
    number: "01",
    title: "Academic Roots & Systems Theory",
    subtitle: "Sri Lanka Institute of Information Technology (SLIIT)",
    timeframe: "2020 – 2026 (BSc Hons & MSc)",
    location: "Malabe, Sri Lanka",
    landmark: "The Knowledge Citadel",
    sceneTheme: "university",
    overview: "Built an uncompromising theoretical and practical foundation across distributed systems, relational calculus, data warehousing, and software architecture.",
    keyLearnings: [
      "BSc (Hons) in Information Technology (2020 – 2024)",
      "MSc in Information Technology (2025 – Present) specializing in enterprise architectures",
      "Specialized study in Relational Calculus, Distributed Systems, and Advanced Database Management"
    ],
    projects: [
      {
        id: "indra-immigration",
        title: "Indra Immigration Enterprise ERP",
        category: "Enterprise Production System",
        period: "2024",
        role: "Full Stack Engineer",
        summary: "Production enterprise resource planning system managing visa cases, client workflows, document verifications, and milestone tracking.",
        techStack: ["Python", "Django", "JavaScript", "PostgreSQL"],
        metrics: ["Active live deployment", "Zero reported audit discrepancies", "Complete case timeline tracking"],
        highlights: [
          "Designed normalized database tables for complex legal case documentation",
          "Delivered end-to-end QA validated client management modules"
        ],
        liveUrl: "https://www.indraimmigration.com"
      }
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Databases & Data Warehousing",
    iconName: "Database",
    skills: [
      { name: "PostgreSQL", proficiency: 95, tag: "Primary Engine" },
      { name: "SQL Query Optimization", proficiency: 95, tag: "Deep Mastery" },
      { name: "MySQL", proficiency: 90 },
      { name: "Database Schema Design", proficiency: 92 },
      { name: "Data Ingestion & Processing", proficiency: 92 },
      { name: "MongoDB", proficiency: 80 }
    ]
  },
  {
    title: "Backend & Systems",
    iconName: "Server",
    skills: [
      { name: "NestJS", proficiency: 95, tag: "Architecture" },
      { name: "TypeScript", proficiency: 95, tag: "Core" },
      { name: "Node.js & Express", proficiency: 92 },
      { name: "RESTful API Integration", proficiency: 95 },
      { name: "Power BI REST APIs", proficiency: 90, tag: "Enterprise BI" },
      { name: "PHP / Laravel", proficiency: 88 },
      { name: "Python / Django", proficiency: 82 },
      { name: "GraphQL & Redis", proficiency: 85 }
    ]
  },
  {
    title: "Frontend & Architecture",
    iconName: "Layout",
    skills: [
      { name: "Angular", proficiency: 90, tag: "Enterprise UIs" },
      { name: "Next.js & React.js", proficiency: 92, tag: "Full Stack" },
      { name: "JavaScript (ES6+)", proficiency: 95 },
      { name: "Tailwind CSS & SCSS", proficiency: 92 },
      { name: "Vue.js", proficiency: 78 },
      { name: "Responsive & a11y Design", proficiency: 94 }
    ]
  },
  {
    title: "DevOps, Quality & Cloud",
    iconName: "Cpu",
    skills: [
      { name: "Docker Containerization", proficiency: 85 },
      { name: "Git, GitHub & GitLab", proficiency: 92 },
      { name: "Postman API Automation", proficiency: 94 },
      { name: "AWS & Oracle Cloud", proficiency: 80 },
      { name: "End-to-End QA Testing", proficiency: 95, tag: "Zero Regressions" },
      { name: "Error Handling & Retries", proficiency: 94 }
    ]
  }
];

export const CASSETTE_TRACKS = [
  { side: "Side A", title: "Query Optimizer's Flow", tempo: "120 BPM • Ambient Synth", mood: "Deep Work / Index Tuning" },
  { side: "Side B", title: "Late Night Production Deploy", tempo: "84 BPM • Lo-fi Waves", mood: "Green Pipelines & Midnight Commits" }
];
