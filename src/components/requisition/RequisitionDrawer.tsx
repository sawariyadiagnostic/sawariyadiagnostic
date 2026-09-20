import { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle2, ClipboardList, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatInr } from '@/lib/utils';
import { whatsappHref } from '@/config/site';
import { useRequisition } from './RequisitionContext';

type Step = 'review' | 'patient';

export function RequisitionDrawer() {
  const { state, selectedTests, manifest, removeTest, clear, setDrawerOpen, updatePatient } = useRequisition();
  const [step, setStep] = useState<Step>('review');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!state.drawerOpen) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') setDrawerOpen(false); };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [setDrawerOpen, state.drawerOpen]);

  if (!state.drawerOpen) return null;

  const sendToWhatsApp = () => {
    const { fullName, phone, address, landmark, pinCode, preferredDate, preferredSlot, age, gender } = state.patient;
    if (!fullName.trim() || !/^[6-9]\d{9}$/.test(phone.replace(/\D/g, '')) || !address.trim()) {
      setError('Enter the patient name, a valid 10-digit mobile number, and complete address.');
      setStep('patient');
      return;
    }

    const items = selectedTests.map((test, index) => `${index + 1}. ${test.name} — ${formatInr(test.price)}`).join('\n');
    const samples = manifest.sampleGroups.map((group) => `• ${group.label}: confirm tube count with lab`).join('\n');
    const notes = manifest.preparationNotes.map((note) => `• ${note}`).join('\n');
    const message = `*SAWARIYA DIAGNOSTIC LAB — TEST REQUISITION*\n\n*Patient*\n• Name: ${fullName}\n• Mobile: ${phone}\n• Age/Gender: ${age || 'Not provided'} / ${gender || 'Not provided'}\n• Address: ${address}\n• Landmark: ${landmark || 'Not provided'}\n• PIN: ${pinCode}\n\n*Selected tests (${selectedTests.length})*\n${items}\n\n*Collection summary*\n• Tests subtotal: ${formatInr(manifest.subtotal)}\n• Collection fee: ${manifest.collectionFee === 0 ? 'No fee at this subtotal' : formatInr(manifest.collectionFee)}\n• Estimated total: ${formatInr(manifest.total)}\n• Preparation: ${manifest.timingNotice}\n${notes}\n*Sample groups*\n${samples}\n\n*Preferred appointment*\n• Date: ${preferredDate || 'To be confirmed'}\n• Slot: ${preferredSlot || 'To be confirmed'}\n\nPlease confirm availability, preparation instructions, and the final appointment with the lab desk.`;
    const url = whatsappHref(message);
    if (!url) {
      setError('WhatsApp is not configured. Please call the lab desk instead.');
      return;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return <div className="fixed inset-0 z-[110] flex justify-end bg-[#102A43]/70 backdrop-blur-sm" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) setDrawerOpen(false); }}>
    <section className="flex h-[100dvh] w-full max-w-[500px] flex-col bg-white shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="requisition-title">
      <header className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4 sm:px-6">
        <div><div className="mb-1 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#155E9A]"><ClipboardList className="h-3.5 w-3.5" /> One collection request</div><h2 id="requisition-title" className="text-xl font-black text-[#102A43]">Test requisition slip</h2><p className="mt-1 text-xs text-slate-500">{selectedTests.length} individual test{selectedTests.length === 1 ? '' : 's'} selected</p></div>
        <button type="button" aria-label="Close requisition slip" onClick={() => setDrawerOpen(false)} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200"><X className="h-5 w-5" /></button>
      </header>

      <nav className="grid grid-cols-2 border-b border-slate-200 bg-slate-50 p-1" aria-label="Requisition steps">
        <button type="button" onClick={() => setStep('review')} className={`min-h-11 rounded-[10px] text-xs font-bold ${step === 'review' ? 'bg-white text-[#102A43] shadow-sm' : 'text-slate-500'}`}>1. Review tests</button>
        <button type="button" onClick={() => setStep('patient')} className={`min-h-11 rounded-[10px] text-xs font-bold ${step === 'patient' ? 'bg-white text-[#102A43] shadow-sm' : 'text-slate-500'}`}>2. Patient details</button>
      </nav>

      <div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-6">
        {step === 'review' ? <>
          {manifest.hasTwoStageCollection && <div className="mb-4 flex gap-2 rounded-[14px] border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-900"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" /><span><strong>Confirm a two-stage schedule.</strong> Fasting and post-meal glucose are both selected; the lab must confirm whether two draws are needed.</span></div>}
          <div className="space-y-2">
            {selectedTests.map((test) => <div key={test.id} className="flex items-start justify-between gap-3 rounded-[14px] border border-slate-200 p-3"><div className="min-w-0"><span className="text-[10px] font-bold uppercase tracking-wider text-[#155E9A]">{test.sampleGroup.split(' / ')[0]}</span><h3 className="mt-1 text-sm font-bold leading-snug text-[#102A43]">{test.name}</h3><p className="mt-1 text-[11px] text-slate-500">{test.fastingHours ? `${test.fastingHours}h preparation may apply` : 'Preparation to be confirmed'}</p></div><div className="flex shrink-0 flex-col items-end gap-2"><strong className="text-sm text-[#102A43]">{formatInr(test.price)}</strong><button type="button" onClick={() => removeTest(test.id)} className="text-[11px] font-bold text-[#C62828] hover:underline">Remove</button></div></div>)}
          </div>
          <div className="mt-5 rounded-[16px] border border-slate-200 bg-slate-50 p-4"><h3 className="text-xs font-bold uppercase tracking-wider text-[#102A43]">Collection guidance</h3><p className="mt-2 text-xs leading-relaxed text-slate-700">{manifest.timingNotice}</p><div className="mt-3 space-y-1 text-[11px] text-slate-600">{manifest.sampleGroups.map((group) => <div key={group.label}>• {group.label} — {group.count} selected test{group.count === 1 ? '' : 's'}</div>)}</div><p className="mt-3 text-[10px] leading-relaxed text-slate-500">This is a request summary, not a final clinical collection instruction. The lab desk confirms the appointment, tubes, and preparation before collection.</p></div>
          <button type="button" onClick={clear} className="mt-4 text-xs font-bold text-slate-500 hover:text-[#C62828]">Clear selected tests</button>
        </> : <form className="space-y-4" onSubmit={(event) => { event.preventDefault(); sendToWhatsApp(); }}>
          <div className="rounded-[14px] border border-blue-100 bg-blue-50 p-3 text-xs leading-relaxed text-slate-700">Enter details once for the complete prescription. The website keeps this as a local draft only; sending opens WhatsApp for your review.</div>
          {error && <p role="alert" className="rounded-[12px] border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-800">{error}</p>}
          <Field label="Patient full name *"><input required value={state.patient.fullName} onChange={(e) => updatePatient({ fullName: e.target.value })} placeholder="e.g. Rajesh Sharma" /></Field>
          <div className="grid grid-cols-2 gap-3"><Field label="WhatsApp mobile *"><input required inputMode="numeric" pattern="[6-9][0-9]{9}" value={state.patient.phone} onChange={(e) => updatePatient({ phone: e.target.value.replace(/\D/g, '').slice(0, 10) })} placeholder="10-digit number" /></Field><Field label="Age"><input inputMode="numeric" value={state.patient.age} onChange={(e) => updatePatient({ age: e.target.value })} placeholder="Age" /></Field></div>
          <Field label="Gender"><select value={state.patient.gender} onChange={(e) => updatePatient({ gender: e.target.value as 'MALE' | 'FEMALE' | 'OTHER' | '' })}><option value="">Prefer not to say</option><option value="MALE">Male</option><option value="FEMALE">Female</option><option value="OTHER">Other</option></select></Field>
          <Field label="Complete collection address *"><textarea required rows={3} value={state.patient.address} onChange={(e) => updatePatient({ address: e.target.value })} placeholder="House/ward, mohalla/street, Charkhi Dadri" /></Field>
          <Field label="Landmark"><input value={state.patient.landmark} onChange={(e) => updatePatient({ landmark: e.target.value })} placeholder="Nearby landmark" /></Field>
          <div className="grid grid-cols-2 gap-3"><Field label="PIN code"><input readOnly value={state.patient.pinCode} /></Field><Field label="Preferred date"><input type="date" value={state.patient.preferredDate} onChange={(e) => updatePatient({ preferredDate: e.target.value })} /></Field></div>
          <Field label="Preferred time window"><select value={state.patient.preferredSlot} onChange={(e) => updatePatient({ preferredSlot: e.target.value })}><option value="">Lab to confirm</option><option>06:30 AM - 08:00 AM</option><option>08:00 AM - 09:30 AM</option><option>09:30 AM - 11:30 AM</option><option>04:00 PM - 07:00 PM</option></select></Field>
        </form>}
      </div>

      <footer className="border-t border-slate-200 bg-white p-5 pb-[calc(env(safe-area-inset-bottom,0px)+1.25rem)] sm:p-6"><div className="mb-3 flex items-end justify-between gap-3"><div className="text-xs text-slate-500"><div>Tests: {formatInr(manifest.subtotal)}</div><div>Collection fee: {manifest.collectionFee ? formatInr(manifest.collectionFee) : 'No fee at this subtotal'}</div></div><div className="text-right"><span className="block text-[10px] uppercase tracking-wider text-slate-500">Estimated total</span><strong className="text-2xl font-black text-[#102A43]">{formatInr(manifest.total)}</strong></div></div>{step === 'review' ? <Button type="button" onClick={() => setStep('patient')} className="action-button min-h-12 w-full rounded-[14px] btn-primary font-bold">Continue to patient details</Button> : <Button type="button" onClick={sendToWhatsApp} className="action-button min-h-12 w-full rounded-[14px] bg-[#128C7E] font-bold text-white hover:bg-[#0F766E]"><CheckCircle2 className="mr-2 h-4 w-4" />Review and send on WhatsApp</Button>}<p className="mt-2 text-center text-[10px] leading-relaxed text-slate-500">The request is not confirmed until the lab desk replies or calls you.</p></footer>
    </section>
  </div>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block text-xs font-bold text-slate-700">{label}<span className="mt-1.5 block [&>input]:h-11 [&>input]:w-full [&>input]:rounded-[10px] [&>input]:border [&>input]:border-slate-300 [&>input]:bg-white [&>input]:px-3 [&>input]:text-sm [&>textarea]:w-full [&>textarea]:rounded-[10px] [&>textarea]:border [&>textarea]:border-slate-300 [&>textarea]:bg-white [&>textarea]:p-3 [&>textarea]:text-sm [&>select]:h-11 [&>select]:w-full [&>select]:rounded-[10px] [&>select]:border [&>select]:border-slate-300 [&>select]:bg-white [&>select]:px-3 [&>select]:text-sm">{children}</span></label>;
}
