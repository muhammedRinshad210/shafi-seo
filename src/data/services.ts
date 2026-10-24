import type { Service } from '../types';

export const servicesData: Service[] = [
  {
    id: 'technical-seo',
    title: 'Technical SEO & Architecture Audit',
    shortDescription: 'Uncover and fix crawl bottlenecks, indexation hurdles, and site speed deficiencies that hold your pages back from ranking.',
    problem:
      'Search engines cannot rank pages they struggle to crawl, render, or understand. Hidden canonical issues, redirect loops, broken pagination, and slow server response times drain crawl budget and suppress rankings.',
    deliverables: [
      'Deep site crawl & error triage via Screaming Frog & Search Console',
      'Crawl budget & indexability analysis (robots.txt, XML sitemaps, canonicals)',
      'Core Web Vitals optimization (LCP, INP, CLS diagnosing)',
      'Schema.org structured data implementation & rich snippet validation',
      'Actionable prioritized technical engineering punchlist'
    ],
    expectedImpact:
      'Faster crawl discovery by Googlebot, improved index coverage of high-value pages, and elimination of technical blockers preventing organic momentum.',
    badge: 'Foundational Audit',
    iconName: 'Cpu'
  },
  {
    id: 'keyword-intent',
    title: 'Keyword Research & Search Intent Mapping',
    shortDescription: 'Target queries with high buyer intent instead of vanity search volume that fails to convert.',
    problem:
      'Many brands write dozens of articles targeting high-volume keywords only to realize the audience had zero intention to buy, or the page failed to fulfill what the searcher actually wanted.',
    deliverables: [
      'Comprehensive competitor keyword gap analysis',
      'Search intent categorization (informational vs. commercial vs. transactional)',
      'Topic cluster & pillar page architectural blueprints',
      'Keyword difficulty scoring & short-term vs. long-term prioritization matrix',
      'Content briefs with header hierarchy and semantic keyword suggestions'
    ],
    expectedImpact:
      'Targeted search queries aligned with your specific revenue streams, higher engagement metrics, and reduced bounce rates through accurate search intent fulfillment.',
    badge: 'High ROI Focus',
    iconName: 'Target'
  },
  {
    id: 'on-page-seo',
    title: 'On-Page SEO & Semantic Optimization',
    shortDescription: 'Optimize title tags, meta descriptions, heading structures, internal linking, and semantic entity relevance.',
    problem:
      'Even great content underperforms when key on-page elements fail to signal topical authority, lack proper internal linking, or confuse search algorithms with poor heading structure.',
    deliverables: [
      'Click-worthy Title Tag & Meta Description rewrites',
      'H1–H3 heading hierarchy restructuring for maximum topical clarity',
      'Semantic entity enrichment and contextual keyword integration',
      'Internal linking strategy to distribute PageRank to priority pages',
      'Image optimization with descriptive alt text and modern formats'
    ],
    expectedImpact:
      'Enhanced organic click-through rates (CTR) from search engine result pages, clearer topical authority signals, and stronger algorithmic relevance.',
    badge: 'Immediate Optimization',
    iconName: 'FileCheck'
  },
  {
    id: 'content-strategy',
    title: 'SEO Content Strategy & Authority Roadmap',
    shortDescription: 'A systematic editorial plan designed to build industry authority and rank for compounding search terms over time.',
    problem:
      'Random blog posting without topical architecture leads to content cannibalization, wasted writing effort, and stagnant organic search visibility.',
    deliverables: [
      'Topical authority map spanning your core subject areas',
      'Quarterly editorial roadmap with prioritized publishing calendar',
      'Content refresh strategy for decaying or underperforming existing posts',
      'E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) audit',
      'Guidance on structured formatting for Google AI Overviews and featured snippets'
    ],
    expectedImpact:
      'Systematic topical authority in your niche, steady organic footprint expansion, and compounding long-tail keyword rankings.',
    badge: 'Compounding Growth',
    iconName: 'TrendingUp'
  },
  {
    id: 'local-seo',
    title: 'Local SEO & Google Business Profile',
    shortDescription: 'Dominate local Google Maps pack rankings and local search queries for businesses with physical premises or designated service areas.',
    problem:
      'Nearby customers are actively searching for your services on mobile and Google Maps, but competitors with well-optimized profiles and consistent citations take the calls.',
    deliverables: [
      'Complete Google Business Profile (GBP) audit and category optimization',
      'NAP (Name, Address, Phone) consistency verification across core directories',
      'Local schema markup integration (LocalBusiness, GeoCoordinates)',
      'Localized service area landing page optimization',
      'Review generation and response strategy framework'
    ],
    expectedImpact:
      'Elevated visibility in Google 3-Pack and localized organic search results, driving direct phone calls, map direction requests, and qualified local inquiries.',
    badge: 'Local Discovery',
    iconName: 'MapPin'
  },
  {
    id: 'competitor-analysis',
    title: 'Competitor Analysis & Search Strategy',
    shortDescription: 'Deconstruct exactly where your rivals get their search traffic and systematically capture their organic market share.',
    problem:
      'Competing blindly without understanding your top rivals’ backlink footprints, content hubs, and ranking keywords wastes time and budget.',
    deliverables: [
      'Identification of primary organic search competitors vs. direct business competitors',
      'Content gap and ranking overlap matrix',
      'Backlink profile quality assessment and link-worthy asset opportunities',
      'Actionable step-by-step competitive takeover roadmap',
      'Monthly performance monitoring and ranking trajectory reporting'
    ],
    expectedImpact:
      'Clear strategic clarity on where your competitors are vulnerable, allowing you to capture high-value organic positions with surgical precision.',
    badge: 'Strategic Advantage',
    iconName: 'Compass'
  }
];
