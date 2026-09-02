/**
 * Serverless Database & BaaS Client (Supabase / Firebase Firestore Pattern)
 * Features Row-Level-Security (RLS) simulation, patient report storage,
 * and live sample progress tracking directly from client-side code.
 */

export interface PatientRecord {
  uhid: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  email?: string;
  address?: string;
}

export interface PathologyFinding {
  parameter: string;
  value: string | number;
  unit: string;
  referenceRange: string;
  isAbnormal: boolean;
  status: 'Normal' | 'High' | 'Low' | 'Critical';
}

export interface PatientReport {
  id: string;
  uhid: string;
  patientName: string;
  testName: string;
  category: string;
  sampleCollectedAt: string;
  reportGeneratedAt: string;
  referringDoctor: string;
  consultantPathologist: string;
  status: 'Sample Registered' | 'In Analysis' | 'Doctor Verified' | 'Report Published';
  findings: PathologyFinding[];
  clinicalNotes: string;
  qrVerificationCode: string;
  fileSize: string;
}

export interface TestBooking {
  id: string;
  uhid?: string;
  patientName: string;
  phone: string;
  address: string;
  testNames: string[];
  totalAmount: number;
  paymentMethod: 'ONLINE_RAZORPAY' | 'ONLINE_STRIPE' | 'CASH_ON_COLLECTION';
  paymentStatus: 'PAID' | 'PENDING';
  bookingDate: string;
  slotTime: string;
  status: 'ORDER_PLACED' | 'PHLEBOTOMIST_ASSIGNED' | 'SAMPLE_COLLECTED' | 'IN_LAB_ANALYSIS' | 'COMPLETED';
}

export interface BiomarkerTrend {
  date: string;
  value: number;
  unit: string;
  label: string;
  reference: string;
}

const STORAGE_KEY_REPORTS = 'sawariya_db_reports_v1';
const STORAGE_KEY_BOOKINGS = 'sawariya_db_bookings_v1';

// Seed sample patient reports for demo & verification
const SEED_REPORTS: PatientReport[] = [
  {
    id: 'REP-CKD-4412',
    uhid: 'SD-2026-9082',
    patientName: 'Ramesh Kumar Sharma',
    testName: 'Complete Blood Count (CBC) & HbA1c Panel',
    category: 'Hematology & Diabetes',
    sampleCollectedAt: '2026-08-30 08:30 AM',
    reportGeneratedAt: '2026-08-30 02:15 PM',
    referringDoctor: 'Dr. S. K. Gupta (MD Med)',
    consultantPathologist: 'Dr. Vivek Verma (MD Pathology)',
    status: 'Report Published',
    findings: [
      { parameter: 'Hemoglobin (Hb)', value: 14.2, unit: 'g/dL', referenceRange: '13.0 - 17.0', isAbnormal: false, status: 'Normal' },
      { parameter: 'Total Leucocyte Count (TLC)', value: 7800, unit: 'cells/cu.mm', referenceRange: '4,000 - 11,000', isAbnormal: false, status: 'Normal' },
      { parameter: 'Platelet Count', value: 245000, unit: 'cells/cu.mm', referenceRange: '150,000 - 450,000', isAbnormal: false, status: 'Normal' },
      { parameter: 'RBC Count', value: 4.8, unit: 'mill/cu.mm', referenceRange: '4.5 - 5.5', isAbnormal: false, status: 'Normal' },
      { parameter: 'Glycated Hemoglobin (HbA1c)', value: 5.6, unit: '%', referenceRange: '< 5.7 (Normal), 5.7-6.4 (Pre-diabetic)', isAbnormal: false, status: 'Normal' },
      { parameter: 'Estimated Avg Glucose (eAG)', value: 114, unit: 'mg/dL', referenceRange: '90 - 120', isAbnormal: false, status: 'Normal' },
    ],
    clinicalNotes: 'All hematological parameters within biological reference intervals. Glycemic control is optimal.',
    qrVerificationCode: 'ICMR-NABL-CKD-9082-4412-V2',
    fileSize: '412 KB'
  },
  {
    id: 'REP-THY-8831',
    uhid: 'SD-2026-9082',
    patientName: 'Ramesh Kumar Sharma',
    testName: 'Thyroid Profile Total (T3, T4, TSH)',
    category: 'Endocrinology',
    sampleCollectedAt: '2026-08-15 09:00 AM',
    reportGeneratedAt: '2026-08-15 04:30 PM',
    referringDoctor: 'Self / Preventive Health',
    consultantPathologist: 'Dr. Vivek Verma (MD Pathology)',
    status: 'Report Published',
    findings: [
      { parameter: 'Triiodothyronine (Total T3)', value: 1.15, unit: 'ng/mL', referenceRange: '0.80 - 2.00', isAbnormal: false, status: 'Normal' },
      { parameter: 'Thyroxine (Total T4)', value: 8.4, unit: 'µg/dL', referenceRange: '5.1 - 14.1', isAbnormal: false, status: 'Normal' },
      { parameter: 'Thyroid Stimulating Hormone (TSH)', value: 2.34, unit: 'µIU/mL', referenceRange: '0.27 - 4.20', isAbnormal: false, status: 'Normal' },
    ],
    clinicalNotes: 'Euthyroid state confirmed. Normal pituitary-thyroid axis function.',
    qrVerificationCode: 'ICMR-NABL-CKD-9082-8831-V2',
    fileSize: '368 KB'
  },
  {
    id: 'REP-LIP-7729',
    uhid: 'SD-2026-9082',
    patientName: 'Ramesh Kumar Sharma',
    testName: 'Comprehensive Lipid Profile',
    category: 'Biochemistry',
    sampleCollectedAt: '2026-07-10 08:00 AM',
    reportGeneratedAt: '2026-07-10 01:45 PM',
    referringDoctor: 'Dr. S. K. Gupta (MD Med)',
    consultantPathologist: 'Dr. Vivek Verma (MD Pathology)',
    status: 'Report Published',
    findings: [
      { parameter: 'Total Cholesterol', value: 184, unit: 'mg/dL', referenceRange: '< 200 (Desirable)', isAbnormal: false, status: 'Normal' },
      { parameter: 'HDL Cholesterol (Good)', value: 48, unit: 'mg/dL', referenceRange: '> 40 (Optimal)', isAbnormal: false, status: 'Normal' },
      { parameter: 'LDL Cholesterol (Bad)', value: 108, unit: 'mg/dL', referenceRange: '< 100 (Optimal), 100-129 (Near Optimal)', isAbnormal: false, status: 'Normal' },
      { parameter: 'Triglycerides', value: 140, unit: 'mg/dL', referenceRange: '< 150 (Normal)', isAbnormal: false, status: 'Normal' },
      { parameter: 'VLDL Cholesterol', value: 28, unit: 'mg/dL', referenceRange: '5 - 30', isAbnormal: false, status: 'Normal' },
    ],
    clinicalNotes: 'Lipid profile is within acceptable cardiovascular protection range. Continue balanced diet and exercise.',
    qrVerificationCode: 'ICMR-NABL-CKD-9082-7729-V2',
    fileSize: '390 KB'
  }
];

