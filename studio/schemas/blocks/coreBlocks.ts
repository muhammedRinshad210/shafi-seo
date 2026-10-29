import { defineField, defineType } from 'sanity';

export const servicesBlockType = defineType({
  name: 'servicesBlock',
  title: 'SEO Services Grid',
  type: 'object',
  fields: [
    defineField({
      name: 'badge',
      title: 'Section Badge',
      type: 'string',
      initialValue: 'SERVICE OFFERINGS',
    }),
    defineField({
      name: 'headline',
      title: 'Section Headline',
      type: 'string',
      initialValue: 'Precision SEO Services Engineered for Search Dominance',
    }),
    defineField({
      name: 'subheadline',
      title: 'Section Subheadline',
      type: 'text',
      rows: 2,
      initialValue: 'Diagnostic technical audits, keyword intent research, and white-hat ranking strategies.',
    }),
  ],
  preview: {
    select: {
      headline: 'headline',
    },
    prepare({ headline }) {
      return {
        title: headline || 'Services Grid Section',
        subtitle: 'Dynamic grid rendering published SEO services',
      };
    },
  },
});

export const projectsBlockType = defineType({
  name: 'projectsBlock',
  title: 'Selected Projects & Case Studies',
  type: 'object',
  fields: [
    defineField({
      name: 'badge',
      title: 'Section Badge',
      type: 'string',
      initialValue: 'VERIFIED OUTCOMES',
    }),
    defineField({
      name: 'headline',
      title: 'Section Headline',
      type: 'string',
      initialValue: 'Selected Case Studies & Organic Outcomes',
    }),
    defineField({
      name: 'subheadline',
      title: 'Section Subheadline',
      type: 'text',
      rows: 2,
      initialValue: 'Real client results delivered through technical precision, structured data, and keyword intent.',
    }),
  ],
  preview: {
    select: {
      headline: 'headline',
    },
    prepare({ headline }) {
      return {
        title: headline || 'Projects & Case Studies Section',
        subtitle: 'Dynamic grid rendering published case studies',
      };
    },
  },
});

export const processBlockType = defineType({
  name: 'processBlock',
  title: 'Process & Methodology Section',
  type: 'object',
  fields: [
    defineField({
      name: 'badge',
      title: 'Section Badge',
      type: 'string',
      initialValue: 'METHODOLOGY & PROTOCOL',
    }),
    defineField({
      name: 'headline',
      title: 'Section Headline',
      type: 'string',
      initialValue: 'Systematic Execution from Audit to Authority',
    }),
    defineField({
      name: 'subheadline',
      title: 'Section Subheadline',
      type: 'text',
      rows: 2,
      initialValue: 'Four rigorous phases designed to systematically eliminate ranking bottlenecks.',
    }),
  ],
  preview: {
    select: {
      headline: 'headline',
    },
    prepare({ headline }) {
      return {
        title: headline || 'SEO Process & Methodology',
        subtitle: '4-phase structured engagement protocol',
      };
    },
  },
});

export const trustBlockType = defineType({
  name: 'trustBlock',
  title: 'Trust & Comparison Section',
  type: 'object',
  fields: [
    defineField({
      name: 'badge',
      title: 'Section Badge',
      type: 'string',
      initialValue: 'STANDARDS & TRANSPARENCY',
    }),
    defineField({
      name: 'headline',
      title: 'Section Headline',
      type: 'string',
      initialValue: 'Independent Specialist vs. Generic Agency',
    }),
    defineField({
      name: 'subheadline',
      title: 'Section Subheadline',
      type: 'text',
      rows: 2,
      initialValue: 'Direct accountability, verifiable data, and honest expectations.',
    }),
  ],
  preview: {
    select: {
      headline: 'headline',
    },
    prepare({ headline }) {
      return {
        title: headline || 'Trust, Standards & Comparison',
        subtitle: 'Specialist vs. agency transparency comparison table',
      };
    },
  },
});

export const faqBlockType = defineType({
  name: 'faqBlock',
  title: 'FAQ Section',
  type: 'object',
  fields: [
    defineField({
      name: 'badge',
      title: 'Section Badge',
      type: 'string',
      initialValue: 'BUYER CLARITY',
    }),
    defineField({
      name: 'headline',
      title: 'Section Headline',
      type: 'string',
      initialValue: 'Frequently Asked Questions',
    }),
    defineField({
      name: 'subheadline',
      title: 'Section Subheadline',
      type: 'text',
      rows: 2,
      initialValue: 'Clear answers on timelines, methodology, pricing, and expectations.',
    }),
  ],
  preview: {
    select: {
      headline: 'headline',
    },
    prepare({ headline }) {
      return {
        title: headline || 'FAQ Section',
        subtitle: 'Interactive accordion rendering published FAQ items',
      };
    },
  },
});

export const insightsBlockType = defineType({
  name: 'insightsBlock',
  title: 'Insights & Field Guides Section',
  type: 'object',
  fields: [
    defineField({
      name: 'badge',
      title: 'Section Badge',
      type: 'string',
      initialValue: 'FIELD GUIDES & RESEARCH',
    }),
    defineField({
      name: 'headline',
      title: 'Section Headline',
      type: 'string',
      initialValue: 'SEO Field Guides & Tactical Insights',
    }),
    defineField({
      name: 'subheadline',
      title: 'Section Subheadline',
      type: 'text',
      rows: 2,
      initialValue: 'In-depth perspectives on algorithmic shifts, crawl efficiency, and schema.',
    }),
  ],
  preview: {
    select: {
      headline: 'headline',
    },
    prepare({ headline }) {
      return {
        title: headline || 'Insights & Field Guides Section',
        subtitle: 'Editorial article grid with reading drawer modals',
      };
    },
  },
});

export const contactBlockType = defineType({
  name: 'contactBlock',
  title: 'Contact & Inquiry Section',
  type: 'object',
  fields: [
    defineField({
      name: 'badge',
      title: 'Section Badge',
      type: 'string',
      initialValue: 'INITIAL INQUIRY',
    }),
    defineField({
      name: 'headline',
      title: 'Section Headline',
      type: 'string',
      initialValue: 'Let us Engineer Your Organic Search Advantage',
    }),
    defineField({
      name: 'subheadline',
      title: 'Section Subheadline',
      type: 'text',
      rows: 2,
      initialValue: 'Direct communication via email or WhatsApp. No automated spam, no pressure.',
    }),
  ],
  preview: {
    select: {
      headline: 'headline',
    },
    prepare({ headline }) {
      return {
        title: headline || 'Contact & Consultation Section',
        subtitle: 'Interactive contact form and direct WhatsApp links',
      };
    },
  },
});
