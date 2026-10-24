export interface ProcessStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  duration: string;
  clientRole: string;
}

export const processSteps: ProcessStep[] = [
  {
    step: '01',
    title: 'Discovery & Business Goal Alignment',
    subtitle: 'Understanding your commercial objectives before touching any keyword list.',
    description:
      'We start with a thorough intake to identify your core revenue drivers, ideal customer profiles, existing tech stack constraints, and competitive challenges. SEO is an engine for business growth, not an isolated academic exercise.',
    deliverables: [
      'Discovery kick-off workshop & technical questionnaire',
      'Target buyer persona & conversion goal alignment',
      'Access setup for Search Console, Analytics, and CMS',
      'Initial baseline visibility benchmark'
    ],
    duration: 'Week 1',
    clientRole: 'Provide analytics access and share commercial priorities.'
  },
  {
    step: '02',
    title: 'Website Audit & Opportunity Mapping',
    subtitle: 'Deep forensic analysis of technical health, search intent, and competitors.',
    description:
      'A thorough, hands-on diagnostic of your website. I analyze crawl logs, index status, site architecture, Core Web Vitals, backlink health, and competitor gaps to uncover the highest-leverage opportunities.',
    deliverables: [
      'Comprehensive Technical SEO & Crawl Health Report',
      'Competitor Keyword Gap & Search Intent Matrix',
      'Content Quality & Cannibalization Assessment',
      'Prioritized Action Roadmap (High, Medium, Low Impact)'
    ],
    duration: 'Weeks 2–3',
    clientRole: 'Brief review meeting to approve roadmap priorities.'
  },
  {
    step: '03',
    title: 'Strategy, Implementation & Optimisation',
    subtitle: 'Systematic execution of architectural fixes, on-page polish, and content.',
    description:
      'Executing the roadmap with surgical precision. Whether collaborating directly with your developers or implementing on-page optimizations myself, every fix is tested, validated, and aligned with Google Search Essentials.',
    deliverables: [
      'Core technical fixes (sitemaps, canonicals, robots.txt, schema)',
      'On-page title, meta, and heading hierarchy rewrites',
      'Targeted content outlines & internal linking restructuring',
      'Local citation & Google Business Profile enhancements (if applicable)'
    ],
    duration: 'Weeks 4–8 (and ongoing retainers)',
    clientRole: 'Review content recommendations and approve CMS updates.'
  },
  {
    step: '04',
    title: 'Measurement, Reporting & Compounding Scale',
    subtitle: 'Tracking indexation, qualified search queries, and long-term compounding growth.',
    description:
      'SEO is iterative. Once foundational fixes are live, we measure how Google discovers and indexes pages, track search impression trajectory, refine underperforming queries, and expand into adjacent keyword clusters.',
    deliverables: [
      'Monthly executive dashboard (Search Console & GA4 focus)',
      'Keyword velocity & SERP position monitoring',
      'Quarterly strategic reviews & roadmap adjustments',
      'Algorithm update resilience monitoring'
    ],
    duration: 'Ongoing Retainer',
    clientRole: 'Monthly 30-minute sync to align on business shifts.'
  }
];
