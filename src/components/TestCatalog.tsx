'use client';

import { useState, useMemo, useEffect } from 'react';
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
import { StaffCMSModal } from './cms/StaffCMSModal';
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
    <section id="tests" className="relative fluid-section bg-[#F5F5F7] overflow-hidden">
      {/* Abstract Liquid Accents */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] left-[10%] w-[30vw] h-[30vw] bg-blue-300/10 blur-[80px] animate-liquid mix-blend-multiply" />
        <div className="absolute bottom-[20%] right-[10%] w-[40vw] h-[40vw] bg-teal-300/10 blur-[100px] animate-liquid mix-blend-multiply" style={{ animationDelay: '-8s' }} />
      </div>

      <div className="fluid-container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10 space-y-2.5">
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-md border border-white/80 px-4 py-1 rounded-full shadow-2xs h-[30.1px]">
            <TestTube className="w-6 h-6 text-[#0A6E5C]" />
            <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">
              Diagnostic Test Catalog & Packages
            </span>
          </div>
          
          <h2 className="text-[clamp(1.75rem,1.2rem+2.5vw,2.75rem)] font-black text-[#1D1D1F] tracking-tight leading-tight">
            Transparent Pricing. Certified Accuracy.
          </h2>
          
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Choose from comprehensive preventive packages or over 180+ individual certified blood tests with instant search & online booking
          </p>

          {/* Staff CMS Trigger Pill */}
          <div className="pt-1 flex justify-center">
            <StaffCMSModal
              onCatalogUpdated={refreshCatalog}
              trigger={
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold px-3 py-1 rounded-full border border-slate-200 shadow-2xs transition-all active:scale-95 cursor-pointer"
                >
                  <Settings2 className="w-3.5 h-3.5 text-[#0A6E5C]" />
                  <span>Staff Headless CMS Editor</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </button>
              }
            />
          </div>
        </div>

        {/* Apple Segmented Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'packages' | 'tests')} className="w-full">
          <div className="flex justify-center mb-6 px-1">
            <TabsList className="bg-white/60 backdrop-blur-xl p-1 rounded-full border border-white/80 h-12 grid grid-cols-2 w-full max-w-md shadow-inner">
              <TabsTrigger 
                value="packages" 
                className="rounded-full px-2 sm:px-6 py-2 text-xs sm:text-sm font-bold data-[state=active]:bg-white data-[state=active]:text-[#1D1D1F] data-[state=active]:shadow-sm text-slate-600 transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                <Package className="w-4 h-4 text-[#0A6E5C]" />
                <span>Health Packages ({packages.length})</span>
              </TabsTrigger>
              <TabsTrigger 
                value="tests" 
                className="rounded-full px-2 sm:px-6 py-2 text-xs sm:text-sm font-bold data-[state=active]:bg-white data-[state=active]:text-[#1D1D1F] data-[state=active]:shadow-sm text-slate-600 transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                <TestTube className="w-4 h-4 text-[#0D5C75]" />
                <span>Individual Tests ({tests.length}+)</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Quick Fuse.js Search & Symptom Shortcut Bar */}
          <div className="max-w-4xl mx-auto mb-6 sm:mb-8 space-y-3">
            <div className="bg-white p-3.5 sm:p-4 rounded-[24px] border border-black/[0.06] shadow-[0_2px_16px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center">
              {/* Search Field with Fuse.js Instant Fuzzy Match */}
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0A6E5C]" />
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
                  className="pl-10 h-11 rounded-[16px] border border-slate-200 bg-slate-50 text-sm font-medium focus:border-[#0A6E5C] shadow-2xs text-slate-900"
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
                          ? 'bg-[#072448] text-white' 
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
                <Zap className="w-3 h-3 text-amber-500" /> Popular Searches:
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
                      ? 'bg-[#0A6E5C] text-white border-[#0A6E5C]'
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
              {filteredPackages.map((pkg, idx) => {
                const discountPercent = Math.round((1 - pkg.price / pkg.originalPrice) * 100);
                const packageThemes = [
                  { accent: 'border-blue-200 hover:border-blue-400', badge: 'bg-blue-50 text-blue-900' },
                  { accent: 'border-emerald-300 hover:border-emerald-500', badge: 'bg-emerald-50 text-emerald-900' },
                  { accent: 'border-purple-200 hover:border-purple-400', badge: 'bg-purple-50 text-purple-900' },
                  { accent: 'border-amber-200 hover:border-amber-400', badge: 'bg-amber-50 text-amber-900' },
                ];
                const theme = packageThemes[idx % packageThemes.length];

                return (
                  <div 
                    key={pkg.id} 
                    className={`glass-card p-4 sm:p-6 flex flex-col justify-between h-full relative rounded-[24px] sm:rounded-[26px] bg-white/80 border border-white/80 shadow-sm hover:shadow-md transition-all overflow-hidden ${
                      pkg.recommended 
                        ? 'border-2 border-[#0A6E5C] ring-2 ring-[#00A896]/20 bg-white' 
                        : ''
                    }`}
                  >
                    {pkg.recommended && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#072448] via-[#0D5C75] to-[#0A6E5C] text-white text-[10px] sm:text-[11px] font-bold px-3 py-0.5 rounded-full shadow-md border border-teal-300/40 flex items-center gap-1.5 whitespace-nowrap z-10">
                        <Sparkles className="w-3 h-3 text-[#FDE047]" /> Most Popular Choice
                      </div>
                    )}
                    
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        {/* Badge and Title */}
                        <div className="mb-3">
                          <span className={`text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider block mb-1 px-2.5 py-0.5 rounded-md inline-block ${theme.badge}`}>
                            PREVENTIVE CARE
                          </span>
                          <h3 className="font-bold text-base sm:text-lg text-[#1D1D1F] mb-1 leading-snug">{pkg.name}</h3>
                          <p className="text-xs text-slate-500 leading-relaxed font-normal">{pkg.description}</p>
                        </div>
                        
                        {/* Price Strip */}
                        <div className="bg-slate-50 border border-slate-100 rounded-[18px] p-3.5 mb-4">
                          <div className="flex items-baseline gap-2 flex-wrap">
                            <span className="text-2xl sm:text-3xl font-black text-[#1D1D1F]">₹{pkg.price}</span>
                            <span className="text-xs text-slate-400 line-through font-medium">₹{pkg.originalPrice}</span>
                            <span className="ml-auto text-[10.5px] font-bold text-emerald-800 bg-emerald-100/80 border border-emerald-200 px-2 py-0.5 rounded-full">
                              Save {discountPercent}%
                            </span>
                          </div>
                          <p className="text-[10.5px] text-teal-800 font-semibold mt-1.5 flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" /> Free Doorstep Home Sample
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
                              <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                              <span className="leading-snug break-words">{test}</span>
                            </li>
                          ))}
                          {pkg.testsIncluded.length > 5 && (
                            <li 
                              onClick={() => setSelectedItemForDetail(pkg)}
                              className="text-xs text-[#0A6E5C] font-semibold pl-5 flex items-center gap-1 cursor-pointer hover:underline active:opacity-75 transition-opacity"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#00A896]" />
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
                        className="h-10 px-2 sm:px-3 text-[11px] sm:text-xs font-bold rounded-[14px] border-slate-200 hover:bg-slate-50 w-full min-w-0"
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
              {filteredTests.map((test) => (
                <TestCard 
                  key={test.id} 
                  test={test} 
                  onViewDetails={(t) => setSelectedItemForDetail(t)}
                />
              ))}
            </div>

            {filteredTests.length === 0 && (
              <div className="text-center py-12 bg-white rounded-[24px] border border-black/[0.06] p-6 max-w-md mx-auto">
                <TestTube className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <h4 className="font-bold text-slate-800 text-sm mb-1">No Tests Found</h4>
                <p className="text-xs text-slate-500 mb-3">
                  We couldn't find any test matching "{searchQuery}". Call our 24*7 desk for custom pathology panels.
                </p>
                <Button 
                  size="sm"
                  onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                  variant="outline"
                  className="rounded-full text-xs"
                >
                  Clear Search Filters
                </Button>
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
