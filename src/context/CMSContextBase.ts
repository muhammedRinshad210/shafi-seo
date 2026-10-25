import { createContext } from 'react';
import type { SiteConfig, Service, Project, FAQItem, InsightArticle } from '../types';
import { siteConfig as defaultSiteConfig, aboutData as defaultAboutData } from '../data/config';
import { servicesData as defaultServices } from '../data/services';
import { projectsData as defaultProjects } from '../data/projects';
import { faqData as defaultFaq } from '../data/faq';
import { insightsData as defaultInsights } from '../data/insights';

export interface CMSContextType {
  siteConfig: SiteConfig;
  aboutData: typeof defaultAboutData;
  services: Service[];
  projects: Project[];
  faqItems: FAQItem[];
  insights: InsightArticle[];
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
  isLoading: false,
  isCmsConnected: false,
  error: null,
});
