import { useState } from 'react';
import { ShieldCheck, FileText, HeartHandshake, X } from 'lucide-react';

export type PolicyType = 'privacy' | 'terms' | 'charter' | null;

interface LegalModalProps {
  type: PolicyType;
  onClose: () => void;
}

export function LegalModal({ type, onClose }: LegalModalProps) {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white/95 backdrop-blur-2xl rounded-[32px] shadow-[0_32px_80px_rgba(0,0,0,0.2)] border border-white/60 overflow-hidden max-h-[85vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-6 bg-[#072448] text-white flex items-center justify-between relative overflow-hidden">
          {/* Liquid Header Glow */}
          <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
            <div className="absolute top-[-50%] right-[-10%] w-[150px] h-[150px] bg-[#00A896] rounded-full blur-[40px] animate-liquid mix-blend-screen" />
          </div>

          <div className="flex items-center gap-3 relative z-10">
            {type === 'privacy' && <ShieldCheck className="w-6 h-6 text-teal-400" />}
            {type === 'terms' && <FileText className="w-6 h-6 text-teal-400" />}
            {type === 'charter' && <HeartHandshake className="w-6 h-6 text-teal-400" />}
            <div>
              <h3 className="text-lg font-bold text-white">
                {type === 'privacy' && 'Privacy & Medical Data Policy'}
                {type === 'terms' && 'Terms of Service & Patient Rights'}
                {type === 'charter' && 'Patient Quality & Charity Charter'}
              </h3>
              <p className="text-xs text-slate-400">Sawariya Diagnostic Lab • Charkhi Dadri</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 text-slate-300 hover:text-white transition-colors relative z-10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed bg-white/50 backdrop-blur-md">
          {type === 'privacy' && (
            <>
              <h4 className="font-bold text-slate-900 text-base">1. Patient Confidentiality & Data Security</h4>
              <p>
                At Sawariya Diagnostic Lab, we adhere strictly to patient confidentiality ethics and data protection standards under Indian healthcare regulations. All diagnostic reports, blood test results, medical histories, and doctor referral slips are treated with utmost confidentiality.
              </p>

              <h4 className="font-bold text-slate-900 text-base">2. Collection & Usage of Diagnostic Data</h4>
              <p>
                We collect your name, age, gender, contact number, and address strictly for:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Accurate sample tagging and barcoding to prevent mix-ups.</li>
                <li>Dispatching digital PDF test reports directly to your WhatsApp / Email.</li>
                <li>Conducting home phlebotomy appointments within Charkhi Dadri and surrounding villages.</li>
              </ul>

              <h4 className="font-bold text-slate-900 text-base">3. Non-Disclosure & Encryption</h4>
              <p>
                Your medical data will never be sold, rented, or shared with unauthorized commercial third parties. Reports are shared only with you or your designated treating physician.
              </p>

              <h4 className="font-bold text-slate-900 text-base">4. Contact Grievance Officer</h4>
              <p>
                For privacy or report verification inquiries, email us at <strong className="text-slate-900">sawariyadiagnosticckd11@gmail.com</strong> or call our 24/7 Desk at <strong className="text-slate-900">+91 99919 41207</strong>.
              </p>
            </>
          )}

          {type === 'terms' && (
            <>
              <h4 className="font-bold text-slate-900 text-base">1. Diagnostic Testing & Interpretation</h4>
              <p>
                Diagnostic investigations performed at Sawariya Diagnostic are intended to aid clinical decision-making. Results must be interpreted in conjunction with complete clinical findings by a registered medical practitioner.
              </p>

              <h4 className="font-bold text-slate-900 text-base">2. Patient Rights</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Right to Precision:</strong> Samples processed using automated calibrated analyzers with multi-point QC controls.</li>
                <li><strong>Right to Clear Pricing:</strong> Complete transparency with no hidden convenience fees or unannounced charges.</li>
                <li><strong>Right to Timely Reports:</strong> Fast reporting (same day / 6-24 hours) as per test parameters.</li>
                <li><strong>Right to Re-verification:</strong> In case of clinical discrepancy, free re-run verification of the existing archived sample as per NABL guidelines.</li>
              </ul>

              <h4 className="font-bold text-slate-900 text-base">3. Home Collection Protocols</h4>
              <p>
                Patients requesting home collection must provide accurate location and fasting/pre-test conditions as advised by our staff (e.g. 10-12 hours fasting for Lipid and Blood Glucose tests).
              </p>

              <h4 className="font-bold text-slate-900 text-base">4. 24/7 Lab Escalations</h4>
              <p>
                For any immediate clinical escalations or urgent reports, our 24/7 Desk is reachable at <strong className="text-slate-900">+91 99919 41207</strong>, and emergency director assistance is available at <strong className="text-slate-900">+91 70152 90782</strong>.
              </p>
            </>
          )}

          {type === 'charter' && (
            <>
              <h4 className="font-bold text-slate-900 text-base">1. Community Health & Quality Commitment</h4>
              <p>
                Sawariya Diagnostic was founded with a foundational commitment to providing accessible, top-tier clinical diagnostic care to every resident of Charkhi Dadri and adjoining rural Haryana communities.
              </p>

              <h4 className="font-bold text-slate-900 text-base">2. Subsidized & Charity Health Camps</h4>
              <p>
                We conduct regular subsidized community health screenings, free diabetes checks, and concessional testing for underprivileged families, senior citizens, and patients referred by local government healthcare initiatives.
              </p>

              <h4 className="font-bold text-slate-900 text-base">3. Strict Ethical Practices</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Single-use, sterile, vacuum-sealed collection vacutainers for 100% infection prevention.</li>
                <li>Daily calibration using certified standards and bio-medical waste segregation.</li>
                <li>Empathetic, compassionate care for pediatric and geriatric patients during collection.</li>
              </ul>

              <h4 className="font-bold text-slate-900 text-base">4. Connect for Community Camps</h4>
              <p>
                Organizations or gram panchayats interested in organizing free or subsidized blood testing camps may write to <strong className="text-slate-900">sawariyadiagnosticckd11@gmail.com</strong>.
              </p>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-white/70 backdrop-blur-md border-t border-white/80 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-[#072448] text-white text-xs font-semibold hover:bg-[#0A6E5C] transition-colors shadow-md shadow-[#072448]/20"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}
