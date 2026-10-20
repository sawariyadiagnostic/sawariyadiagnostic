'use client';

import { useEffect, useMemo, useState } from 'react';
import { MessageSquare, Search, TestTube } from 'lucide-react';
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
import { clinicalPanels } from '@/data/clinicalPanelManifest';
import { whatsappHref } from '@/config/site';

const TESTS_PER_PAGE = 12;

interface MasterPill {
  id: string;
  label: string;
  query: string;
  panelCategory: string;
}

const MASTER_PILLS: MasterPill[] = [
  { id: 'all', label: 'All', query: '', panelCategory: 'all' },
  { id: 'cbc-blood', label: 'CBC & Blood', query: 'cbc', panelCategory: 'cbc-blood' },
  { id: 'sugar-diabetes', label: 'Sugar & Diabetes', query: 'sugar', panelCategory: 'sugar-diabetes' },
  { id: 'thyroid-hormones', label: 'Thyroid & Hormones', query: 'thyroid', panelCategory: 'thyroid-hormones' },
  { id: 'liver-lft', label: 'Liver (LFT)', query: 'liver', panelCategory: 'liver-lft' },
  { id: 'kidney-kft', label: 'Kidney (KFT)', query: 'kidney', panelCategory: 'kidney-kft' },
  { id: 'cholesterol-heart', label: 'Heart & Cholesterol', query: 'lipid', panelCategory: 'cholesterol-heart' },
  { id: 'vitamins-fatigue', label: 'Vitamins & Fatigue', query: 'vitamin', panelCategory: 'vitamins-fatigue' },
];

