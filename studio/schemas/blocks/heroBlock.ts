import { defineField, defineType } from 'sanity';

export const heroBlockType = defineType({
  name: 'heroBlock',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline Override',
      type: 'string',
      description: 'Leave empty to inherit from Website Settings.',
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline Override',
      type: 'text',
      rows: 2,
      description: 'Leave empty to inherit from Website Settings.',
    }),
    defineField({
      name: 'experienceBadge',
      title: 'Experience Badge Override',
      type: 'string',
      description: 'e.g. "5+ Years Experience" (optional override).',
    }),
    defineField({
      name: 'ctaPrimaryLabel',
      title: 'Primary Button Label',
      type: 'string',
      initialValue: 'Explore SEO Solutions',
    }),
    defineField({
      name: 'ctaSecondaryLabel',
      title: 'Secondary Button Label',
      type: 'string',
      initialValue: 'Consultation & Inquiries',
    }),
  ],
  preview: {
    select: {
      headline: 'headline',
    },
    prepare({ headline }) {
      return {
        title: headline ? `Hero: "${headline}"` : 'Hero Section (Global Settings)',
        subtitle: 'Top of page editorial hook with availability badge',
      };
    },
  },
});
