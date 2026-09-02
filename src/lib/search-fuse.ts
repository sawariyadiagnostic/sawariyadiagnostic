import Fuse from 'fuse.js';
import type { MedicalTest, HealthPackage } from '@/data/mockTests';

export interface SearchableItem {
  id: string;
  type: 'test' | 'package';
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  turnaroundTime?: string;
  description: string;
  parameters?: string[];
  symptoms?: string[];
  homeCollection: boolean;
  popular?: boolean;
}

// Map of common symptoms/conditions to diagnostic tests
const SYMPTOM_MAP: Record<string, string[]> = {
  fatigue: ['cbc', 'vitamin-d', 'vitamin-b12', 'thyroid', 'ferritin', 'iron'],
  fever: ['cbc', 'esr', 'crp-quant', 'urine-analysis'],
  sugar: ['hba1c', 'diabetes'],
  diabetes: ['hba1c', 'sdl-1-3'],
  thyroid: ['thyroid', 'free-thyroid', 'sdl-1-3', 'sdl-1-2'],
  cholesterol: ['lipid', 'sdl-1-3', 'sdl-1-1'],
  heart: ['lipid', 'troponin-i', 'troponin-t', 'ck-mb'],
  joint: ['ra-quant', 'crp-quant', 'esr', 'vitamin-d', 'arthritis-immunology'],
  hairfall: ['ferritin', 'iron', 'thyroid', 'vitamin-d', 'vitamin-b12', 'testo-total'],
  pregnancy: ['beta-hcg', 'fsh', 'lh', 'prl', 'female-hormone'],
  liver: ['liver', 'sdl-1-3', 'sdl-1-1', 'sdl-1-2'],
  kidney: ['kidney', 'sdl-1-3', 'sdl-1-1', 'sdl-1-2', 'urine-analysis'],
  allergy: ['ige', 'cbc'],
  weakness: ['vitamin-d', 'vitamin-b12', 'cbc', 'iron', 'ferritin'],
  pcos: ['fsh', 'lh', 'testo-total', 'prl', 'amh', 'female-hormone'],
  fertility: ['semen-analysis', 'amh', 'fsh', 'lh', 'prl', 'testo-total']
};

export function buildSearchIndex(tests: MedicalTest[], packages: HealthPackage[]): SearchableItem[] {
  const items: SearchableItem[] = [];

  // Add tests
  for (const t of tests) {
    // Find matching symptoms
    const symptoms: string[] = [];
    for (const [sym, testIds] of Object.entries(SYMPTOM_MAP)) {
      if (testIds.includes(t.id) || t.description.toLowerCase().includes(sym) || t.name.toLowerCase().includes(sym)) {
        symptoms.push(sym);
      }
    }

    items.push({
      id: t.id,
      type: 'test',
      name: t.name,
      category: t.category,
      price: t.price,
      originalPrice: t.originalPrice,
      turnaroundTime: t.turnaroundTime,
      description: t.description,
      parameters: t.parameters || [],
      symptoms,
      homeCollection: t.homeCollection,
      popular: t.popular
    });
  }

  // Add packages
  for (const p of packages) {
    items.push({
      id: p.id,
      type: 'package',
      name: p.name,
      category: 'package',
      price: p.price,
      originalPrice: p.originalPrice,
      turnaroundTime: '12-24 hours',
      description: p.description,
      parameters: p.testsIncluded,
      symptoms: ['full body', 'checkup', 'preventive', 'wellness'],
      homeCollection: true,
      popular: p.recommended
    });
  }

  return items;
}

export function createSearchEngine(items: SearchableItem[]) {
  const options = {
    keys: [
      { name: 'name', weight: 0.4 },
      { name: 'parameters', weight: 0.25 },
      { name: 'symptoms', weight: 0.2 },
      { name: 'category', weight: 0.1 },
      { name: 'description', weight: 0.05 }
    ],
    threshold: 0.35, // Fuzzy matching tolerance
    ignoreLocation: true,
    minMatchCharLength: 2
  };

  const fuse = new Fuse(items, options);

  return {
    search: (query: string, categoryFilter?: string) => {
      let results = items;

      if (query && query.trim().length > 0) {
        results = fuse.search(query.trim()).map((r) => r.item);
      }

      if (categoryFilter && categoryFilter !== 'all') {
        if (categoryFilter === 'packages') {
          results = results.filter((i) => i.type === 'package');
        } else if (categoryFilter === 'tests') {
          results = results.filter((i) => i.type === 'test');
        } else {
          results = results.filter((i) => i.category === categoryFilter);
        }
      }

      return results;
    }
  };
}
