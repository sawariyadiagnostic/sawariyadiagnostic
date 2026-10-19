import Fuse from 'fuse.js';
import { medicalTests, type MedicalTest } from '../data/publishedCatalog';
import { clinicalPanels, getPanelsForTest } from '../data/clinicalPanelManifest';

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
  panels?: string[];
  keywords?: string[];
  homeCollection: boolean;
  popular?: boolean;
  specimen?: string;
  method?: string;
  preparation?: string;
  turnaround?: string;
}

export const UPDATED_SYMPTOM_MAP: Record<string, string[]> = {
  // Core Clinical Symptoms & Manifestations
  fatigue: ['web-001', 'web-064', 'web-065', 'web-050', 'web-043', 'web-041', 'web-002'],
  weakness: ['web-064', 'web-065', 'web-001', 'web-041', 'web-043', 'web-002', 'web-024'],
  blood: ['web-001', 'web-002', 'web-003', 'web-004', 'web-005', 'web-006', 'web-007'],
  cbc: ['web-001', 'web-002', 'web-003', 'web-004', 'web-005', 'web-006', 'web-007'],
  hemoglobin: ['web-001', 'web-002', 'web-005'],
  anemia: ['web-001', 'web-002', 'web-041', 'web-042', 'web-043', 'web-065'],
  glucose: ['web-037', 'web-038', 'web-039', 'web-040'],
  diabetes: ['web-037', 'web-038', 'web-039', 'web-040'],
  sugar: ['web-037', 'web-038', 'web-039', 'web-040'],
  hba1c: ['web-040'],
  thyroid: ['web-050', 'web-051', 'web-052', 'web-053', 'web-054'],
  tsh: ['web-050'],
  cholesterol: ['web-030', 'web-031', 'web-032', 'web-033', 'web-034', 'web-035', 'web-036'],
  lipid: ['web-030', 'web-031', 'web-032', 'web-033', 'web-034', 'web-035', 'web-036'],
  triglycerides: ['web-034', 'web-030'],
  fever: ['web-001', 'web-007', 'web-066', 'web-070', 'web-071', 'web-072', 'web-073', 'web-074'],
  infection: ['web-001', 'web-006', 'web-007', 'web-066', 'web-070', 'web-073', 'web-074'],
  dengue: ['web-070', 'web-071', 'web-072', 'web-001', 'web-003'],
  platelet: ['web-001', 'web-003'],
  platelets: ['web-001', 'web-003'],
  typhoid: ['web-073', 'web-001'],
  widal: ['web-073'],
  malaria: ['web-074', 'web-001'],
  heart: ['web-030', 'web-044', 'web-045', 'web-046', 'web-047', 'web-034'],
  cardiac: ['web-044', 'web-045', 'web-046', 'web-047'],
  troponin: ['web-044', 'web-045'],
  joint: ['web-067', 'web-066', 'web-007', 'web-026', 'web-027'],
  joints: ['web-067', 'web-066', 'web-007', 'web-026', 'web-027'],
  arthritis: ['web-067', 'web-066', 'web-007', 'web-026'],
  gout: ['web-026', 'web-067'],
  uric: ['web-026'],
  crp: ['web-066'],
  hairfall: ['web-043', 'web-041', 'web-050', 'web-064', 'web-065', 'web-058'],
  hairloss: ['web-043', 'web-041', 'web-050', 'web-064', 'web-065', 'web-058'],
  pregnancy: ['web-059', 'web-055', 'web-056', 'web-057', 'web-060'],
  hcg: ['web-059'],
  liver: ['web-012', 'web-013', 'web-014', 'web-015', 'web-016', 'web-017', 'web-018', 'web-019', 'web-020', 'web-021', 'web-022'],
  lft: ['web-012', 'web-013', 'web-014', 'web-015', 'web-016', 'web-017', 'web-018', 'web-019', 'web-020', 'web-021', 'web-022'],
  jaundice: ['web-012', 'web-013', 'web-014', 'web-015', 'web-016', 'web-017', 'web-020'],
  bilirubin: ['web-012', 'web-013', 'web-014'],
  sgot: ['web-015'],
  sgpt: ['web-016'],
  kidney: ['web-023', 'web-024', 'web-025', 'web-026', 'web-027', 'web-028', 'web-029'],
  kft: ['web-023', 'web-024', 'web-025', 'web-026', 'web-027', 'web-028', 'web-029'],
  renal: ['web-023', 'web-024', 'web-025', 'web-026', 'web-027', 'web-028', 'web-029'],
  creatinine: ['web-025', 'web-023'],
  urea: ['web-024', 'web-023'],
  calcium: ['web-027', 'web-064', 'web-028'],
  bone: ['web-027', 'web-064', 'web-028'],
  vitamin: ['web-064', 'web-065'],
  vitamins: ['web-064', 'web-065'],
  b12: ['web-065'],
  iron: ['web-041', 'web-042', 'web-043', 'web-001', 'web-002'],
  ferritin: ['web-043'],
  allergy: ['web-068', 'web-001', 'web-004'],
  ige: ['web-068'],
  eosinophil: ['web-004', 'web-001'],
  pcod: ['web-055', 'web-056', 'web-058', 'web-057', 'web-060', 'web-061'],
  pcos: ['web-055', 'web-056', 'web-058', 'web-057', 'web-060', 'web-061'],
  fertility: ['web-055', 'web-056', 'web-057', 'web-058', 'web-060', 'web-061', 'web-059'],
  hormone: ['web-050', 'web-051', 'web-052', 'web-053', 'web-054', 'web-055', 'web-056', 'web-057', 'web-058', 'web-060', 'web-061'],
  amh: ['web-060'],
  prolactin: ['web-057'],
  testosterone: ['web-058'],
  prostate: ['web-062', 'web-058'],
  psa: ['web-062'],
  clotting: ['web-009', 'web-010', 'web-011'],
  coagulation: ['web-009', 'web-010', 'web-011'],
  pt: ['web-009'],
  inr: ['web-009'],
  aptt: ['web-010'],
  pancreas: ['web-048', 'web-049'],
  amylase: ['web-048'],
  lipase: ['web-049'],
  celiac: ['web-069'],
  gluten: ['web-069'],
  swelling: ['web-025', 'web-024', 'web-020', 'web-066', 'web-067'],
  edema: ['web-025', 'web-024', 'web-020', 'web-066'],

  // Hindi Vernacular & Transliterations (Haryana / NCR Patients)
  khoon: ['web-001', 'web-002', 'web-003', 'web-004', 'web-005', 'web-006', 'web-007'],
  piliya: ['web-012', 'web-013', 'web-014', 'web-015', 'web-016', 'web-017', 'web-020'],
  peeliya: ['web-012', 'web-013', 'web-014', 'web-015', 'web-016', 'web-017', 'web-020'],
  gathiya: ['web-067', 'web-066', 'web-026', 'web-007'],
  jodo: ['web-067', 'web-066', 'web-026', 'web-027'],
  ghutno: ['web-067', 'web-066', 'web-026', 'web-027'],
  bukhar: ['web-001', 'web-007', 'web-066', 'web-070', 'web-071', 'web-072', 'web-073', 'web-074'],
  dengu: ['web-070', 'web-071', 'web-072', 'web-001', 'web-003'],
  maleria: ['web-074', 'web-001'],
  motijhara: ['web-073', 'web-001'],
  peshab: ['web-023', 'web-024', 'web-025', 'web-026', 'web-062', 'web-037'],
  gurde: ['web-023', 'web-024', 'web-025', 'web-026', 'web-027', 'web-028', 'web-029'],
  kamzori: ['web-064', 'web-065', 'web-001', 'web-041', 'web-043', 'web-002'],
  thakan: ['web-064', 'web-065', 'web-001', 'web-041', 'web-043', 'web-050'],
  chakkar: ['web-001', 'web-002', 'web-041', 'web-064', 'web-065'],
  haddi: ['web-027', 'web-064', 'web-028'],
  mahawari: ['web-055', 'web-056', 'web-057', 'web-058', 'web-060', 'web-061'],
  masik: ['web-055', 'web-056', 'web-057', 'web-058', 'web-060', 'web-061'],
  periods: ['web-055', 'web-056', 'web-057', 'web-058', 'web-060', 'web-061'],
  baal: ['web-043', 'web-041', 'web-050', 'web-064', 'web-065', 'web-058'],
  sujan: ['web-025', 'web-024', 'web-020', 'web-066', 'web-067'],
  shakar: ['web-037', 'web-038', 'web-039', 'web-040'],
  madhumeh: ['web-037', 'web-038', 'web-039', 'web-040'],
  seene: ['web-030', 'web-044', 'web-045', 'web-046', 'web-047'],
  dil: ['web-030', 'web-044', 'web-045', 'web-046', 'web-047'],
  khujli: ['web-068', 'web-001', 'web-004'],
  allerji: ['web-068', 'web-001', 'web-004'],
  thakka: ['web-009', 'web-010', 'web-011'],
};

