'use client';

import { useState, useMemo } from 'react';
import { Search, Package, TestTube, Check, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { TestCard } from './ui/TestCard';
import { medicalTests, healthPackages, categories } from '@/data/mockTests';

export function TestCatalog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredTests = useMemo(() => {
    return medicalTests.filter((test) => {
      const matchesSearch = 
        test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.parameters?.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || test.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const categoryStyles: Record<string, { active: string; inactive: string }> = {
    all: {
      active: 'bg-gradient-to-r from-[#072448] via-[#0D5C75] to-[#0A6E5C] text-white shadow-sm',
      inactive: 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200/90'
    },
    routine: {
      active: 'bg-[#0A3663] text-white shadow-sm',
      inactive: 'bg-blue-50/70 text-blue-900 hover:bg-blue-100/70 border-blue-200/70'
    },
    diabetes: {
      active: 'bg-[#065F46] text-white shadow-sm',
      inactive: 'bg-emerald-50/70 text-emerald-900 hover:bg-emerald-100/70 border-emerald-200/70'
    },
    thyroid: {
      active: 'bg-[#581C87] text-white shadow-sm',
      inactive: 'bg-purple-50/70 text-purple-900 hover:bg-purple-100/70 border-purple-200/70'
    },
    lipid: {
      active: 'bg-[#B45309] text-white shadow-sm',
      inactive: 'bg-amber-50/70 text-amber-900 hover:bg-amber-100/70 border-amber-200/70'
    },
    vitamins: {
      active: 'bg-[#0E7490] text-white shadow-sm',
      inactive: 'bg-cyan-50/70 text-cyan-900 hover:bg-cyan-100/70 border-cyan-200/70'
    },
    women: {
      active: 'bg-[#831843] text-white shadow-sm',
      inactive: 'bg-rose-50/70 text-rose-900 hover:bg-rose-100/70 border-rose-200/70'
    }
  };

  return (
    <section id="tests" className="relative fluid-section bg-[#F5F5F7] overflow-hidden">
      {/* Abstract Liquid Accents */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] left-[10%] w-[30vw] h-[30vw] bg-blue-300/10 blur-[80px] animate-liquid mix-blend-multiply" />
        <div className="absolute bottom-[20%] right-[10%] w-[40vw] h-[40vw] bg-teal-300/10 blur-[100px] animate-liquid mix-blend-multiply" style={{ animationDelay: '-8s' }} />
      </div>

      <div className="fluid-container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2.5">
          <div className="inline-flex items-center gap-1.5 bg-white/60 backdrop-blur-md border border-white/80 px-3.5 py-1 rounded-full shadow-2xs">
            <TestTube className="w-3.5 h-3.5 text-[#0A6E5C]" />
            <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">Test Catalog & Packages</span>
          </div>
          
          <h2 className="text-[clamp(1.75rem,1.2rem+2.5vw,2.75rem)] font-black text-[#1D1D1F] tracking-tight leading-tight">
            Transparent Pricing. Certified Accuracy.
          </h2>
          
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Choose from comprehensive preventive packages or over 100+ individual certified blood tests
          </p>
        </div>

        {/* Apple Segmented Tabs */}
        <Tabs defaultValue="packages" className="w-full">
          <div className="flex justify-center mb-6 sm:mb-10 px-1">
            <TabsList className="bg-white/50 backdrop-blur-xl p-1 rounded-full border border-white/80 h-12 grid grid-cols-2 w-full max-w-md shadow-inner">
              <TabsTrigger 
                value="packages" 
                className="rounded-full px-2 sm:px-6 py-2 text-xs sm:text-sm font-bold data-[state=active]:bg-white data-[state=active]:text-[#1D1D1F] data-[state=active]:shadow-sm text-slate-600 transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                <Package className="w-4 h-4 text-[#0A6E5C]" />
                <span>Health Packages</span>
              </TabsTrigger>
              <TabsTrigger 
                value="tests" 
                className="rounded-full px-2 sm:px-6 py-2 text-xs sm:text-sm font-bold data-[state=active]:bg-white data-[state=active]:text-[#1D1D1F] data-[state=active]:shadow-sm text-slate-600 transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                <TestTube className="w-4 h-4 text-[#0D5C75]" />
                <span>Individual Tests ({medicalTests.length}+)</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Health Packages Tab */}
          <TabsContent value="packages" className="mt-0">
            <div className="fluid-grid-cards-sm">
              {healthPackages.map((pkg, idx) => {
                const discountPercent = Math.round((1 - pkg.price / pkg.originalPrice) * 100);
                
                const packageThemes = [
                  { accent: 'border-blue-200 hover:border-blue-400', badge: 'bg-blue-50 text-blue-900', priceBg: 'bg-blue-50/70 border-blue-200/60' },
                  { accent: 'border-emerald-300 hover:border-emerald-500', badge: 'bg-emerald-50 text-emerald-900', priceBg: 'bg-emerald-50/70 border-emerald-200/60' },
                  { accent: 'border-purple-200 hover:border-purple-400', badge: 'bg-purple-50 text-purple-900', priceBg: 'bg-purple-50/70 border-purple-200/60' },
                  { accent: 'border-amber-200 hover:border-amber-400', badge: 'bg-amber-50 text-amber-900', priceBg: 'bg-amber-50/70 border-amber-200/60' },
                ];
                const theme = packageThemes[idx % packageThemes.length];

                return (
                  <div 
                    key={pkg.id} 
                    className={`glass-card p-5 sm:p-6 flex flex-col justify-between relative rounded-[26px] ${
                      pkg.recommended 
                        ? 'border-2 border-[#0A6E5C] ring-2 ring-[#00A896]/20 bg-white' 
                        : ``
                    }`}
                  >
                    {pkg.recommended && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#072448] via-[#0D5C75] to-[#0A6E5C] text-white text-[10px] sm:text-[11px] font-bold px-3 py-0.5 rounded-full shadow-md border border-teal-300/40 flex items-center gap-1.5 whitespace-nowrap">
                        <Sparkles className="w-3 h-3 text-[#FDE047]" /> Most Popular Choice
                      </div>
                    )}
                    
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
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl sm:text-3xl font-black text-[#1D1D1F]">₹{pkg.price}</span>
                          <span className="text-xs text-slate-400 line-through font-medium">₹{pkg.originalPrice}</span>
                          <span className="ml-auto text-[10.5px] font-bold text-emerald-800 bg-emerald-100/80 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                            Save {discountPercent}%
                          </span>
                        </div>
                        <p className="text-[10.5px] text-teal-800 font-semibold mt-1.5 flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Free Doorstep Home Sample
                        </p>
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
                              <span className="leading-snug">{test}</span>
                            </li>
                          ))}
                          {pkg.testsIncluded.length > 5 && (
                            <li className="text-xs text-[#0A6E5C] font-semibold pl-5 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#00A896]" />
                              +{pkg.testsIncluded.length - 5} more parameters
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                    
                    {/* Action Button */}
                    <Button 
                      onClick={scrollToContact}
                      className="w-full h-12 text-xs sm:text-sm font-bold rounded-[18px] btn-primary active:scale-[0.98] transition-all shadow-xs hover:shadow-md"
                    >
                      <span>Book Package Now</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </Button>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          {/* Individual Tests Tab */}
          <TabsContent value="tests" className="mt-0">
            {/* Search & Category Filter Strip */}
            <div className="flex flex-col sm:flex-row gap-2.5 mb-6 items-stretch sm:items-center justify-between bg-white p-3.5 sm:p-4 rounded-[22px] border border-black/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
              {/* Search Field */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Filter 100+ tests by name (e.g. CBC, Vitamin, Thyroid)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-11 rounded-[16px] border border-slate-200 bg-slate-50 text-base sm:text-sm focus:border-[#0A6E5C] shadow-2xs font-medium"
                />
              </div>
              
              {/* Category Filter Pills */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 pt-0.5 w-full max-w-full scrollbar-none items-center">
                {categories.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`h-8 sm:h-9 px-3.5 rounded-full text-[11px] sm:text-xs font-bold transition-all whitespace-nowrap active:scale-95 border cursor-pointer inline-flex items-center shadow-2xs ${
                        isSelected 
                          ? 'bg-[#072448] text-white border-transparent shadow-xs' 
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-transparent'
                      }`}
                    >
                      {cat.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tests Grid */}
            <div className="fluid-grid-cards-sm">
              {filteredTests.map((test) => (
                <TestCard key={test.id} test={test} />
              ))}
            </div>

            {filteredTests.length === 0 && (
              <div className="text-center py-12 bg-white rounded-[24px] border border-black/[0.06] p-6 max-w-md mx-auto">
                <TestTube className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <h4 className="font-bold text-slate-800 text-sm mb-1">No Tests Found</h4>
                <p className="text-xs text-slate-500 mb-3">We couldn't find any test matching "{searchQuery}". Call our 24*7 desk for custom panels.</p>
                <Button 
                  size="sm"
                  onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                  variant="outline"
                  className="rounded-full text-xs"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
