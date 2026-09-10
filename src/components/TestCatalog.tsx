'use client';

import { useState, useMemo, useEffect } from 'react';
import { whatsappHref } from '@/config/site';
import { 
  Search, 
  Package, 
  TestTube, 
  Check, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Settings2, 
  SlidersHorizontal,
  Flame,
  Zap,
  Info
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { TestCard } from './ui/TestCard';
import { categories, type MedicalTest, type HealthPackage } from '@/data/mockTests';
import { CMSClient } from '@/lib/cms-client';
import { buildSearchIndex, createSearchEngine, type SearchableItem } from '@/lib/search-fuse';
import { TestBookingModal } from './booking/TestBookingModal';
import { TestDetailModal } from './catalog/TestDetailModal';

export function TestCatalog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState<'packages' | 'tests'>('packages');

  // Load from Headless CMS state
  const [tests, setTests] = useState<MedicalTest[]>(() => CMSClient.getTests());
  const [packages, setPackages] = useState<HealthPackage[]>(() => CMSClient.getPackages());

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

  const refreshCatalog = () => {
    setTests(CMSClient.getTests());
    setPackages(CMSClient.getPackages());
  };

  // Build Fuse.js Search Engine
  const searchEngine = useMemo(() => {
    const items = buildSearchIndex(tests, packages);
    return createSearchEngine(items);
  }, [tests, packages]);

  // Execute Fuse.js Search
  const filteredItems = useMemo(() => {
    return searchEngine.search(searchQuery, selectedCategory);
  }, [searchEngine, searchQuery, selectedCategory]);

  const filteredTests = useMemo(() => {
    return filteredItems.filter((i) => i.type === 'test') as unknown as MedicalTest[];
  }, [filteredItems]);

  const filteredPackages = useMemo(() => {
    if (searchQuery.trim().length > 0) {
      return filteredItems.filter((i) => i.type === 'package') as unknown as HealthPackage[];
    }
    return packages;
  }, [filteredItems, searchQuery, packages]);

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
            Transparent Pricing. Certified Accuracy.
          </h2>
          
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Choose from comprehensive preventive packages or individual tests listed in the current catalog with instant search & online booking
          </p>

        </div>

        {/* Apple Segmented Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'packages' | 'tests')} className="w-full">
          <div className="flex justify-center mb-6 px-1">
            <TabsList className="bg-white/60 backdrop-blur-xl p-1 rounded-full border border-white/80 h-12 grid grid-cols-2 w-full max-w-md shadow-inner">
              <TabsTrigger 
                value="packages" 
                className="rounded-full px-2 sm:px-6 py-2 text-xs sm:text-sm font-bold data-[state=active]:bg-white data-[state=active]:text-[#102A43] data-[state=active]:shadow-sm text-slate-600 transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                <Package className="w-4 h-4 text-[#155E9A]" />
                <span>Health Packages ({packages.length})</span>
              </TabsTrigger>
              <TabsTrigger 
                value="tests" 
                className="rounded-full px-2 sm:px-6 py-2 text-xs sm:text-sm font-bold data-[state=active]:bg-white data-[state=active]:text-[#102A43] data-[state=active]:shadow-sm text-slate-600 transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                <TestTube className="w-4 h-4 text-[#155E9A]" />
                <span>Individual Tests ({tests.length}+)</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Quick Fuse.js Search & Symptom Shortcut Bar */}
          <div className="max-w-4xl mx-auto mb-6 sm:mb-8 space-y-3">
            <div className="bg-white p-3.5 sm:p-4 rounded-[24px] border border-black/[0.06] shadow-[0_2px_16px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center">
              {/* Search Field with Fuse.js Instant Fuzzy Match */}
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#155E9A]" />
                <Input
                  type="text"
                  placeholder="Search 180+ tests by name, symptom (e.g. fatigue, sugar, cbc, thyroid)..."
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
                      className={`h-9 px-3.5 rounded-full text-xs font-bold transition-all whitespace-nowrap active:scale-95 cursor-pointer inline-flex items-center shadow-2xs ${
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
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 flex-shrink-0">
                <Zap className="w-3 h-3 text-[#7A4B2A]" /> Popular Searches:
              </span>
              {quickSymptoms.map((sym) => (
                <button
                  key={sym.label}
                  onClick={() => {
                    setSearchQuery(sym.query);
                    setSelectedCategory(sym.cat);
                    if (sym.query) setActiveTab('tests');
                  }}
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border transition-all whitespace-nowrap cursor-pointer ${
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
            <div className="fluid-grid-cards-md">
              {filteredPackages.length === 0 ? (
                <div className="col-span-full rounded-[24px] border border-dashed border-[#D7C7B8] bg-white/80 p-10 text-center">
                  <Package className="mx-auto mb-3 h-8 w-8 text-[#155E9A]" />
                  <h3 className="text-lg font-bold text-[#102A43]">Package catalog under review</h3>
                  <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">We are validating included tests, report parameters, and pricing before publishing the new package list.</p>
                </div>
              ) : filteredPackages.map((pkg, idx) => {
                const listedValue = Math.max(pkg.listedValue ?? pkg.originalPrice, pkg.price);
                const discountPercent = listedValue > pkg.price ? Math.round((1 - pkg.price / listedValue) * 100) : 0;
                const mostBooked = pkg.bookingsLast6Months === Math.max(...packages.map((p) => p.bookingsLast6Months ?? 0));
                const packageThemes = [
                  { accent: 'border-blue-200 hover:border-blue-400', badge: 'bg-blue-50 text-blue-900' },
                  { accent: 'border-green-300 hover:border-green-600', badge: 'bg-green-50 text-green-900' },
                  { accent: 'border-[#D7C7B8] hover:border-[#7A4B2A]', badge: 'bg-[#F4EEEA] text-[#7A4B2A]' },
                  { accent: 'border-[#D7C7B8] hover:border-[#7A4B2A]', badge: 'bg-[#FFF9F3] text-[#7A4B2A]' },
                ];
                const theme = packageThemes[idx % packageThemes.length];

                return (
                  <div 
                    key={pkg.id} 
                    className={`glass-card p-4 sm:p-6 flex flex-col justify-between h-full relative rounded-[24px] sm:rounded-[26px] bg-white/95 border border-slate-200/90 shadow-sm hover:shadow-md transition-all overflow-hidden ${
                      pkg.recommended 
                        ? 'border-2 border-[#155E9A] ring-2 ring-[#C62828]/20 bg-white' 
                        : ''
                    }`}
                  >
                    {mostBooked && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#102A43] via-[#155E9A] to-[#155E9A] text-white text-[10px] sm:text-[11px] font-bold px-3 py-0.5 rounded-full shadow-md border border-blue-300/40 flex items-center gap-1.5 whitespace-nowrap z-10">
                        <Sparkles className="w-3 h-3 text-[#FDE047]" /> Most booked · 535 in last 6 months
                      </div>
                    )}
                    
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
                            <span className="text-xs text-slate-400 line-through font-medium">₹{listedValue}</span>
                            <span className="ml-auto text-[10.5px] font-bold text-green-800 bg-green-100/80 border border-green-200 px-2 py-0.5 rounded-full">
                              Save {discountPercent}%
                            </span>
                          </div>
                          <p className="text-[10.5px] text-blue-800 font-semibold mt-1.5 flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-green-600 flex-shrink-0" /> Free Doorstep Home Sample
                          </p>
                        </div>
                      </div>
                      
                      {/* Tests Included List */}
                      <div className="space-y-1.5 mb-5">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          Key Tests Included ({pkg.testsIncluded.length}):
                        </p>
                        <ul className="space-y-1">
                          {pkg.testsIncluded.slice(0, 5).map((test) => (
                            <li key={test} className="flex items-start gap-1.5 text-xs text-slate-700 font-medium">
                              <Check className="w-3.5 h-3.5 text-green-600 flex-shrink-0 mt-0.5" />
                              <span className="leading-snug break-words">{test}</span>
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
                    <div className="grid grid-cols-2 gap-2 pt-4 mt-auto border-t border-slate-100">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedItemForDetail(pkg)}
                        className="h-10 px-2 sm:px-3 text-[11px] sm:text-xs font-bold rounded-[14px] border-slate-300 text-[#102A43] hover:bg-[#E8F1F8] hover:text-[#0F4775] hover:border-[#155E9A] focus-visible:bg-[#E8F1F8] focus-visible:text-[#0F4775] w-full min-w-0"
                      >
                        <Info className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span className="truncate">Overview</span>
                      </Button>

                      <Button 
                        size="sm"
                        onClick={() => setSelectedPackageForBooking(pkg)}
                        className="btn-primary h-10 px-2 sm:px-3 text-[11px] sm:text-xs font-bold rounded-[14px] shadow-xs hover:shadow-md w-full min-w-0"
                      >
                        <span className="truncate">Book Package</span>
                        <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
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
            <div className="fluid-grid-cards-sm">
              {filteredTests.length === 0 ? (
              <div className="rounded-[24px] border border-dashed border-[#D7C7B8] bg-white/80 p-10 text-center">
                <TestTube className="mx-auto mb-3 h-8 w-8 text-[#155E9A]" />
                <h3 className="text-lg font-bold text-[#102A43]">Test catalog under review</h3>
                <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">Individual tests will appear here after their report parameters, preparation, and prices are confirmed.</p>
              </div>
            ) : filteredTests.map((test) => (
                <TestCard 
                  key={test.id} 
                  test={test} 
                  onViewDetails={(t) => setSelectedItemForDetail(t)}
                />
              ))}
            </div>

            {filteredTests.length === 0 && (
              <div className="text-center py-10 bg-white/95 backdrop-blur-md rounded-[24px] border border-slate-200/90 shadow-sm p-6 max-w-lg mx-auto">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-500">
                  <TestTube className="w-6 h-6 text-[#155E9A]" />
                </div>
                <h4 className="font-bold text-slate-800 text-base mb-1">No Tests Matching "{searchQuery}"</h4>
                <p className="text-xs text-slate-600 mb-4 max-w-sm mx-auto leading-relaxed">
                  Try searching with generic terms like <em>blood</em>, <em>sugar</em>, or click one of the popular test tags below:
                </p>

                <div className="flex flex-wrap gap-1.5 justify-center mb-5">
                  {['CBC', 'Thyroid', 'HbA1c', 'Lipid', 'Vitamin D3', 'Liver LFT', 'Kidney KFT'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => { setSearchQuery(tag); setSelectedCategory('all'); }}
                      className="text-xs bg-slate-100 hover:bg-blue-50 hover:text-[#155E9A] text-slate-700 font-semibold px-3 py-1 rounded-full border border-slate-200 transition-all cursor-pointer"
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-center gap-2">
                  <Button 
                    size="sm"
                    onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                    variant="outline"
                    className="rounded-full text-xs font-bold border-slate-300 hover:bg-slate-50"
                  >
                    Clear Search Filters
                  </Button>
                  <a
                    href={whatsappHref('Hi, I am looking for a pathology test not listed in the catalog') || undefined}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold bg-[#155E9A] text-white px-3.5 py-2 rounded-full hover:bg-[#102A43] transition-all"
                  >
                    <span>Ask Lab on WhatsApp</span>
                  </a>
                </div>
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
