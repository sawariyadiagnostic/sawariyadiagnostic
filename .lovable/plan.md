

# Medical Lab Website Transformation Plan

## Overview
Transform the current video production portfolio ("MOJJU") into a professional medical diagnostics website for **Sawariya Diagnostics**. The site will showcase your blood tests, pathology, and specialized diagnostic services with a clean, trustworthy design appropriate for healthcare.

---

## Sections to Transform

### 1. Hero Section (`Hero.tsx`)
**Current:** Cinematic video background with "A Medical Lab WITHOUT LIMITS" tagline  
**Changes:**
- Replace video background with a professional medical lab image or gradient background
- Update branding to "Sawariya Diagnostics" with a proper tagline like "Your Health, Our Priority"
- Change navigation links: Work → Tests | Process → About | Capabilities → Services | Team → Our Team | Contact → Book Appointment
- Update CTA button from "Book a Call" to "Book a Test" or "Schedule Appointment"
- Remove video/sound controls (no longer needed)
- Adjust color scheme to medical-friendly tones (blues, teals)
-Visuals: Split screen or Center focus. Left side: High-contrast headline. Right side: A reassuring image of a doctor/patient interaction (or clean gradient).
-New Feature: Insert a "Search for Tests" input bar directly inside the Hero (e.g., "Search for Vitamin D, CBC, etc...").
Actions:
-Primary Button: "Book Home Collection" (High conversion).
-Secondary Button: "View Health Packages" (High margin).
-Top Right Nav: Add a distinct "Download Report" button (outlined style).

### 2. Portfolio Section → Tests & Pricing (`Portfolio.tsx`)
**Current:** YouTube video embed for Hampton commercial  
**Changes:**
- Remove video embed entirely
- Create a grid/table layout for popular tests with pricing
- Categories: Blood Tests, Hormone Panels, Specialized Tests
- Each test card shows: Test name, Description, Price, Turnaround time
- Add "Book Now" buttons for each test
- Include featured packages (Full Body Checkup, Diabetes Panel, Cardiac Profile)
-Structure: Convert to a Tabbed Interface:
Tab 1: Health Packages (Display these as "Feature Cards" with "What's Included" checklists).
Tab 2: Individual Tests (A searchable/filterable table or list).
-Visuals: Use "Price Tags" styling (e.g., ₹999 crossed out, ₹499 highlighted).
-Interaction: Hovering over a card should show a "Quick View" of parameters covered.

### 3. Awards Section → Accreditations/Trust Badges (`Awards.tsx`)
**Current:** Film festival award laurels  
**Changes:**
- Replace with medical accreditation logos (NABL, ISO, etc.)
- Add trust signals: Years in service, Tests completed, Happy patients
- Include any quality certifications or affiliations
- Use professional healthcare badge styling

### 4. About Section → Why Choose Us (`About.tsx`)
**Current:** Film production process with film strip animation  
**Changes:**
- Replace "film strip" concept with a patient journey or testing process
-Live Stats: Replace it with a "Live Counter" strip:
"50,000+ Tests Done"
"10+ Years Experience"
"99.9% Report Accuracy"
-Timeline: Keep the timeline animation but title it "Your Path to Health":
1. Book Online -> 2. Agent Arrives -> 3. Sample to Lab -> 4. Report on WhatsApp.
- Steps: Book Test → Sample Collection → Lab Analysis → Results Delivered
- Remove storyboard image, replace with medical lab imagery
- Update copy to focus on accuracy, quick turnaround, certified professionals
- Keep the animated timeline concept but restyle for healthcare

### 5. Services Section → Our Diagnostic Services (`Services.tsx`)
**Current:** "Photo darkroom" themed services like Campaign & Ad Content  
**Changes:**
- Replace darkroom aesthetic with clean, clinical design
- New services:
  - Blood Tests & Pathology (CBC, Lipid Panel, etc.)
  - Hormone & Thyroid Testing
  - Diabetes Screening
  - Cancer Marker Tests
  - Allergy Testing
  - Genetic Diagnostics
- Add icons appropriate for each service category
- Include brief descriptions of what each service covers
- Add "Home Collection Available" badges where applicable
-Layout: Grid of "Clickable Cards" with icons.
-New Service: Add "Corporate Wellness" (B2B angle) and "Doctor Consultation" (if applicable).
-Aesthetic: Use "Glassmorphism" (light, frosted glass effect) for the cards to feel modern and clean.

### 6. New Section: Home Collection (`HomeCollection.tsx` - NEW FILE)
**Purpose:** Highlight home sample collection service  
**Content:**
- How it works: Book → We Visit → Collect Sample → Results Online
- Areas covered
- Booking CTA
- Benefits: Convenience, Safety, Same accuracy
-Design: Make this a "Sticky Section" or a high-contrast specific block.
-Form Integration: Instead of just text, embed a "Quick Lead Form" directly here:
-Inputs: Name, Phone Number, "Call Me Back" button.
-Trust Signals: Add icons for "NABL Accredited Labs", "Vaccinated Phlebotomists", "On-Time Guarantee".

