import { BookOpen, Calendar, MessageCircle, Phone } from 'lucide-react';
import { siteConfig, telHref, whatsappHref } from '@/config/site';
import { approvedGuideManifest, type ApprovedGuideRecord } from '@/data/approvedGuideManifest';
import { Button } from './ui/button';

interface TestGuidePageProps {
  guide: ApprovedGuideRecord;
  language?: 'en' | 'hi';
}

export function TestGuidePage({ guide, language = 'en' }: TestGuidePageProps) {
  const title = language === 'hi' ? guide.titleHi : guide.titleEn;
  const summary = language === 'hi' ? guide.summaryHi : guide.summaryEn;
  const content = language === 'hi' ? guide.hindiContent : guide.englishContent;
  const alternateLanguage = language === 'hi' ? 'en' : 'hi';
  const whatsappUrl = whatsappHref(`Hello Sawariya Diagnostic, I would like to ask about ${title}.`);

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6" lang={language === 'hi' ? 'hi' : 'en'}>
      <article className="space-y-8">
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-[#102A43]">
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            {language === 'hi' ? 'टेस्ट गाइड' : 'Test guide'}
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">{title}</h1>
          <p className="max-w-2xl text-base leading-relaxed text-slate-600">{summary}</p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4" aria-hidden="true" />Reviewed {guide.lastReviewedAt.slice(0, 10)}</span>
            <a className="font-bold text-[#155E9A] underline" href={`${import.meta.env.BASE_URL}guide/${guide.slug}${alternateLanguage === 'hi' ? '-hi' : ''}.html`}>View {alternateLanguage === 'hi' ? 'Hindi' : 'English'}</a>
          </div>
        </header>

        <div className="prose prose-slate max-w-none rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="whitespace-pre-wrap leading-relaxed">{content}</div>
        </div>

        <section className="rounded-[24px] border border-amber-200 bg-[#FFF9F3] p-5" aria-labelledby="guide-disclaimer">
          <h2 id="guide-disclaimer" className="text-lg font-bold text-slate-900">{language === 'hi' ? 'महत्वपूर्ण सूचना' : 'Important information'}</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            {language === 'hi'
              ? 'यह जानकारी सामान्य मार्गदर्शन है। परिणामों की व्याख्या योग्य चिकित्सक से करें।'
              : 'This guide is general information, not a diagnosis or a substitute for advice from a qualified clinician.'}
          </p>
        </section>

        <footer className="flex flex-col gap-3 rounded-[24px] bg-[#102A43] p-5 text-white sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-bold">{language === 'hi' ? 'अपॉइंटमेंट पूछें' : 'Ask about an appointment'}</h2>
            <p className="mt-1 text-xs text-blue-100">Home collection: 06:30 AM–08:00 PM. Reports verified within 12 hours.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10">
              <a href={telHref(siteConfig.contact.phone)}><Phone className="mr-2 h-4 w-4" />Call</a>
            </Button>
            <Button asChild className="bg-[#128C7E] text-white hover:bg-[#075E54]">
              <a href={whatsappUrl || telHref(siteConfig.contact.phone)} target={whatsappUrl ? '_blank' : undefined} rel={whatsappUrl ? 'noopener noreferrer' : undefined}>
                <MessageCircle className="mr-2 h-4 w-4" />WhatsApp
              </a>
            </Button>
          </div>
        </footer>
      </article>
    </main>
  );
}

export function ApprovedTestGuides() {
  return approvedGuideManifest.map((guide) => (
    <TestGuidePage key={guide.slug} guide={guide} />
  ));
}
