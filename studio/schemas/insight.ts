import { defineField, defineType } from 'sanity';

export const insightType = defineType({
  name: 'insight',
  title: 'Insights & Field Guides',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Article Title',
      type: 'string',
      description: 'The title of the insight article or guide.',
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
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'e.g. "Technical SEO", "Search Strategy", "Performance", "Core Web Vitals".',
      validation: (Rule) => Rule.required(),
      initialValue: 'Technical SEO',
    }),
    defineField({
      name: 'readTime',
      title: 'Estimated Read Time',
      type: 'string',
      description: 'e.g. "5 min read", "8 min deep dive".',
      initialValue: '5 min read',
    }),
    defineField({
      name: 'date',
      title: 'Publication Date Display',
      type: 'string',
      description: 'Human-readable date string e.g. "October 2026".',
      initialValue: 'October 2026',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image (Optional)',
      type: 'image',
      description: 'Optional visual graphic for the article.',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'summary',
      title: 'Executive Summary',
      type: 'text',
      rows: 3,
      description: 'Brief overview displayed on the insight card.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Article Paragraphs',
      type: 'array',
      of: [{ type: 'text', rows: 4 }],
      description: 'Content paragraphs displayed inside the article modal.',
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
      description: 'When disabled, this article is hidden from the public website.',
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
      category: 'category',
      published: 'published',
      media: 'coverImage',
    },
    prepare({ title, category, published, media }) {
      return {
        title: title || 'Untitled Article',
        subtitle: `${published ? '🟢 Published' : '⚪ Draft'} • [${category || 'General'}]`,
        media,
      };
    },
  },
});
