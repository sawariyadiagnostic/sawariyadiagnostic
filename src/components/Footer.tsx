// File: src/components/Footer.tsx
'use client';

import { useState } from 'react';
import {
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  FileText,
  ExternalLink,
  ShieldCheck,
  Activity,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { LegalModal, PolicyType } from './ui/LegalModal';
import { ReportDownloadModal } from './ui/ReportDownloadModal';

export interface FooterProps {
  onOpenReportModal?: () => void;
  onSelectTopic?: (topicKeyword: string) => void;
  onOpenLegalModal?: (section: 'privacy' | 'terms' | 'charter') => void;
}

const QUICK_LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'About Lab', href: '#about' },
  { label: 'Diagnostic Services', href: '#services' },
  { label: 'Full Test Menu', href: '#test-catalog' },
  { label: 'Location & Map', href: '#contact' },
];

const TOPIC_CHIPS = [
  { label: 'Blood Tests', keyword: 'blood', dotColor: 'bg-[#C62828]', href: '#tests' },
  { label: 'Thyroid Tests', keyword: 'thyroid', dotColor: 'bg-[#7A4B2A]', href: '#tests' },
  { label: 'Cholesterol Tests', keyword: 'cholesterol', dotColor: 'bg-[#0A6C82]', href: '#tests' },
  { label: 'Blood Glucose Tests', keyword: 'glucose', dotColor: 'bg-[#155E9A]', href: '#tests' },
  { label: 'Home Collection', keyword: 'home', dotColor: 'bg-[#0B6E66]', href: '#home-collection' },
];

