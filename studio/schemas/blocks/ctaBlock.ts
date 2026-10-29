import { defineField, defineType } from 'sanity';

export const ctaBlockType = defineType({
  name: 'ctaBlock',
  title: 'Call-to-Action (CTA) Block',
  type: 'object',
  fields: [
    defineField({
      name: 'badge',
      title: 'Action Badge',
      type: 'string',
      initialValue: 'TAKE DIRECT ACTION',
    }),
    defineField({
      name: 'headline',
      title: 'Call-to-Action Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Ready to Solve Your Organic Search Bottlenecks?',
    }),
    defineField({
      name: 'description',
      title: 'Supporting Persuasion Copy',
      type: 'text',
      rows: 3,
      initialValue: 'Book a diagnostic technical review directly with Shafi. Zero agency bureaucracy, zero junior hand-offs.',
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Schedule Diagnostic Consultation',
    }),
    defineField({
      name: 'buttonAction',
      title: 'Button Action',
      type: 'string',
      options: {
        list: [
          { title: 'Open Consultation Drawer', value: 'drawer' },
          { title: 'Direct WhatsApp Chat', value: 'whatsapp' },
          { title: 'Scroll to Contact Form', value: 'contact' },
          { title: 'Custom External Link', value: 'link' },
        ],
        layout: 'radio',
      },
      initialValue: 'drawer',
    }),
    defineField({
      name: 'customUrl',
      title: 'Custom Destination URL',
      type: 'url',
      hidden: ({ parent }) => parent?.buttonAction !== 'link',
    }),
  ],
  preview: {
    select: {
      headline: 'headline',
      buttonText: 'buttonText',
    },
    prepare({ headline, buttonText }) {
      return {
        title: headline || 'Call-to-Action Block',
        subtitle: buttonText ? `Button: "${buttonText}"` : 'High-impact conversion box',
      };
    },
  },
});
