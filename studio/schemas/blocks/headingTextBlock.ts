import { defineField, defineType } from 'sanity';

export const headingTextBlockType = defineType({
  name: 'headingTextBlock',
  title: 'Heading & Text Block',
  type: 'object',
  fields: [
    defineField({
      name: 'badge',
      title: 'Section Badge / Tag',
      type: 'string',
      description: 'Small uppercase tag above headline (e.g. "STRATEGIC OVERVIEW", "CLIENT NOTICE").',
      initialValue: 'STRATEGIC PERSPECTIVE',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Custom Section Headline',
    }),
    defineField({
      name: 'text',
      title: 'Text Content',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
      initialValue: 'Write your custom section description or message here. This block appears in the order you place it.',
    }),
    defineField({
      name: 'alignment',
      title: 'Text Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Left Aligned', value: 'left' },
          { title: 'Center Aligned', value: 'center' },
          { title: 'Right Aligned', value: 'right' },
        ],
        layout: 'radio',
      },
      initialValue: 'left',
    }),
    defineField({
      name: 'variant',
      title: 'Visual Container Style',
      type: 'string',
      options: {
        list: [
          { title: 'Brutalist Card with Cyber Corner', value: 'box' },
          { title: 'Minimalist Clean Frame', value: 'minimal' },
          { title: 'Electric Lime Accent Glow', value: 'accent' },
        ],
        layout: 'radio',
      },
      initialValue: 'box',
    }),
  ],
  preview: {
    select: {
      headline: 'headline',
      badge: 'badge',
    },
    prepare({ headline, badge }) {
      return {
        title: headline || 'Heading & Text Block',
        subtitle: badge ? `[${badge}] Text Block` : 'Text Block',
      };
    },
  },
});
