import type { Project } from '../types';

/**
 * =====================================================================
 * SELECTED WORK / CASE STUDIES DATA
 * =====================================================================
 * NOTE FOR OWNER:
 * Each project entry supports full case-study details.
 *
 * CRITICAL RULE:
 * The `published` boolean flag controls whether a project appears publicly.
 * Set `published: true` to display on the live website.
 * Set `published: false` to draft or hide incomplete projects.
 *
 * If ALL projects are set to `published: false`, the website automatically
 * renders an elegant, professional empty state inviting visitors to discuss
 * their project and become the next featured case study.
 * =====================================================================
 */

export const projectsData: Project[] = [
  {
    id: 'b2b-saas-technical-seo',
    slug: 'b2b-saas-technical-seo-audit',
    title: 'B2B Workflow SaaS: Crawl Architecture & Search Intent Restructuring',
    industry: 'B2B Enterprise Software',
    summary:
      'A comprehensive technical re-platforming and search intent mapping project resolving deep pagination traps, orphan product pages, and cannibalized feature keywords.',
    challenge:
      'The client had migrated from a legacy CMS to a Next.js single-page application. Post-migration, Googlebot encountered thousands of unrendered client-side routes, rendering dynamic URLs uncrawlable. Multiple feature landing pages competed for identical keywords, dividing topical authority.',
    strategy: [
      'Executed full Screaming Frog custom JavaScript crawl to identify 4,200+ uncrawled dynamically rendered routes.',
      'Implemented clean server-side metadata and dynamic XML sitemap generation split by content priority.',
      'Audited and consolidated 18 cannibalized feature pages into 5 authoritative pillar topic clusters.',
      'Configured self-referencing canonical tags, clean breadcrumb schema, and restructured H1-H3 heading hierarchies.',
      'Rebuilt internal linking architecture to route topical authority from the blog directly to core transactional feature pages.'
    ],
    results: [
      {
        label: 'Indexation Health',
        value: '99.2%',
        context: 'Valid indexed pages in Google Search Console (up from 61.4% post-migration)'
      },
      {
        label: 'Crawl Error Reduction',
        value: '-87%',
        context: 'Eliminated 5xx timeout errors and soft-404 traps within 6 weeks'
      },
      {
        label: 'Core Web Vitals',
        value: '100% Pass',
        context: 'LCP reduced to 1.2s, CLS brought to 0.02 across all desktop and mobile templates'
      }
    ],
    duration: '4-Month Engagement',
    tools: ['Google Search Console', 'Screaming Frog', 'Next.js SSR', 'Schema.org', 'Lighthouse'],
    published: true,
    featured: true
  },
  {
    id: 'ecommerce-faceted-navigation',
    slug: 'ecommerce-faceted-navigation-audit',
    title: 'Specialty Retail E-Commerce: Faceted Indexation & Semantic Taxonomy',
    industry: 'E-Commerce / Consumer Goods',
    summary:
      'Eliminated crawl budget wastage across 14,000+ filtered product pages while capturing high-intent long-tail product queries.',
    challenge:
      'The store used complex multi-select filtering (colors, sizes, price ranges, ratings). Every combination generated a unique indexable URL, causing massive crawl bloat, duplicate content penalties, and search engine indecision about canonical category pages.',
    strategy: [
      'Engineered a strict canonical and robots meta directive policy: parameter-driven filter URLs received noindex/follow rules.',
      'Created curated, static landing pages for verified high-search-volume filter combinations (e.g. "matte black ergonomic desks").',
      'Added clean Product, Offer, and AggregateRating Schema across the entire catalog for enhanced SERP rich snippets.',
      'Restructured category page breadcrumbs with valid ItemList JSON-LD to pass structured hierarchy to search crawlers.',
      'Optimized category title tags and meta descriptions to improve CTR on commercial intent keywords.'
    ],
    results: [
      {
        label: 'Crawl Waste Elimination',
        value: '14,000+',
        context: 'Low-value parameter URLs successfully de-indexed from Googlebot crawl queue'
      },
      {
        label: 'Rich Result Coverage',
        value: '100%',
        context: 'Product rich snippets (pricing, availability) active across 800+ product lines'
      },
      {
        label: 'Organic CTR',
        value: '+3.4%',
        context: 'Average SERP click-through rate improved across priority category terms'
      }
    ],
    duration: '3-Month Sprint',
    tools: ['Google Search Console', 'Ahrefs', 'Schema Markup Validator', 'Shopify Liquid', 'Sitebulb'],
    published: true,
    featured: true
  },
  {
    id: 'local-clinic-network-seo',
    slug: 'local-clinic-network-seo',
    title: 'Multi-Location Healthcare Provider: Google Business Profile & Local Search',
    industry: 'Healthcare & Specialized Clinical Services',
    summary:
      'Engineered localized landing pages, NAP synchronization across 40+ citations, and structured MedicalBusiness schema for three clinical branches.',
    challenge:
      'A growing specialty clinic group opened two new branches but remained completely invisible in Google Maps 3-Pack searches for high-intent queries like "specialist clinic near me" and specialized medical services in target postal codes.',
    strategy: [
      'Claimed, verified, and thoroughly optimized three distinct Google Business Profiles with accurate primary and secondary categories.',
      'Built bespoke location pages with dedicated local content, doctor biographies, parking details, and embedded Google Maps.',
      'Injected MedicalBusiness schema markup featuring exact GeoCoordinates, opening hours, accepted insurance, and service areas.',
      'Conducted a full local citation audit to rectify conflicting phone numbers and suite addresses across key medical directories.',
      'Implemented an ethical, patient-friendly review generation protocol compliant with medical privacy standards.'
    ],
    results: [
      {
        label: 'Local Pack Presence',
        value: 'Top 3',
        context: 'Consistent 3-Pack placement for target localized clinical terms across 3 service zones'
      },
      {
        label: 'Direct Phone & Direction Inquiries',
        value: '+41%',
        context: 'Measurable direct actions recorded via Google Business Profile Insights'
      },
      {
        label: 'Citation Uniformity',
        value: '100%',
        context: 'Zero conflicting NAP records across healthcare registries and local indexes'
      }
    ],
    duration: '5-Month Partnership',
    tools: ['Google Business Profile Manager', 'BrightLocal', 'Schema.org', 'Google Maps API'],
    published: true,
    featured: false
  }
];
