<div align="center">
  <h1>🏥 Sawariya Diagnostic Website</h1>

  <p>
    <strong>A digital storefront for patients to book tests, schedule home collections, and view health packages.</strong>
  </p>

  <p>
    <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/React-18.3-blue.svg?logo=react" alt="React"></a>
    <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-5.4-646CFF.svg?logo=vite&logoColor=white" alt="Vite"></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.8-3178C6.svg?logo=typescript&logoColor=white" alt="TypeScript"></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind-3.4-38B2AC.svg?logo=tailwind-css&logoColor=white" alt="Tailwind CSS"></a>
    <a href="https://sawariyadiagnostic.github.io/sawariyadiagnostic/"><img src="https://img.shields.io/badge/Status-Live-success.svg" alt="Status"></a>
  </p>
</div>


**Sawariya Diagnostic** is a NABL-accredited pathology lab based in Charkhi Dadri, Haryana.

## 🌐 Live Website
**[Visit Sawariya Diagnostic](https://sawariyadiagnostic.github.io/sawariyadiagnostic/)**

---

## 🏥 About Us
We provide accurate, reliable, and timely diagnostic services.
- 📍 **Location**: Opposite R.S. Sangwan Hospital, Loharu Road, Charkhi Dadri, Haryana - 127306
- 📞 **Contact**: +91 7015290782
- ✉️ **Email**: sawariyadiagnosticckd11@gmail.com
- 🔬 **Services**: Blood Tests, Full Body Checkups, Home Sample Collection.

## 🚀 Features
- **Home Collection Booking**: Easy scheduling for home visits via Cal.com integration.
- **Test Catalog**: Browse available tests and health packages intuitively.
- **WhatsApp Integration**: Direct chat support for booking and reports.
- **Responsive Design**: Flawless experience on Mobile, Tablet, and Desktop.
- **Performance Optimized**: Lazy-loading and smart bundling for fast load times.

## 🛠️ Tech Stack
This project leverages a modern frontend ecosystem:
- **Frontend Framework**: [React 18](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/) for lightning-fast HMR and optimized builds.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (Radix UI + Tailwind)
- **Backend/API (Minimal)**: Node.js / Express (for specific custom routes/server functionality).

---

## 💻 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm`, `yarn`, `pnpm`, or `bun`

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd sawariya-diagnostic-website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Set up environment variables:**
   Copy `.env.example` to `.env` and fill in any required variables.
   ```bash
   cp .env.example .env
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   bun run dev
   ```
   *The app will be available at `http://localhost:5173`.*

### Building for Production

To create a production-ready build:
```bash
npm run build
```
This generates the optimized static files in the `dist/` directory and compiles the Express server to `dist/server.cjs`.

To preview the production build:
```bash
npm run preview
```

To run the production Node server:
```bash
npm run start
```

---

## 🤖 AI & SEO Ready
This website includes specific files to help AI agents and Search Engines understand the business:
- `public/ai.txt`: Provides business context for AI bots.
- `public/robots.txt`: Instructions for web crawlers.
- `public/sitemap.xml`: Site structure for search engines.

## 🏗️ Architecture & Extensions
For details on the project structure, performance strategies, and a comprehensive guide on how the system can be extended and scaled in the future, please refer to the [ARCHITECTURE.md](./ARCHITECTURE.md) document.

---

## 📄 License
© 2025 Sawariya Diagnostic. All rights reserved.
