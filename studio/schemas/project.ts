import { defineField, defineType } from 'sanity';

export const projectType = defineType({
  name: 'project',
  title: 'Projects & Case Studies',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      description: 'The title of the client engagement or case study.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'industry',
      title: 'Industry / Market Category',
      type: 'string',
      description: 'e.g. "B2B Enterprise Software", "D2C E-Commerce", "Local Healthcare Services".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Project Timeline / Duration',
      type: 'string',
      description: 'e.g. "4-Month Engagement", "6-Month Retainer", "8-Week Audit Sprint".',
      initialValue: '3-Month Engagement',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      description: 'Primary visual preview for the case study card and inspection modal.',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'Descriptive alt text for accessibility and technical SEO.',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Project Supporting Images / Evidence',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'caption',
              title: 'Caption / Chart Description',
              type: 'string',
            }),
            defineField({
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
            }),
          ],
        },
      ],
      description: 'Additional GSC performance charts, Screaming Frog crawl graphs, or architecture diagrams.',
    }),
    defineField({
      name: 'summary',
      title: 'Executive Summary',
      type: 'text',
      rows: 3,
      description: 'High-level overview of the scope and core transformation.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'challenge',
      title: 'The Challenge & Technical Bottlenecks',
      type: 'text',
      rows: 4,
      description: 'What problems did the website face prior to the audit and intervention?',
    }),
    defineField({
      name: 'strategy',
      title: 'Key Interventions & Execution Strategy',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Bullet points detailing architectural fixes, intent mapping, or structured data implemented.',
    }),
    defineField({
      name: 'results',
      title: 'Verified Outcomes & Metrics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Metric Value (e.g. "+148%", "99.2%", "-87%")',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Metric Label (e.g. "Qualified Organic Traffic", "Indexation Health")',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'context',
              title: 'Context / Evidence Note',
              type: 'string',
              description: 'Brief context verifying how the result was measured (e.g. "Google Search Console 6-month comparison").',
            }),
          ],
          preview: {
            select: {
              title: 'value',
              subtitle: 'label',
            },
          },
        },
      ],
      description: 'Real quantified results achieved during or following the project.',
    }),
    defineField({
      name: 'tools',
      title: 'Tools & Diagnostic Suite Used',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g. "Google Search Console", "Screaming Frog", "Ahrefs", "Schema.org", "Lighthouse".',
    }),
    defineField({
      name: 'projectUrl',
      title: 'Client Website URL (Optional)',
      type: 'url',
      description: 'Public link to the client website or landing page if authorized to share.',
    }),
    defineField({
      name: 'featured',
      title: 'Feature as Priority Highlight',
      type: 'boolean',
      description: 'Featured case studies receive prominent visual styling.',
      initialValue: false,
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
      description: 'When disabled, this case study is saved as a draft and hidden from the public website.',
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
      industry: 'industry',
      published: 'published',
      featured: 'featured',
      media: 'coverImage',
    },
    prepare({ title, industry, published, featured, media }) {
      return {
        title: title || 'Untitled Project',
        subtitle: `${published ? '🟢 Published' : '⚪ Draft'} • ${industry || 'No industry'} ${featured ? '★ Featured' : ''}`,
        media,
      };
    },
  },
});