### 7. Team Section → Our Medical Team (`Team.tsx`)
**Current:** "Wanted posters" with creative crime-themed descriptions  
**Changes:**
- Remove Western/Wanted poster theme entirely
- Create professional team cards with:
  - Photo
  - Name
  - Qualification (MBBS, MD, PhD, etc.)
  - Specialization (Pathologist, Biochemist, etc.)
  - Brief bio
- Clean, clinical card design
- Replace team member images with placeholder medical professional images
- Update team data with real or placeholder medical staff info

### 8. Contact Section (`Contact.tsx`)
**Current:** Cal.com booking for "MOJJU Discovery Call"  
**Changes:**
- Update header text to appointment booking context
- Change "MOJJU Discovery Call" to "Sawariya Diagnostics - Book Appointment"
- Update info cards:
  - Test Selection → Choose your tests
  - Sample Collection → Home or at lab
  - Quick Results → Get reports online
- Keep Cal.com integration if you have an account, or update the booking link

### 9. Footer (`Footer.tsx`)
**Current:** MOJJU branding with AI tools list  
**Changes:**
- Update logo/name to "Sawariya Diagnostics"
- Replace "Tools We Use" with:
  - Quick Links (About, Tests, Contact)
  - Working Hours
  - Address & Phone
  - Email
- Update social links or remove if not applicable
- Add any regulatory disclaimers if required
- Update copyright

### 10. Floating Elements (Global)
- WhatsApp Widget: Add a sticky WhatsApp button in the bottom right corner (Essential for Indian/Asian markets).
-Sticky Mobile Nav: Ensure "Book Now" is always visible on mobile scroll.
---

