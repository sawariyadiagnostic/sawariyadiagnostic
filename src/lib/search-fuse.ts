import Fuse from 'fuse.js';
import type { MedicalTest, HealthPackage } from '@/data/publishedCatalog';

export interface SearchableItem {
  id: string;
  type: 'test' | 'package';
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
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
 fertility: ['semen-analysis', 'amh', 'fsh', 'lh', 'prl', 'testo-total'],
};
// Update symptom map to use published catalog stable_ids
const UPDATED_SYMPTOM_MAP: Record<string, string[]> = {
  fatigue: ['WEB-001', 'WEB-064', 'WEB-065', 'WEB-050', 'WEB-043', 'WEB-041'],
  fever: ['WEB-001', 'WEB-007', 'WEB-066', 'WEB-039'],
  sugar: ['WEB-040', 'WEB-005'],
  diabetes: ['WEB-040', 'WEB-005'],
  thyroid: ['WEB-050', 'WEB-053', 'WEB-054', 'WEB-051', 'WEB-052'],
  cholesterol: ['WEB-030', 'WEB-031', 'WEB-032', 'WEB-033', 'WEB-034', 'WEB-035', 'WEB-036'],
  heart: ['WEB-030', 'WEB-044', 'WEB-045', 'WEB-047'],
  joint: ['WEB-067', 'WEB-066', 'WEB-007', 'WEB-064', 'WEB-069'],
  hairfall: ['WEB-043', 'WEB-041', 'WEB-050', 'WEB-064', 'WEB-065', 'WEB-058'],
  pregnancy: ['WEB-059', 'WEB-055', 'WEB-056', 'WEB-057', 'WEB-060'],
  liver: ['WEB-020', 'WEB-021', 'WEB-015', 'WEB-016', 'WEB-017', 'WEB-018', 'WEB-019', 'WEB-022'],
  kidney: ['WEB-023', 'WEB-024', 'WEB-025', 'WEB-026', 'WEB-027', 'WEB-028', 'WEB-029'],
  allergy: ['WEB-068', 'WEB-001'],
  weakness: ['WEB-064', 'WEB-065', 'WEB-001', 'WEB-041', 'WEB-043'],
  pcos: ['WEB-055', 'WEB-056', 'WEB-058', 'WEB-057', 'WEB-060', 'WEB-061'],
  fertility: ['WEB-035', 'WEB-060', 'WEB-055', 'WEB-056', 'WEB-057', 'WEB-058'],
};

// Update symptom map to use published catalog stable_ids
export function buildSearchIndex(tests: MedicalTest[], packages: HealthPackage[]): SearchableItem[] {
  const items: SearchableItem[] = [];

  // Add tests
    for (const t of tests) {
      // Find matching symptoms
      const symptoms: string[] = [];
      for (const [sym, testIds] of Object.entries(UPDATED_SYMPTOM_MAP)) {
        if (testIds.includes(t.id) || t.description?.toLowerCase().includes(sym) || t.name.toLowerCase().includes(sym)) {
          symptoms.push(sym);
        }
      }

      items.push({
      id: t.id,
      type: 'test',
      name: t.name,
      category: t.category,
      price: t.price,
      originalPrice: t.price,
      description: t.description,
      parameters: t.parameters || [],
      symptoms,
      homeCollection: false,
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
      originalPrice: p.price,
      description: p.description,
      parameters: p.testsIncluded,
      symptoms: ['full body', 'checkup', 'preventive', 'wellness'],
      homeCollection: false,
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
