import { defineField, defineType } from 'sanity';

export const richTextBlockType = defineType({
  name: 'richTextBlock',
  title: 'Rich-Text Content Block',
  type: 'object',
  fields: [
    defineField({
      name: 'badge',
      title: 'Section Badge',
      type: 'string',
      initialValue: 'DEEP DIVE',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Rich Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Heading 4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      headline: 'headline',
    },
    prepare({ headline }) {
      return {
        title: headline || 'Rich-Text Content Block',
        subtitle: 'Formatted multi-paragraph editorial content',
      };
    },
  },
});
