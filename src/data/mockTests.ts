export interface MedicalTest {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  turnaroundTime: string;
  category: 'blood' | 'hormone' | 'specialized' | 'package';
  parameters?: string[];
  homeCollection: boolean;
  popular?: boolean;
}

export interface HealthPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  testsIncluded: string[];
  recommended: boolean;
}

export const medicalTests: MedicalTest[] = [
  {
    id: 'cbc',
    name: 'Complete Blood Count (CBC)',
    description: 'Comprehensive analysis of blood cells including RBC, WBC, platelets, and hemoglobin levels.',
    price: 299,
    originalPrice: 499,
    turnaroundTime: '4-6 hours',
    category: 'blood',
    parameters: ['RBC Count', 'WBC Count', 'Hemoglobin', 'Platelet Count', 'Hematocrit'],
    homeCollection: true,
    popular: true,
  },
  {
    id: 'lipid',
    name: 'Lipid Profile',
    description: 'Complete cholesterol assessment including HDL, LDL, triglycerides, and total cholesterol.',
    price: 499,
    originalPrice: 699,
    turnaroundTime: '4-6 hours',
    category: 'blood',
    parameters: ['Total Cholesterol', 'HDL', 'LDL', 'Triglycerides', 'VLDL'],
    homeCollection: true,
    popular: true,
  },
  {
    id: 'thyroid',
    name: 'Thyroid Profile (T3, T4, TSH)',
    description: 'Complete thyroid function test to assess thyroid health and hormone levels.',
    price: 399,
    originalPrice: 899,
    turnaroundTime: '8-10 hours',
    category: 'hormone',
    parameters: ['T3', 'T4', 'TSH'],
    homeCollection: true,
    popular: true,
  },
  {
    id: 'fsh',
    name: 'FSH',
    description: 'Follicle-stimulating hormone (FSH) is a hormone that plays a crucial role in sexual development and reproduction.',
    price: 399,
    originalPrice: 899,
    turnaroundTime: '8-10 hours',
    category: 'hormone',
    parameters: ['FSH'],
    homeCollection: true,
    popular: true,
  }, 
   {
    id: 'lh',
    name: 'LH',
    description: 'Luteinizing hormone (LH) is a hormone that plays a crucial role in sexual development and reproduction.',
    price: 499,
    originalPrice: 899,
    turnaroundTime: '8-10 hours',
    category: 'hormone',
    parameters: ['LH'],
    homeCollection: true,
    popular: true,
  },
  {
    id: 'hba1c',
    name: 'HbA1c (Glycated Hemoglobin)',
    description: 'Measures average blood sugar levels over the past 2-3 months for diabetes monitoring.',
    price: 399,
    originalPrice: 699,
    turnaroundTime: '4-6 hours',
    category: 'blood',
    parameters: ['HbA1c Percentage', 'Estimated Average Glucose'],
    homeCollection: true,
  },
  {
    id: 'vitamin-d',
    name: 'Vitamin D (25-OH)',
    description: 'Measures vitamin D levels to assess bone health and immune function.',
    price: 799,
    originalPrice: 1199,
    turnaroundTime: '8-10 hours',
    category: 'specialized',
    parameters: ['25-Hydroxy Vitamin D'],
    homeCollection: true,
    popular: true,
  },
  {
    id: 'vitamin-b12',
    name: 'Vitamin B12',
    description: 'Essential test for detecting B12 deficiency affecting energy and nerve function.',
    price: 1199,
    originalPrice: 1999,
    turnaroundTime: '24 hours',
    category: 'specialized',
    parameters: ['Vitamin B12 Level'],
    homeCollection: true,
  },
  {
    id: 'serum-insulin',
    name: 'Serum Insulin',
    description: 'Essen tial test for detecting insulin levels.',
    price: 899,
    originalPrice: 1299,
    turnaroundTime: '8-10 hours',
    category: 'specialized',
    parameters: ['Serum Insulin Level'],
    homeCollection: true,
  },
  {
    id: 'liver',
    name: 'Liver Function Test (LFT)',
    description: 'Comprehensive assessment of liver health including enzymes and bilirubin.',
    price: 599,
    originalPrice: 999,
    turnaroundTime: '12-24 hours',
    category: 'blood',
    parameters: ['SGOT', 'SGPT', 'Total Bilirubin', 'Direct Bilirubin', 'Alkaline Phosphatase', 'Total Protein', 'Globulin', 'Albumin'],
    homeCollection: true,
  },
  {
    id: 'kidney',
    name: 'Kidney Function Test (KFT)',
    description: 'Evaluates kidney health through creatinine, urea, and other markers.',
    price: 599,
    originalPrice: 999,
    turnaroundTime: '12-24 hours',
    category: 'blood',
    parameters: ['Creatinine', 'Urea', 'Uric Acid', 'BUN','Calcium','Phosphorus','Potassium','Sodium','Chloride'],
    homeCollection: true,
  },
  {
    id: 'iron',
    name: 'Iron Studies',
    description: 'Complete iron assessment for anemia diagnosis and treatment monitoring.',
    price: 699,
    originalPrice: 999,
    turnaroundTime: '8-10 hours',
    category: 'blood',
    parameters: ['Serum Iron', 'TIBC', 'Ferritin', 'Transferrin Saturation'],
    homeCollection: true,
  },
  {
    id: 'psa',
    name: 'PSA (Prostate Specific Antigen)',
    description: 'Screening test for prostate health in men over 40.',
    price: 799,
    originalPrice: 1199,
    turnaroundTime: '12-24 hours',
    category: 'specialized',
    parameters: ['Total PSA', 'Free PSA'],
    homeCollection: true,
  },
];

export const healthPackages: HealthPackage[] = [
  {
    id: 'basic',
    name: 'Basic Health Checkup',
    description: 'Essential tests for routine health monitoring. Recommended for adults under 30.',
    price: 999,
    originalPrice: 1899,
    testsIncluded: [
      'Complete Blood Count (CBC)',
      'Blood Sugar Fasting',
      'Lipid Profile',
      'Liver Function Test',
      'Kidney Function Test',
    ],
    recommended: false,
  },
  {
    id: 'comprehensive',
    name: 'Comprehensive Health Package',
    description: 'Full body checkup with 50+ parameters. Our most popular package for complete health assessment.',
    price: 1999,
    originalPrice: 4499,
    testsIncluded: [
      'Basic Health Checkup',
      'Thyroid Profile (T3, T4, TSH)',
      'Vitamin D',
      'Vitamin B12',
      'Hba1c',
      'Urine Routine',
    ],
    recommended: true,
  },
  {
    id: 'diabetes',
    name: 'Diabetes Care Package',
    description: 'Specialized package for diabetes management and monitoring.',
    price: 1499,
    originalPrice: 2999,
    testsIncluded: [
      'HbA1c',
      'Serum Insulin-Fasting',
      'Blood Sugar-Fasting',
      'Urine Routine',
      'Cholesterol',
      'Creatinine',
    ],
    recommended: false,
  },
  {
    id: 'cardiac',
    name: 'Cardiac Risk Profile',
    description: 'Complete heart health assessment with advanced cardiac markers.',
    price: 2799,
    originalPrice: 4999,
    testsIncluded: [
      'Lipid Profile',
      'hs-CRP',
      'Homocysteine',
      'Lipoprotein (a)',
      'ApoB',
    ],
    recommended: false,
  },
];

export const categories = [
  { id: 'all', name: 'All Tests' },
  { id: 'blood', name: 'Blood Tests' },
  { id: 'hormone', name: 'Hormone Tests' },
  { id: 'specialized', name: 'Specialized Tests' },
];
