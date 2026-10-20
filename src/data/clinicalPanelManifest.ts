/**
 * Clinical Diagnostic Health Profiles & Panels (Multi-Analyte Profiles)
 * Formatted from central laboratory Standard Operating Procedures.
 *
 * Each panel represents an unbundled, medically coherent profile of sister analytes
 * sharing the designated physical vacutainer tube.
 */

export interface ClinicalPanel {
  id: string;
  name: string;
  shortCode?: string;
  subtitle?: string;
  hindiName: string;
  clusterRef: string;
  department: 'Hematology' | 'Biochemistry' | 'Endocrinology' | 'Microbiology';
  deptBadgeClass: string;
  spineClass: string;
  vacutainerTube: string;
  tubeCategory: 'edta' | 'serum' | 'fluoride' | 'citrate' | 'container';
  tubeColorClass: string;
  prickCount: number;
  needleSpec: string;
  doctorQuestion: string;
  doctorAnswer: string;
  parameters: string[];
  measuredAnalytes: string[];
  calculatedRatios: string[];
  fastingHours: number;
  fastingNote: string;
  chaiAllowed: boolean;
  waterAllowed: boolean;
  bpMedsAllowed: boolean;
  diabetesMedsHold: boolean;
  clinicalPearl: string;
  constituentTestIds: string[];
  keywords: string[];
  transparentPrice: number;
  turnaroundEstimate: string;
  costToCompleteTip?: {
    baseTestName: string;
    baseTestId: string;
    deltaPrice: number;
    message: string;
  };
}

