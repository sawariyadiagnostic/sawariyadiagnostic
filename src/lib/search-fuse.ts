import Fuse from 'fuse.js';
import type { MedicalTest } from '@/data/publishedCatalog';

export interface SearchableItem {
  id: string;
  type: 'test';
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  description: string;
  parameters?: string[];
  symptoms?: string[];
  homeCollection: boolean;
  popular?: boolean;
  specimen?: string;
  method?: string;
  preparation?: string;
  turnaround?: string;
}

const UPDATED_SYMPTOM_MAP: Record<string, string[]> = {
  fatigue: ['WEB-001', 'WEB-064', 'WEB-065', 'WEB-050', 'WEB-043', 'WEB-041'],
  blood: ['web-001', 'web-002', 'web-003', 'web-004', 'web-005', 'web-006', 'web-007'],
  glucose: ['web-037', 'web-038', 'web-039', 'web-040'],
  diabetes: ['web-037', 'web-038', 'web-039', 'web-040'],
  thyroid: ['web-050', 'web-051', 'web-052', 'web-053', 'web-054'],
  cholesterol: ['web-030', 'web-032', 'web-033'],
  lipid: ['web-030', 'web-031', 'web-032', 'web-033', 'web-034', 'web-035', 'web-036'],
  fever: ['WEB-001', 'WEB-007', 'WEB-066', 'WEB-039'],
  sugar: ['web-037', 'web-038', 'web-039', 'web-040'],
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

export function buildSearchIndex(tests: MedicalTest[]): SearchableItem[] {
  return tests.map((test) => {
    const symptoms = Object.entries(UPDATED_SYMPTOM_MAP)
      .filter(([symptom, ids]) => ids.includes(test.id) || test.description.toLowerCase().includes(symptom) || test.name.toLowerCase().includes(symptom))
      .map(([symptom]) => symptom);
    return {
      id: test.id,
      type: 'test',
      name: test.name,
      category: test.category,
      price: test.price,
      originalPrice: test.price,
      description: test.description,
      parameters: test.parameters || [],
      symptoms,
      homeCollection: test.homeCollection,
      popular: test.popular,
      specimen: test.specimen,
      method: test.method,
      preparation: test.preparation,
      turnaround: test.turnaround,
    };
  });
}

export function createSearchEngine(items: SearchableItem[]) {
  const fuse = new Fuse(items, {
    keys: [
      { name: 'name', weight: 0.4 },
      { name: 'parameters', weight: 0.25 },
      { name: 'symptoms', weight: 0.2 },
      { name: 'category', weight: 0.1 },
      { name: 'description', weight: 0.05 },
    ],
    threshold: 0.35,
    ignoreLocation: true,
    minMatchCharLength: 2,
  });

  return {
    search: (query: string, categoryFilter = 'all') => {
      let results = query.trim() ? fuse.search(query.trim()).map((result) => result.item) : items;
      if (categoryFilter !== 'all') results = results.filter((item) => item.category === categoryFilter);
      return results;
    },
  };
}
