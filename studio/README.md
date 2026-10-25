# Shafi SEO — Content Management Studio

Welcome to the **Shafi SEO Content Management Studio**, powered by [Sanity CMS](https://sanity.io).

This dashboard enables Shafi to update website copy, adjust client project results, upload case study evidence charts, manage FAQ entries, and publish SEO field guides directly from a modern browser interface—**without touching code, opening terminal windows, or committing to GitHub.**

---

## 1. Studio Architecture & URLs

- **Local Studio URL:** `http://localhost:3333`
- **Hosted Cloud Studio URL:** `https://shafi-seo.sanity.studio` (after running `npm run deploy`)
- **Live Portfolio Frontend:** `https://muhammedrinshad210.github.io/shafi-seo/`

---

## 2. Fast Setup Guide (3 Steps)

### Step 1: Create or Connect Your Free Sanity Project
1. Go to [sanity.io](https://www.sanity.io/) and click **Sign Up** (using Google, GitHub, or Email).
2. Create a new project (e.g. `shafi-seo`).
3. Note your **Project ID** from the Sanity Manage Dashboard (e.g. `a1b2c3d4`).
4. Dataset name: leave as default `production`.

### Step 2: Configure Environment Variables
In the root portfolio folder, update or create `.env`:
```env
VITE_SANITY_PROJECT_ID="your_project_id_here"
VITE_SANITY_DATASET="production"
VITE_SANITY_API_VERSION="2024-01-01"
```

In GitHub Repository Settings (for GitHub Actions):
- Go to **Settings > Secrets and variables > Actions**.
- Add Repository Variable: `VITE_SANITY_PROJECT_ID` with your project ID.

### Step 3: Run or Deploy the Studio

**To run the studio locally on your computer:**
```bash
cd studio
npm install
npm run dev
```
Open `http://localhost:3333` in your browser.

**To deploy the hosted studio so Shafi can access it anywhere:**
```bash
cd studio
npx sanity login
npx sanity deploy
```
Choose `shafi-seo` as your studio hostname. Your studio will immediately be live at:
`https://shafi-seo.sanity.studio`

---

## 3. How to Manage Content

### A. Website Settings & Positioning
1. Click **Website Settings & Brand** in the studio sidebar.
2. Edit your **Hero Headline**, **About Intro**, **Location**, or **Experience Years**.
3. Update your **Contact Email** or **WhatsApp Number**.
4. Upload an **Open Graph Social Preview Image** for LinkedIn, WhatsApp, and Twitter sharing.
5. Click **Publish** (green button at bottom right). The changes reflect automatically on your live website.

### B. Projects & Case Studies
1. Click **Projects & Case Studies** in the sidebar.
2. Click **+ Create** or choose an existing case study.
3. Upload a **Cover Image** from your computer:
   - Use the built-in image cropper / hotspot to ensure the focus point looks crisp on both mobile and desktop.
   - Enter descriptive **Alt text** for accessibility and Google Image ranking.
4. Add quantified **Verified Outcomes & Metrics** (e.g. `Indexation Health: 99.2%`).
5. Toggle **Publish to Website**:
   - Turn **ON** to make it publicly visible on the live portfolio.
   - Turn **OFF** to keep it as a private draft.

### C. Services & Deliverables
1. Click **SEO Services**.
2. Edit titles, problems, deliverables, and expected business impact.
3. Select an icon or upload a custom visual.
4. Reorder services using the **Display Order** number.

### D. FAQ & Buyer Objections
1. Click **FAQ Items**.
2. Add new client questions and straightforward answers.
3. Categorize by `General`, `Process`, `Timeline`, or `Pricing`.

---

## 4. Security & Access Control

- **Zero Passwords in Code:** Authentication is handled securely by Sanity’s OAuth service (Google, GitHub, SSO).
- **Zero Write Tokens in Frontend:** The public website only connects via read-only requests to published documents. Malicious visitors cannot edit content or tamper with your database.
- **Inviting Collaborators:** In [sanity.io/manage](https://www.sanity.io/manage), click **Members > Invite** to grant Shafi Administrator or Editor privileges.
