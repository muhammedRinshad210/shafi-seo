import type { SiteConfig } from '../types';

/**
 * =====================================================================
 * SHAFI SEO - CENTRAL PORTFOLIO CONFIGURATION
 * =====================================================================
 * This file is the single source of truth for all owner information,
 * contact routes, social channels, and public positioning.
 *
 * NOTE FOR OWNER:
 * Update the fields below with your confirmed details (email, WhatsApp,
 * social links). Do not worry about breaking the layout; everything
 * handles missing or updated values gracefully.
 * =====================================================================
 */

export const siteConfig: SiteConfig = {
  // Owner identity & positioning
  specialistName: "Shafi",
  brandTitle: "Independent SEO Specialist & Search Visibility Consultant",
  tagline: "Helping Businesses Get Discovered Through Smarter SEO",
  
  // Hero section copy
  heroHeadline: "SEO That Helps the Right People Find You.",
  heroSubheadline:
    "Technical SEO, keyword research, and on-page optimisation for better search visibility.",
  
  // Confirmed location or working scope
  location: "Based in Manjeri, Malappuram, Kerala, India",
  experienceYears: "5+ Years",

  // Availability status indicator (configurable)
  availability: {
    status: "available",
    badgeText: "Available for Q4/Q1 Client Projects",
    details: "Currently accepting selective client audits, monthly retainers, and technical consultations."
  },

  // Contact details - Real working fallback channels
  // Owner: update these to your preferred inbox and WhatsApp number
  contactEmail: "shafi.seospecialist@gmail.com",
  whatsappNumber: "+919876543210", // International format for WhatsApp links
  whatsappDisplay: "+91 98765 43210",

  // Social & professional profiles (leave empty string or comment out if not available)
  linkedinUrl: "https://linkedin.com/in/shafi-seo",
  twitterUrl: "https://x.com/shafi_seo",
  githubUrl: "https://github.com",

  // Canonical base domain
  siteUrl: "https://shafi-seo.com"
};

export const aboutData = {
  headline: "Engineering Sustainable Organic Growth with Precision.",
  introParagraphs: [
    "Based in Manjeri, Malappuram, I help growing businesses and digital brands build sustainable search visibility through clean technical architecture and high-intent keyword mapping.",
    "Instead of chasing vanity impressions with generic blog posts, I focus on fixing crawl bottlenecks, optimizing page experience, and ranking for queries that convert into genuine revenue."
  ],
  workingPhilosophy: [
    {
      title: "Zero Fluff & Honest Forecasts",
      description: "Search algorithms are dynamic. I provide realistic 3–6 month compounding roadmaps and transparent weekly progress without false guarantees."
    },
    {
      title: "Direct Specialist Access",
      description: "You collaborate directly with the strategist analyzing your codebase and logs. No junior account managers or telephone games."
    },
    {
      title: "Intent-Driven Optimization",
      description: "Traffic is only valuable if it converts. Every keyword cluster is mapped directly to buyer search intent."
    },
    {
      title: "White-Hat Foundations",
      description: "All optimizations strictly adhere to Google Search Essentials, keeping your domain resilient against core updates."
    }
  ],
  verifiedSpecializations: [
    "Technical SEO & Crawl Budget Architecture",
    "Search Intent & Keyword Mapping",
    "Core Web Vitals & Page Experience Optimization",
    "Semantic HTML & Schema.org Structured Data",
    "Local SEO & Google Business Profile Strategy",
    "Competitor Gap Analysis & Content Roadmaps"
  ],
  coreToolkit: [
    "Google Search Console",
    "Google Analytics 4",
    "Screaming Frog SEO Spider",
    "Ahrefs / SEMrush",
    "Schema Markup Validator",
    "PageSpeed Insights & Lighthouse"
  ]
};
