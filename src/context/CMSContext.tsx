import React, { useEffect, useState, useMemo, useCallback } from 'react';
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
import { CMSContext, defaultSections } from './CMSContextBase';
import {
  sanityClient,
  isSanityConfigured,
  urlFor,
  SITE_SETTINGS_QUERY,
  PAGE_QUERY,
  SERVICES_QUERY,
  PROJECTS_QUERY,
  FAQ_QUERY,
  INSIGHTS_QUERY,
  isVisualEditingActive,
} from '../lib/sanity';

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(defaultSiteConfig);
  const [aboutData, setAboutData] = useState<typeof defaultAboutData>(defaultAboutData);
  const [services, setServices] = useState<Service[]>(defaultServices);
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [faqItems, setFaqItems] = useState<FAQItem[]>(defaultFaq);
  const [insights, setInsights] = useState<InsightArticle[]>(defaultInsights);
  const [pageData, setPageData] = useState<PageDocument | null>(null);
  const [sections, setSections] = useState<PageSectionBlock[]>(defaultSections);
  const [isVisualEditing, setIsVisualEditing] = useState<boolean>(() => isVisualEditingActive());
  const [isLoading, setIsLoading] = useState<boolean>(isSanityConfigured);
  const [isCmsConnected, setIsCmsConnected] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all CMS content including page builder document
  useEffect(() => {
    if (!isSanityConfigured || !sanityClient) {
      return;
    }

    let isMounted = true;

    async function fetchCMSContent() {
      setIsLoading(true);
      setError(null);

      try {
        const [settingsRes, pageRes, servicesRes, projectsRes, faqRes, insightsRes] =
          await Promise.allSettled([
            sanityClient!.fetch(SITE_SETTINGS_QUERY),
            sanityClient!.fetch(PAGE_QUERY),
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
            whatsappDisplay:
              cms.whatsappDisplay && cms.whatsappDisplay !== '+91 98765 43210'
                ? cms.whatsappDisplay
                : cms.whatsappNumber || prev.whatsappDisplay,
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

          if (cms.metaTitle && typeof document !== 'undefined') {
            document.title = cms.metaTitle;
          }
        }

        // 2. Process Page Builder Sections
        if (pageRes.status === 'fulfilled' && pageRes.value) {
          const page = pageRes.value;
          hasLoadedAnyCMSData = true;
          setPageData(page);

          if (Array.isArray(page.sections) && page.sections.length > 0) {
            // Process images within sections
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const processedSections = page.sections.map((sec: any) => {
              if (sec._type === 'imageBlock' && sec.image) {
                return {
                  ...sec,
                  imageUrl: urlFor(sec.image)?.auto('format').width(1400).url() || undefined,
                };
              }
              if (sec._type === 'imageWithTextBlock' && sec.image) {
                return {
                  ...sec,
                  imageUrl: urlFor(sec.image)?.auto('format').width(900).url() || undefined,
                };
              }
              return sec;
            });
            setSections(processedSections);
          }
        }

        // 3. Process Services
        if (
          servicesRes.status === 'fulfilled' &&
          Array.isArray(servicesRes.value) &&
          servicesRes.value.length > 0
        ) {
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
            customIconUrl: s.customIcon
              ? urlFor(s.customIcon)?.auto('format').width(64).url()
              : undefined,
          }));
          setServices(mappedServices);
        }

        // 4. Process Projects / Case Studies
        if (
          projectsRes.status === 'fulfilled' &&
          Array.isArray(projectsRes.value) &&
          projectsRes.value.length > 0
        ) {
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
            image: p.coverImage
              ? urlFor(p.coverImage)?.auto('format').width(1000).url()
              : undefined,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            gallery: (p.gallery || [])
              .map((g: any) => urlFor(g)?.auto('format').width(1200).url())
              .filter(Boolean),
            projectUrl: p.projectUrl || undefined,
            published: Boolean(p.published),
            featured: Boolean(p.featured),
          }));
          setProjects(mappedProjects);
        }

        // 5. Process FAQ
        if (
          faqRes.status === 'fulfilled' &&
          Array.isArray(faqRes.value) &&
          faqRes.value.length > 0
        ) {
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

        // 6. Process Insights
        if (
          insightsRes.status === 'fulfilled' &&
          Array.isArray(insightsRes.value) &&
          insightsRes.value.length > 0
        ) {
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
            coverImage: i.coverImage
              ? urlFor(i.coverImage)?.auto('format').width(800).url()
              : undefined,
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

  // Listen for Sanity Presentation Tool / Studio messages
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleMessage = (event: MessageEvent) => {
      const data = event.data;
      if (!data || typeof data !== 'object') return;

      // Enable visual editing on any presentation handshake or toggle
      if (
        data.type === 'visual-editing/toggle' ||
        data.type === 'presentation/toggle' ||
        data.type === 'overlay/toggle'
      ) {
        if (typeof data.data?.enabled === 'boolean') {
          setIsVisualEditing(data.data.enabled);
        } else {
          setIsVisualEditing(true);
        }
      }

      // Live draft preview update from Sanity Presentation Tool
      if (
        data.type === 'visual-editing/mutate' ||
        data.type === 'presentation/preview' ||
        data.type === 'presentation/snapshot'
      ) {
        // If snapshot document is provided, apply updates optimistically
        if (data.data?.snapshot && data.data.snapshot._type === 'page') {
          const newPage = data.data.snapshot;
          setPageData(newPage);
          if (Array.isArray(newPage.sections)) {
            setSections(newPage.sections);
          }
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  // Section Reordering (Move Up / Move Down)
  const moveSection = useCallback((fromIndex: number, toIndex: number) => {
    setSections((prev) => {
      if (toIndex < 0 || toIndex >= prev.length || fromIndex === toIndex) return prev;
      const next = [...prev];
      const [item] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, item);
      return next;
    });
  }, []);

  // Add Section Block
  const addSection = useCallback((block: PageSectionBlock, atIndex?: number) => {
    setSections((prev) => {
      const next = [...prev];
      const targetIndex =
        typeof atIndex === 'number' && atIndex >= 0 && atIndex <= next.length
          ? atIndex
          : next.length;
      next.splice(targetIndex, 0, block);
      return next;
    });
  }, []);

  // Remove Section Block (Safeguarded)
  const removeSection = useCallback((index: number) => {
    setSections((prev) => {
      if (index < 0 || index >= prev.length) return prev;
      const target = prev[index];
      // Prevent deleting the Hero or Contact sections accidentally
      if (target._type === 'heroBlock' && prev.filter((s) => s._type === 'heroBlock').length <= 1) {
        alert('The Hero section is a core page element and cannot be deleted.');
        return prev;
      }
      return prev.filter((_, i) => i !== index);
    });
  }, []);

  // Update Section Block in Place
  const updateSection = useCallback((index: number, updated: Partial<PageSectionBlock>) => {
    setSections((prev) => {
      if (index < 0 || index >= prev.length) return prev;
      const next = [...prev];
      next[index] = { ...next[index], ...updated } as PageSectionBlock;
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      siteConfig,
      aboutData,
      services,
      projects,
      faqItems,
      insights,
      pageData,
      sections,
      isVisualEditing,
      moveSection,
      addSection,
      removeSection,
      updateSection,
      isLoading,
      isCmsConnected,
      error,
    }),
    [
      siteConfig,
      aboutData,
      services,
      projects,
      faqItems,
      insights,
      pageData,
      sections,
      isVisualEditing,
      moveSection,
      addSection,
      removeSection,
      updateSection,
      isLoading,
      isCmsConnected,
      error,
    ]
  );

  return <CMSContext.Provider value={value}>{children}</CMSContext.Provider>;
};
