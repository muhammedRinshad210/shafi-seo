import { defineField, defineType } from 'sanity';

export const faqType = defineType({
  name: 'faq',
  title: 'FAQ Items',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      description: 'Frequently asked question asked by prospective clients.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 5,
      description: 'Clear, transparent explanation without technical fluff.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'General & Role', value: 'general' },
          { title: 'Process & Communication', value: 'process' },
          { title: 'Timeline & ROI', value: 'timeline' },
          { title: 'Pricing & Retainers', value: 'pricing' },
        ],
      },
      initialValue: 'general',
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
      description: 'When disabled, this question is hidden from the public website.',
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
      title: 'question',
      category: 'category',
      published: 'published',
    },
    prepare({ title, category, published }) {
      return {
        title: title || 'Untitled FAQ',
        subtitle: `${published ? '🟢 Published' : '⚪ Draft'} • [${category || 'general'}]`,
      };
    },
  },
});