export function buildSearchIndex(tests: MedicalTest[]): SearchableItem[] {
  return tests.map((test) => {
    const parentPanels = getPanelsForTest(test.id);
    const panelNames = parentPanels.flatMap((p) => [p.name, p.hindiName]);
    const panelKeywords = parentPanels.flatMap((p) => p.keywords);

    const testLowerId = test.id.toLowerCase();
    const testLowerName = test.name.toLowerCase();
    const testLowerDesc = test.description.toLowerCase();

    const symptoms = Object.entries(UPDATED_SYMPTOM_MAP)
      .filter(([symptom, ids]) =>
        ids.some((id) => id.toLowerCase() === testLowerId) ||
        testLowerDesc.includes(symptom) ||
        testLowerName.includes(symptom)
      )
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
      panels: panelNames,
      keywords: panelKeywords,
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
      { name: 'name', weight: 0.35 },
      { name: 'parameters', weight: 0.20 },
      { name: 'panels', weight: 0.15 },
      { name: 'symptoms', weight: 0.15 },
      { name: 'keywords', weight: 0.10 },
      { name: 'category', weight: 0.05 },
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

// -----------------------------------------------------------------------------
// SEMANTIC CONVERSATIONAL & PHONETIC SYNONYM DICTIONARY FOR HERO SEARCH
// -----------------------------------------------------------------------------

export interface SemanticSearchResult {
  type: 'panel' | 'test';
  id: string;
  name: string;
  hindiName?: string;
  subtitle: string;
  price: number;
  parameterCount?: number;
  matchReason: string;
  tab: 'panels' | 'tests';
}

export const SEMANTIC_SYNONYM_REPLACEMENTS: Record<string, string[]> = {
  // Fatigue / Weakness / Energy
  tiredness: ['fatigue', 'weakness'],
  exhaustion: ['fatigue', 'weakness'],
  lethargy: ['fatigue', 'weakness', 'thyroid'],
  sleepy: ['fatigue', 'thyroid'],
  drowsy: ['fatigue', 'diabetes'],

  // Liver / Jaundice / Digestion
  jaundis: ['jaundice', 'piliya', 'liver'],
  peelya: ['jaundice', 'piliya', 'liver'],
  'yellow eyes': ['jaundice', 'bilirubin', 'liver'],
  'yellow urine': ['jaundice', 'bilirubin', 'liver'],
  'fatty liver': ['liver', 'lft', 'lipid'],
  alcohol: ['liver', 'lft', 'sgpt', 'sgot', 'ggt'],
  digestion: ['liver', 'lft', 'pancreas'],

  // Sugar / Diabetes / Insulin
  diabetis: ['diabetes', 'sugar', 'glucose', 'hba1c'],
  diabatic: ['diabetes', 'sugar', 'glucose', 'hba1c'],
  shakar: ['diabetes', 'sugar', 'glucose'],
  'sweet urine': ['diabetes', 'sugar', 'glucose'],
  thirst: ['diabetes', 'sugar'],
  polyuria: ['diabetes', 'sugar'],

  // Kidney / Creatinine / Swelling
  creatin: ['creatinine', 'kidney', 'kft'],
  createnine: ['creatinine', 'kidney', 'kft'],
  gurda: ['kidney', 'kft', 'renal'],
  'swollen feet': ['swelling', 'edema', 'kidney', 'kft'],
  'swollen legs': ['swelling', 'edema', 'kidney', 'kft'],
  'swollen face': ['swelling', 'edema', 'kidney', 'kft'],
  'face swelling': ['swelling', 'edema', 'kidney', 'kft'],
  'foot swelling': ['swelling', 'edema', 'kidney', 'kft'],
  'burning urine': ['kidney', 'kft', 'urine'],

  // Cholesterol / Heart / Lipids
  chole: ['cholesterol', 'lipid'],
  colestrol: ['cholesterol', 'lipid'],
  cholestrol: ['cholesterol', 'lipid'],
  bp: ['lipid', 'heart', 'cardiac'],
  'high bp': ['lipid', 'kidney'],
  hypertension: ['lipid', 'kidney', 'heart'],
  'chest pain': ['heart', 'cardiac', 'troponin', 'lipid'],
  'heart attack': ['heart', 'cardiac', 'troponin'],
  dhadkan: ['heart', 'cardiac', 'thyroid'],

  // Thyroid / Metabolism / Neck
  thryoid: ['thyroid', 'tsh'],
  thyrod: ['thyroid', 'tsh'],
  'weight gain': ['thyroid', 'pcod', 'lipid'],
  'weight loss': ['thyroid', 'diabetes', 'cbc'],
  chills: ['fever', 'thyroid', 'malaria'],
  'gale me sujan': ['thyroid'],
  gala: ['thyroid'],

  // Hormones / PCOD / Female health
  periods: ['pcod', 'pcos', 'mahawari', 'hormone'],
  'irregular periods': ['pcod', 'pcos', 'mahawari'],
  'masik dharm': ['pcod', 'pcos', 'mahawari'],
  'facial hair': ['pcod', 'pcos', 'testosterone'],
  'chehre pe baal': ['pcod', 'pcos', 'testosterone'],
  infertility: ['pcod', 'amh', 'fsh', 'lh', 'fertility'],
  nissantaan: ['pcod', 'amh', 'fertility'],
  harmone: ['hormone', 'thyroid', 'pcod', 'testosterone'],

  // Joint / Arthritis / Pain
  gathia: ['gathiya', 'arthritis', 'uric acid', 'ra factor'],
  'knee pain': ['joint', 'joints', 'arthritis', 'gathiya', 'uric acid'],
  'ghutno ka dard': ['joint', 'joints', 'arthritis', 'gathiya'],
  'jodo ka dard': ['joint', 'joints', 'arthritis', 'gathiya'],
  'morning stiffness': ['arthritis', 'gathiya', 'crp', 'ra factor'],
  uricacid: ['uric acid', 'gout', 'arthritis'],

  // Fever / Infections / Seasonal
  shivering: ['fever', 'bukhar', 'malaria'],
  'thand lagna': ['fever', 'bukhar', 'malaria'],
  dengu: ['dengue', 'platelet', 'cbc'],
  maleria: ['malaria', 'fever'],
  motijhara: ['typhoid', 'widal', 'fever'],
  tyfoid: ['typhoid', 'widal'],
  'low platelets': ['platelet', 'cbc', 'dengue'],
  platlet: ['platelet', 'cbc'],
  platelets: ['platelet', 'cbc'],
  haemoglobin: ['hemoglobin', 'cbc', 'anemia', 'khoon'],
  hemo: ['hemoglobin', 'cbc', 'khoon'],
  'blood count': ['cbc', 'hemogram', 'blood', 'khoon'],

  // Vitamins / Bone / Tingling
  vitamn: ['vitamin', 'vitamins'],
  vitamen: ['vitamin', 'vitamins'],
  sunlight: ['vitamin', 'd3'],
  'nerve pain': ['b12', 'vitamin'],
  tingling: ['b12', 'vitamin'],
  numbness: ['b12', 'vitamin'],
  'haddiyo me dard': ['calcium', 'vitamin', 'bone'],

  // Hair / Iron / Ferritin
  'hair fall': ['hairfall', 'iron', 'ferritin', 'thyroid', 'b12'],
  'hair loss': ['hairfall', 'iron', 'ferritin', 'thyroid'],
  'baal girna': ['hairfall', 'iron', 'thyroid'],
  'baal jhadna': ['hairfall', 'iron', 'thyroid'],

  // Prostate / Men's Health
  prostet: ['prostate', 'psa'],
  'urine blockage': ['prostate', 'psa', 'kidney'],
  'night urination': ['prostate', 'diabetes', 'kidney'],
  purush: ['prostate', 'testosterone'],

  // Growth / Height
  'short height': ['growth hormone', 'gh'],
  height: ['growth hormone', 'gh'],
  kad: ['growth hormone', 'gh'],
  lambai: ['growth hormone', 'gh'],

  // Allergy
  itching: ['allergy', 'ige', 'khujli'],
  khujli: ['allergy', 'ige'],
  sneezing: ['allergy', 'ige'],
  allerji: ['allergy', 'ige'],
  rash: ['allergy', 'ige'],

  // Abdominal / Pancreas / Gluten
  'stomach pain': ['amylase', 'lipase', 'pancreas', 'liver'],
  'loose motions': ['celiac', 'gluten', 'dast'],
  'wheat allergy': ['celiac', 'gluten'],
  gehun: ['celiac', 'gluten'],

  // Coagulation / Surgery
  'blood thinner': ['coagulation', 'clotting', 'pt', 'inr'],
  surgery: ['coagulation', 'clotting', 'pt', 'inr', 'cbc'],
  operation: ['coagulation', 'clotting', 'pt', 'inr', 'cbc'],
  bruising: ['coagulation', 'clotting', 'platelet'],

  // Pregnancy
  pregnancy: ['pregnancy', 'hcg', 'fertility'],
  garbh: ['pregnancy', 'hcg'],
  garbhavastha: ['pregnancy', 'hcg'],
};

export function detectBestCatalogTab(query: string): 'panels' | 'tests' {
  const q = query.toLowerCase().trim();
  if (!q) return 'panels';

  // Explicit panel words always route to panels
  const explicitPanelWords = [
    'panel', 'profile', 'package', 'checkup', 'full body',
    'lft', 'kft', 'rft', 'pcod', 'pcos', 'tft', 'ascvd',
    'hemogram', 'sugar panel', 'diabetic panel'
  ];

  if (explicitPanelWords.some((indicator) => q.includes(indicator))) {
    return 'panels';
  }

  // If query directly matches an individual test name, route to tests
  const testMatch = medicalTests.some(
    (t) => t.name.toLowerCase().includes(q) || t.id.toLowerCase() === q
  );
  if (testMatch) {
    return 'tests';
  }

  // Check if any panel has a direct match on its name or keywords
  const panelMatches = clinicalPanels.some(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.hindiName.toLowerCase().includes(q) ||
      p.keywords.some((k) => k.toLowerCase() === q)
  );

  return panelMatches ? 'panels' : 'tests';
}

export function searchSemanticCatalog(query: string, limit = 6): SemanticSearchResult[] {
  const rawQ = query.toLowerCase().trim();
  if (!rawQ) return [];

  // Expand query with semantic synonyms
  const termsToSearch = new Set<string>([rawQ]);
  for (const [key, replacements] of Object.entries(SEMANTIC_SYNONYM_REPLACEMENTS)) {
    if (rawQ.includes(key) || key.includes(rawQ)) {
      for (const r of replacements) termsToSearch.add(r);
    }
  }

  const results: SemanticSearchResult[] = [];
  const seenIds = new Set<string>();

  // 1. Search Clinical Health Profiles
  for (const panel of clinicalPanels) {
    const pName = panel.name.toLowerCase();
    const pHindi = panel.hindiName.toLowerCase();
    const pKeywords = panel.keywords.map((k) => k.toLowerCase());
    const pParams = panel.parameters.map((param) => param.toLowerCase());

    let matchScore = 0;
    let reason = '';

    for (const term of termsToSearch) {
      if (pName.includes(term) || pHindi.includes(term)) {
        matchScore = Math.max(matchScore, 100);
        reason = 'Clinical Profile Match';
      } else if (pKeywords.some((k) => k === term || k.includes(term))) {
        matchScore = Math.max(matchScore, 85);
        reason = `Condition Match (${term})`;
      } else if (pParams.some((param) => param.includes(term))) {
        matchScore = Math.max(matchScore, 70);
        reason = `Includes Parameter (${term})`;
      }
    }

    if (matchScore > 0 && !seenIds.has(panel.id)) {
      seenIds.add(panel.id);
      results.push({
        type: 'panel',
        id: panel.id,
        name: panel.name,
        hindiName: panel.hindiName,
        subtitle: `${panel.parameters.length} Parameters • 1 Single Needle Prick • ${panel.turnaroundEstimate}`,
        price: panel.transparentPrice,
        parameterCount: panel.parameters.length,
        matchReason: reason,
        tab: 'panels',
      });
    }
  }

  // 2. Search Individual Tests using Fuse engine
  const defaultIndex = buildSearchIndex(medicalTests);
  const searchEngine = createSearchEngine(defaultIndex);

  // Search each expanded term
  for (const term of termsToSearch) {
    const testMatches = searchEngine.search(term);
    for (const item of testMatches) {
      if (!seenIds.has(item.id)) {
        seenIds.add(item.id);
        const test = medicalTests.find((t) => t.id === item.id);
        results.push({
          type: 'test',
          id: item.id,
          name: item.name,
          subtitle: test?.specimen || `${item.category.toUpperCase()} Laboratory Analyte`,
          price: item.price,
          parameterCount: item.parameters?.length || 1,
          matchReason: term === rawQ ? 'Direct Test Match' : `Related to "${term}"`,
          tab: 'tests',
        });
      }
      if (results.length >= limit * 2) break;
    }
  }

  return results.slice(0, limit);
}
