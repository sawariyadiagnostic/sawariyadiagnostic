'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Package, 
  TestTube, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  Zap,
  Info
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { TestCard } from './ui/TestCard';
import { categories, healthPackages as publishedPackages, medicalTests as publishedTests, type MedicalTest, type HealthPackage } from '@/data/publishedCatalog';
import { buildSearchIndex, createSearchEngine } from '@/lib/search-fuse';
import { TestBookingModal } from './booking/TestBookingModal';
import { TestDetailModal } from './catalog/TestDetailModal';

export function TestCatalog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState<'packages' | 'tests'>('packages');

  const [tests] = useState<MedicalTest[]>(publishedTests);
  const [packages] = useState<HealthPackage[]>(publishedPackages);

  // Package booking & detail modal states
  const [selectedPackageForBooking, setSelectedPackageForBooking] = useState<HealthPackage | null>(null);
  const [selectedItemForDetail, setSelectedItemForDetail] = useState<MedicalTest | HealthPackage | null>(null);

  useEffect(() => {
    const handleExternalSearch = (e: Event) => {
      const customEvent = e as CustomEvent<{ query: string; tab?: 'packages' | 'tests' }>;
      if (customEvent.detail?.query !== undefined) {
        setSearchQuery(customEvent.detail.query);
        if (customEvent.detail.tab) {
          setActiveTab(customEvent.detail.tab);
        }
      }
    };
    window.addEventListener('sawariya:search', handleExternalSearch);
    return () => window.removeEventListener('sawariya:search', handleExternalSearch);
  }, []);



  // Build Fuse.js Search Engine
    const searchEngine = useMemo(() => {
      const items = buildSearchIndex(tests, packages);
      return createSearchEngine(items);
    }, [tests, packages]);

    // Execute Fuse.js Search
    const filteredItems = useMemo(() => {
      return searchEngine.search(searchQuery, selectedCategory);
    }, [searchEngine, searchQuery, selectedCategory]);

    // Keep full test objects for detail modal
    const testLookup = useMemo(() => {
      const lookup: Record<string, MedicalTest> = {};
      for (const test of tests) {
        lookup[test.id] = test;
      }
      return lookup;
    }, [tests]);

    const filteredTests = useMemo(() => {
      return filteredItems.filter((i) => i.type === 'test').map(item => testLookup[item.id]);
    }, [filteredItems, testLookup]);

    const packageLookup = useMemo(() => {
      const lookup: Record<string, HealthPackage> = {};
      for (const pkg of packages) {
        lookup[pkg.id] = pkg;
      }
      return lookup;
    }, [packages]);

    const filteredPackages = useMemo(() => {
      return filteredItems
        .filter((i) => i.type === 'package')
        .map((item) => packageLookup[item.id])
        .filter((pkg): pkg is HealthPackage => Boolean(pkg));
    }, [filteredItems, packageLookup]);

  const hasCatalogFilter = searchQuery.trim().length > 0 || selectedCategory !== 'all';
  const clearCatalogFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
  };

  const quickSymptoms = [
    { label: 'All Tests', query: '', cat: 'all' },
    { label: 'Sugar & Diabetes', query: 'sugar', cat: 'all' },
    { label: 'Thyroid', query: 'thyroid', cat: 'all' },
    { label: 'Full Body Checkup', query: 'full body', cat: 'all' },
    { label: 'Fatigue & Weakness', query: 'fatigue', cat: 'all' },
    { label: 'Cholesterol & Heart', query: 'lipid', cat: 'all' },
    { label: 'Vitamins D & B12', query: 'vitamin', cat: 'all' },
    { label: 'Fever & Infection', query: 'fever', cat: 'all' },
    { label: 'Kidney & Urine', query: 'kidney', cat: 'all' }
  ];

  return (
    <section id="tests" className="relative fluid-section bg-[#FFF9F3] overflow-hidden">
      {/* Abstract Liquid Accents */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] left-[10%] w-[30vw] h-[30vw] bg-[#155E9A]/10 blur-[80px] mix-blend-multiply" />
        <div className="absolute bottom-[20%] right-[10%] w-[40vw] h-[40vw] bg-[#155E9A]/10 blur-[100px] mix-blend-multiply" style={{ animationDelay: '-8s' }} />
      </div>

      <div className="fluid-container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10 space-y-2.5">
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-md border border-white/80 px-4 py-1 rounded-full shadow-2xs h-[30.1px]">
            <TestTube className="w-6 h-6 text-[#155E9A]" />
            <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">
              Diagnostic Test Catalog & Packages
            </span>
          </div>
          
          <h2 className="text-[clamp(1.75rem,1.2rem+2.5vw,2.75rem)] font-black text-[#102A43] tracking-tight leading-tight">
            Transparent Pricing. Documented Quality Process.
          </h2>
          
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Ask the lab about a test, package, or collection option.
          </p>

        </div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'packages' | 'tests')} className="w-full">
          <div className="flex justify-center mb-6 px-1">
            <TabsList className="bg-white/60 backdrop-blur-xl p-1 rounded-full border border-white/80 h-12 grid grid-cols-2 w-full max-w-md shadow-inner">
              <TabsTrigger 
                value="packages" 
                className="rounded-full px-2 sm:px-6 py-2 text-xs sm:text-sm font-bold data-[state=active]:bg-white data-[state=active]:text-[#102A43] data-[state=active]:shadow-sm text-slate-600 transition-surface flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                <Package className="w-4 h-4 text-[#155E9A]" />
                <span>Health Packages ({packages.length})</span>
              </TabsTrigger>
              <TabsTrigger 
                value="tests" 
                className="rounded-full px-2 sm:px-6 py-2 text-xs sm:text-sm font-bold data-[state=active]:bg-white data-[state=active]:text-[#102A43] data-[state=active]:shadow-sm text-slate-600 transition-surface flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                <TestTube className="w-4 h-4 text-[#155E9A]" />
                <span>Individual Tests ({tests.length}+)</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Search and category controls */}
          <div className="max-w-4xl mx-auto mb-6 sm:mb-8 space-y-3">
            <div className="bg-white p-3.5 sm:p-4 rounded-[24px] border border-black/[0.06] shadow-[0_2px_16px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center">
              {/* Search Field with Fuse.js matching */}
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#155E9A]" />
                <Input
                  type="text"
                  placeholder="Ask about a test or package..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (e.target.value && activeTab === 'packages') {
                      setActiveTab('tests');
                    }
                  }}
                  className="pl-10 h-11 rounded-[16px] border border-slate-200 bg-slate-50 text-sm font-medium focus:border-[#155E9A] shadow-2xs text-slate-900"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Category Filter Pills */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 pt-0.5 scrollbar-none items-center">
                {categories.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`h-9 px-3.5 rounded-full text-xs font-bold transition-surface whitespace-nowrap active:scale-95 cursor-pointer inline-flex items-center shadow-2xs ${
                        isSelected 
                          ? 'bg-[#102A43] text-white' 
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {cat.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Symptom shortcuts */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 px-1 scrollbar-none">
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1 flex-shrink-0">
                <Zap className="w-3 h-3 text-[#7A4B2A]" /> Ask about:
              </span>
              {quickSymptoms.map((sym) => (
                <button
                  key={sym.label}
                  onClick={() => {
                    setSearchQuery(sym.query);
                    setSelectedCategory(sym.cat);
                    if (sym.query) setActiveTab('tests');
                  }}
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border transition-surface whitespace-nowrap cursor-pointer ${
                    searchQuery === sym.query && sym.query !== ''
                      ? 'bg-[#155E9A] text-white border-[#155E9A]'
                      : 'bg-white/80 hover:bg-white text-slate-700 border-slate-200/80 shadow-2xs'
                  }`}
                >
                  {sym.label}
                </button>
              ))}
            </div>
          </div>

          {/* Health Packages Tab */}
          <TabsContent value="packages" className="mt-0">
            {hasCatalogFilter && filteredPackages.length === 0 ? (
              <div role="status" aria-live="polite" className="rounded-[24px] border border-slate-200 bg-white p-8 text-center shadow-sm">
                <h3 className="text-base font-bold text-[#102A43]">No packages match this search</h3>
                <p className="mt-1 text-sm text-slate-600">Try another term or clear the filters to browse all packages.</p>
                <Button type="button" variant="outline" onClick={clearCatalogFilters} className="action-button mt-4 min-h-11 rounded-[14px] font-bold">
                  Clear filters
                </Button>
              </div>
            ) : (
              <div className="fluid-grid-cards-md">
              {filteredPackages.map((pkg, idx) => {
                const packageThemes = [
                  { accent: 'border-blue-200 hover:border-blue-400', badge: 'bg-blue-50 text-blue-900' },
                  { accent: 'border-green-300 hover:border-green-600', badge: 'bg-green-50 text-[#102A43]' },
                  { accent: 'border-[#D7C7B8] hover:border-[#7A4B2A]', badge: 'bg-[#F4EEEA] text-[#7A4B2A]' },
                  { accent: 'border-[#D7C7B8] hover:border-[#7A4B2A]', badge: 'bg-[#FFF9F3] text-[#7A4B2A]' },
                ];
                const theme = packageThemes[idx % packageThemes.length];

                return (
                  <div 
                    key={pkg.id} 
                    className={`glass-card p-4 sm:p-6 flex flex-col justify-between h-full relative rounded-[24px] sm:rounded-[26px] bg-white/95 border border-slate-200/90 shadow-sm hover:shadow-md transition-surface overflow-hidden ${
                      pkg.recommended 
                        ? 'border-2 border-[#155E9A] ring-2 ring-[#C62828]/20 bg-white' 
                        : ''
                    }`}
                  >

                    
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        {/* Badge and Title */}
                        <div className="mb-3">
                          <span className={`text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider block mb-1 px-2.5 py-0.5 rounded-md inline-block ${theme.badge}`}>
                            PREVENTIVE CARE
                          </span>
                          <h3 className="font-bold text-base sm:text-lg text-[#102A43] mb-1 leading-snug">{pkg.name}</h3>
                          <p className="text-xs text-slate-500 leading-relaxed font-normal">{pkg.description}</p>
                        </div>
                        
                        {/* Price Strip */}
                        <div className="bg-slate-50 border border-slate-100 rounded-[18px] p-3.5 mb-4">
                          <div className="flex items-baseline gap-2 flex-wrap">
                            <span className="text-2xl sm:text-3xl font-black text-[#102A43]">₹{pkg.price}</span>
                          </div>
                          <p className="text-[10.5px] text-slate-600 font-semibold mt-1.5">Confirm current scope and availability with the lab.</p>
                        </div>
                      </div>
                      
                      {/* Tests Included List */}
                      <div className="space-y-1.5 mb-5">
                        <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                          Key Tests Included ({pkg.testsIncluded.length}):
                        </p>
                        <ul className="space-y-1">
                          {pkg.testsIncluded.slice(0, 5).map((memberId) => (
                            <li key={memberId} className="flex items-start gap-1.5 text-xs text-slate-700 font-medium">
                              <Check className="w-3.5 h-3.5 text-green-600 flex-shrink-0 mt-0.5" />
                              <span className="leading-snug break-words">{tests.find((test) => test.id.toUpperCase() === memberId.toUpperCase())?.name ?? memberId}</span>
                            </li>
                          ))}
                          {pkg.testsIncluded.length > 5 && (
                            <li 
                              onClick={() => setSelectedItemForDetail(pkg)}
                              className="text-xs text-[#155E9A] font-semibold pl-5 flex items-center gap-1 cursor-pointer hover:underline active:opacity-75 transition-opacity"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#C62828]" />
                              <span>+{pkg.testsIncluded.length - 5} more parameters (View all)</span>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                    
                    {/* Action Buttons: Firmly baseline aligned with robust padding and truncate */}
                    <div className="action-row grid grid-cols-2 gap-2 pt-4 mt-auto border-t border-slate-100">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedItemForDetail(pkg)}
                        className="action-button h-auto min-h-11 px-2 sm:px-3 text-[11px] sm:text-xs font-bold rounded-[14px] border-slate-300 text-[#102A43] hover:bg-[#E8F1F8] hover:text-[#0F4775] hover:border-[#155E9A] focus-visible:bg-[#E8F1F8] focus-visible:text-[#0F4775] w-full min-w-0"
                      >
                        <Info className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span className="truncate">Overview</span>
                      </Button>

                      <Button 
                        size="sm"
                        onClick={() => setSelectedPackageForBooking(pkg)}
                        className="btn-primary action-button h-auto min-h-11 px-2 sm:px-3 text-[11px] sm:text-xs font-bold rounded-[14px] shadow-xs hover:shadow-md w-full min-w-0"
                      >
                        <span className="truncate">Book Package</span>
                        <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
            )}
          </TabsContent>

          {/* Individual Tests Tab */}
          <TabsContent value="tests" className="mt-0">
            {/* Search Result Count */}
            {searchQuery && (
              <div className="text-xs text-slate-600 mb-4 px-1 font-medium">
                Found <strong>{filteredTests.length}</strong> tests matching "{searchQuery}"
              </div>
            )}

            {/* Tests Grid */}
            {hasCatalogFilter && filteredTests.length === 0 ? (
              <div role="status" aria-live="polite" className="rounded-[24px] border border-slate-200 bg-white p-8 text-center shadow-sm">
                <h3 className="text-base font-bold text-[#102A43]">No tests match this search</h3>
                <p className="mt-1 text-sm text-slate-600">Try another term or clear the filters to browse all tests.</p>
                <Button type="button" variant="outline" onClick={clearCatalogFilters} className="action-button mt-4 min-h-11 rounded-[14px] font-bold">
                  Clear filters
                </Button>
              </div>
            ) : (
              <div className="fluid-grid-cards-sm">
              {filteredTests.map((test) => (
                <TestCard 
                  key={test.id} 
                  test={test} 
                  onViewDetails={(t) => setSelectedItemForDetail(t)}
                />
              ))}
            </div>
            )}


          </TabsContent>
        </Tabs>
      </div>

      {/* Package Booking Modal */}
      {selectedPackageForBooking && (
        <TestBookingModal
          testName={selectedPackageForBooking.name}
          price={selectedPackageForBooking.price}
          originalPrice={selectedPackageForBooking.originalPrice}
          isPackage={true}
          isOpen={!!selectedPackageForBooking}
          onOpenChange={(open) => !open && setSelectedPackageForBooking(null)}
        />
      )}

      {/* Item Details Modal */}
      {selectedItemForDetail && (
        <TestDetailModal
          item={selectedItemForDetail}
          isOpen={!!selectedItemForDetail}
          onClose={() => setSelectedItemForDetail(null)}
        />
      )}
    </section>
  );
}
