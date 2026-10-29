import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Environment variables configured in Vite or GitHub Actions
export const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'trjhguns';
export const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
export const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01';

// Read-only client detection
export const isSanityConfigured = Boolean(projectId && projectId.trim() !== '');

/**
 * Public Sanity Client
 * Strictly read-only for published content on public datasets.
 * Write tokens and private secrets are never included in the frontend client.
 */
export const sanityClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true, // Edge CDN for high-speed, cached responses
    })
  : null;

// Image URL builder instance
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

/**
 * Safe Image URL Builder
 * Allows generating responsive, optimized WebP URLs from Sanity image assets.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  if (!builder || !source) return null;
  return builder.image(source);
}

/**
 * GROQ Queries for website content & page builder
 */
export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]`;
export const PAGE_QUERY = `*[_type == "page" && (slug.current == "home" || _id in ["homePage", "drafts.homePage"])][0]`;
export const SERVICES_QUERY = `*[_type == "service" && published == true] | order(order asc)`;
export const PROJECTS_QUERY = `*[_type == "project" && published == true] | order(order asc)`;
export const FAQ_QUERY = `*[_type == "faq" && published == true] | order(order asc)`;
export const INSIGHTS_QUERY = `*[_type == "insight" && published == true] | order(order asc)`;

export { createDataAttribute, isVisualEditingActive, sendStudioFocus } from './visualEditing';
