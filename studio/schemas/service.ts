import { defineField, defineType } from 'sanity';

export const serviceType = defineType({
  name: 'service',
  title: 'SEO Services',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Service Title',
      type: 'string',
      description: 'The name of the SEO service offering (e.g. "Technical SEO & Architecture Audit").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Identifier / Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'badge',
      title: 'Visual Category Badge',
      type: 'string',
      description: 'Short descriptor pill (e.g. "Foundational Audit", "High ROI Focus", "Immediate Optimization").',
      initialValue: 'Core Service',
    }),
    defineField({
      name: 'iconName',
      title: 'Icon Type',
      type: 'string',
      description: 'Select an icon to accompany the service.',
      options: {
        list: [
          { title: 'CPU / Technical Architecture', value: 'Cpu' },
          { title: 'Target / Keyword Intent', value: 'Target' },
          { title: 'File Check / On-Page Optimization', value: 'FileCheck' },
          { title: 'Layers / Content Roadmaps', value: 'Layers' },
          { title: 'Map Pin / Local SEO', value: 'MapPin' },
          { title: 'Gauge / Core Web Vitals', value: 'Gauge' },
          { title: 'Shield / White-Hat Strategy', value: 'ShieldCheck' },
          { title: 'Trending / Organic Growth', value: 'TrendingUp' },
        ],
      },
      initialValue: 'Cpu',
    }),
    defineField({
      name: 'customIcon',
      title: 'Custom Service Icon or Image (Optional)',
      type: 'image',
      description: 'Optional custom SVG or PNG image for the service card.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Concise summary displayed on the service card front.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'problem',
      title: 'The Problem It Solves',
      type: 'text',
      rows: 3,
      description: 'Context explaining why clients need this specific service and what risks they face without it.',
    }),
    defineField({
      name: 'deliverables',
      title: 'Key Deliverables & Action Items',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of specific deliverables included with this service.',
    }),
    defineField({
      name: 'expectedImpact',
      title: 'Expected Business Impact',
      type: 'text',
      rows: 3,
      description: 'What organic outcomes, crawl improvements, or revenue advantages the client will gain.',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Ascending sort order on the website (e.g. 1, 2, 3...).',
      initialValue: 1,
    }),
    defineField({
      name: 'published',
      title: 'Publish to Website',
      type: 'boolean',
      description: 'When disabled, this service is hidden from the live website without deleting it.',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      badge: 'badge',
      published: 'published',
      media: 'customIcon',
    },
    prepare({ title, badge, published, media }) {
      return {
        title: title || 'Untitled Service',
        subtitle: `${published ? '🟢 Published' : '⚪ Draft'} • ${badge || 'No badge'}`,
        media,
      };
    },
  },
});
