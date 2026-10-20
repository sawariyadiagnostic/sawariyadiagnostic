import type { MedicalTest } from '@/data/publishedCatalog';

export interface ParameterScope {
  isMultiParameter: boolean;
  count: number;
  label: string;
  preview: string;
}

/**
 * Standard clinical parameters for multi-analyte investigations.
 */
export const MULTI_PARAMETER_LOOKUP: Record<string, string[]> = {
  'web-001': [
    'Hemoglobin (Hb)',
    'Total Leukocyte Count (TLC / WBC)',
    'Neutrophils (%)',
    'Lymphocytes (%)',
    'Eosinophils (%)',
    'Monocytes (%)',
    'Basophils (%)',
    'Absolute Neutrophil Count (ANC)',
    'Absolute Lymphocyte Count (ALC)',
    'Absolute Eosinophil Count (AEC)',
    'Red Blood Cell Count (RBC)',
    'Packed Cell Volume (PCV / Hematocrit)',
    'Mean Corpuscular Volume (MCV)',
    'Mean Corpuscular Hemoglobin (MCH)',
    'Mean Corpuscular Hemoglobin Concentration (MCHC)',
    'Platelet Count',
  ],
  'web-008': [
    'ABO Blood Grouping (Forward & Reverse)',
    'Rh (D) Factor Typing',
  ],
  'web-009': [
    'Prothrombin Time (Patient Time in Seconds)',
    'Control Time',
    'International Normalized Ratio (INR)',
  ],
  'web-011': [
    'Bleeding Time (Duke Method)',
    'Clotting Time (Capillary Tube)',
  ],
  'web-073': [
    "Salmonella Typhi 'O' Antigen Titer",
    "Salmonella Typhi 'H' Antigen Titer",
    "Salmonella Paratyphi 'AH' Antigen Titer",
    "Salmonella Paratyphi 'BH' Antigen Titer",
  ],
  'web-074': [
    'Plasmodium falciparum (Pf-HRP2) Antigen',
    'Plasmodium vivax (Pan-pLDH) Antigen',
    'Peripheral Blood Smear Parasite Examination',
  ],
};

/**
 * Returns the list of constituent diagnostic parameters for a test.
 */
export function getTestParameters(test: MedicalTest): string[] {
  if (MULTI_PARAMETER_LOOKUP[test.id]) {
    return MULTI_PARAMETER_LOOKUP[test.id];
  }
  if (test.parameters && test.parameters.length > 1) {
    return test.parameters;
  }
  return test.parameters && test.parameters.length === 1 ? test.parameters : [test.name];
}

/**
 * Evaluates parameter scope and provides compact preview metadata for test cards.
 */
export function getTestParameterScope(test: MedicalTest): ParameterScope {
  const params = getTestParameters(test);
  const count = params.length;

  if (count > 1) {
    const preview = params.slice(0, 3).join(' • ') + (count > 3 ? ` (+${count - 3})` : '');
    return {
      isMultiParameter: true,
      count,
      label: `${count} Parameters`,
      preview,
    };
  }

  return {
    isMultiParameter: false,
    count: 1,
    label: 'Single Analyte',
    preview: 'Standardized In-House Photometry / CLIA',
  };
}

/**
 * Returns compliant operational turnaround time estimates.
 */
export function getTestTurnaround(test: MedicalTest): string {
  if (test.turnaround && test.turnaround !== 'Confirm with the lab') {
    return test.turnaround;
  }

  const name = test.name.toLowerCase();

  // CLIA Immunoassays & Hormones
  if (
    name.includes('vitamin') ||
    name.includes('ferritin') ||
    name.includes('amh') ||
    name.includes('hormone') ||
    name.includes('estradiol') ||
    name.includes('prolactin') ||
    name.includes('testosterone') ||
    name.includes('thyroid') ||
    name.includes('tsh') ||
    name.includes('t3') ||
    name.includes('t4') ||
    name.includes('psa') ||
    name.includes('ige') ||
    name.includes('ca 19.9') ||
    name.includes('ttg')
  ) {
    return 'TAT: 12 Hours';
  }

  // Coagulation & Rapid Serology
  if (
    name.includes('pt / inr') ||
    name.includes('aptt') ||
    name.includes('bt / ct') ||
    name.includes('dengue') ||
    name.includes('malaria') ||
    name.includes('widal') ||
    name.includes('troponin') ||
    name.includes('ck-mb')
  ) {
    return 'TAT: 4 Hours';
  }

  // Routine Hematology & Biochemistry
  return 'TAT: 4–6 Hours';
}