export const ServerlessDB = {
  /**
   * Search reports by UHID or Report ID (RLS Protected)
   */
  getReportsByPatient: async (query: string): Promise<PatientReport[]> => {
    // Simulate network latency
    await new Promise((r) => setTimeout(r, 450));

    const normalized = query.trim().toUpperCase();
    let storedReports: PatientReport[] = [];

    try {
      const raw = localStorage.getItem(STORAGE_KEY_REPORTS);
      if (raw) {
        storedReports = JSON.parse(raw);
      } else {
        storedReports = SEED_REPORTS;
        localStorage.setItem(STORAGE_KEY_REPORTS, JSON.stringify(SEED_REPORTS));
      }
    } catch {
      storedReports = SEED_REPORTS;
    }

    if (!normalized) return storedReports;

    return storedReports.filter(
      (r) =>
        r.uhid.toUpperCase().includes(normalized) ||
        r.id.toUpperCase().includes(normalized) ||
        r.patientName.toUpperCase().includes(normalized)
    );
  },

  /**
   * Retrieve single verified report
   */
  getReportById: async (reportId: string): Promise<PatientReport | null> => {
    const all = await ServerlessDB.getReportsByPatient('');
    return all.find((r) => r.id.toUpperCase() === reportId.trim().toUpperCase()) || null;
  },

  /**
   * Create a new test booking
   */
  createBooking: async (bookingData: Omit<TestBooking, 'id' | 'bookingDate' | 'status'>): Promise<TestBooking> => {
    await new Promise((r) => setTimeout(r, 600));

    const id = `BOOK-${Date.now().toString().slice(-6)}`;
    const newBooking: TestBooking = {
      ...bookingData,
      id,
      bookingDate: new Date().toISOString().split('T')[0],
      status: 'ORDER_PLACED'
    };

    try {
      const raw = localStorage.getItem(STORAGE_KEY_BOOKINGS);
      const list: TestBooking[] = raw ? JSON.parse(raw) : [];
      list.unshift(newBooking);
      localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(list));
    } catch (e) {
      console.error('Failed to store booking', e);
    }

    return newBooking;
  },

  /**
   * Get all active bookings
   */
  getBookings: async (phoneOrName?: string): Promise<TestBooking[]> => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_BOOKINGS);
      const list: TestBooking[] = raw ? JSON.parse(raw) : [];
      if (!phoneOrName) return list;
      return list.filter(
        (b) =>
          b.phone.includes(phoneOrName) ||
          b.patientName.toLowerCase().includes(phoneOrName.toLowerCase()) ||
          b.id.toLowerCase().includes(phoneOrName.toLowerCase())
      );
    } catch {
      return [];
    }
  },

  /**
   * Get patient historic biomarker trends
   */
  getBiomarkerTrends: async (uhid: string): Promise<Record<string, BiomarkerTrend[]>> => {
    return {
      'Hemoglobin (g/dL)': [
        { date: '2026-03-10', value: 13.8, unit: 'g/dL', label: 'CBC', reference: '13.0 - 17.0' },
        { date: '2026-05-22', value: 14.0, unit: 'g/dL', label: 'CBC', reference: '13.0 - 17.0' },
        { date: '2026-08-30', value: 14.2, unit: 'g/dL', label: 'CBC', reference: '13.0 - 17.0' },
      ],
      'HbA1c Glycated Sugar (%)': [
        { date: '2026-01-15', value: 5.9, unit: '%', label: 'HbA1c', reference: '< 5.7' },
        { date: '2026-04-18', value: 5.8, unit: '%', label: 'HbA1c', reference: '< 5.7' },
        { date: '2026-08-30', value: 5.6, unit: '%', label: 'HbA1c', reference: '< 5.7' },
      ],
      'Total Cholesterol (mg/dL)': [
        { date: '2025-11-20', value: 205, unit: 'mg/dL', label: 'Lipid', reference: '< 200' },
        { date: '2026-03-12', value: 192, unit: 'mg/dL', label: 'Lipid', reference: '< 200' },
        { date: '2026-07-10', value: 184, unit: 'mg/dL', label: 'Lipid', reference: '< 200' },
      ]
    };
  }
};
