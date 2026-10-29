import { defineField, defineType } from 'sanity';

export const pageType = defineType({
  name: 'page',
  title: 'Visual Page (Page Builder)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Home Page',
    }),
    defineField({
      name: 'slug',
      title: 'Page URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      initialValue: { current: 'home' },
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections (Drag to Reorder, Add, or Remove)',
      description:
        'Elementor-style modular sections. Drag blocks up or down to rearrange your website layout. Add new text, image, or CTA blocks at any position.',
      type: 'array',
      of: [
        { type: 'heroBlock' },
        { type: 'headingTextBlock' },
        { type: 'richTextBlock' },
        { type: 'imageBlock' },
        { type: 'imageWithTextBlock' },
        { type: 'ctaBlock' },
        { type: 'servicesBlock' },
        { type: 'projectsBlock' },
        { type: 'processBlock' },
        { type: 'trustBlock' },
        { type: 'faqBlock' },
        { type: 'insightsBlock' },
        { type: 'contactBlock' },
      ],
      options: {
        insertMenu: {
          views: [{ name: 'list' }, { name: 'grid' }],
        },
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      sections: 'sections',
    },
    prepare({ title, slug, sections }) {
      const count = Array.isArray(sections) ? sections.length : 0;
      return {
        title: title || 'Home Page',
        subtitle: `/${slug || ''} — ${count} visual section${count === 1 ? '' : 's'}`,
      };
    },
  },
});
