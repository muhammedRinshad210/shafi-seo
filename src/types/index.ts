export interface Project {
  id: string;
  slug: string;
  title: string;
  industry: string;
  summary: string;
  challenge: string;
  strategy: string[];
  results: {
    label: string;
    value: string;
    context: string;
  }[];
  duration: string;
  tools: string[];
  image?: string;
  gallery?: string[];
  projectUrl?: string;
  published: boolean;
  featured?: boolean;
}

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  problem: string;
  deliverables: string[];
  expectedImpact: string;
  badge: string;
  iconName: string;
  customIconUrl?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: 'general' | 'process' | 'timeline' | 'pricing';
}

export interface InsightArticle {
  id: string;
  slug: string;
  title: string;
  summary: string;
  readTime: string;
  date: string;
  category: string;
  content: string[];
  coverImage?: string;
  published: boolean;
}

export interface SiteConfig {
  specialistName: string;
  brandTitle: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  location: string;
  experienceYears: string;
  availability: {
    status: 'available' | 'limited' | 'booked';
    badgeText: string;
    details: string;
  };
  contactEmail: string;
  whatsappNumber: string; // international format e.g. +91XXXXXXXXXX
  whatsappDisplay: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  githubUrl?: string;
  siteUrl: string;
}