export function Footer({
  onOpenReportModal,
  onSelectTopic,
  onOpenLegalModal,
}: FooterProps) {
  const [internalLegalModal, setInternalLegalModal] = useState<PolicyType>(null);
  const dnaMarkSrc = `${import.meta.env.BASE_URL}brand/sawariya-dna-original.svg`;

  const handleTopicClick = (keyword: string) => {
    if (keyword === 'home') {
      const el = document.getElementById('home-collection');
      el?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (onSelectTopic) {
      onSelectTopic(keyword);
    }
    window.dispatchEvent(
      new CustomEvent('sawariya:search', { detail: { query: keyword, tab: 'tests' } })
    );
    const menuEl =
      document.getElementById('tests') ||
      document.getElementById('test-catalog') ||
      document.getElementById('root');
    menuEl?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  const handleLegalClick = (section: 'privacy' | 'terms' | 'charter') => {
    if (onOpenLegalModal) {
      onOpenLegalModal(section);
    } else {
      setInternalLegalModal(section);
    }
  };

  return (
    <>
      <footer
        id="contact"
        className="relative overflow-hidden bg-[#102A43] text-slate-200 border-t border-white/10 pt-12 pb-28 md:pb-12"
      >
        {/* Top Brand Spectrum Specular Hairline */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#155E9A]/70 via-[#C62828]/50 to-transparent"
        />

        {/* Ambient Hero-Synchronized Organic Mesh Background Glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-[#155E9A]/16 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full bg-[#C62828]/12 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/3 h-72 w-72 rounded-full bg-[#7A4B2A]/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          {/* Main 4-Column Desktop / Compact Bento Mobile Grid */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8">
            {/* COLUMN 1: Brand Identity, In-House Authority & Quick Actions (4 Cols on Desktop) */}
            <div className="lg:col-span-4 space-y-5">
              <div className="flex items-center gap-3.5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 border border-white/20 p-2 shadow-inner">
                  <img
                    src={dnaMarkSrc}
                    alt="Sawariya Diagnostic Lab DNA Emblem"
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div>
                  <div className="font-heading text-xl font-black tracking-tight text-white">
                    SAWARIYA
                  </div>
                  <div className="text-xs font-extrabold tracking-[0.22em] text-blue-300">
                    DIAGNOSTIC LAB
                  </div>
                  <div className="mt-0.5 text-[11px] font-bold tracking-wider text-[#FFD98A]">
                    Detect <span className="text-slate-400">|</span> Diagnose{' '}
                    <span className="text-slate-400">|</span> Deliver
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Charkhi Dadri's central pathology hub. In-house CLIA hormone assays,
                5-part hematology & biochemistry on Loharu Road with zero out-of-town sample transit degradation.
              </p>

              {/* Primary Action Pills (Hero-Aligned Frosted Glass Style) */}
              <div className="flex flex-wrap items-center gap-2.5">
                {onOpenReportModal ? (
                  <button
                    type="button"
                    data-squircle="14"
                    onClick={onOpenReportModal}
                    className="apple-pressable squircle-btn inline-flex items-center gap-2 rounded-[14px] bg-gradient-to-r from-[#155E9A] to-[#0F4775] px-4 py-2.5 text-xs font-extrabold text-white shadow-md border border-blue-400/30 hover:brightness-110 active:scale-[0.96] transition-transform cursor-pointer"
                  >
                    <FileText className="h-4 w-4 text-[#FFD98A]" />
                    <span>Report Assistance</span>
                  </button>
                ) : (
                  <ReportDownloadModal
                    trigger={
                      <button
                        type="button"
                        data-squircle="14"
                        className="apple-pressable squircle-btn inline-flex items-center gap-2 rounded-[14px] bg-gradient-to-r from-[#155E9A] to-[#0F4775] px-4 py-2.5 text-xs font-extrabold text-white shadow-md border border-blue-400/30 hover:brightness-110 active:scale-[0.96] transition-transform cursor-pointer"
                      >
                        <FileText className="h-4 w-4 text-[#FFD98A]" />
                        <span>Report Assistance</span>
                      </button>
                    }
                  />
                )}

                <a
                  href="https://maps.google.com/?q=28.594492,76.260972"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-squircle="14"
                  className="apple-pressable squircle-btn inline-flex items-center gap-1.5 rounded-[14px] bg-white/10 border border-white/15 px-4 py-2.5 text-xs font-bold text-slate-100 hover:bg-white/15 hover:border-blue-400/40 active:scale-[0.96] transition-transform cursor-pointer"
                >
                  <MapPin className="h-4 w-4 text-blue-300" />
                  <span>Google Maps</span>
                  <ExternalLink className="h-3 w-3 text-slate-400" />
                </a>
              </div>

              {/* Upgraded Clinical Quality Micro-Strip (Hero Badge Schema) */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-300">
                <span data-squircle="8" className="inline-flex items-center gap-1.5 rounded-[8px] bg-emerald-500/12 border border-emerald-400/30 px-2.5 py-1 font-semibold text-emerald-300">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Daily Quality Control Verified</span>
                </span>
                <span data-squircle="8" className="inline-flex items-center gap-1.5 rounded-[8px] bg-blue-500/12 border border-blue-400/30 px-2.5 py-1 font-semibold text-blue-300">
                  <Activity className="h-3.5 w-3.5 text-blue-400" />
                  <span>In-House CLIA & 5-Part</span>
                </span>
              </div>
            </div>

            {/* COLUMN 2 & 3: Quick Links + Interactive Topic Chips (4 Cols on Desktop) */}
            <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {/* Find Tests by Topic — Compact 2-Column Glass Pill Grid */}
              <div>
                <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-white">
                  <Sparkles className="h-3.5 w-3.5 text-[#FFD98A]" />
                  <span>Find Tests by Topic</span>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  {TOPIC_CHIPS.map((topic) => (
                    <a
                      key={topic.label}
                      href={topic.href}
                      data-squircle="14"
                      onClick={(e) => {
                        e.preventDefault();
                        handleTopicClick(topic.keyword);
                      }}
                      className="apple-pressable squircle-btn group flex items-center justify-between rounded-[14px] bg-white/[0.05] border border-white/10 px-3 py-2 text-left text-xs font-semibold text-slate-200 hover:border-blue-400/40 hover:bg-white/[0.09] hover:text-white active:scale-[0.96] transition-all cursor-pointer"
                    >
                      <span className="flex items-center gap-2 truncate">
                        <span className={`h-2 w-2 shrink-0 rounded-full ${topic.dotColor}`} />
                        <span className="truncate">{topic.label}</span>
                      </span>
                      <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-500 group-hover:text-blue-300 transition-transform group-hover:translate-x-0.5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Navigation Links — Compact Horizontal Pill Strip on Mobile */}
              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                  Quick Navigation
                </h3>
                <ul className="mt-2.5 flex flex-wrap gap-2">
                  {QUICK_LINKS.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        data-squircle="10"
                        className="inline-flex items-center rounded-[10px] bg-white/[0.05] border border-white/10 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:border-white/25 hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* COLUMN 4: Contact & Availability Bento Cards (4 Cols on Desktop) */}
            <div className="lg:col-span-4 space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
                Contact & Central Hub Availability
              </h3>

              {/* 2-Column Phone Cards with Hero Theme Synergy */}
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href="tel:+919991941207"
                  data-squircle="14"
                  className="apple-pressable squircle-btn rounded-[14px] bg-white/[0.05] border border-blue-400/30 p-3 hover:bg-white/[0.09] active:scale-[0.96] transition-all"
                >
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-blue-300">
                    <PhoneCall className="h-3.5 w-3.5 shrink-0" />
                    <span className="tabular-nums">99919 41207</span>
                  </div>
                  <div className="mt-1 text-[11px] font-semibold text-white">
                    Home Collection
                  </div>
                  <div className="text-[10px] text-slate-400">Primary Booking Line</div>
                </a>

                <a
                  href="tel:+917015290782"
                  data-squircle="14"
                  className="apple-pressable squircle-btn rounded-[14px] bg-white/[0.05] border border-[#D7C7B8]/30 p-3 hover:bg-white/[0.09] active:scale-[0.96] transition-all"
                >
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#FFD98A]">
                    <PhoneCall className="h-3.5 w-3.5 shrink-0" />
                    <span className="tabular-nums">70152 90782</span>
                  </div>
                  <div className="mt-1 text-[11px] font-semibold text-white">
                    Lab Reception Desk
                  </div>
                  <div className="text-[10px] text-slate-400">Walk-In & Report Queries</div>
                </a>
              </div>

              {/* Address & Timings Glass Card */}
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-3.5 space-y-2.5 text-xs">
                <div className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 text-blue-300 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white">1st Floor, Opp. R.S. Sangwan Hospital</span>
                    <span className="block text-slate-300 mt-0.5">
                      Loharu Road, Charkhi Dadri, Haryana 127306
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 border-t border-white/8 pt-2.5">
                  <Clock className="h-4 w-4 text-emerald-300 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-emerald-300">
                      Home collection: 07:00 AM–07:00 PM
                    </span>
                    <span className="block text-[11px] text-slate-300 mt-0.5">
                      Lab open 24*7 for walk-in patients and emergency from hospitals • Reports verified within 12 hours (routine & hormone reports ready in 2–6 hours)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 border-t border-white/8 pt-2.5">
                  <Mail className="h-4 w-4 text-slate-400 shrink-0" />
                  <a
                    href="mailto:sawariyadiagnosticckd11@gmail.com"
                    className="text-slate-300 hover:text-white truncate transition-colors"
                  >
                    sawariyadiagnosticckd11@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Legal & Governance Bar */}
          <div className="mt-10 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p className="text-center sm:text-left text-xs text-slate-300">
              © {new Date().getFullYear()} Sawariya Diagnostic Lab. All patient diagnostic reports are strictly confidential.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-medium text-slate-300">
              <button
                type="button"
                onClick={() => handleLegalClick('privacy')}
                className="min-h-11 px-2 py-2 text-center hover:text-blue-300 transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <button
                type="button"
                onClick={() => handleLegalClick('terms')}
                className="min-h-11 px-2 py-2 text-center hover:text-blue-300 transition-colors cursor-pointer"
              >
                Terms & Patient Rights
              </button>
              <button
                type="button"
                onClick={() => handleLegalClick('charter')}
                className="min-h-11 px-2 py-2 text-center hover:text-[#FFD98A] transition-colors cursor-pointer"
              >
                Quality Charter & Health Camps
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Interactive Modal */}
      <LegalModal
        type={internalLegalModal}
        onClose={() => setInternalLegalModal(null)}
      />
    </>
  );
}

export default Footer;