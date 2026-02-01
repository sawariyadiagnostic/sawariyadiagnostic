'use client';

import { useState, useMemo } from 'react';
import { Search, Package, TestTube, Check, ArrowRight } from 'lucide-react';
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
        test.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || test.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="tests" className="relative py-20 bg-secondary/30">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent-teal/10 px-4 py-2 rounded-full mb-6">
            <TestTube className="w-4 h-4 text-accent-teal" />
            <span className="text-sm font-medium text-accent-teal">Our Test Menu</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Tests & Health Packages
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our comprehensive range of diagnostic tests and specially curated health packages
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="packages" className="w-full">
          <TabsList className="w-full max-w-md mx-auto mb-8 grid grid-cols-2 h-14 bg-muted/50 p-1 rounded-full">
            <TabsTrigger 
              value="packages" 
              className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center gap-2"
            >
              <Package className="w-4 h-4" />
              Health Packages
            </TabsTrigger>
            <TabsTrigger 
              value="tests" 
              className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center gap-2"
            >
              <TestTube className="w-4 h-4" />
              Individual Tests
            </TabsTrigger>
          </TabsList>

          {/* Health Packages Tab */}
          <TabsContent value="packages" className="mt-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {healthPackages.map((pkg) => (
                <div 
                  key={pkg.id} 
                  className={`relative glass-card rounded-2xl p-6 gentle-animation hover:medical-shadow ${
                    pkg.recommended ? 'ring-2 ring-accent-teal' : ''
                  }`}
                >
                  {pkg.recommended && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent-teal text-white text-xs font-semibold px-4 py-1 rounded-full">
                      Most Popular
                    </div>
                  )}
                  
                  <h3 className="font-bold text-xl text-foreground mb-2">{pkg.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{pkg.description}</p>
                  
                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-bold text-foreground">₹{pkg.price}</span>
                    <span className="text-lg text-muted-foreground line-through">₹{pkg.originalPrice}</span>
                    <span className="text-sm font-medium text-accent-emerald">
                      {Math.round((1 - pkg.price / pkg.originalPrice) * 100)}% off
                    </span>
                  </div>
                  
                  {/* Tests Included */}
                  <div className="space-y-2 mb-6">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      What's Included:
                    </p>
                    <ul className="space-y-1.5">
                      {pkg.testsIncluded.slice(0, 5).map((test) => (
                        <li key={test} className="flex items-center gap-2 text-sm text-foreground">
                          <Check className="w-4 h-4 text-accent-emerald flex-shrink-0" />
                          {test}
                        </li>
                      ))}
                      {pkg.testsIncluded.length > 5 && (
                        <li className="text-sm text-muted-foreground pl-6">
                          +{pkg.testsIncluded.length - 5} more tests
                        </li>
                      )}
                    </ul>
                  </div>
                  
                  <Button 
                    onClick={scrollToContact}
                    className={`w-full h-12 ${pkg.recommended ? 'btn-primary' : 'btn-secondary'}`}
                  >
                    Book Package
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Individual Tests Tab */}
          <TabsContent value="tests" className="mt-0">
            {/* Search & Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search tests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 rounded-full border-2"
                />
              </div>
              
              <div className="flex gap-2 flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium gentle-animation ${
                      selectedCategory === cat.id
                        ? 'bg-accent-teal text-white'
                        : 'bg-white text-foreground hover:bg-secondary'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Tests Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTests.map((test) => (
                <TestCard key={test.id} test={test} />
              ))}
            </div>

            {filteredTests.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No tests found matching your search.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
