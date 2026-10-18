'use client';

import { useEffect, useMemo, useState } from 'react';
import { Search, TestTube } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { TestCard } from './ui/TestCard';
import { TestDetailModal } from './catalog/TestDetailModal';
import { medicalTests as publishedTests, type MedicalTest } from '@/data/publishedCatalog';
import { buildSearchIndex, createSearchEngine } from '@/lib/search-fuse';
import { usePagination } from '@/lib/use-pagination';
import { useRequisition } from './requisition/RequisitionContext';
import { BatchPaginationBar } from './BatchPaginationBar';
import { ClinicalPanelSection } from './catalog/ClinicalPanelSection';

const TESTS_PER_PAGE = 12;

export function TestCatalog() {
  const [activeCatalogTab, setActiveCatalogTab] = useState<'panels' | 'tests'>('panels');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTest, setSelectedTest] = useState<MedicalTest | null>(null);
  const tests = publishedTests;
  const { isSelected, toggleTest } = useRequisition();

  const openTest = (test: MedicalTest, updateHash = true) => {
    setSelectedTest(test);
    if (updateHash && window.location.hash !== `#/test/${test.id}`) {
      window.history.pushState({ catalogDetail: true }, '', `#/test/${test.id}`);
    }
  };

  const closeTest = () => {
    setSelectedTest(null);
    if (window.history.state?.catalogDetail) window.history.back();
    else window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
  };

  useEffect(() => {
    const openHashTest = () => {
      const match = window.location.hash.match(/^#\/test\/([^/]+)$/);
      const test = match && tests.find((item) => item.id.toLowerCase() === match[1].toLowerCase());
      if (test) {
        setSelectedTest(test);
        setActiveCatalogTab('tests');
      }
    };
    const handleSearch = (event: Event) => {
      const detail = (event as CustomEvent<{ query?: string; tab?: 'panels' | 'tests' }>).detail;
      if (detail?.query !== undefined) setSearchQuery(detail.query);
      if (detail?.tab) setActiveCatalogTab(detail.tab);
    };
    openHashTest();
    window.addEventListener('hashchange', openHashTest);
    window.addEventListener('sawariya:search', handleSearch);
    return () => {
      window.removeEventListener('hashchange', openHashTest);
      window.removeEventListener('sawariya:search', handleSearch);
    };
  }, [tests]);

  const searchEngine = useMemo(() => createSearchEngine(buildSearchIndex(tests)), [tests]);
  const filteredTests = useMemo(
    () => searchEngine.search(searchQuery, selectedCategory).filter((item) => item.type === 'test'),
    [searchEngine, searchQuery, selectedCategory],
  );
  const { page: currentPage, setPage: setCurrentPage, resetPage, totalPages, start: pageStart, visibleItems: visibleTests } = usePagination(filteredTests, TESTS_PER_PAGE);

  const hasFilter = searchQuery.trim().length > 0 || selectedCategory !== 'all';
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    resetPage();
  };
  const quickSymptoms = [
    { label: 'All Tests', query: '', cat: 'all' },
    { label: 'CBC & Blood', query: 'cbc', cat: 'all' },
    { label: 'Sugar & Diabetes', query: 'sugar', cat: 'all' },
    { label: 'Thyroid', query: 'thyroid', cat: 'all' },
    { label: 'Fatigue & Weakness', query: 'fatigue', cat: 'all' },
    { label: 'Cholesterol & Heart', query: 'lipid', cat: 'all' },
    { label: 'Vitamins D & B12', query: 'vitamin', cat: 'all' },
    { label: 'Fever & Infection', query: 'fever', cat: 'all' },
    { label: 'Kidney & Urine', query: 'kidney', cat: 'all' },
    { label: 'Liver (LFT)', query: 'liver', cat: 'all' },
  ];

  return (
    <section id="tests" className="relative fluid-section bg-[#FFF9F3] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] left-[10%] w-[30vw] h-[30vw] bg-[#155E9A]/10 blur-[80px] mix-blend-multiply" />
        <div className="absolute bottom-[20%] right-[10%] w-[40vw] h-[40vw] bg-[#155E9A]/10 blur-[100px] mix-blend-multiply" />
      </div>

      <div className="fluid-container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 space-y-2.5">
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-md border border-white/80 px-4 py-1 rounded-full shadow-2xs h-[30.1px]">
            <TestTube className="w-6 h-6 text-[#155E9A]" />
            <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">Diagnostic Test Catalog</span>
          </div>
          <h2 className="text-[clamp(1.75rem,1.2rem+2.5vw,2.75rem)] font-black text-[#102A43] tracking-tight leading-tight">
            Individual Tests. Transparent Pricing.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Browse individual tests and ask the lab about collection options.
          </p>
        </div>

        {/* Apple Segmented Switch: Complete Health Panels vs Individual Tests */}
        <div className="max-w-md mx-auto mb-6 p-1.5 bg-slate-200/75 backdrop-blur-md rounded-[20px] flex items-center gap-1 border border-slate-300/50 shadow-inner">
          <button
            type="button"
            onClick={() => { setActiveCatalogTab('panels'); }}
            className={`flex-1 py-2.5 px-3 rounded-[16px] text-xs sm:text-sm font-black transition-all cursor-pointer active:scale-[0.97] flex items-center justify-center gap-1.5 ${
              activeCatalogTab === 'panels'
                ? 'bg-white text-[#102A43] shadow-[0_2px_8px_rgba(0,0,0,0.1)] border border-black/[0.04]'
                : 'text-slate-600 hover:text-slate-900 font-bold'
            }`}
          >
            <span>📦 Complete Health Panels</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 font-extrabold text-[#155E9A]">
              8
            </span>
          </button>
          <button
            type="button"
            onClick={() => { setActiveCatalogTab('tests'); }}
            className={`flex-1 py-2.5 px-3 rounded-[16px] text-xs sm:text-sm font-black transition-all cursor-pointer active:scale-[0.97] flex items-center justify-center gap-1.5 ${
              activeCatalogTab === 'tests'
                ? 'bg-white text-[#102A43] shadow-[0_2px_8px_rgba(0,0,0,0.1)] border border-black/[0.04]'
                : 'text-slate-600 hover:text-slate-900 font-bold'
            }`}
          >
            <span>🔬 Individual Tests</span>
            <span className="text-[10.5px] px-1.5 py-0.5 rounded-full bg-slate-100 font-extrabold text-[#155E9A]">
              74
            </span>
          </button>
        </div>

        {/* Unified Search Box & Quick Symptom Pills */}
        <div className="max-w-4xl mx-auto mb-6 sm:mb-8 space-y-3">
          <div className="bg-white p-3.5 sm:p-4 rounded-[24px] border border-black/[0.06] shadow-[0_2px_16px_rgba(0,0,0,0.03)] space-y-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#155E9A]" />
              <Input
                type="text"
                placeholder={activeCatalogTab === 'panels' ? "Search health panels or organ checkups…" : "Ask about an individual test…"}
                name="catalog-search"
                autoComplete="off"
                value={searchQuery}
                onChange={(event) => { setSearchQuery(event.target.value); resetPage(); }}
                className="pl-10 h-11 rounded-[16px] border border-slate-200 bg-slate-50 text-sm font-medium focus:border-[#155E9A] shadow-2xs text-slate-900"
              />
              {searchQuery && (
                <button type="button" onClick={() => { setSearchQuery(''); resetPage(); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-700 cursor-pointer apple-pressable active:scale-[0.96]">
                  Clear
                </button>
              )}
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-1 pt-0.5 scrollbar-none items-center">
              {quickSymptoms.map((symptom) => {
                const isActive = (symptom.query === '' && searchQuery === '') || (symptom.query !== '' && searchQuery.toLowerCase().includes(symptom.query.toLowerCase()));
                return (
                  <button
                    type="button"
                    key={symptom.label}
                    onClick={() => {
                      setSearchQuery(symptom.query);
                      setSelectedCategory(symptom.cat);
                      resetPage();
                    }}
                    className={`min-h-9 px-3.5 squircle-btn apple-pressable rounded-[14px] text-xs font-bold transition-surface whitespace-nowrap active:scale-[0.96] cursor-pointer inline-flex items-center ${
                      isActive ? 'peacock-pill-active' : 'peacock-pill-inactive'
                    }`}
                  >
                    {symptom.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tab 1: Complete Health Panels */}
        {activeCatalogTab === 'panels' && (
          <ClinicalPanelSection searchQuery={searchQuery} />
        )}

        {/* Tab 2: Individual Tests */}
        {activeCatalogTab === 'tests' && (
          <>
            {searchQuery && (
              <div role="status" aria-live="polite" className="text-xs text-slate-600 mb-4 px-1 font-medium">
                Found <strong>{filteredTests.length}</strong> tests matching &quot;{searchQuery}&quot;
              </div>
            )}

            {hasFilter && filteredTests.length === 0 ? (
              <div role="status" aria-live="polite" className="rounded-[24px] border border-slate-200 bg-white p-8 text-center shadow-sm">
                <h3 className="text-base font-bold text-[#102A43]">No tests match this search</h3>
                <p className="mt-1 text-sm text-slate-600">Try another term or clear the filters to browse all tests.</p>
                <Button type="button" variant="outline" onClick={clearFilters} className="action-button btn-outline squircle-btn apple-pressable mt-4 min-h-11 rounded-[16px] font-bold cursor-pointer">Clear filters</Button>
              </div>
            ) : (
              <>
                <div className="fluid-grid-cards-sm">
                  {visibleTests.map((item) => {
                    const test = tests.find((candidate) => candidate.id === item.id);
                    return test ? <TestCard key={test.id} test={test} isSelected={isSelected(test.id)} onToggleRequest={toggleTest} onViewDetails={openTest} /> : null;
                  })}
                </div>
                <BatchPaginationBar
                  currentPage={currentPage}
                  pageSize={TESTS_PER_PAGE}
                  totalItems={filteredTests.length}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </>
        )}
      </div>

      {selectedTest && <TestDetailModal item={selectedTest} isOpen={true} onClose={closeTest} />}
    </section>
  );
}