export function TestCatalog() {
  const [activeCatalogTab, setActiveCatalogTab] = useState<'panels' | 'tests'>('panels');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPillId, setSelectedPillId] = useState('all');
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

  const [targetPanel, setTargetPanel] = useState<{ id: string; timestamp: number } | null>(null);

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
      const detail = (event as CustomEvent<{
        query?: string;
        tab?: 'panels' | 'tests';
        panelId?: string;
        testId?: string;
        openModal?: boolean;
      }>).detail;

      if (detail?.query !== undefined) {
        setSearchQuery(detail.query);
        setSelectedPillId('all');
      }
      if (detail?.tab) setActiveCatalogTab(detail.tab);

      if (detail?.panelId) {
        setSelectedPillId('all');
        setTargetPanel({ id: detail.panelId, timestamp: Date.now() });
        const catalog = document.getElementById('tests');
        catalog?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (detail?.testId) {
        if (detail.openModal) {
          const targetTest = tests.find((item) => item.id.toLowerCase() === detail.testId?.toLowerCase());
          if (targetTest) setSelectedTest(targetTest);
          const catalog = document.getElementById('tests');
          catalog?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          setTimeout(() => {
            const el = document.getElementById(`test-${detail.testId}`);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
              const catalog = document.getElementById('tests');
              catalog?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 120);
        }
      } else {
        const catalog = document.getElementById('tests');
        catalog?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    openHashTest();
    window.addEventListener('hashchange', openHashTest);
    window.addEventListener('sawariya:search', handleSearch);
    return () => {
      window.removeEventListener('hashchange', openHashTest);
      window.removeEventListener('sawariya:search', handleSearch);
    };
  }, [tests]);

  const activePill = useMemo(
    () => MASTER_PILLS.find((p) => p.id === selectedPillId) || MASTER_PILLS[0],
    [selectedPillId]
  );

  const activeEffectiveTestQuery = useMemo(() => {
    if (searchQuery.trim()) return searchQuery.trim();
    if (selectedPillId !== 'all') {
      return activePill.query;
    }
    return '';
  }, [searchQuery, selectedPillId, activePill.query]);

  const searchEngine = useMemo(() => createSearchEngine(buildSearchIndex(tests)), [tests]);
  const filteredTests = useMemo(
    () => searchEngine.search(activeEffectiveTestQuery).filter((item) => item.type === 'test'),
    [searchEngine, activeEffectiveTestQuery],
  );

  const matchingPanelsCount = useMemo(() => {
    let panels = clinicalPanels;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      panels = panels.filter((panel) =>
        panel.name.toLowerCase().includes(q) ||
        panel.hindiName.toLowerCase().includes(q) ||
        panel.parameters.some((p) => p.toLowerCase().includes(q)) ||
        panel.doctorQuestion.toLowerCase().includes(q) ||
        panel.doctorAnswer.toLowerCase().includes(q) ||
        (panel.keywords && panel.keywords.some((k) => k.toLowerCase().includes(q)))
      );
    } else if (selectedPillId !== 'all') {
      panels = panels.filter((panel) => {
        if (activePill.panelCategory === 'cbc-blood') return panel.department === 'Hematology';
        if (activePill.panelCategory === 'sugar-diabetes') return panel.id === 'panel-diabetes';
        if (activePill.panelCategory === 'thyroid-hormones') return panel.department === 'Endocrinology';
        if (activePill.panelCategory === 'liver-lft') return panel.id === 'panel-lft';
        if (activePill.panelCategory === 'kidney-kft') return panel.id === 'panel-kft';
        if (activePill.panelCategory === 'cholesterol-heart') return panel.id === 'panel-lipid';
        if (activePill.panelCategory === 'vitamins-fatigue') return panel.id === 'panel-senior-vitality' || panel.id === 'panel-fever-infection';
        return true;
      });
    }
    return panels.length;
  }, [searchQuery, selectedPillId, activePill.panelCategory]);

  const { page: currentPage, setPage: setCurrentPage, resetPage, totalPages, start: pageStart, visibleItems: visibleTests } = usePagination(filteredTests, TESTS_PER_PAGE);

  const hasFilter = searchQuery.trim().length > 0 || selectedPillId !== 'all';
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedPillId('all');
    resetPage();
  };

  const handlePillClick = (pill: MasterPill) => {
    if (selectedPillId === pill.id) {
      setSelectedPillId('all');
    } else {
      setSelectedPillId(pill.id);
    }
    setSearchQuery('');
    resetPage();
  };

  return (
    <section id="tests" className="relative fluid-section bg-[#F8FAFC] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] left-[10%] w-[30vw] h-[30vw] bg-[#155E9A]/4 blur-[80px] mix-blend-multiply" />
        <div className="absolute bottom-[20%] right-[10%] w-[40vw] h-[40vw] bg-[#155E9A]/4 blur-[100px] mix-blend-multiply" />
      </div>

      <div className="fluid-container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 space-y-2.5">
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-md border border-white/80 px-4 py-1 rounded-full shadow-2xs h-[30.1px]">
            <TestTube className="w-4 h-4 text-[#155E9A]" />
            <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">
              Diagnostic Test Catalog
            </span>
          </div>
          <h2 className="text-[clamp(1.75rem,1.2rem+2.5vw,2.75rem)] font-black text-[#102A43] tracking-tight leading-tight">
            Individual Tests. Transparent Pricing.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Standardized multi-test clinical panels and individual diagnostic tests with transparent pricing.
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
              {matchingPanelsCount}
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
              {filteredTests.length}
            </span>
          </button>
        </div>

        {/* Unified Search Box & Shared Organ/System Pills */}
        <div className="max-w-4xl mx-auto mb-6 sm:mb-8 space-y-3">
          <div className="bg-white p-3.5 sm:p-4 rounded-[24px] border border-black/[0.06] shadow-[0_2px_16px_rgba(0,0,0,0.03)] space-y-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#155E9A]" />
              <Input
                type="text"
                placeholder="Search tests, panels, or health conditions (e.g. CBC, Thyroid, Sugar, LFT)…"
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
            <div className="flex gap-2 overflow-x-auto pb-1.5 pt-0.5 scrollbar-none items-center scroll-smooth overscroll-x-contain">
              {MASTER_PILLS.map((pill) => {
                const isActive = selectedPillId === pill.id && !searchQuery.trim();
                return (
                  <button
                    type="button"
                    key={pill.id}
                    onClick={() => handlePillClick(pill)}
                    className={`min-h-9 px-3.5 shrink-0 whitespace-nowrap squircle-btn apple-pressable rounded-[14px] text-xs font-bold transition-all cursor-pointer inline-flex items-center active:scale-[0.96] ${
                      isActive ? 'peacock-pill-active' : 'peacock-pill-inactive'
                    }`}
                  >
                    <span>{pill.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tab 1: Complete Health Panels */}
        {activeCatalogTab === 'panels' && (
          <ClinicalPanelSection
            searchQuery={searchQuery}
            selectedCategory={activePill.panelCategory}
            targetPanel={targetPanel}
            onClearTargetPanel={() => setTargetPanel(null)}
          />
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
              <div role="status" aria-live="polite" className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8 text-center shadow-sm max-w-xl mx-auto space-y-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-[#155E9A] mx-auto flex items-center justify-center border border-blue-200/80">
                  <Search className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#102A43]">No tests match this search</h3>
                  <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Looking for a specific investigation not listed? Send your doctor&apos;s prescription slip on WhatsApp for direct price confirmation and doorstep pickup.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
                  <a
                    href={whatsappHref(`Hello Sawariya Diagnostic, I searched for "${searchQuery}" and would like to confirm test availability and price.`)}
                    className="action-button btn-whatsapp squircle-btn apple-pressable min-h-11 px-5 rounded-[16px] font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-2 text-white shadow-sm hover:shadow active:scale-[0.96]"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Ask Desk on WhatsApp</span>
                  </a>
                  <Button type="button" variant="outline" onClick={clearFilters} className="action-button btn-outline squircle-btn apple-pressable min-h-11 px-5 rounded-[16px] font-bold text-xs sm:text-sm cursor-pointer">
                    Clear filters
                  </Button>
                </div>
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
