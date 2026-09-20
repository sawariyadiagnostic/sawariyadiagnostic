import type { MedicalTest } from '@/data/publishedCatalog';

export type PathologyDepartment =
  | 'ALL'
  | 'HEMATOLOGY'
  | 'BIOCHEMISTRY'
  | 'METABOLIC_DIABETES'
  | 'LIPIDS_CARDIAC'
  | 'THYROID_HORMONES'
  | 'SEROLOGY_INFECTIONS';

export type DrawTiming = 'ANYTIME' | 'MORNING' | 'POST_MEAL';

export interface RequisitionTestMeta {
  department: Exclude<PathologyDepartment, 'ALL'>;
  aliases: string[];
  fastingHours: number;
  timing: DrawTiming;
  sampleGroup: string;
  preparation: string;
}

export interface RequisitionManifest {
  subtotal: number;
  collectionFee: number;
  total: number;
  amountToFreeCollection: number;
  isFastingRequired: boolean;
  fastingHours: number;
  hasTwoStageCollection: boolean;
  timingNotice: string;
  sampleGroups: { label: string; count: number }[];
  preparationNotes: string[];
}

export interface PatientDetails {
  fullName: string;
  phone: string;
  age: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER' | '';
  address: string;
  landmark: string;
  pinCode: string;
  preferredDate: string;
  preferredSlot: string;
}

export type RequisitionCatalogTest = MedicalTest & RequisitionTestMeta;
