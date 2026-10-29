import { createContext } from 'react';
import type {
  SiteConfig,
  Service,
  Project,
  FAQItem,
  InsightArticle,
  PageDocument,
  PageSectionBlock,
} from '../types';
import { siteConfig as defaultSiteConfig, aboutData as defaultAboutData } from '../data/config';
import { servicesData as defaultServices } from '../data/services';
import { projectsData as defaultProjects } from '../data/projects';
import { faqData as defaultFaq } from '../data/faq';
import { insightsData as defaultInsights } from '../data/insights';

export const defaultSections: PageSectionBlock[] = [
  { _key: 'section-hero', _type: 'heroBlock' },
  { _key: 'section-services', _type: 'servicesBlock' },
  { _key: 'section-projects', _type: 'projectsBlock' },
  { _key: 'section-process', _type: 'processBlock' },
  { _key: 'section-trust', _type: 'trustBlock' },
  { _key: 'section-insights', _type: 'insightsBlock' },
  { _key: 'section-faq', _type: 'faqBlock' },
  { _key: 'section-contact', _type: 'contactBlock' },
];

export interface CMSContextType {
  siteConfig: SiteConfig;
  aboutData: typeof defaultAboutData;
  services: Service[];
  projects: Project[];
  faqItems: FAQItem[];
  insights: InsightArticle[];
  pageData: PageDocument | null;
  sections: PageSectionBlock[];
  isVisualEditing: boolean;
  moveSection: (fromIndex: number, toIndex: number) => void;
  addSection: (block: PageSectionBlock, atIndex?: number) => void;
  removeSection: (index: number) => void;
  updateSection: (index: number, updated: Partial<PageSectionBlock>) => void;
  isLoading: boolean;
  isCmsConnected: boolean;
  error: string | null;
}

export const CMSContext = createContext<CMSContextType>({
  siteConfig: defaultSiteConfig,
  aboutData: defaultAboutData,
  services: defaultServices,
  projects: defaultProjects,
  faqItems: defaultFaq,
  insights: defaultInsights,
  pageData: null,
  sections: defaultSections,
  isVisualEditing: false,
  moveSection: () => {},
  addSection: () => {},
  removeSection: () => {},
  updateSection: () => {},
  isLoading: false,
  isCmsConnected: false,
  error: null,
});
