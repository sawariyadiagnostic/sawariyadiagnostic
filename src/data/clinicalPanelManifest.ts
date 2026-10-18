/**
 * Accredited Clinical Diagnostic Batteries (Multi-Analyte Panels)
 * Extracted directly from central laboratory Standard Operating Procedures:
 * C:\Users\Dell\Desktop\python\REFERENCES AND INTERPREATIONS
 *
 * Each panel represents an unbundled, medically coherent battery of sister analytes
 * sharing the same physical vacutainer tube and requiring only ONE single needle prick.
 */

export interface ClinicalPanel {
  id: string;
  name: string;
  hindiName: string;
  clusterRef: string;
  department: 'Hematology' | 'Biochemistry' | 'Endocrinology' | 'Microbiology';
  deptBadgeClass: string;
  spineClass: string;
  vacutainerTube: string;
  tubeColorClass: string;
  prickCount: number;
  parameters: string[];
  fastingHours: number;
  fastingNote: string;
  chaiAllowed: boolean;
  waterAllowed: boolean;
  bpMedsAllowed: boolean;
  diabetesMedsHold: boolean;
  clinicalPearl: string;
  constituentTestIds: string[];
  transparentPrice: number;
  turnaroundEstimate: string;
}

export const clinicalPanels: ClinicalPanel[] = [
  {
    id: "panel-hemogram",
    name: "Complete Hemogram (CBC + ESR)",
    hindiName: "खून की सम्पूर्ण जांच (सीबीसी + ईएसआर)",
    clusterRef: "Cluster 1.1 — Master Hemogram",
    department: "Hematology",
    deptBadgeClass: "bg-rose-50 text-rose-900 border-rose-200/80",
    spineClass: "spine-hematology",
    vacutainerTube: "1x Lavender K2/K3-EDTA (2.0 mL)",
    tubeColorClass: "vacutainer-dot-edta",
    prickCount: 1,
    parameters: [
      "Hemoglobin (Hb)",
      "RBC Count",
      "Packed Cell Volume (PCV/HCT)",
      "MCV",
      "MCH",
      "MCHC",
      "RDW-CV",
      "Total Leukocyte Count (TLC)",
      "Neutrophils",
      "Lymphocytes",
      "Eosinophils",
      "Monocytes",
      "Basophils",
      "Platelet Count",
      "Mean Platelet Volume (MPV)",
      "Automated ESR (Westergren)"
    ],
    fastingHours: 0,
    fastingNote: "No strict fasting required for blood count. Drink 1-2 glasses of plain water to keep veins well-hydrated.",
    chaiAllowed: true,
    waterAllowed: true,
    bpMedsAllowed: true,
    diabetesMedsHold: false,
    clinicalPearl: "Evaluates oxygen delivery, active viral/bacterial infections, allergic eosinophilia, and platelet adequacy in one single blood draw.",
    constituentTestIds: ["web-001", "web-004"],
    transparentPrice: 450,
    turnaroundEstimate: "Ready in 2–4 hrs"
  },
  {
    id: "panel-lft",
    name: "Liver Function & Biliary Panel (LFT)",
    hindiName: "लिवर (जिगर) की सम्पूर्ण कार्यप्रणाली जांच",
    clusterRef: "Cluster 2.2 — Master LFT & R-Factor",
    department: "Biochemistry",
    deptBadgeClass: "bg-teal-50 text-teal-900 border-teal-200/80",
    spineClass: "spine-biochem",
    vacutainerTube: "1x Gold SST / Clot Activator (3.0 mL)",
    tubeColorClass: "vacutainer-dot-serum",
    prickCount: 1,
    parameters: [
      "Total Bilirubin",
      "Direct Bilirubin",
      "Indirect Bilirubin",
      "SGOT / AST",
      "SGPT / ALT",
      "Alkaline Phosphatase (ALP)",
      "Total Serum Protein",
      "Serum Albumin",
      "Serum Globulin",
      "Albumin / Globulin (A:G) Ratio",
      "De Ritis Ratio (AST/ALT)"
    ],
    fastingHours: 8,
    fastingNote: "8–10 hours overnight fasting preferred. Avoid heavy fatty foods or alcohol for 24 hours prior.",
    chaiAllowed: false,
    waterAllowed: true,
    bpMedsAllowed: true,
    diabetesMedsHold: true,
    clinicalPearl: "Differentiates hepatocellular liver injury from biliary gallstone/cholestatic obstruction and chronic protein synthesis capacity.",
    constituentTestIds: ["web-020"],
    transparentPrice: 600,
    turnaroundEstimate: "Ready in 3–6 hrs"
  },
  {
    id: "panel-kft",
    name: "Renal Function & Electrolytes Panel (KFT/RFT)",
    hindiName: "किडनी (गुर्दे) की सम्पूर्ण जांच एवं इलेक्ट्रोलाइट्स",
    clusterRef: "Cluster 2.3 — Master KFT & Electrolytes",
    department: "Biochemistry",
    deptBadgeClass: "bg-teal-50 text-teal-900 border-teal-200/80",
    spineClass: "spine-biochem",
    vacutainerTube: "1x Gold SST / Clot Activator (3.0 mL)",
    tubeColorClass: "vacutainer-dot-serum",
    prickCount: 1,
    parameters: [
      "Serum Creatinine",
      "Blood Urea",
      "Blood Urea Nitrogen (BUN)",
      "BUN / Creatinine Ratio",
      "Serum Uric Acid",
      "Serum Sodium (Na+)",
      "Serum Potassium (K+)",
      "Serum Chloride (Cl-)"
    ],
    fastingHours: 8,
    fastingNote: "8 hours fasting preferred if ordered with biochemistry panels. Maintain standard fluid intake to prevent dehydration.",
    chaiAllowed: false,
    waterAllowed: true,
    bpMedsAllowed: true,
    diabetesMedsHold: true,
    clinicalPearl: "Measures kidney filtration efficiency, nitrogenous waste excretion, and life-critical cardiac/nerve electrolyte balance.",
    constituentTestIds: ["web-021", "web-028"],
    transparentPrice: 1000,
    turnaroundEstimate: "Ready in 3–6 hrs"
  },
  {
    id: "panel-lipid",
    name: "Lipid Profile & ASCVD Cardiovascular Risk",
    hindiName: "हार्ट व कोलेस्ट्रॉल लिपिड प्रोफाइल जांच",
    clusterRef: "Cluster 2.4 — Master ASCVD Lipid Risk",
    department: "Biochemistry",
    deptBadgeClass: "bg-teal-50 text-teal-900 border-teal-200/80",
    spineClass: "spine-biochem",
    vacutainerTube: "1x Gold SST / Clot Activator (3.0 mL)",
    tubeColorClass: "vacutainer-dot-serum",
    prickCount: 1,
    parameters: [
      "Total Cholesterol",
      "Serum Triglycerides",
      "HDL ('Good') Cholesterol",
      "LDL ('Bad') Cholesterol",
      "VLDL Cholesterol",
      "Non-HDL Cholesterol",
      "Total / HDL Ratio",
      "LDL / HDL Atherogenic Index"
    ],
    fastingHours: 10,
    fastingNote: "Strict 10–12 hours overnight fasting. Only plain water is permitted. Avoid alcohol for 48 hours prior.",
    chaiAllowed: false,
    waterAllowed: true,
    bpMedsAllowed: true,
    diabetesMedsHold: true,
    clinicalPearl: "Unmasks circulating atherogenic particles, artery-clogging plaque risks, and familial hypertriglyceridemia.",
    constituentTestIds: ["web-030"],
    transparentPrice: 450,
    turnaroundEstimate: "Ready in 3–6 hrs"
  },
  {
    id: "panel-diabetes",
    name: "Comprehensive Diabetic & Glycemic Panel",
    hindiName: "मधुमेह एवं तीन महीने की शुगर (HbA1c) जांच",
    clusterRef: "Cluster 2.1 — Master Diabetic Battery",
    department: "Biochemistry",
    deptBadgeClass: "bg-amber-50 text-amber-900 border-amber-200/80",
    spineClass: "spine-metabolic",
    vacutainerTube: "1x Grey Fluoride + 1x Lavender EDTA (1 Prick)",
    tubeColorClass: "vacutainer-dot-fluoride",
    prickCount: 1,
    parameters: [
      "Fasting Blood Sugar (FBS)",
      "Glycated Hemoglobin (HbA1c)",
      "Estimated Average Glucose (eAG)",
      "Spot Urine Glucose & Protein Screening"
    ],
    fastingHours: 8,
    fastingNote: "Strict 8–10 hours overnight fast. Plain water is permitted. Carry your morning diabetic medicine and breakfast for intake right after the blood draw.",
    chaiAllowed: false,
    waterAllowed: true,
    bpMedsAllowed: true,
    diabetesMedsHold: true,
    clinicalPearl: "Pairs exact morning fasting blood glucose with the gold-standard 90-day biological red cell hemoglobin turnover window.",
    constituentTestIds: ["web-037", "web-040", "web-066"],
    transparentPrice: 510,
    turnaroundEstimate: "Ready in 3–6 hrs"
  },
  {
    id: "panel-thyroid",
    name: "Thyroid Profile (Total & Free TFT)",
    hindiName: "थायरॉइड सम्पूर्ण प्रोफाइल (T3, T4, TSH)",
    clusterRef: "Cluster 3.1 — Master Thyroid & Autoimmunity",
    department: "Endocrinology",
    deptBadgeClass: "bg-purple-50 text-purple-900 border-purple-200/80",
    spineClass: "spine-clia",
    vacutainerTube: "1x Gold SST (3.0 mL) CLIA",
    tubeColorClass: "vacutainer-dot-serum",
    prickCount: 1,
    parameters: [
      "Total Triiodothyronine (T3)",
      "Total Thyroxine (T4)",
      "Ultrasensitive TSH",
      "Free T3 (FT3)",
      "Free T4 (FT4)"
    ],
    fastingHours: 8,
    fastingNote: "Fasting preferred. Take your daily thyroid medicine (e.g. Thyronorm/Eltroxin) AFTER the morning blood draw. Avoid biotin supplements for 48h.",
    chaiAllowed: false,
    waterAllowed: true,
    bpMedsAllowed: true,
    diabetesMedsHold: true,
    clinicalPearl: "Evaluates pituitary-thyroid feedback loop for unexplained weight fluctuation, persistent lethargy, cold sensitivity, and hair thinning.",
    constituentTestIds: ["web-050", "web-053", "web-054"],
    transparentPrice: 750,
    turnaroundEstimate: "Ready in 4–8 hrs"
  },
  {
    id: "panel-vitamins-bone",
    name: "Nutritional Bone & Anemia Panel",
    hindiName: "विटामिन डी3, बी12 एवं आयरन डेफिशियेंसी जांच",
    clusterRef: "Cluster 3.2 — Master Micronutrient & Bone Health",
    department: "Endocrinology",
    deptBadgeClass: "bg-purple-50 text-purple-900 border-purple-200/80",
    spineClass: "spine-clia",
    vacutainerTube: "1x Gold SST (Protected from light)",
    tubeColorClass: "vacutainer-dot-serum",
    prickCount: 1,
    parameters: [
      "Vitamin D (25-OH Total)",
      "Vitamin B12 (Cyanocobalamin)",
      "Serum Ferritin",
      "Serum Iron",
      "Total Iron Binding Capacity (TIBC)"
    ],
    fastingHours: 8,
    fastingNote: "Morning draw (07:00 AM–10:00 AM) optimal due to diurnal biological variation in serum iron. Fasting 8 hours preferred.",
    chaiAllowed: false,
    waterAllowed: true,
    bpMedsAllowed: true,
    diabetesMedsHold: true,
    clinicalPearl: "Identifies hidden drivers of bone weakness, chronic muscular fatigue, neuropathic tingling, and microcytic iron deficiency.",
    constituentTestIds: ["web-060", "web-061", "web-062"],
    transparentPrice: 1950,
    turnaroundEstimate: "Ready in 6–12 hrs"
  },
  {
    id: "panel-coagulation",
    name: "Coagulation & Thrombosis Screen",
    hindiName: "रक्त का थक्का जमने की जांच (पीटी/आईएनआर व एपीटीटी)",
    clusterRef: "Cluster 1.3 — Master Coagulation & DIC",
    department: "Hematology",
    deptBadgeClass: "bg-rose-50 text-rose-900 border-rose-200/80",
    spineClass: "spine-hematology",
    vacutainerTube: "1x Light Blue Sodium Citrate (9:1 Ratio)",
    tubeColorClass: "vacutainer-dot-container",
    prickCount: 1,
    parameters: [
      "Prothrombin Time (PT)",
      "International Normalized Ratio (INR)",
      "Activated Partial Thromboplastin Time (aPTT)",
      "Plasma Fibrinogen (Clauss)"
    ],
    fastingHours: 0,
    fastingNote: "No fasting required. Inform the phlebotomist of any blood thinner or anticoagulant medications (Warfarin, Heparin, Ecospirin).",
    chaiAllowed: true,
    waterAllowed: true,
    bpMedsAllowed: true,
    diabetesMedsHold: false,
    clinicalPearl: "Essential pre-operative screening and anticoagulant safety verification assessing extrinsic and intrinsic clotting cascades.",
    constituentTestIds: ["web-015", "web-016"],
    transparentPrice: 600,
    turnaroundEstimate: "Ready in 2–4 hrs"
  }
];
