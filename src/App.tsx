import { Suspense, lazy } from 'react'
import { Hero } from './components/Hero'
import { TrustIndicators } from './components/TrustIndicators'
import { About } from './components/About'
import { Services } from './components/Services'
import { HomeCollection } from './components/HomeCollection'
import { LoadingSpinner } from './components/ui/LoadingSpinner'
import { WhatsAppButton } from './components/ui/WhatsAppButton'
import { MobileBottomDock } from './components/layout/MobileBottomDock'

// Lazy load HEAVY / Interactive components only
// - TestCatalog: Has lots of list data (~9KB gzipped)
// - Team: Has images
// - Contact: Has Cal.com logic
// - Footer: At the very bottom
const TestCatalog = lazy(() => import('./components/TestCatalog').then(module => ({ default: module.TestCatalog })))
const Team = lazy(() => import('./components/Team').then(module => ({ default: module.Team })))
const Contact = lazy(() => import('./components/Contact').then(module => ({ default: module.Contact })))
const Footer = lazy(() => import('./components/Footer').then(module => ({ default: module.Footer })))

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-[calc(env(safe-area-inset-bottom,16px)+76px)] sm:pb-0 w-full max-w-full relative">
      <main className="relative w-full max-w-full" role="main">
        {/* Critical Path: Load Hero Instantly */}
        <Hero />

        {/* Lightweight Content: Load with main bundle (Better for 3G) */}
        <TrustIndicators />
        <About />
        <Services />
        <HomeCollection />

        {/* Heavy Interactive Sections: Lazy Load */}
        <Suspense fallback={<LoadingSpinner />}>
          <TestCatalog />
          <Team />
          <Contact />
          <Footer />
        </Suspense>
      </main>
      <WhatsAppButton />
      <MobileBottomDock />
    </div>
  )
}
