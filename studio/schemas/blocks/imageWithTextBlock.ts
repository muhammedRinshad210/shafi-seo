import { defineField, defineType } from 'sanity';

export const imageWithTextBlockType = defineType({
  name: 'imageWithTextBlock',
  title: 'Image with Text Block',
  type: 'object',
  fields: [
    defineField({
      name: 'badge',
      title: 'Section Badge',
      type: 'string',
      initialValue: 'TECHNICAL SPOTLIGHT',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Engineering Search Visibility with Precision',
    }),
    defineField({
      name: 'text',
      title: 'Descriptive Text',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required(),
      initialValue: 'Provide detailed context explaining your technical methodology, audit findings, or custom approach.',
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
      title: 'Image Alt Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Technical SEO analysis illustration',
    }),
    defineField({
      name: 'imagePosition',
      title: 'Image Position',
      type: 'string',
      options: {
        list: [
          { title: 'Left (Text on Right)', value: 'left' },
          { title: 'Right (Text on Left)', value: 'right' },
        ],
        layout: 'radio',
      },
      initialValue: 'right',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Optional Button Label',
      type: 'string',
      description: 'e.g. "Request Free Diagnostic Audit"',
    }),
    defineField({
      name: 'ctaAction',
      title: 'Button Click Action',
      type: 'string',
      options: {
        list: [
          { title: 'Open Lead Consultation Drawer', value: 'drawer' },
          { title: 'Direct WhatsApp Chat', value: 'whatsapp' },
          { title: 'Scroll to Contact Section', value: 'contact' },
        ],
        layout: 'radio',
      },
      initialValue: 'drawer',
    }),
  ],
  preview: {
    select: {
      headline: 'headline',
      media: 'image',
    },
    prepare({ headline, media }) {
      return {
        title: headline || 'Image with Text Block',
        subtitle: 'Side-by-side editorial layout',
        media,
      };
    },
  },
});
