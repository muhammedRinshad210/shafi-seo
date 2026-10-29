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
  ctaLabel?: string;
  siteUrl: string;
}

// -------------------------------------------------------------
// Visual Page Builder Section Block Types
// -------------------------------------------------------------

export interface BaseBlock {
  _key: string;
  _type: string;
}

export interface HeroBlock extends BaseBlock {
  _type: 'heroBlock';
  headline?: string;
  subheadline?: string;
  experienceBadge?: string;
  ctaPrimaryLabel?: string;
  ctaSecondaryLabel?: string;
}

export interface HeadingTextBlock extends BaseBlock {
  _type: 'headingTextBlock';
  badge?: string;
  headline: string;
  text: string;
  alignment?: 'left' | 'center' | 'right';
  variant?: 'box' | 'minimal' | 'accent';
}

export interface RichTextBlock extends BaseBlock {
  _type: 'richTextBlock';
  badge?: string;
  headline?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any[];
}

export interface ImageBlock extends BaseBlock {
  _type: 'imageBlock';
  badge?: string;
  headline?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any;
  imageUrl?: string;
  alt: string;
  caption?: string;
  aspectRatio?: '16:9' | '4:3' | 'square' | 'wide';
  maxWidth?: 'full' | 'constrained' | 'compact';
}

export interface ImageWithTextBlock extends BaseBlock {
  _type: 'imageWithTextBlock';
  badge?: string;
  headline: string;
  text: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any;
  imageUrl?: string;
  alt: string;
  imagePosition?: 'left' | 'right';
  ctaLabel?: string;
  ctaAction?: 'drawer' | 'whatsapp' | 'contact';
}

export interface CtaBlock extends BaseBlock {
  _type: 'ctaBlock';
  badge?: string;
  headline: string;
  description?: string;
  buttonText: string;
  buttonAction: 'drawer' | 'whatsapp' | 'contact' | 'link';
  customUrl?: string;
}

export interface ServicesBlock extends BaseBlock {
  _type: 'servicesBlock';
  badge?: string;
  headline?: string;
  subheadline?: string;
}

export interface ProjectsBlock extends BaseBlock {
  _type: 'projectsBlock';
  badge?: string;
  headline?: string;
  subheadline?: string;
}

export interface ProcessBlock extends BaseBlock {
  _type: 'processBlock';
  badge?: string;
  headline?: string;
  subheadline?: string;
}

export interface TrustBlock extends BaseBlock {
  _type: 'trustBlock';
  badge?: string;
  headline?: string;
  subheadline?: string;
}

export interface FaqBlock extends BaseBlock {
  _type: 'faqBlock';
  badge?: string;
  headline?: string;
  subheadline?: string;
}

export interface InsightsBlock extends BaseBlock {
  _type: 'insightsBlock';
  badge?: string;
  headline?: string;
  subheadline?: string;
}

export interface ContactBlock extends BaseBlock {
  _type: 'contactBlock';
  badge?: string;
  headline?: string;
  subheadline?: string;
}

export type PageSectionBlock =
  | HeroBlock
  | HeadingTextBlock
  | RichTextBlock
  | ImageBlock
  | ImageWithTextBlock
  | CtaBlock
  | ServicesBlock
  | ProjectsBlock
  | ProcessBlock
  | TrustBlock
  | FaqBlock
  | InsightsBlock
  | ContactBlock;

export interface PageDocument {
  _id: string;
  _type: 'page';
  title: string;
  slug?: { current: string };
  sections?: PageSectionBlock[];
}
