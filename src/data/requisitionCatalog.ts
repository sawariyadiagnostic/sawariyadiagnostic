import { medicalTests } from './publishedCatalog';
import type { PathologyDepartment, RequisitionCatalogTest, RequisitionManifest, RequisitionTestMeta } from '../types/requisition';

const baseMeta: RequisitionTestMeta = {
  department: 'BIOCHEMISTRY',
  aliases: [],
  fastingHours: 0,
  timing: 'ANYTIME',
  sampleGroup: 'Serum / Gold-top tube',
  preparation: 'No special preparation stated; confirm with the lab when scheduling.',
};

const metaById: Record<string, Partial<RequisitionTestMeta>> = {
  'web-001': { department: 'HEMATOLOGY', aliases: ['cbc', 'hemogram', 'hb', 'platelets'], sampleGroup: 'Whole blood / EDTA tube' },
  'web-002': { department: 'HEMATOLOGY', aliases: ['hb', 'hemoglobin'], sampleGroup: 'Whole blood / EDTA tube' },
  'web-003': { department: 'HEMATOLOGY', aliases: ['platelet', 'platelets', 'dengue platelets'], sampleGroup: 'Whole blood / EDTA tube' },
  'web-007': { department: 'HEMATOLOGY', aliases: ['esr', 'sed rate'], sampleGroup: 'Whole blood / EDTA tube' },
  'web-008': { department: 'HEMATOLOGY', aliases: ['blood group', 'rh factor'], sampleGroup: 'Whole blood / EDTA tube' },
  'web-009': { department: 'HEMATOLOGY', aliases: ['pt', 'inr', 'coagulation'], sampleGroup: 'Citrate plasma / blue-top tube' },
  'web-023': { department: 'BIOCHEMISTRY', aliases: ['bun', 'kidney', 'urea'] },
  'web-024': { department: 'BIOCHEMISTRY', aliases: ['urea', 'kidney'] },
  'web-025': { department: 'BIOCHEMISTRY', aliases: ['creatinine', 'kidney', 'egfr'] },
  'web-026': { department: 'BIOCHEMISTRY', aliases: ['uric acid', 'gout'] },
  'web-030': { department: 'LIPIDS_CARDIAC', aliases: ['cholesterol', 'lipid profile', 'lipids'], fastingHours: 12, timing: 'MORNING', preparation: 'Follow the doctor or lab instruction if this is part of a lipid work-up.' },
  'web-031': { department: 'LIPIDS_CARDIAC', aliases: ['hdl', 'good cholesterol'] },
  'web-032': { department: 'LIPIDS_CARDIAC', aliases: ['ldl', 'bad cholesterol'] },
  'web-034': { department: 'LIPIDS_CARDIAC', aliases: ['triglycerides', 'lipids'], fastingHours: 12, timing: 'MORNING' },
  'web-037': { department: 'METABOLIC_DIABETES', aliases: ['fbs', 'fasting sugar', 'blood sugar', 'glucose'], fastingHours: 10, timing: 'MORNING', sampleGroup: 'Fluoride plasma / grey-top tube', preparation: 'Doctor/lab fasting instructions apply; plain water may be permitted.' },
  'web-038': { department: 'METABOLIC_DIABETES', aliases: ['ppbs', 'pp sugar', 'after food sugar', 'post meal'], timing: 'POST_MEAL', sampleGroup: 'Fluoride plasma / grey-top tube', preparation: 'The draw is timed after the meal; confirm the exact schedule with the lab.' },
  'web-039': { department: 'METABOLIC_DIABETES', aliases: ['rbs', 'random sugar', 'glucose'], sampleGroup: 'Fluoride plasma / grey-top tube' },
  'web-040': { department: 'METABOLIC_DIABETES', aliases: ['hba1c', 'three month sugar', 'glycated hemoglobin'], sampleGroup: 'Whole blood / EDTA tube' },
  'web-050': { department: 'THYROID_HORMONES', aliases: ['tsh', 'thyroid'], timing: 'MORNING', preparation: 'If prescribed thyroid medicine, ask the lab or doctor whether to take it after collection.' },
  'web-051': { department: 'THYROID_HORMONES', aliases: ['t3', 'thyroid'], timing: 'MORNING' },
  'web-052': { department: 'THYROID_HORMONES', aliases: ['t4', 'thyroxine', 'thyroid'], timing: 'MORNING' },
  'web-053': { department: 'THYROID_HORMONES', aliases: ['free t3', 'thyroid'] },
  'web-054': { department: 'THYROID_HORMONES', aliases: ['free t4', 'thyroid'] },
  'web-064': { department: 'THYROID_HORMONES', aliases: ['vitamin d', 'vit d', 'bone health'] },
  'web-065': { department: 'THYROID_HORMONES', aliases: ['vitamin b12', 'b12', 'cobalamin'] },
  'web-066': { department: 'SEROLOGY_INFECTIONS', aliases: ['crp', 'inflammation', 'infection'] },
  'web-067': { department: 'SEROLOGY_INFECTIONS', aliases: ['ra factor', 'arthritis', 'rheumatoid'] },
  'web-070': { department: 'SEROLOGY_INFECTIONS', aliases: ['dengue ns1', 'dengue', 'fever'] },
  'web-071': { department: 'SEROLOGY_INFECTIONS', aliases: ['dengue igg', 'dengue', 'fever'] },
  'web-072': { department: 'SEROLOGY_INFECTIONS', aliases: ['dengue igm', 'dengue', 'fever'] },
  'web-073': { department: 'SEROLOGY_INFECTIONS', aliases: ['widal', 'typhoid', 'fever'] },
  'web-074': { department: 'SEROLOGY_INFECTIONS', aliases: ['malaria', 'fever'] },
};

