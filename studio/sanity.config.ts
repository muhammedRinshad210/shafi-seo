import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

// Support both environment variable and fallback configuration
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'trjhguns';
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';

export default defineConfig({
  name: 'default',
  title: 'Shafi SEO — Content Management Studio',

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Website Content')
          .items([
            // Singleton: Website Settings
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
            // Regular Collections
            S.documentTypeListItem('service').title('SEO Services'),
            S.documentTypeListItem('project').title('Projects & Case Studies'),
            S.documentTypeListItem('faq').title('FAQ Items'),
            S.documentTypeListItem('insight').title('Insights & Field Guides'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
