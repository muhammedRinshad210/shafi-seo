import { defineField, defineType } from 'sanity';

export const imageBlockType = defineType({
  name: 'imageBlock',
  title: 'Image Block',
  type: 'object',
  fields: [
    defineField({
      name: 'badge',
      title: 'Section Badge',
      type: 'string',
    }),
    defineField({
      name: 'headline',
      title: 'Optional Section Headline',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image Asset',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alternative Text (Accessibility & SEO)',
      type: 'string',
      description: 'Describe the image for screen readers and search engines.',
      validation: (Rule) => Rule.required(),
      initialValue: 'SEO diagnostic chart or technical framework',
    }),
    defineField({
      name: 'caption',
      title: 'Visible Image Caption',
      type: 'string',
    }),
    defineField({
      name: 'aspectRatio',
      title: 'Display Ratio',
      type: 'string',
      options: {
        list: [
          { title: '16:9 Cinematic Landscape', value: '16:9' },
          { title: '4:3 Standard Frame', value: '4:3' },
          { title: 'Square (1:1)', value: 'square' },
          { title: 'Ultra-wide Panoramic (21:9)', value: 'wide' },
        ],
        layout: 'radio',
      },
      initialValue: '16:9',
    }),
    defineField({
      name: 'maxWidth',
      title: 'Maximum Width',
      type: 'string',
      options: {
        list: [
          { title: 'Standard Grid Width (1200px)', value: 'constrained' },
          { title: 'Compact Column (800px)', value: 'compact' },
          { title: 'Full Viewport Width', value: 'full' },
        ],
        layout: 'radio',
      },
      initialValue: 'constrained',
    }),
  ],
  preview: {
    select: {
      title: 'caption',
      headline: 'headline',
      alt: 'alt',
      media: 'image',
    },
    prepare({ title, headline, alt, media }) {
      return {
        title: headline || title || alt || 'Image Block',
        subtitle: 'Standalone responsive image asset',
        media,
      };
    },
  },
});