export const clinicalPanels: ClinicalPanel[] = [
  {
    id: "panel-hemogram",
    name: "Complete Hemogram",
    shortCode: "CBC + ESR",
    subtitle: "Includes CBC & Automated ESR (16 Analytes)",
    hindiName: "खून की सम्पूर्ण जांच (सीबीसी + ईएसआर)",
    clusterRef: "Cluster 1.1 — Master Hemogram",
    department: "Hematology",
    deptBadgeClass: "bg-rose-50 text-rose-900 border-rose-200/80",
    spineClass: "spine-hematology",
    vacutainerTube: "1x Lavender K2/K3-EDTA (2.0 mL)",
    tubeCategory: "edta",
    tubeColorClass: "vacutainer-dot-edta",
    prickCount: 1,
    needleSpec: "Pediatric 23G/25G ultra-thin safety butterfly needle for delicate veins",
    doctorQuestion: "What does CBC + ESR actually check?",
    doctorAnswer: "Evaluates active viral or bacterial infections, anemia (hemoglobin), platelet clotting power, and chronic systemic inflammation in 1 single blood draw.",
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
    measuredAnalytes: [
      "Hemoglobin (Hb Photometry)",
      "RBC Count (Impedance)",
      "Total Leukocyte Count (TLC)",
      "5-Part Differential (Neutrophils, Lymphocytes, Eosinophils, Monocytes, Basophils)",
      "Platelet Count",
      "Automated ESR (Westergren)"
    ],
    calculatedRatios: [
      "Packed Cell Volume (PCV / Hematocrit)",
      "MCV (Mean Corpuscular Volume)",
      "MCH (Mean Corpuscular Hemoglobin)",
      "MCHC",
      "RDW-CV (Red Cell Distribution Width)",
      "Mean Platelet Volume (MPV)"
    ],
    fastingHours: 0,
    fastingNote: "No strict fasting required for blood counts. Drink 1-2 glasses of plain water to keep veins well-hydrated.",
    chaiAllowed: true,
    waterAllowed: true,
    bpMedsAllowed: true,
    diabetesMedsHold: false,
    clinicalPearl: "Evaluates oxygen delivery, active viral/bacterial infections, allergic eosinophilia, and platelet adequacy in one single blood draw.",
    constituentTestIds: ["web-001","web-002","web-003","web-004","web-005","web-006","web-007"],
    keywords: ["cbc","esr","hemogram","blood","hemoglobin","tlc","dlc","platelet","wbc","rbc","anemia","fever","infection","khoon","khoon ki janch","khoon ki kami","lal koshika","shwet koshika","kamzori","thakan","weakness"],
    transparentPrice: 450,
    turnaroundEstimate: "TAT: 4 Hours",
    costToCompleteTip: {
      baseTestName: "Complete Blood Count (CBC)",
      baseTestId: "web-001",
      deltaPrice: 100,
      message: "Add ₹100 to complete the Hemogram with Automated ESR from the same single lavender tube."
    }
  },
  {
    id: "panel-lft",
    name: "Liver Function Panel",
    shortCode: "LFT (11 Analytes)",
    subtitle: "Complete 11-Analyte Liver & Enzyme Screen",
    hindiName: "लिवर (जिगर) की सम्पूर्ण कार्यप्रणाली जांच",
    clusterRef: "Cluster 2.2 — Master LFT & R-Factor",
    department: "Biochemistry",
    deptBadgeClass: "bg-teal-50 text-teal-900 border-teal-200/80",
    spineClass: "spine-biochem",
    vacutainerTube: "1x Gold SST / Clot Activator (3.0 mL)",
    tubeCategory: "serum",
    tubeColorClass: "vacutainer-dot-serum",
    prickCount: 1,
    needleSpec: "Pediatric 23G/25G ultra-thin needle with flash visualization for fragile veins",
    doctorQuestion: "Why did my doctor order a Liver Function Test?",
    doctorAnswer: "Differentiates hepatocellular liver injury (ALT/AST) from gallbladder or jaundice blockages (ALP/Bilirubin), and verifies chronic protein synthesis capacity.",
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
    measuredAnalytes: [
      "Total Bilirubin (Diazo method)",
      "Direct Bilirubin (Conjugated)",
      "SGOT / AST (IFCC Kinetic without P-5-P)",
      "SGPT / ALT (IFCC Kinetic without P-5-P)",
      "Alkaline Phosphatase (pNPP-AMP Kinetic)",
      "Total Serum Protein (Biuret method)",
      "Serum Albumin (BCG Photometry)"
    ],
    calculatedRatios: [
      "Indirect (Unconjugated) Bilirubin",
      "Serum Globulin",
      "Albumin / Globulin (A:G) Ratio",
      "De Ritis Ratio (AST / ALT Ratio)"
    ],
    fastingHours: 8,
    fastingNote: "8–10 hours overnight fasting preferred. Avoid heavy fatty foods or alcohol for 24 hours prior.",
    chaiAllowed: false,
    waterAllowed: true,
    bpMedsAllowed: true,
    diabetesMedsHold: true,
    clinicalPearl: "Differentiates hepatocellular liver injury from biliary gallstone/cholestatic obstruction and chronic protein synthesis capacity.",
    constituentTestIds: ["web-012","web-013","web-014","web-015","web-016","web-017","web-018","web-019","web-020","web-021","web-022"],
    keywords: ["lft","liver","jaundice","piliya","peeliya","peela peshab","sgot","sgpt","alt","ast","bilirubin","alkaline phosphatase","alp","ggt","albumin","protein","digestive","bile","hepatitis","fatty liver","cirrhosis","liver ki janch"],
    transparentPrice: 600,
    turnaroundEstimate: "TAT: 6 Hours"
  },
  {
    id: "panel-kft",
    name: "Kidney Function & Electrolytes",
    shortCode: "KFT + 4 Electrolytes",
    subtitle: "Includes BUN, Creatinine, Uric Acid & 4 Electrolytes",
    hindiName: "किडनी सम्पूर्ण जांच एवं 4 इलेक्ट्रोलाइट्स (सोडियम, पोटेशियम, क्लोराइड, मैग्नीशियम)",
    clusterRef: "Cluster 2.3 — Master KFT & Electrolytes",
    department: "Biochemistry",
    deptBadgeClass: "bg-teal-50 text-teal-900 border-teal-200/80",
    spineClass: "spine-biochem",
    vacutainerTube: "1x Gold SST / Clot Activator (3.0 mL)",
    tubeCategory: "serum",
    tubeColorClass: "vacutainer-dot-serum",
    prickCount: 1,
    needleSpec: "Pediatric 23G/25G ultra-thin safety needle with flash chamber",
    doctorQuestion: "What does the Kidney Function & Complete Electrolytes profile check?",
    doctorAnswer: "Measures glomerular kidney filtration, waste elimination (Creatinine, Urea, Uric Acid), and all 4 critical electrolytes: Sodium, Potassium, Chloride, and Magnesium.",
    parameters: [
      "Serum Creatinine",
      "Blood Urea",
      "Blood Urea Nitrogen (BUN)",
      "BUN / Creatinine Ratio",
      "Serum Uric Acid",
      "Serum Sodium (Na+)",
      "Serum Potassium (K+)",
      "Serum Chloride (Cl-)",
      "Serum Magnesium (Mg2+)"
    ],
    measuredAnalytes: [
      "Serum Creatinine (Modified Jaffe Kinetic)",
      "Blood Urea (GLDH Enzymatic Kinetic)",
      "Serum Uric Acid (Uricase-POD)",
      "Serum Sodium (Direct ISE)",
      "Serum Potassium (Direct ISE)",
      "Serum Chloride (Direct ISE)",
      "Serum Magnesium (Calmagite / Xylidyl Blue)"
    ],
    calculatedRatios: [
      "Blood Urea Nitrogen (BUN)",
      "BUN / Creatinine Ratio"
    ],
    fastingHours: 8,
    fastingNote: "8 hours fasting preferred if ordered with biochemistry panels. Maintain standard fluid intake to prevent dehydration.",
    chaiAllowed: false,
    waterAllowed: true,
    bpMedsAllowed: true,
    diabetesMedsHold: true,
    clinicalPearl: "Measures kidney filtration efficiency, nitrogenous waste excretion, and life-critical cardiac/nerve electrolyte balance.",
    constituentTestIds: ["web-023","web-024","web-025","web-026","web-027","web-028","web-029"],
    keywords: ["kft","rft","kidney","renal","creatinine","urea","bun","uric acid","sodium","potassium","chloride","magnesium","electrolytes","gfr","swelling","edema","face swelling","foot swelling","gurde ki janch","peshab me jalan","dialysis","kidney ki janch"],
    transparentPrice: 1000,
    turnaroundEstimate: "TAT: 6 Hours"
  },
  {
    id: "panel-lipid",
    name: "Lipid & Cholesterol Profile",
    shortCode: "Lipid / ASCVD",
    subtitle: "Direct HDL, LDL, Triglycerides & Cardiac Ratios",
    hindiName: "हार्ट व कोलेस्ट्रॉल लिपिड प्रोफाइल जांच",
    clusterRef: "Cluster 2.4 — Master ASCVD Lipid Risk",
    department: "Biochemistry",
    deptBadgeClass: "bg-teal-50 text-teal-900 border-teal-200/80",
    spineClass: "spine-biochem",
    vacutainerTube: "1x Gold SST / Clot Activator (3.0 mL)",
    tubeCategory: "serum",
    tubeColorClass: "vacutainer-dot-serum",
    prickCount: 1,
    needleSpec: "23G safety needle with immediate vein flashback",
    doctorQuestion: "Why test Lipid Profile strictly with overnight fasting?",
    doctorAnswer: "Unmasks circulating atherogenic particles, artery-clogging plaque risks, and familial hypertriglyceridemia without dietary fat interference.",
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
    measuredAnalytes: [
      "Total Cholesterol (CHOD-PAP Enzymatic)",
      "Serum Triglycerides (GPO-PAP Enzymatic)",
      "HDL Cholesterol (Direct Immunoinhibition)",
      "Direct LDL Cholesterol (Selective Detergent Clearance)"
    ],
    calculatedRatios: [
      "VLDL Cholesterol (Triglycerides / 5)",
      "Non-HDL Cholesterol (Total Chol - HDL)",
      "Total / HDL Cardiovascular Risk Ratio",
      "LDL / HDL Atherogenic Index"
    ],
    fastingHours: 10,
    fastingNote: "Strict 10–12 hours overnight fasting. Only plain water is permitted. Avoid alcohol for 48 hours prior.",
    chaiAllowed: false,
    waterAllowed: true,
    bpMedsAllowed: true,
    diabetesMedsHold: true,
    clinicalPearl: "Unmasks circulating atherogenic particles, artery-clogging plaque risks, and familial hypertriglyceridemia.",
    constituentTestIds: ["web-030","web-031","web-032","web-033","web-034","web-035","web-036"],
    keywords: ["lipid","cholesterol","triglycerides","hdl","ldl","vldl","heart","cardiac","ascvd","blood pressure","hypertension","fat","artery blockage","dil ki bimari","chest pain","chole","lipid profile"],
    transparentPrice: 450,
    turnaroundEstimate: "TAT: 6 Hours"
  },
  {
    id: "panel-diabetes",
    name: "Diabetic Glycemic Panel",
    shortCode: "HbA1c + Fasting",
    subtitle: "Gold-Standard HPLC HbA1c, Fasting Glucose & Urine",
    hindiName: "मधुमेह एवं तीन महीने की शुगर (HbA1c) जांच",
    clusterRef: "Cluster 2.1 — Master Diabetic Glycemic Profile",
    department: "Biochemistry",
    deptBadgeClass: "bg-amber-50 text-amber-900 border-amber-200/80",
    spineClass: "spine-metabolic",
    vacutainerTube: "1x Grey Fluoride + 1x Lavender EDTA (1 Puncture)",
    tubeCategory: "fluoride",
    tubeColorClass: "vacutainer-dot-fluoride",
    prickCount: 1,
    needleSpec: "Ultra-gentle 23G/25G needle with 1 single vein puncture for both tubes",
    doctorQuestion: "Why do I need both Fasting Sugar and HbA1c?",
    doctorAnswer: "Pairs exact morning fasting blood glucose with the gold-standard 90-day biological red cell hemoglobin turnover window to prevent hidden spikes.",
    parameters: [
      "Fasting Blood Sugar (FBS)",
      "Glycated Hemoglobin (HbA1c)",
      "Estimated Average Glucose (eAG)",
      "Spot Urine Glucose & Protein Screening"
    ],
    measuredAnalytes: [
      "Fasting Blood Sugar (Hexokinase / Glucose Dehydrogenase)",
      "Glycated Hemoglobin HbA1c (NGSP Certified Ion-Exchange HPLC)",
      "Spot Urine Protein & Glucose (Multi-pad Strip Reflectance)"
    ],
    calculatedRatios: [
      "Estimated Average Glucose (eAG Formula = 28.7 × HbA1c - 46.7)"
    ],
    fastingHours: 8,
    fastingNote: "Strict 8–10 hours overnight fast. Plain water is permitted. Carry your morning diabetic medicine and breakfast for intake right after the blood draw.",
    chaiAllowed: false,
    waterAllowed: true,
    bpMedsAllowed: true,
    diabetesMedsHold: true,
    clinicalPearl: "Pairs exact morning fasting blood glucose with the gold-standard 90-day biological red cell hemoglobin turnover window.",
    constituentTestIds: ["web-037","web-038","web-039","web-040"],
    keywords: ["diabetes","sugar","glucose","hba1c","fbs","ppbs","rbs","fasting blood sugar","post prandial","madhumeh","sugar ki bimari","teen mahine ki sugar","shakar","insulin","urine glucose","frequent urination","thirst","sweet urine"],
    transparentPrice: 510,
    turnaroundEstimate: "TAT: 6 Hours"
  },
  {
    id: "panel-thyroid",
    name: "Thyroid Profile",
    shortCode: "Total & Free TFT",
    subtitle: "Total T3, T4, Ultrasensitive TSH, FT3 & FT4",
    hindiName: "थायरॉइड सम्पूर्ण प्रोफाइल (T3, T4, TSH)",
    clusterRef: "Cluster 3.1 — Master Thyroid & Autoimmunity",
    department: "Endocrinology",
    deptBadgeClass: "bg-purple-50 text-purple-900 border-purple-200/80",
    spineClass: "spine-clia",
    vacutainerTube: "1x Gold SST (3.0 mL) CLIA",
    tubeCategory: "serum",
    tubeColorClass: "vacutainer-dot-serum",
    prickCount: 1,
    needleSpec: "23G safety needle with immediate vein flashback",
    doctorQuestion: "What is the difference between Total and Free Thyroid tests?",
    doctorAnswer: "Total tests measure circulating thyroid hormone stores; Free fractions (FT3/FT4) measure the actual active hormone reaching your tissues and metabolism.",
    parameters: [
      "Total Triiodothyronine (T3)",
      "Total Thyroxine (T4)",
      "Ultrasensitive TSH",
      "Free T3 (FT3)",
      "Free T4 (FT4)"
    ],
    measuredAnalytes: [
      "Total Triiodothyronine T3 (Chemiluminescence CLIA)",
      "Total Thyroxine T4 (Chemiluminescence CLIA)",
      "Ultrasensitive 3rd-Gen TSH (Chemiluminescence CLIA)",
      "Free Triiodothyronine FT3 (Chemiluminescence CLIA)",
      "Free Thyroxine FT4 (Chemiluminescence CLIA)"
    ],
    calculatedRatios: [],
    fastingHours: 8,
    fastingNote: "Fasting preferred. Take your daily thyroid medicine (e.g. Thyronorm/Eltroxin) AFTER the morning blood draw. Avoid biotin supplements for 48h.",
    chaiAllowed: false,
    waterAllowed: true,
    bpMedsAllowed: true,
    diabetesMedsHold: true,
    clinicalPearl: "Evaluates pituitary-thyroid feedback loop for unexplained weight fluctuation, persistent lethargy, cold sensitivity, and hair thinning.",
    constituentTestIds: ["web-050","web-051","web-052","web-053","web-054"],
    keywords: ["thyroid","tft","tsh","t3","t4","ft3","ft4","hypothyroid","hyperthyroid","goiter","gala","weight gain","weight loss","sluggish","chills","hairfall","gale me sujan","thyroid ki janch"],
    transparentPrice: 750,
    turnaroundEstimate: "TAT: 12 Hours"
  },
  {
    id: "panel-vitamins-bone",
    name: "Vitamins & Deep Iron Panel",
    shortCode: "D3 + B12 + Iron",
    subtitle: "Vitamin D3, B12, Serum Ferritin & Iron Profile",
    hindiName: "विटामिन डी3, बी12, फेरिटिन एवं आयरन जांच",
    clusterRef: "Cluster 3.2 — Master Micronutrient & Bone Health",
    department: "Endocrinology",
    deptBadgeClass: "bg-purple-50 text-purple-900 border-purple-200/80",
    spineClass: "spine-clia",
    vacutainerTube: "1x Gold SST (Protected from light)",
    tubeCategory: "serum",
    tubeColorClass: "vacutainer-dot-serum",
    prickCount: 1,
    needleSpec: "23G safety needle (amber light-shielded sample transport)",
    doctorQuestion: "Why check Vitamins D3, B12, Ferritin, and Serum Iron together?",
    doctorAnswer: "Identifies hidden drivers of chronic fatigue, nerve weakness, bone aches, and microcytic anemia by pairing circulating iron with cellular ferritin stores and neuro-vitamins.",
    parameters: [
      "Vitamin D (25-OH Total)",
      "Vitamin B12 (Cyanocobalamin)",
      "Serum Ferritin",
      "Serum Iron"
    ],
    measuredAnalytes: [
      "25-Hydroxy Vitamin D Total (Chemiluminescence CLIA)",
      "Vitamin B12 Cyanocobalamin (Chemiluminescence CLIA)",
      "Serum Ferritin (Chemiluminescence CLIA)",
      "Serum Iron (Ferene-B Kinetic Photometry)"
    ],
    calculatedRatios: [],
    fastingHours: 8,
    fastingNote: "Morning draw (07:00 AM–10:00 AM) optimal due to diurnal biological variation in serum iron. Fasting 8 hours preferred.",
    chaiAllowed: false,
    waterAllowed: true,
    bpMedsAllowed: true,
    diabetesMedsHold: true,
    clinicalPearl: "Identifies hidden drivers of bone weakness, chronic muscular fatigue, neuropathic tingling, and microcytic iron deficiency.",
    constituentTestIds: ["web-064","web-065","web-041","web-042","web-043","web-027"],
    keywords: ["vitamins","vitamin d","d3","vitamin b12","b12","ferritin","iron","cyanocobalamin","calcium","bone","bone pain","haddi","haddiyo me dard","joint weakness","tingling","numbness","hair fall","fatigue","kamzori","sustee","exhaustion"],
    transparentPrice: 2400,
    turnaroundEstimate: "TAT: 16 Hours"
  },
  {
    id: "panel-coagulation",
    name: "Coagulation Panel",
    shortCode: "PT/INR + aPTT",
    subtitle: "Prothrombin Time, INR & aPTT Screen",
    hindiName: "रक्त का थक्का जमने की जांच (पीटी/आईएनआर व एपीटीटी)",
    clusterRef: "Cluster 1.3 — Master Coagulation & Hemostasis",
    department: "Hematology",
    deptBadgeClass: "bg-rose-50 text-rose-900 border-rose-200/80",
    spineClass: "spine-hematology",
    vacutainerTube: "1x Light Blue Sodium Citrate (9:1 Ratio)",
    tubeCategory: "citrate",
    tubeColorClass: "vacutainer-dot-container",
    prickCount: 1,
    needleSpec: "Pediatric butterfly needle with 9:1 exact blood-to-anticoagulant fill volume",
    doctorQuestion: "Why is PT/INR and aPTT required before surgery or on blood thinners?",
    doctorAnswer: "Assesses both extrinsic and intrinsic blood clotting pathways to monitor anticoagulant medications and prevent bleeding complications before surgical procedures.",
    parameters: [
      "Prothrombin Time (PT)",
      "International Normalized Ratio (INR)",
      "Activated Partial Thromboplastin Time (aPTT)"
    ],
    measuredAnalytes: [
      "Prothrombin Time PT (Photo-optical Clot Detection)",
      "Activated Partial Thromboplastin Time aPTT (Photo-optical Clot Detection)"
    ],
    calculatedRatios: [
      "International Normalized Ratio (INR = (PT_patient / PT_normal)^ISI)"
    ],
    fastingHours: 0,
    fastingNote: "No fasting required. Inform the phlebotomist of any blood thinner or anticoagulant medications (Warfarin, Heparin, Ecospirin).",
    chaiAllowed: true,
    waterAllowed: true,
    bpMedsAllowed: true,
    diabetesMedsHold: false,
    clinicalPearl: "Essential pre-operative screening and anticoagulant safety verification assessing extrinsic and intrinsic clotting cascades.",
    constituentTestIds: ["web-009","web-010","web-011"],
    keywords: ["coagulation","clotting","pt","inr","aptt","prothrombin","bleeding","blood thinner","warfarin","heparin","ecospirin","surgery clearance","operation","bruising","khoon jamna","thakka"],
    transparentPrice: 600,
    turnaroundEstimate: "TAT: 4 Hours"
  },
  {
    id: "panel-pcod",
    name: "PCOD / PCOS Hormone Panel",
    shortCode: "AMH + Hormones",
    subtitle: "AMH, LH, FSH, Prolactin, Testosterone & E2",
    hindiName: "पीसीओडी व महिला हार्मोन सम्पूर्ण प्रोफाइल (PCOD/PCOS)",
    clusterRef: "Cluster 3.3 — Master Gynecological Endocrinology",
    department: "Endocrinology",
    deptBadgeClass: "bg-purple-50 text-purple-900 border-purple-200/80",
    spineClass: "spine-clia",
    vacutainerTube: "1x Gold SST (3.0 mL) CLIA",
    tubeCategory: "serum",
    tubeColorClass: "vacutainer-dot-serum",
    prickCount: 1,
    needleSpec: "Pediatric 23G/25G ultra-thin safety needle with flash chamber",
    doctorQuestion: "Why did my doctor or gynecologist order a PCOD/PCOS Profile?",
    doctorAnswer: "Evaluates ovarian follicular reserve (AMH), ovulatory pituitary balance (LH/FSH ratio), androgen excess (Total & Free Testosterone), and cycle irregularities (Prolactin, E2) for complete PCOS management.",
    parameters: [
      "Anti-Müllerian Hormone (AMH)",
      "Luteinizing Hormone (LH)",
      "Follicle Stimulating Hormone (FSH)",
      "LH / FSH Ratio",
      "Prolactin (PRL)",
      "Total Testosterone",
      "Free Testosterone",
      "Estradiol (E2)"
    ],
    measuredAnalytes: [
      "Anti-Müllerian Hormone AMH (Chemiluminescence CLIA)",
      "Luteinizing Hormone LH (Chemiluminescence CLIA)",
      "Follicle Stimulating Hormone FSH (Chemiluminescence CLIA)",
      "Prolactin PRL (Chemiluminescence CLIA)",
      "Total Testosterone (Competitive CLIA)",
      "Free Testosterone (Competitive CLIA)",
      "Estradiol E2 (Competitive CLIA)"
    ],
    calculatedRatios: [
      "LH / FSH Ratio (Pituitary Ovulatory Drive)"
    ],
    fastingHours: 8,
    fastingNote: "Morning draw (07:00 AM–10:00 AM) optimal. Day 2 or Day 3 of menstrual cycle preferred, or any day if periods are irregular/absent.",
    chaiAllowed: false,
    waterAllowed: true,
    bpMedsAllowed: true,
    diabetesMedsHold: true,
    clinicalPearl: "Diagnostic gold standard for polycystic ovarian syndrome assessing hyperandrogenism, anovulatory LH/FSH inversion, and ovarian reserve.",
    constituentTestIds: ["web-055","web-056","web-057","web-058","web-060","web-061"],
    keywords: ["pcod","pcos","polycystic","ovary","amh","lh","fsh","prolactin","testosterone","estradiol","e2","periods","irregular periods","mahawari","masik dharm","facial hair","acne","weight gain","infertility","nissantaan","pregnancy hormone","harmone"],
    transparentPrice: 3850,
    turnaroundEstimate: "TAT: 12 Hours"
  },
  {
    id: "panel-arthritis",
    name: "Arthritis & Inflammation Panel",
    shortCode: "RA + hs-CRP + Uric",
    subtitle: "RA Factor, hs-CRP, Uric Acid & Calcium",
    hindiName: "गठिया एवं जोड़ों के दर्द की जांच (आरए फैक्टर व सीआरपी)",
    clusterRef: "Cluster 2.5 — Master Rheumatology & Serology",
    department: "Biochemistry",
    deptBadgeClass: "bg-teal-50 text-teal-900 border-teal-200/80",
    spineClass: "spine-biochem",
    vacutainerTube: "1x Gold SST (3.0 mL) Turbidimetry",
    tubeCategory: "serum",
    tubeColorClass: "vacutainer-dot-serum",
    prickCount: 1,
    needleSpec: "Pediatric 23G/25G ultra-thin needle",
    doctorQuestion: "Why test Quantitative RA Factor and CRP together?",
    doctorAnswer: "Accurately quantifies circulating rheumatoid autoantibodies alongside active systemic inflammation to differentiate rheumatoid arthritis from non-inflammatory joint wear.",
    parameters: [
      "Rheumatoid Factor (RA Factor - Quantitative)",
      "C-Reactive Protein (CRP - Quantitative)"
    ],
    measuredAnalytes: [
      "Quantitative Rheumatoid Factor (Automated Immunoturbidimetry)",
      "Quantitative C-Reactive Protein (High-Sensitivity Immunoturbidimetry)"
    ],
    calculatedRatios: [],
    fastingHours: 0,
    fastingNote: "No fasting required. Maintain routine hydration.",
    chaiAllowed: true,
    waterAllowed: true,
    bpMedsAllowed: true,
    diabetesMedsHold: false,
    clinicalPearl: "Differentiates autoimmune inflammatory arthritis from degenerative joint pain and quantifies acute systemic inflammatory load.",
    constituentTestIds: ["web-067","web-066","web-026","web-007"],
    keywords: ["arthritis","gathiya","gathiya bay","rheumatoid","ra factor","crp","c-reactive protein","uric acid","esr","joint pain","jodo ka dard","ghutno ka dard","stiffness","morning stiffness","swelling","inflammation","sujan"],
    transparentPrice: 1100,
    turnaroundEstimate: "TAT: 6 Hours"
  },
  {
    id: "panel-prostate-male",
    name: "Male Vitality & Prostate Panel",
    shortCode: "PSA + Testosterone",
    subtitle: "Total PSA, Free/Total Testosterone & LH",
    hindiName: "प्रोस्टेट व पुरुष हार्मोन जांच (PSA व टेस्टोस्टेरोन)",
    clusterRef: "Cluster 3.4 — Master Urological Endocrinology",
    department: "Endocrinology",
    deptBadgeClass: "bg-purple-50 text-purple-900 border-purple-200/80",
    spineClass: "spine-clia",
    vacutainerTube: "1x Gold SST (3.0 mL) CLIA",
    tubeCategory: "serum",
    tubeColorClass: "vacutainer-dot-serum",
    prickCount: 1,
    needleSpec: "Pediatric 23G/25G ultra-thin safety needle",
    doctorQuestion: "What does the Prostate & Male Hormone Profile check?",
    doctorAnswer: "Screens for prostate tissue enlargement (BPH) or inflammation (PSA) and evaluates active circulating androgen levels for stamina, muscle maintenance, and vitality.",
    parameters: [
      "Prostate-Specific Antigen (PSA - Total)",
      "Total Testosterone (CLIA)",
      "Free Testosterone (CLIA)"
    ],
    measuredAnalytes: [
      "Total PSA (Chemiluminescence Immunoassay CLIA)",
      "Total Testosterone (Competitive CLIA)",
      "Free Testosterone (Competitive CLIA)"
    ],
    calculatedRatios: [],
    fastingHours: 8,
    fastingNote: "Morning sample (07:00 AM–10:00 AM) optimal due to circadian testosterone rhythm. Avoid heavy cycling or ejaculation 48 hours prior to PSA blood draw.",
    chaiAllowed: false,
    waterAllowed: true,
    bpMedsAllowed: true,
    diabetesMedsHold: true,
    clinicalPearl: "Evaluates prostate glandular integrity alongside bioavailable testosterone to investigate urinary symptoms and male vitality.",
    constituentTestIds: ["web-062","web-058"],
    keywords: ["prostate","psa","testosterone","male hormone","prostate specific antigen","bph","urine blockage","peshab me rukawat","frequent urination","male vitality","androgen","libido","purush hormone"],
    transparentPrice: 1450,
    turnaroundEstimate: "TAT: 12 Hours"
  },
  {
    id: "panel-growth-pituitary",
    name: "Growth & Pituitary Axis Panel",
    shortCode: "hGH + Prolactin + TSH",
    subtitle: "Human Growth Hormone, Prolactin & Ultrasensitive TSH",
    hindiName: "ग्रोथ हार्मोन व पिट्यूटरी प्रोफाइल (GH व प्रोलैक्टिन)",
    clusterRef: "Cluster 3.5 — Master Pituitary Axis",
    department: "Endocrinology",
    deptBadgeClass: "bg-purple-50 text-purple-900 border-purple-200/80",
    spineClass: "spine-clia",
    vacutainerTube: "1x Gold SST (3.0 mL) CLIA",
    tubeCategory: "serum",
    tubeColorClass: "vacutainer-dot-serum",
    prickCount: 1,
    needleSpec: "Pediatric 23G/25G needle with resting draw protocol",
    doctorQuestion: "Why test Growth Hormone and Pituitary markers?",
    doctorAnswer: "Evaluates anterior pituitary endocrine function for delayed physical growth in children, or unexplained fatigue, body composition shifts, and pituitary adenomas in adults.",
    parameters: [
      "Human Growth Hormone (hGH - Fasting)",
      "Prolactin (PRL - Pituitary)",
      "Ultrasensitive TSH (Thyroid Stimulating Hormone)"
    ],
    measuredAnalytes: [
      "Human Growth Hormone GH (Chemiluminescence CLIA)",
      "Prolactin (Chemiluminescence CLIA)",
      "Ultrasensitive 3rd-Gen TSH (Chemiluminescence CLIA)"
    ],
    calculatedRatios: [],
    fastingHours: 8,
    fastingNote: "Strict 8-hour overnight fast. Patient should sit quietly and rest 20-30 minutes prior to blood draw to eliminate stress-induced hormone spikes.",
    chaiAllowed: false,
    waterAllowed: true,
    bpMedsAllowed: true,
    diabetesMedsHold: true,
    clinicalPearl: "Assesses anterior pituitary reserve with standardized resting collection to prevent stress-induced growth hormone and prolactin artifacts.",
    constituentTestIds: ["web-057","web-050"],
    keywords: ["growth hormone","gh","hgh","pituitary","prolactin","tsh","height","delayed growth","short stature","kad","lambai","endocrine","pituitary gland"],
    transparentPrice: 1350,
    turnaroundEstimate: "TAT: 12 Hours"
  }
];

export function getPanelsForTest(testId: string): ClinicalPanel[] {
  const normalized = testId.toLowerCase();
  return clinicalPanels.filter((panel) =>
    panel.constituentTestIds.some((id) => id.toLowerCase() === normalized)
  );
}

export function getConstituentTestsForPanel(panelId: string, allTests: { id: string }[]): { id: string }[] {
  const panel = clinicalPanels.find((p) => p.id === panelId);
  if (!panel) return [];
  const constituentSet = new Set(panel.constituentTestIds.map((id) => id.toLowerCase()));
  return allTests.filter((test) => constituentSet.has(test.id.toLowerCase()));
}