Visual/Style Changes (System Design)
1. Color Palette Architecture (index.css & tailwind.config)
Backgrounds: Shift from Dark Mode (bg-slate-950) to Clinical Light Mode.
--background: 0 0% 100% (Pure White)
--muted: 210 40% 96.1% (Soft Blue-Grey for section alternations)
Primary Brand Color (Trust): Use Teal/Cyan.
Class: text-teal-600 / bg-teal-600 (Hex: #0d9488)
Usage: Headlines, Icons, Active Tabs.
Action Color (Conversion): High-contrast Warm Orange.
Class: bg-orange-500 (Hex: #f97316)
Usage: "Book Now" buttons and "Call Us" CTAs (Compliments the Teal perfectly).
Status Colors:
Success: emerald-500 (For "Results Ready" or "Verified").
Error/Alert: rose-500 (For form errors).
2. Typography System
Font Family: Replace "Bagel Fat One" with:
Headings: Plus Jakarta Sans (Modern, geometric, high readability).
Body: Inter or Satoshi (Clean, neutral).
Hierarchy:
Hero Headline: text-4xl md:text-6xl font-bold tracking-tight.
Section Headers: text-3xl font-semibold text-slate-800.
Body Text: text-slate-600 (Avoid pure black for better reading comfort).
3. UI "Physics" (Radius & Shadows)
Border Radius: Shift from Sharp (Cinema style) to Soft Rounded.
Global radius: 0.75rem (rounded-xl) for cards and inputs.
Buttons: 9999px (Full pill shape) for a friendly, approachable medical feel.
Depth: Use Soft Diffusion Shadows.
Class: shadow-lg shadow-teal-900/5 (Subtle lift, no harsh black shadows).
4. Imagery & Iconography Strategy
Icon Library: Strictly use Lucide React icons.
Style: Stroke width 1.5px (Thinner, elegant).
Examples: Stethoscope, Activity (Heartbeat), TestTube, CalendarCheck.
Hero Visuals:
Do not use "scary" medical images (needles/blood).
Directive: Use "Happy Patient/Doctor interaction" or "Abstract Molecular Gradients" in Teal/White.
Trust Signals:
Use grayscale logos for accreditations (NABL, ISO) that turn color on hover.

---

Files to Modify (Surgical Instructions)
File	Specific Structural Directives
src/components/Hero.tsx	Retain: Navbar logic & Mobile Menu state. Replace: Video Background with bg-gradient-to-br from-teal-50 to-white. Add: A centralized SearchBar input ("Search for tests...") directly below the headline.
src/components/Portfolio.tsx	RENAME to TestCatalog.tsx. Logic: Switch from <iframe> embeds to a Grid of Cards. Feature: Implement a Tabs component (Shadcn) to switch between "Popular Packages" and "Individual Tests".
src/components/Awards.tsx	RENAME to TrustIndicators.tsx. Layout: Change from "Laurel Wreath" layout to a "Stats Strip" (Horizontal flex container: "50k+ Patients", "NABL Certified", "Same Day Reports").
src/components/About.tsx	Animation Update: Keep the scroll-trigger logic, but replace "Film Production Steps" with "Patient Journey Steps" (Book -> Collect -> Analyze -> Report). Use Lucide icons instead of film stills.
src/components/Services.tsx	Visuals: Remove "Darkroom" CSS filters. Use Glassmorphism cards (bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md). Add "Home Collection" badge logic.
src/components/Team.tsx	Style Reset: Remove "Wanted Poster" CSS classes. Use standard rounded-full avatars. Add "Qualification" badge (e.g., "MBBS, MD") below names.
src/components/Contact.tsx	Context: Keep Cal.com embed if active, otherwise replace with a simple "Request Call Back" form using Shadcn Input and Button components.
src/components/Footer.tsx	Navigation: Add "Quick Links" columns. Crucial: Add a "Patient Portal / Download Report" link (even if mock) for credibility.
src/index.css	Global Reset: Overwrite :root variables. Force light-mode defaults. Remove any .noise-overlay or .scanline classes from the previous cinema theme.
src/App.tsx	Router: Import the new HomeCollection component. Layout: Ensure the Navbar and Footer wrap all new routes correctly.
New Files to Create (Modular Architecture)
File	Purpose
src/components/HomeCollection.tsx	A standalone "Landing Page" section for the Home Collection service. Needs a sticky "Book Now" form.
src/components/ui/TestCard.tsx	Atomic Component: A reusable card showing: Test Name, Price, Turnaround Time, and "Book" button. Prevents bloating the Catalog file.
src/components/ui/WhatsAppButton.tsx	Floating Widget: A fixed-position WhatsApp icon (bottom-right) that opens a chat with a pre-filled message ("Hi, I want to book a test").

#Technical Notes (The "Rules of Engagement")
Animation Strategy:
KILL: Remove all "Glitch," "Flicker," and "Cinema Scope" animations.
ADD: Use Framer Motion for "Clinical" transitions: FadeIn (opacity) and subtle SlideUp (y-axis) on scroll.
State Management (Frontend Only):
Use React useState to handle the Search Filter in the Hero and Test Catalog. (The search must actually filter the mock data list).
Use useState for the "Category Tabs" in the Test Catalog.
Responsiveness:
Mobile Priority: The "Book Test" and "WhatsApp" buttons must be easily clickable with a thumb on mobile screens (h-12 minimum touch target).
Mock Data:
Do not leave sections empty. Create a src/data/mockTests.ts file with 10 realistic medical tests to populate the grid immediately.

---

## Implementation Order
Phase 1: The "Clean Slate" Protocol (Styles & Cleanup)
Goal: Erase the "Cinema/Dark" theme and install the "Medical/Light" physics engine.
Global Style Reset (src/index.css):
Action: Paste the "Visual/Style Changes" section. Explicitly command the AI to overwrite the :root variables to white/teal and remove all noise/scanline/film-grain CSS classes.
Asset Purge:
Action: Ask the AI to remove the <video> tag from Hero.tsx and the YouTube embed from Portfolio.tsx immediately to stop the dark-mode visuals from persisting.
Font Swap:
Action: Remove "Bagel Fat One" import. Install/Link "Plus Jakarta Sans" and "Inter".
Phase 2: The Data & Atomic Layer
Goal: Build the building blocks so the main pages have something to render.
Mock Data Injection (src/data/mockTests.ts):
Action: Create a new file. Tell AI: "Create a structured JSON array of 10 medical tests (CBC, Thyroid, Lipid, etc.) including price, turnaround time, and category."
The "Test Card" Component (src/components/ui/TestCard.tsx):
Action: Create the reusable card component now. It must take the mock data props and display them using the new "Soft Shadow" and "Pill Button" styling.
The WhatsApp Widget (src/components/ui/WhatsAppButton.tsx):
Action: Create this isolated component and add it to App.tsx so it appears globally.
Phase 3: The "Major Surgery" (Hero & Catalog)
Goal: Transform the two most complex sections (The "Face" and the "Product").
Hero Refactor (src/components/Hero.tsx):
Action: Implement the new "Search Bar" layout. Connect the "Book Test" button. Ensure the background is the Teal Gradient, not black.
Portfolio -> Test Catalog (src/components/TestCatalog.tsx):
Action: Rename the file. Replace the video grid with the Tabbed Interface (Packages vs. Individual Tests). Import the TestCard you made in Phase 2.
Logic Check: Ensure the "Search" input actually filters the cards.
Phase 4: Content Expansion (The Supporting Sections)
Goal: Update the informational sections to match the new medical credibility.
About & Trust (src/components/About.tsx, TrustIndicators.tsx):
Action: Rename Awards to TrustIndicators. Change the film strip animation to the "Patient Journey" timeline.
Services Refactor (src/components/Services.tsx):
Action: Apply the "Glassmorphism" effect. Add the "Home Collection Available" badges.
New Section: Home Collection (src/components/HomeCollection.tsx):
Action: Create this from scratch. Focus on the "Lead Gen Form" (Name/Phone inputs).
Phase 5: The "Glue" (Navigation & Final Polish)
Goal: Connect all the wires and ensure mobile responsiveness.
Team & Footer (src/components/Team.tsx, Footer.tsx):
Action: Update the footer links to point to the new sections. Ensure Team cards look professional (round avatars).
Routing (src/App.tsx):
Action: Ensure the HomeCollection component is imported and placed correctly in the layout order (usually after Services).
Mobile Audit:
Action: "Check Hero.tsx and TestCatalog.tsx on mobile. Ensure the 'Book Now' buttons are at least 44px high and text is readable on small screens."

