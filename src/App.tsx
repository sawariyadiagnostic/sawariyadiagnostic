import { Suspense, lazy } from 'react'
import { Hero } from './components/Hero'
import { TrustIndicators } from './components/TrustIndicators'
import { About } from './components/About'
import { Services } from './components/Services'
import { HomeCollection } from './components/HomeCollection'
import { LoadingSpinner } from './components/ui/LoadingSpinner'
import { WhatsAppButton } from './components/ui/WhatsAppButton'

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
    <div className="min-h-screen bg-background text-foreground">
      <main className="relative" role="main">
        {/* Critical Path: Load Hero Instantly */}
        <section id="hero" aria-label="Hero section">
          <Hero />
        </section>

        {/* Lightweight Content: Load with main bundle (Better for 3G) */}
        <section id="trust" aria-label="Trust indicators">
          <TrustIndicators />
        </section>

        <section id="about" aria-label="About section">
          <About />
        </section>
        
        <section id="services" aria-label="Services section">
          <Services />
        </section>
        
        <section id="home-collection" aria-label="Home collection section">
          <HomeCollection />
        </section>

        {/* Heavy Interactive Sections: Lazy Load */}
        <Suspense fallback={<LoadingSpinner />}>
          <section id="tests" aria-label="Tests catalog section">
            <TestCatalog />
          </section>
          
          <section id="team" aria-label="Team section">
            <Team />
          </section>
          
          <section id="contact" aria-label="Contact section">
            <Contact />
          </section>
          <Footer />
        </Suspense>
      </main>
      <WhatsAppButton />
    </div>
  )
}
