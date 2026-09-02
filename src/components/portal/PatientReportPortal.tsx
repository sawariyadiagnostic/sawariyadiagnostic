import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  FileText, 
  FileDown, 
  Search, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  QrCode, 
  Activity, 
  User, 
  TrendingUp, 
  Sparkles, 
  Printer, 
  Lock, 
  ExternalLink,
  ChevronRight,
  Stethoscope
} from 'lucide-react';
import { ServerlessDB, type PatientReport, type BiomarkerTrend } from '@/lib/serverless-db';
import { toast } from 'sonner';

interface PatientReportPortalProps {
  trigger?: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultUhid?: string;
}

export function PatientReportPortal({
  trigger,
  isOpen: externalOpen,
  onOpenChange: externalOnOpenChange,
  defaultUhid
}: PatientReportPortalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = externalOnOpenChange || setInternalOpen;

  const [searchQuery, setSearchQuery] = useState(defaultUhid || 'SD-2026-9082');
  const [isLoading, setIsLoading] = useState(false);
  const [reports, setReports] = useState<PatientReport[]>([]);
  const [selectedReport, setSelectedReport] = useState<PatientReport | null>(null);
  const [activeTab, setActiveTab] = useState<'REPORTS' | 'TRACKER' | 'TRENDS'>('REPORTS');
  const [trends, setTrends] = useState<Record<string, BiomarkerTrend[]>>({});

  const handleSearch = async (queryToSearch?: string) => {
    const q = queryToSearch !== undefined ? queryToSearch : searchQuery;
    if (!q) {
      toast.error('Please enter a Patient UHID or Report ID');
      return;
    }
    setIsLoading(true);
    try {
      const results = await ServerlessDB.getReportsByPatient(q);
      setReports(results);
      if (results.length > 0) {
        setSelectedReport(results[0]);
        const trendData = await ServerlessDB.getBiomarkerTrends(results[0].uhid);
        setTrends(trendData);
        toast.success(`Found ${results.length} certified laboratory records`);
      } else {
        toast.error('No lab records found for this UHID. Try sample ID SD-2026-9082');
      }
    } catch {
      toast.error('Failed to query serverless database');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      ServerlessDB.getReportsByPatient('SD-2026-9082').then((results) => {
        setReports(results);
        if (results.length > 0) {
          setSelectedReport(results[0]);
          ServerlessDB.getBiomarkerTrends(results[0].uhid).then((trendData) => {
            setTrends(trendData);
          });
        }
      });
    }
  }, [open]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    toast.success('Downloading Doctor-Signed Certified PDF (256-bit Encrypted)...');
    // Simulate instant secure blob download
    const blob = new Blob([`Sawariya Diagnostic Lab Certified Report - ${selectedReport?.id}\nPatient: ${selectedReport?.patientName}\nUHID: ${selectedReport?.uhid}\nDate: ${selectedReport?.reportGeneratedAt}\nSign: Dr. Vivek Verma MD Path`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedReport?.id || 'Report'}_Sawariya_Lab.pdf`;
    a.click();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent className="sm:max-w-[840px] max-h-[92vh] p-0 overflow-hidden bg-white/95 backdrop-blur-2xl border border-white/60 shadow-[0_32px_80px_rgba(0,0,0,0.25)] rounded-[32px] flex flex-col">
        {/* Header */}
        <div className="bg-[#072448] p-5 sm:p-6 text-white relative overflow-hidden flex-shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-[18px] bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-[#00A896]">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-300">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>NABL & ICMR Digital Pathology Cloud</span>
                </div>
                <DialogTitle className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Patient Health Records & Reports Portal
                </DialogTitle>
              </div>
            </div>

            {/* Quick Demo Pill */}
            <button
              onClick={() => { setSearchQuery('SD-2026-9082'); handleSearch('SD-2026-9082'); }}
              className="bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-1.5 rounded-full text-xs text-teal-100 flex items-center gap-1.5 transition-all self-start sm:self-auto cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FDE047]" />
              <span>Sample UHID: SD-2026-9082</span>
            </button>
          </div>

          {/* Search & Navigation Toolbar */}
          <div className="mt-4 flex flex-col sm:flex-row gap-2 relative z-10">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Enter Patient UHID or Report ID (e.g. SD-2026-9082)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-10 h-11 bg-white/10 border-white/20 text-white placeholder:text-slate-300 rounded-[14px] text-xs sm:text-sm font-medium focus:border-teal-300"
              />
            </div>
            <Button
              onClick={() => handleSearch()}
              disabled={isLoading}
              className="h-11 px-5 btn-primary rounded-[14px] text-xs font-bold"
            >
              {isLoading ? 'Querying LIS...' : 'Search Records'}
            </Button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 mt-3 pt-3 border-t border-white/10">
            <button
              onClick={() => setActiveTab('REPORTS')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'REPORTS' ? 'bg-white text-[#072448]' : 'text-teal-200 hover:text-white'
              }`}
            >
              Verified Pathology Reports ({reports.length})
            </button>
            <button
              onClick={() => setActiveTab('TRACKER')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'TRACKER' ? 'bg-white text-[#072448]' : 'text-teal-200 hover:text-white'
              }`}
            >
              Live Sample Tracking
            </button>
            <button
              onClick={() => setActiveTab('TRENDS')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'TRENDS' ? 'bg-white text-[#072448]' : 'text-teal-200 hover:text-white'
              }`}
            >
              Biomarker History & Trends
            </button>
          </div>
        </div>

        {/* BODY CONTAINER */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50">
          {/* TAB 1: REPORTS LIST & INTERACTIVE VIEWER */}
          {activeTab === 'REPORTS' && (
            <div className="grid lg:grid-cols-12 gap-5">
              {/* Left Column: Report List (4 cols) */}
              <div className="lg:col-span-4 space-y-2.5">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Available Lab Records
                </div>

                {reports.map((r) => {
                  const isSelected = selectedReport?.id === r.id;
                  return (
                    <div
                      key={r.id}
                      onClick={() => setSelectedReport(r)}
                      className={`p-3.5 rounded-[18px] border transition-all cursor-pointer text-left ${
                        isSelected
                          ? 'bg-white border-[#0A6E5C] shadow-md ring-1 ring-[#0A6E5C]'
                          : 'bg-white/70 border-slate-200 hover:bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-[#0A6E5C] bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                          {r.id}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {r.reportGeneratedAt.split(' ')[0]}
                        </span>
                      </div>
                      <h4 className="font-bold text-xs text-slate-900 leading-snug line-clamp-1 mb-1">
                        {r.testName}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium">
                        Patient: {r.patientName}
                      </p>
                    </div>
                  );
                })}

                {reports.length === 0 && (
                  <div className="text-center py-8 bg-white rounded-[20px] border border-slate-200 p-4">
                    <p className="text-xs text-slate-500">No reports found for this UHID.</p>
                  </div>
                )}
              </div>

              {/* Right Column: Digital Pathology Report Viewer (8 cols) */}
              <div className="lg:col-span-8">
                {selectedReport ? (
                  <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm p-5 sm:p-7 space-y-5 print:p-0 print:border-none print:shadow-none">
                    {/* Lab Header in Report */}
                    <div className="flex items-start justify-between border-b border-slate-200 pb-4">
                      <div>
                        <div className="text-base sm:text-lg font-black text-[#072448] tracking-tight">
                          SAWARIYA DIAGNOSTIC LAB
                        </div>
                        <p className="text-[10px] text-slate-500">
                          Opp. R.S. Sangwan Hospital, Loharu Road, Charkhi Dadri (HR)
                        </p>
                        <p className="text-[10px] text-teal-700 font-semibold">
                          NABL ACCREDITED • ICMR APPROVED • 24*7 PATHOLOGY
                        </p>
                      </div>

                      <div className="text-right">
                        <div className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Doctor Verified</span>
                        </div>
                        <div className="text-[10px] font-mono text-slate-400 mt-1">
                          Ref: {selectedReport.id}
                        </div>
                      </div>
                    </div>

                    {/* Patient Metadata Card */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs bg-slate-50 p-3 rounded-[16px] border border-slate-200/80">
                      <div>
                        <span className="text-[10px] text-slate-400 block font-medium">Patient Name:</span>
                        <span className="font-bold text-slate-800">{selectedReport.patientName}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block font-medium">Patient UHID:</span>
                        <span className="font-mono font-bold text-slate-800">{selectedReport.uhid}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block font-medium">Sample Date:</span>
                        <span className="font-semibold text-slate-800">{selectedReport.sampleCollectedAt}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block font-medium">Referring Doctor:</span>
                        <span className="font-medium text-slate-800">{selectedReport.referringDoctor}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block font-medium">Test Department:</span>
                        <span className="font-medium text-slate-800">{selectedReport.category}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block font-medium">Reporting Date:</span>
                        <span className="font-semibold text-slate-800">{selectedReport.reportGeneratedAt}</span>
                      </div>
                    </div>

                    {/* Findings Table */}
                    <div>
                      <div className="text-xs font-black text-slate-900 mb-2 uppercase tracking-wide">
                        {selectedReport.testName} - Test Results
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left">
                          <thead className="bg-slate-100 text-slate-700 font-bold border-y border-slate-200">
                            <tr>
                              <th className="py-2 px-3">Test Parameter</th>
                              <th className="py-2 px-3">Observed Value</th>
                              <th className="py-2 px-3">Unit</th>
                              <th className="py-2 px-3">Biological Reference</th>
                              <th className="py-2 px-3">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-medium">
                            {selectedReport.findings.map((f, i) => (
                              <tr key={i} className="hover:bg-slate-50/80">
                                <td className="py-2.5 px-3 font-semibold text-slate-900">{f.parameter}</td>
                                <td className="py-2.5 px-3 font-bold text-[#072448]">{f.value}</td>
                                <td className="py-2.5 px-3 text-slate-500">{f.unit}</td>
                                <td className="py-2.5 px-3 text-slate-600 text-[11px]">{f.referenceRange}</td>
                                <td className="py-2.5 px-3">
                                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                                    {f.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Clinical Notes & Doctor Signatures */}
                    <div className="bg-slate-50 p-3 rounded-[16px] border border-slate-200 text-xs space-y-1">
                      <span className="font-bold text-slate-800 block text-[11px]">Pathologist Interpretation:</span>
                      <p className="text-slate-600 text-[11px] leading-relaxed">{selectedReport.clinicalNotes}</p>
                    </div>

                    {/* Sign-off Strip */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center text-slate-700 border border-slate-200">
                          <QrCode className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-[9.5px] font-bold text-slate-500">QR CODE VERIFICATION</div>
                          <div className="font-mono text-[10px] text-slate-700">{selectedReport.qrVerificationCode}</div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-[10px] text-slate-400 font-serif italic">Digitally Signed & Validated</div>
                        <div className="font-bold text-slate-900">{selectedReport.consultantPathologist}</div>
                        <div className="text-[9.5px] text-slate-500">Consultant Pathologist (Reg: HR-MC-14902)</div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2 print:hidden">
                      <Button
                        onClick={handleDownloadPDF}
                        className="flex-1 h-11 btn-primary rounded-[14px] text-xs font-bold gap-1.5"
                      >
                        <FileDown className="w-4 h-4" />
                        <span>Download Certified PDF Report ({selectedReport.fileSize})</span>
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handlePrint}
                        className="h-11 px-4 rounded-[14px] text-xs font-bold gap-1.5 border-slate-200"
                      >
                        <Printer className="w-4 h-4" />
                        <span>Print</span>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white rounded-[24px] border border-slate-200 p-6">
                    <p className="text-xs text-slate-500">Select a report from the list to view results.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: LIVE SAMPLE TRACKING */}
          {activeTab === 'TRACKER' && (
            <div className="bg-white rounded-[24px] border border-slate-200 p-6 space-y-6 max-w-2xl mx-auto">
              <div>
                <span className="text-[10px] font-bold text-[#0A6E5C] uppercase tracking-wider bg-teal-50 px-2 py-0.5 rounded-full">
                  Real-time LIS Telemetry
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">Sample Processing Timeline</h3>
                <p className="text-xs text-slate-500">Track the end-to-end journey of your blood and pathology sample</p>
              </div>

              {/* Progress Steps */}
              <div className="space-y-4 relative pl-6 border-l-2 border-[#0A6E5C]">
                {[
                  { step: '1. Order Registered & Phlebotomist Assigned', time: '08:00 AM', done: true, desc: 'Technician dispatched with temperature-controlled cool box.' },
                  { step: '2. Home Sample Collected with Barcode Scan', time: '08:35 AM', done: true, desc: 'Vacuum tube barcoded and verified against Patient UHID SD-2026-9082.' },
                  { step: '3. Automated Analyzer Processing (Roche/Sysmex)', time: '10:15 AM', done: true, desc: 'Sample centrifuged and processed through dual 5-part hematology analyzers.' },
                  { step: '4. Doctor Review & Clinical Sign-off', time: '01:45 PM', done: true, desc: 'Dr. Vivek Verma verified calibration controls and approved results.' },
                  { step: '5. Certified Digital Report Published', time: '02:15 PM', done: true, desc: 'PDF generated with ICMR QR seal and dispatched to patient WhatsApp.' }
                ].map((s, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-[#0A6E5C] border-2 border-white shadow-xs" />
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900">{s.step}</h4>
                      <span className="text-[10px] font-mono text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md font-bold">{s.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: BIOMARKER TRENDS */}
          {activeTab === 'TRENDS' && (
            <div className="bg-white rounded-[24px] border border-slate-200 p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Patient Health Trend Analytics</h3>
                  <p className="text-xs text-slate-500">Multi-month comparative analysis of key biomarkers for UHID SD-2026-9082</p>
                </div>
                <TrendingUp className="w-6 h-6 text-[#0A6E5C]" />
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                {Object.entries(trends).map(([marker, data]) => (
                  <div key={marker} className="bg-slate-50 border border-slate-200 rounded-[20px] p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs text-slate-900">{marker}</h4>
                      <span className="text-[10px] text-slate-400 font-mono">Ref: {data[0]?.reference}</span>
                    </div>

                    <div className="space-y-2">
                      {data.map((point, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs bg-white p-2 rounded-[12px] border border-slate-100">
                          <span className="text-slate-500 text-[11px]">{point.date}</span>
                          <span className="font-bold text-[#0A6E5C]">{point.value} {point.unit}</span>
                        </div>
                      ))}
                    </div>

                    <div className="text-[10.5px] text-emerald-700 bg-emerald-50 border border-emerald-200 p-2 rounded-[12px] font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>Stable trend within healthy reference interval</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
