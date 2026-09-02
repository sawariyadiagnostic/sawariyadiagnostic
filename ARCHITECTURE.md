# 🏗️ Architecture & Extensions Guide

This document outlines the architecture of the Sawariya Diagnostic website, discusses its performance and capabilities under load, highlights current limitations, and provides a comprehensive guide for extending the platform in the future.

---

## 1. Current Architecture Overview

The Sawariya Diagnostic website is built as a **Single Page Application (SPA)** with a very lightweight Node.js/Express backend primarily used for serving the static files or minimal server-side interactions.

### 🧩 Frontend (Client-Side)
- **Core Framework**: React 18 + TypeScript.
- **Build System**: Vite (for rapid development and optimized builds).
- **Styling & UI**: Tailwind CSS coupled with Shadcn UI for highly customizable, accessible components.
- **Component Strategy**:
  - **Critical Path Rendering**: Crucial components like the `Hero` section load synchronously to ensure immediate First Contentful Paint (FCP).
  - **Lazy Loading**: Heavy components (`TestCatalog`, `Team`, `Contact`, `Footer`) are loaded asynchronously via `React.lazy()` and `<Suspense>`. This significantly reduces the initial bundle size (critical for mobile users on 3G networks).

### ⚙️ Backend (Server-Side)
- **Server**: Node.js with Express.
- **Role**: Currently, the backend (defined in `server.ts`) is minimal. It acts mostly as a static file server for the Vite-built assets (`dist/`) and can handle basic API routes if necessary.
- **Build**: The backend is bundled using `esbuild` into a single `server.cjs` file for production deployment.

### 📦 Data Management
- Currently, test data and catalog information appear to be hardcoded or managed via static files. There is no active connection to a database.
- Uses `@tanstack/react-query` for any potential data fetching, though mostly functioning statically right now.

---

## 2. Load Capacity and Scalability

### **What the current architecture handles well:**
- **Static Content Serving**: Because the frontend is essentially static assets (HTML/CSS/JS) generated at build time, it can handle massive scale if hosted on a CDN (Content Delivery Network) like Vercel, Netlify, Cloudflare Pages, or GitHub Pages.
- **Browser Performance**: The lazy-loading strategy ensures that the client's browser isn't overwhelmed during the initial page load. The app feels snappy because heavy JS logic (like Cal.com embeds) is deferred.

### **Where the architecture struggles (Current Bottlenecks):**
- **Express Server Bottleneck**: If the app is run exclusively through the provided Express server without a CDN in front, the Node.js single thread could become a bottleneck under extremely high concurrent traffic (thousands of requests per second), especially if API routes are added later that block the event loop.
- **SEO & Social Previews**: As a pure SPA (Client-Side Rendered), search engine crawlers (other than Google) might struggle to index the content properly. When sharing a link on WhatsApp or Twitter, dynamic meta tags (Open Graph) based on specific tests will not work without Server-Side Rendering (SSR).
- **Data Scaling**: Storing test catalog data in static JSON or TypeScript files works for 50-100 tests. If the catalog grows to 1,000+ tests, the client will have to download massive amounts of data, leading to memory bloat and slow load times.

---

## 3. Comprehensive Extension Strategies

To transform this digital storefront into a fully-fledged, scalable platform, consider the following architectural extensions:

### A. Transitioning to Server-Side Rendering (SSR)
**Why?** To solve SEO issues, improve time-to-interactive, and dynamically generate meta tags for specific test pages.
- **Migration Path**:
  - Migrate the Vite/React setup to **Next.js** or **Remix**.
  - Next.js App Router allows for React Server Components (RSC), meaning the heavy `TestCatalog` can be rendered entirely on the server, sending zero JavaScript to the client for that section.
  - This is highly recommended if SEO for specific tests (e.g., "Full Body Checkup in Charkhi Dadri") is a business priority.

### B. Integrating a Database and CMS
**Why?** To allow non-technical staff to add new tests, change prices, or update contact info without editing code.
- **Database**:
  - PostgreSQL (via Supabase or Neon) is ideal for relational data (Tests, Categories, Bookings).
- **ORM**:
  - Prisma or Drizzle ORM to maintain strict TypeScript safety from the database to the frontend.
- **Content Management System (CMS)**:
  - Integrate Sanity.io or Strapi. This completely removes hardcoded data from the codebase. The frontend will fetch the latest catalog from the CMS at build time (SSG) or request time (SSR).

### C. Backend API & State Management Expansion
**Why?** To handle real-time bookings, user authentication, and complex data flows.
- **Authentication**:
  - Implement NextAuth.js or Clerk to allow users to create accounts, view past test reports, and track current bookings.
- **API Architecture**:
  - Transition from the basic Express server to a robust API framework (like NestJS) OR utilize Next.js API Routes / Server Actions if migrating the frontend.
  - Implement **tRPC** to guarantee end-to-end type safety between the client React components and the backend API.

### D. E-Commerce & Payment Integration
**Why?** To accept online payments for home collections or advance test bookings.
- **Gateway Integration**:
  - Integrate Razorpay or Stripe.
- **Flow**:
  1. User selects tests -> Adds to Cart (Zustand or React Context for state management).
  2. Proceeds to checkout -> API creates a Razorpay order.
  3. Client pays -> Webhook hits the server to verify signature and mark booking as "Paid" in the database.

### E. Admin Dashboard
**Why?** For lab staff to manage operations.
- Build a separate, protected route (e.g., `/admin`) or a separate dashboard application.
- **Features**: View incoming home collection requests, upload PDF reports for patients, manage inventory, and update test prices.

### F. Performance Optimization for Scaling
- **Image Optimization**: Ensure all images (like the Hero banner) are served in Next-Gen formats (WebP/AVIF) and are responsive. If moving to Next.js, use the `<Image>` component.
- **Caching Strategy**: Implement Redis (e.g., Upstash) to cache database queries for the Test Catalog, ensuring the database isn't hit for every user visit.

---

## Conclusion
The current Vite + React SPA architecture is excellent for a fast, responsive v1.0 storefront. To scale further, handle dynamic data, and maximize SEO, the next logical step is migrating to an SSR framework (like Next.js), attaching a headless CMS, and integrating a robust database for stateful user and booking management.