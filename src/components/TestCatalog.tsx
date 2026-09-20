import { useEffect, useState } from 'react';
import { ArrowRight, Check, ClipboardList, Search, TestTube, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TestDetailModal } from '@/components/catalog/TestDetailModal';
import { formatInr } from '@/lib/utils';
import { departmentOptions } from '@/data/requisitionCatalog';
import type { RequisitionCatalogTest } from '@/types/requisition';
import { RequisitionProvider, useRequisition } from './requisition/RequisitionContext';
import { RequisitionDrawer } from './requisition/RequisitionDrawer';

function TestRow({ test, onDetails }: { test: RequisitionCatalogTest; onDetails: (test: RequisitionCatalogTest) => void }) {
  const { state, toggleTest } = useRequisition();
  const selected = state.selectedIds.includes(test.id);
  return (
    <article className={`glass-card p-4 sm:p-5 flex flex-col min-w-0 ${selected ? 'ring-2 ring-[#155E9A]/30 border-[#155E9A]/50' : ''}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="text-[10px] font-bold tracking-wider uppercase text-[#155E9A]">{test.id.replace('web-', 'SDL-')}</span>
          <h3 className="mt-1 text-base sm:text-lg font-bold leading-snug text-[#102A43] break-words">{test.name}</h3>
        </div>
        <span className="shrink-0 text-base sm:text-lg font-black text-[#102A43]">{formatInr(test.price)}</span>
      </div>
      <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 line-clamp-2">{test.description}</p>
      <div className="mt-3 flex flex-wrap gap-1.5 text-[10px] font-semibold text-slate-600">
        <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1">{test.sampleGroup.split(' / ')[0]}</span>
        {test.fastingHours > 0 && <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-1 text-amber-800">{test.fastingHours}h preparation may apply</span>}
        {test.timing === 'POST_MEAL' && <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-1 text-amber-800">Timed post-meal draw</span>}
        {test.timing === 'MORNING' && <span className="rounded-full border border-blue-200 bg-blue-50 px-2 py-1 text-blue-800">Morning draw may apply</span>}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Button type="button" variant="outline" onClick={() => onDetails(test)} className="action-button min-h-11 rounded-[14px] text-xs font-bold">
          Details
        </Button>
        <Button type="button" onClick={() => toggleTest(test.id)} className={`action-button min-h-11 rounded-[14px] text-xs font-bold ${selected ? 'bg-[#E8F1F8] text-[#0F4775] hover:bg-[#DCECF8]' : 'btn-primary'}`} aria-pressed={selected}>
          {selected ? <><Check className="mr-1.5 h-4 w-4" />In slip</> : <>+ Add to slip</>}
        </Button>
      </div>
    </article>
  );
}

function CatalogContent() {
  const { state, filteredTests, selectedTests, manifest, setQuery, setDepartment, setDrawerOpen, toggleTest } = useRequisition();
  const [selectedTest, setSelectedTest] = useState<RequisitionCatalogTest | null>(null);
  const openTest = (test: RequisitionCatalogTest, updateHash = true) => {
    setSelectedTest(test);
    if (updateHash && window.location.hash !== `#/test/${test.id}`) window.history.pushState({ catalogDetail: true }, '', `#/test/${test.id}`);
  };
  const closeTest = () => {
    setSelectedTest(null);
    if (window.history.state?.catalogDetail) window.history.back();
    else window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
  };
  useEffect(() => {
    const openHashTest = () => {
      const match = window.location.hash.match(/^#\/test\/([^/]+)$/);
      const test = match && filteredTests.find((item) => item.id.toLowerCase() === match[1].toLowerCase());
      setSelectedTest(test ?? null);
    };
    const handleSearch = (event: Event) => {
      const detail = (event as CustomEvent<{ query?: string }>).detail;
      if (detail?.query !== undefined) setQuery(detail.query);
    };
    openHashTest();
    window.addEventListener('hashchange', openHashTest);
    window.addEventListener('sawariya:search', handleSearch);
    return () => {
      window.removeEventListener('hashchange', openHashTest);
      window.removeEventListener('sawariya:search', handleSearch);
    };
  }, [filteredTests, setQuery]);
  const hasFilter = state.query.trim().length > 0 || state.department !== 'ALL';
  const quickSearches = [
    { label: 'CBC & blood', value: 'cbc' },
    { label: 'Sugar', value: 'sugar' },
    { label: 'Thyroid', value: 'thyroid' },
    { label: 'Cholesterol', value: 'cholesterol' },
    { label: 'Fever', value: 'fever' },
  ];

  return (
    <>
      <section id="tests" className="relative overflow-hidden bg-[#FFF9F3] py-14 sm:py-20">
        <div className="fluid-container relative z-10">
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/80 px-4 py-2 shadow-sm">
              <TestTube className="h-4 w-4 text-[#155E9A]" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#102A43]">Doctor-prescribed tests</span>
            </div>
            <h2 className="text-[clamp(1.75rem,1.2rem+2.5vw,2.75rem)] font-black leading-tight tracking-tight text-[#102A43]">Build one requisition slip</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">Search the individual tests on your prescription, add them together, and send one collection request to the lab.</p>
          </div>

          <div className="mx-auto mb-7 max-w-5xl rounded-[24px] border border-black/[0.06] bg-white p-3.5 shadow-[0_2px_16px_rgba(0,0,0,0.03)] sm:p-4">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#155E9A]" />
              <Input type="search" name="catalog-search" autoComplete="off" aria-label="Search individual laboratory tests" placeholder="Search CBC, sugar, SGPT, cholesterol, TSH, platelet…" value={state.query} onChange={(event) => setQuery(event.target.value)} className="h-12 rounded-[16px] border border-slate-200 bg-slate-50 pl-10 pr-10 text-sm font-medium text-slate-900" />
              {state.query && <button type="button" aria-label="Clear test search" onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-700"><X className="h-4 w-4" /></button>}
            </div>
            <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {departmentOptions.map((option) => <button key={option.id} type="button" onClick={() => setDepartment(option.id)} aria-pressed={state.department === option.id} className={`min-h-11 whitespace-nowrap rounded-full px-3.5 text-xs font-bold transition-colors ${state.department === option.id ? 'bg-[#102A43] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>{option.label}</button>)}
            </div>
            <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-slate-500">Quick search</span>
              {quickSearches.map((item) => <button key={item.value} type="button" onClick={() => { setQuery(item.value); setDepartment('ALL'); }} className="min-h-11 shrink-0 rounded-full border border-slate-200 bg-white px-3 text-[11px] font-semibold text-slate-700 hover:border-[#155E9A] hover:text-[#155E9A]">{item.label}</button>)}
            </div>
          </div>

          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 px-1" role="status" aria-live="polite">
            <span className="text-xs font-medium text-slate-600">{hasFilter ? <>Found <strong>{filteredTests.length}</strong> individual tests</> : <><strong>{filteredTests.length}</strong> individual tests available</>}</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7A4B2A]"><ClipboardList className="h-4 w-4" /> Select multiple from one prescription</span>
          </div>

          {hasFilter && filteredTests.length === 0 ? (
            <div className="rounded-[24px] border border-slate-200 bg-white p-8 text-center shadow-sm" role="status" aria-live="polite">
              <h3 className="text-base font-bold text-[#102A43]">No tests match this search</h3>
              <p className="mt-1 text-sm text-slate-600">Try a short name, code, or biomarker such as CBC, Hb, glucose, or TSH.</p>
              <Button type="button" variant="outline" onClick={() => { setQuery(''); setDepartment('ALL'); }} className="action-button mt-4 min-h-11 rounded-[14px] font-bold">Clear filters</Button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredTests.map((test) => <TestRow key={test.id} test={test} onDetails={openTest} />)}
            </div>
          )}
        </div>
      </section>

      {selectedTest && <TestDetailModal item={selectedTest} isOpen={true} onClose={closeTest} onAddToSlip={() => { toggleTest(selectedTest.id); closeTest(); }} />}
      {selectedTests.length > 0 && <RequisitionDock count={selectedTests.length} total={manifest.total} amountToFree={manifest.amountToFreeCollection} onOpen={() => setDrawerOpen(true)} />}
      <RequisitionDrawer />
    </>
  );
}

function RequisitionDock({ count, total, amountToFree, onOpen }: { count: number; total: number; amountToFree: number; onOpen: () => void }) {
  return <aside className="fixed bottom-[calc(env(safe-area-inset-bottom,0px)+84px)] left-1/2 z-[105] w-[calc(100%-24px)] max-w-[560px] -translate-x-1/2 overflow-hidden rounded-[18px] border border-white/15 bg-[#102A43] text-white shadow-[0_16px_42px_rgba(16,42,67,0.35)] sm:bottom-5" aria-label="Active requisition slip">
    <div className="bg-[#155E9A] px-3 py-1.5 text-center text-[11px] font-medium text-white">{amountToFree > 0 ? <>Add <strong>{formatInr(amountToFree)}</strong> more for no collection fee</> : <strong>Collection fee waived at this subtotal</strong>}</div>
    <div className="flex items-center justify-between gap-3 p-2.5 sm:p-3"><div className="flex min-w-0 items-center gap-2.5"><span className="flex h-8 min-w-8 items-center justify-center rounded-full bg-[#C62828] px-2 text-sm font-black">{count}</span><div className="min-w-0"><span className="block text-[10px] uppercase tracking-wider text-slate-300">Requisition total</span><strong className="block text-lg leading-tight">{formatInr(total)}</strong></div></div><Button type="button" onClick={onOpen} className="action-button min-h-11 shrink-0 rounded-[14px] bg-white px-3 text-xs font-bold text-[#102A43] hover:bg-slate-100">Review slip <ArrowRight className="ml-1.5 h-4 w-4" /></Button></div>
  </aside>;
}

export function TestCatalog() {
  return <RequisitionProvider><CatalogContent /></RequisitionProvider>;
}
