# Shafi — Independent SEO Specialist Portfolio

A high-converting, editorial portfolio website engineered specifically for **Shafi**, an independent SEO specialist and search visibility consultant.

Built with **React, TypeScript, Vite, and Vanilla CSS**, following high-contrast editorial aesthetics, technical precision, and strict adherence to Google Search Essentials.

---

## 🌟 Key Highlights & Architecture

- **Editorial & Technical Aesthetic**: Obsidian dark theme (`#090A0D`) paired with electric acid-lime accents (`#D4F826`), typography combining **Syne** (editorial display headings), **Plus Jakarta Sans** (clean, readable UI/body), and **JetBrains Mono** (technical diagnostic scores & data).
- **Interactive Search Engine Simulator**: Embedded in the Hero section, giving prospective clients an interactive demonstration of technical SEO metrics (Core Web Vitals, Crawl & Indexation hygiene, and Search Intent distribution) comparing an unoptimized site to Shafi's engineered architecture.
- **Case-Study Driven Credibility**: Backed by `src/data/projects.ts`. Includes realistic architectural case studies (B2B SaaS, E-Commerce faceted navigation, multi-location healthcare) with deep-dive reader modals, verified outcomes, and a graceful empty state if all projects are drafted (`published: false`).
- **Honest, Functional Contact Flow**: No fake backend submission or misleading success screens. Inquiries are validated in real time and formatted into one-click actions:
  - **Direct Email Client** (`mailto:` with pre-filled subject and structured inquiry body).
  - **Direct WhatsApp Chat** (`https://wa.me/...` pre-formatted message).
  - One-click clipboard copy.
- **Full Technical SEO On-Page Architecture**:
  - Semantic HTML5 structure with single `<h1>`, logical heading hierarchy, and accessible ARIA landmarks.
  - Complete Schema.org JSON-LD graph (`WebSite`, `Person`, `ProfessionalService`, `FAQPage`).
  - Open Graph and Twitter Card social sharing cards.
  - Auto-generated XML sitemap (`/sitemap.xml`) and `robots.txt` (`/robots.txt`).
  - Accessible skip-to-content link, focus-visible styling, and keyboard navigation.

---

## 📁 File Structure & Data Architecture

```text
shafi-seo/
├── public/
│   ├── favicon.svg          # Custom SVG organic growth chevron favicon
│   ├── robots.txt           # Production robots.txt with sitemap reference
│   └── sitemap.xml          # XML sitemap mapping canonical URLs & anchors
├── src/
│   ├── components/
│   │   ├── Navbar.tsx       # Sticky blur navigation, availability badge, mobile drawer
│   │   ├── Hero.tsx         # Editorial headline, dual CTAs, live simulator integration
│   │   ├── SEOSimulator.tsx # Interactive before/after Core Web Vitals & crawl diagnostics
│   │   ├── About.tsx        # Specialist bio card, working principles, verified toolkit
│   │   ├── Services.tsx     # 6 core SEO services with deliverables & impact descriptions
│   │   ├── Projects.tsx     # Selected work showcase with category filters & empty state
│   │   ├── ProjectModal.tsx # Deep-dive modal reader for detailed case study audits
│   │   ├── Process.tsx      # 4-stage organic growth framework with client roles
│   │   ├── Trust.tsx        # Independent specialist vs agency comparison & white-hat pledge
│   │   ├── Insights.tsx     # Practical SEO guides & field notes
│   │   ├── InsightModal.tsx # Editorial modal reader for practical guides
│   │   ├── FAQ.tsx          # Accessible buyer accordion with honest timeline answers
│   │   ├── Contact.tsx      # Validated lead form with direct Email and WhatsApp channels
│   │   └── Footer.tsx       # Polished footer with auto-updating copyright and social links
│   ├── data/
│   │   ├── config.ts        # Central configuration (Name, bio, contact channels, availability)
│   │   ├── services.ts      # Services list, deliverables, and commercial impact statements
│   │   ├── projects.ts      # Case studies data with published flag
│   │   ├── process.ts       # 4-step framework phases and milestones
│   │   ├── faq.ts           # Buyer FAQ questions and transparent answers
│   │   └── insights.ts      # Practical SEO guides
│   ├── types/
│   │   └── index.ts         # TypeScript definitions
│   ├── App.tsx              # Main layout assembler and smooth interaction wiring
│   ├── App.css              # Custom editorial design system styling and responsive queries
│   ├── index.css            # CSS variables, design tokens, and typography foundations
│   └── main.tsx             # React DOM entry point
├── index.html               # Head tags, Schema.org JSON-LD, Google Fonts preconnect
├── package.json
└── tsconfig.json
```

---

## 🛠️ How to Update and Customize Content

### 1. Updating Personal & Contact Information
Open [`src/data/config.ts`](file:///c:/Users/Muhammed%20Rinshad/Desktop/shafi%20seo/src/data/config.ts) to update:
- `specialistName`: Name displayed across the site and structured data.
- `location`: Confirmed operating location (e.g., "Kerala, India & Remote Worldwide").
- `contactEmail`: Your primary email inbox for direct client inquiries.
- `whatsappNumber`: Your WhatsApp number in international format (e.g., `+919876543210`).
- `whatsappDisplay`: Formatted WhatsApp number shown to users.
- `availability`: Current project availability status and badge text.
- `linkedinUrl`, `twitterUrl`, `githubUrl`: Social links.

### 2. Adding or Publishing a New Case Study
Open [`src/data/projects.ts`](file:///c:/Users/Muhammed%20Rinshad/Desktop/shafi%20seo/src/data/projects.ts):
- Add a new object conforming to the `Project` interface.
- To display it publicly, set `published: true`.
- To keep it in draft, set `published: false`.
- If all projects are set to `published: false`, the site will automatically render a tasteful, professional empty state inviting potential clients to become the next case study.

### 3. Adding or Updating Services
Open [`src/data/services.ts`](file:///c:/Users/Muhammed%20Rinshad/Desktop/shafi%20seo/src/data/services.ts) to edit deliverables, problems addressed, or expected outcomes.

---

## 🚀 Development & Deployment

### Run Locally:
```bash
npm install
npm run dev
```
The site will run at `http://localhost:5173/`.

### Run Linter:
```bash
npm run lint
```

### Production Build:
```bash
npm run build
```
Creates an optimized production bundle in the `dist/` directory.

### Preview Production Build:
```bash
npm run preview
```

---

## 📋 Checklist for Owner Before Public Launch

1. **Verify Contact Email & Phone**: Ensure `contactEmail` and `whatsappNumber` in `src/data/config.ts` are your live accounts.
2. **Review Case Studies**: Check `src/data/projects.ts` and set `published: true` on verified projects.
3. **Domain & Sitemaps**: Update `https://shafi-seo.com/` in `public/robots.txt`, `public/sitemap.xml`, and `index.html` with your actual custom domain.
4. **Deploy**: Host on Vercel, Netlify, Cloudflare Pages, or any static host.
