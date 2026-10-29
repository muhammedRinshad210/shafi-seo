import { siteSettingsType } from './siteSettings';
import { serviceType } from './service';
import { projectType } from './project';
import { faqType } from './faq';
import { insightType } from './insight';
import { pageType } from './page';
import {
  heroBlockType,
  headingTextBlockType,
  richTextBlockType,
  imageBlockType,
  imageWithTextBlockType,
  ctaBlockType,
  servicesBlockType,
  projectsBlockType,
  processBlockType,
  trustBlockType,
  faqBlockType,
  insightsBlockType,
  contactBlockType,
} from './blocks';

export const schemaTypes = [
  // Page Builder Singleton & Documents
  pageType,
  siteSettingsType,
  serviceType,
  projectType,
  faqType,
  insightType,

  // Modular Page Blocks
  heroBlockType,
  headingTextBlockType,
  richTextBlockType,
  imageBlockType,
  imageWithTextBlockType,
  ctaBlockType,
  servicesBlockType,
  projectsBlockType,
  processBlockType,
  trustBlockType,
  faqBlockType,
  insightsBlockType,
  contactBlockType,
];
