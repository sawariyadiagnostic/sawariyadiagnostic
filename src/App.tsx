import { Hero } from './components/Hero'
import { TestCatalog } from './components/TestCatalog'
import { TrustIndicators } from './components/TrustIndicators'
import { About } from './components/About'
import { Services } from './components/Services'
import { HomeCollection } from './components/HomeCollection'
import { Team } from './components/Team'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { WhatsAppButton } from './components/ui/WhatsAppButton'

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="relative" role="main">
        <section id="hero" aria-label="Hero section">
          <Hero />
        </section>
        <section id="trust" aria-label="Trust indicators">
          <TrustIndicators />
        </section>
        <section id="tests" aria-label="Tests catalog section">
          <TestCatalog />
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
        <section id="team" aria-label="Team section">
          <Team />
        </section>
        <section id="contact" aria-label="Contact section">
          <Contact />
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
