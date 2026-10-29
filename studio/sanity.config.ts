import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { presentationTool, defineLocations } from 'sanity/presentation';
import { schemaTypes } from './schemas';

// Support both environment variable and fallback configuration
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'trjhguns';
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';

// Target preview URL for GitHub Pages production or local development
const previewOrigin =
  process.env.SANITY_STUDIO_PREVIEW_URL || 'https://muhammedrinshad210.github.io';

export default defineConfig({
  name: 'default',
  title: 'Shafi SEO — Content Management Studio',

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Website Content & Visual Builder')
          .items([
            // Primary Visual Page Builder (Home Page Document)
            S.listItem()
              .title('Visual Page Builder (Home Page)')
              .id('homePage')
              .child(
                S.document()
                  .schemaType('page')
                  .documentId('homePage')
                  .title('Visual Page Builder (Home Page)')
              ),

            // Singleton: Website Settings & Brand
            S.listItem()
              .title('Website Settings & Brand')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
                  .title('Website Settings & Brand')
              ),

            S.divider(),

            // Structured Collections
            S.documentTypeListItem('service').title('SEO Services'),
            S.documentTypeListItem('project').title('Projects & Case Studies'),
            S.documentTypeListItem('faq').title('FAQ Items'),
            S.documentTypeListItem('insight').title('Insights & Field Guides'),

            S.divider(),

            // All Custom Pages
            S.documentTypeListItem('page').title('All Pages & Landing Pages'),
          ]),
    }),

    // Official Sanity Presentation Tool & Visual Editing
    presentationTool({
      title: 'Visual Editor (Presentation)',
      previewUrl: {
        origin: previewOrigin,
        previewMode: {
          enable: '/shafi-seo/?preview=true',
        },
      },
      resolve: {
        locations: {
          page: defineLocations({
            select: {
              title: 'title',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || 'Visual Page Builder (Home)',
                  href: doc?.slug === 'home' || !doc?.slug ? '/shafi-seo/' : `/shafi-seo/${doc.slug}`,
                },
              ],
            }),
          }),
          siteSettings: defineLocations({
            select: {
              title: 'specialistName',
            },
            resolve: () => ({
              locations: [
                {
                  title: 'Website Settings & Brand Identity',
                  href: '/shafi-seo/',
                },
              ],
            }),
          }),
          service: defineLocations({
            select: {
              title: 'title',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || 'SEO Services Matrix',
                  href: '/shafi-seo/#services',
                },
              ],
            }),
          }),
          project: defineLocations({
            select: {
              title: 'title',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || 'Projects & Case Studies',
                  href: '/shafi-seo/#projects',
                },
              ],
            }),
          }),
          faq: defineLocations({
            select: {
              title: 'question',
            },
            resolve: () => ({
              locations: [
                {
                  title: 'Buyer FAQ Section',
                  href: '/shafi-seo/#faq',
                },
              ],
            }),
          }),
          insight: defineLocations({
            select: {
              title: 'title',
            },
            resolve: () => ({
              locations: [
                {
                  title: 'Insights & Field Guides',
                  href: '/shafi-seo/#insights',
                },
              ],
            }),
          }),
        },
      },
    }),

    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
