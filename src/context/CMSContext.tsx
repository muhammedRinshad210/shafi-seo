import React, { useEffect, useState, useMemo } from 'react';
import type { SiteConfig, Service, Project, FAQItem, InsightArticle } from '../types';
import { siteConfig as defaultSiteConfig, aboutData as defaultAboutData } from '../data/config';
import { servicesData as defaultServices } from '../data/services';
import { projectsData as defaultProjects } from '../data/projects';
import { faqData as defaultFaq } from '../data/faq';
import { insightsData as defaultInsights } from '../data/insights';
import { CMSContext } from './CMSContextBase';
import {
  sanityClient,
  isSanityConfigured,
  urlFor,
  SITE_SETTINGS_QUERY,
  SERVICES_QUERY,
  PROJECTS_QUERY,
  FAQ_QUERY,
  INSIGHTS_QUERY,
} from '../lib/sanity';

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(defaultSiteConfig);
  const [aboutData, setAboutData] = useState<typeof defaultAboutData>(defaultAboutData);
  const [services, setServices] = useState<Service[]>(defaultServices);
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [faqItems, setFaqItems] = useState<FAQItem[]>(defaultFaq);
  const [insights, setInsights] = useState<InsightArticle[]>(defaultInsights);
  const [isLoading, setIsLoading] = useState<boolean>(isSanityConfigured);
  const [isCmsConnected, setIsCmsConnected] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isSanityConfigured || !sanityClient) {
      return;
    }

    let isMounted = true;

    async function fetchCMSContent() {
      setIsLoading(true);
      setError(null);

      try {
        const [settingsRes, servicesRes, projectsRes, faqRes, insightsRes] =
          await Promise.allSettled([
            sanityClient!.fetch(SITE_SETTINGS_QUERY),
            sanityClient!.fetch(SERVICES_QUERY),
            sanityClient!.fetch(PROJECTS_QUERY),
            sanityClient!.fetch(FAQ_QUERY),
            sanityClient!.fetch(INSIGHTS_QUERY),
          ]);

        if (!isMounted) return;

        let hasLoadedAnyCMSData = false;

        // 1. Process Website Settings
        if (settingsRes.status === 'fulfilled' && settingsRes.value) {
          const cms = settingsRes.value;
          hasLoadedAnyCMSData = true;

          setSiteConfig((prev) => ({
            ...prev,
            specialistName: cms.specialistName || prev.specialistName,
            brandTitle: cms.brandTitle || prev.brandTitle,
            tagline: cms.tagline || prev.tagline,
            heroHeadline: cms.heroHeadline || prev.heroHeadline,
            heroSubheadline: cms.heroSubheadline || prev.heroSubheadline,
            location: cms.location || prev.location,
            experienceYears: cms.experienceYears || prev.experienceYears,
            availability: {
              status: cms.availability?.status || prev.availability.status,
              badgeText: cms.availability?.badgeText || prev.availability.badgeText,
              details: cms.availability?.details || prev.availability.details,
            },
            contactEmail: cms.contactEmail || prev.contactEmail,
            whatsappNumber: cms.whatsappNumber || prev.whatsappNumber,
            whatsappDisplay: (cms.whatsappDisplay && cms.whatsappDisplay !== "+91 98765 43210")
              ? cms.whatsappDisplay
              : (cms.whatsappNumber || prev.whatsappDisplay),
            linkedinUrl: cms.socialLinks?.linkedinUrl ?? prev.linkedinUrl,
            twitterUrl: cms.socialLinks?.twitterUrl ?? prev.twitterUrl,
            githubUrl: cms.socialLinks?.githubUrl ?? prev.githubUrl,
            ctaLabel: cms.ctaLabel || prev.ctaLabel,
          }));

          if (cms.aboutHeadline || (cms.aboutIntro && cms.aboutIntro.length > 0)) {
            setAboutData((prev) => ({
              ...prev,
              headline: cms.aboutHeadline || prev.headline,
              introParagraphs:
                cms.aboutIntro && cms.aboutIntro.length > 0
                  ? cms.aboutIntro
                  : prev.introParagraphs,
            }));
          }

          // Optional live meta title update
          if (cms.metaTitle && typeof document !== 'undefined') {
            document.title = cms.metaTitle;
          }
        }

        // 2. Process Services
        if (servicesRes.status === 'fulfilled' && Array.isArray(servicesRes.value) && servicesRes.value.length > 0) {
          hasLoadedAnyCMSData = true;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const mappedServices: Service[] = servicesRes.value.map((s: any) => ({
            id: s.slug?.current || s._id,
            title: s.title || '',
            shortDescription: s.shortDescription || '',
            problem: s.problem || '',
            deliverables: s.deliverables || [],
            expectedImpact: s.expectedImpact || '',
            badge: s.badge || 'Core Service',
            iconName: s.iconName || 'Cpu',
            customIconUrl: s.customIcon ? urlFor(s.customIcon)?.auto('format').width(64).url() : undefined,
          }));
          setServices(mappedServices);
        }

        // 3. Process Projects / Case Studies
        if (projectsRes.status === 'fulfilled' && Array.isArray(projectsRes.value) && projectsRes.value.length > 0) {
          hasLoadedAnyCMSData = true;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const mappedProjects: Project[] = projectsRes.value.map((p: any) => ({
            id: p.slug?.current || p._id,
            slug: p.slug?.current || p._id,
            title: p.title || '',
            industry: p.industry || '',
            summary: p.summary || '',
            challenge: p.challenge || '',
            strategy: p.strategy || [],
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            results: (p.results || []).map((r: any) => ({
              label: r.label || '',
              value: r.value || '',
              context: r.context || '',
            })),
            duration: p.duration || '3-Month Engagement',
            tools: p.tools || [],
            image: p.coverImage ? urlFor(p.coverImage)?.auto('format').width(1000).url() : undefined,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            gallery: (p.gallery || []).map((g: any) => urlFor(g)?.auto('format').width(1200).url()).filter(Boolean),
            projectUrl: p.projectUrl || undefined,
            published: Boolean(p.published),
            featured: Boolean(p.featured),
          }));
          setProjects(mappedProjects);
        }

        // 4. Process FAQ
        if (faqRes.status === 'fulfilled' && Array.isArray(faqRes.value) && faqRes.value.length > 0) {
          hasLoadedAnyCMSData = true;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const mappedFaq: FAQItem[] = faqRes.value.map((f: any) => ({
            id: f._id,
            question: f.question || '',
            answer: f.answer || '',
            category: f.category || 'general',
          }));
          setFaqItems(mappedFaq);
        }

        // 5. Process Insights
        if (insightsRes.status === 'fulfilled' && Array.isArray(insightsRes.value) && insightsRes.value.length > 0) {
          hasLoadedAnyCMSData = true;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const mappedInsights: InsightArticle[] = insightsRes.value.map((i: any) => ({
            id: i.slug?.current || i._id,
            slug: i.slug?.current || i._id,
            title: i.title || '',
            summary: i.summary || '',
            readTime: i.readTime || '5 min read',
            date: i.date || 'October 2026',
            category: i.category || 'Technical SEO',
            content: i.content || [],
            coverImage: i.coverImage ? urlFor(i.coverImage)?.auto('format').width(800).url() : undefined,
            published: Boolean(i.published),
          }));
          setInsights(mappedInsights);
        }

        setIsCmsConnected(hasLoadedAnyCMSData);
      } catch (err: unknown) {
        if (!isMounted) return;
        const msg = err instanceof Error ? err.message : 'Unknown CMS error';
        console.warn('[Sanity CMS] Using verified static data fallback. Error:', msg);
        setError(msg);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchCMSContent();

    return () => {
      isMounted = false;
    };
  }, []);

  const value = useMemo(
    () => ({
      siteConfig,
      aboutData,
      services,
      projects,
      faqItems,
      insights,
      isLoading,
      isCmsConnected,
      error,
    }),
    [siteConfig, aboutData, services, projects, faqItems, insights, isLoading, isCmsConnected, error]
  );

  return <CMSContext.Provider value={value}>{children}</CMSContext.Provider>;
};