export const requisitionTests: RequisitionCatalogTest[] = medicalTests.map((test) => ({
  ...test,
  ...baseMeta,
  ...metaById[test.id],
  aliases: [...(test.parameters || []), ...(metaById[test.id]?.aliases || [])],
}));

export const departmentOptions: { id: PathologyDepartment; label: string }[] = [
  { id: 'ALL', label: 'All tests' },
  { id: 'HEMATOLOGY', label: 'Hematology' },
  { id: 'BIOCHEMISTRY', label: 'Biochemistry & organs' },
  { id: 'METABOLIC_DIABETES', label: 'Diabetes & sugar' },
  { id: 'LIPIDS_CARDIAC', label: 'Lipids & cardiac' },
  { id: 'THYROID_HORMONES', label: 'Thyroid & vitamins' },
  { id: 'SEROLOGY_INFECTIONS', label: 'Serology & infections' },
];

export function compileRequisitionManifest(selectedTests: RequisitionCatalogTest[]): RequisitionManifest {
  const subtotal = selectedTests.reduce((sum, test) => sum + test.price, 0);
  const collectionFee = subtotal === 0 ? 0 : subtotal < 350 ? 100 : subtotal < 800 ? 50 : 0;
  const fastingHours = Math.max(0, ...selectedTests.map((test) => test.fastingHours));
  const hasTwoStageCollection = selectedTests.some((test) => test.id === 'web-037') && selectedTests.some((test) => test.id === 'web-038');
  const hasMorningDraw = selectedTests.some((test) => test.timing === 'MORNING');
  const hasPostMealDraw = selectedTests.some((test) => test.timing === 'POST_MEAL');
  const sampleGroups = [...new Set(selectedTests.map((test) => test.sampleGroup))].map((label) => ({ label, count: selectedTests.filter((test) => test.sampleGroup === label).length }));
  const preparationNotes = [...new Set(selectedTests.map((test) => test.preparation))];

  let timingNotice = 'Confirm the collection window with the lab before dispatch.';
  if (hasTwoStageCollection) timingNotice = 'Two-stage collection may be required: fasting draw followed by a timed post-meal draw. Confirm the appointment with the lab.';
  else if (hasPostMealDraw) timingNotice = 'Post-meal timing applies to one selected test. The lab will confirm the second collection time.';
  else if (hasMorningDraw || fastingHours > 0) timingNotice = 'Morning collection may be needed for the selected preparation or timing rules. Confirm before booking.';

  return {
    subtotal,
    collectionFee,
    total: subtotal + collectionFee,
    amountToFreeCollection: Math.max(0, 800 - subtotal),
    isFastingRequired: fastingHours > 0,
    fastingHours,
    hasTwoStageCollection,
    timingNotice,
    sampleGroups,
    preparationNotes,
  };
}
