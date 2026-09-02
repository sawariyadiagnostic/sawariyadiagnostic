import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Database, 
  Plus, 
  Trash2, 
  Edit3, 
  Send, 
  RotateCcw, 
  Sparkles, 
  Check, 
  Code2, 
  Download, 
  Upload, 
  Globe, 
  Layers
} from 'lucide-react';
import { CMSClient, type CMSConfig } from '@/lib/cms-client';
import type { MedicalTest, HealthPackage } from '@/data/mockTests';
import { toast } from 'sonner';

interface StaffCMSModalProps {
  trigger?: React.ReactNode;
  onCatalogUpdated?: () => void;
}

export function StaffCMSModal({ trigger, onCatalogUpdated }: StaffCMSModalProps) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'TESTS' | 'PACKAGES' | 'WEBHOOK' | 'SCHEMA'>('TESTS');
  
  const [tests, setTests] = useState<MedicalTest[]>(() => CMSClient.getTests());
  const [packages, setPackages] = useState<HealthPackage[]>(() => CMSClient.getPackages());
  const [config, setConfig] = useState<CMSConfig>(() => CMSClient.getConfig());

  // Edit / New Test Form State
  const [editingTest, setEditingTest] = useState<MedicalTest | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [githubToken, setGithubToken] = useState('');
  const [isDispatching, setIsDispatching] = useState(false);

  // Form fields
  const [testForm, setTestForm] = useState({
    id: '',
    name: '',
    description: '',
    price: 300,
    originalPrice: 500,
    turnaroundTime: '4-6 hours',
    category: 'blood' as const,
    parameters: 'Hemoglobin, TLC, Platelets',
    homeCollection: true,
    popular: false
  });

  const handleStartNewTest = () => {
    setTestForm({
      id: `custom-test-${Date.now().toString().slice(-4)}`,
      name: '',
      description: '',
      price: 299,
      originalPrice: 499,
      turnaroundTime: '4-6 hours',
      category: 'blood',
      parameters: '',
      homeCollection: true,
      popular: false
    });
    setIsCreatingNew(true);
    setEditingTest(null);
  };

  const handleEditTest = (test: MedicalTest) => {
    setTestForm({
      id: test.id,
      name: test.name,
      description: test.description,
      price: test.price,
      originalPrice: test.originalPrice || test.price,
      turnaroundTime: test.turnaroundTime,
      category: test.category,
      parameters: test.parameters ? test.parameters.join(', ') : '',
      homeCollection: test.homeCollection,
      popular: !!test.popular
    });
    setEditingTest(test);
    setIsCreatingNew(false);
  };

  const handleSaveTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testForm.name || !testForm.id) {
      toast.error('Test Name and ID are required');
      return;
    }

    const newTest: MedicalTest = {
      id: testForm.id.toLowerCase().replace(/[^a-z0-9-_]/g, '-'),
      name: testForm.name,
      description: testForm.description || `${testForm.name} pathology test at Sawariya Diagnostic Lab.`,
      price: Number(testForm.price),
      originalPrice: Number(testForm.originalPrice),
      turnaroundTime: testForm.turnaroundTime,
      category: testForm.category,
      parameters: testForm.parameters.split(',').map((p) => p.trim()).filter(Boolean),
      homeCollection: testForm.homeCollection,
      popular: testForm.popular
    };

    const updated = CMSClient.saveTest(newTest);
    setTests(updated);
    setEditingTest(null);
    setIsCreatingNew(false);
    toast.success(`Saved "${newTest.name}" to Headless CMS test catalog`);
    onCatalogUpdated?.();
  };

  const handleDeleteTest = (id: string) => {
    if (confirm('Are you sure you want to remove this test from the catalog?')) {
      const updated = CMSClient.deleteTest(id);
      setTests(updated);
      toast.success('Test removed from catalog');
      onCatalogUpdated?.();
    }
  };

  const handleTriggerWebhook = async () => {
    setIsDispatching(true);
    try {
      const res = await CMSClient.triggerRebuildWebhook(githubToken);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error('Failed to dispatch webhook');
    } finally {
      setIsDispatching(false);
    }
  };

  const handleResetDefaults = () => {
    if (confirm('Reset CMS catalog back to original lab default tests?')) {
      CMSClient.resetToDefaults();
      setTests(CMSClient.getTests());
      setPackages(CMSClient.getPackages());
      toast.success('Catalog reset to laboratory defaults');
      onCatalogUpdated?.();
    }
  };

  const handleExportJSON = () => {
    const data = {
      tests,
      packages,
      exportedAt: new Date().toISOString(),
      provider: 'Sanity.io / Contentful Export'
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sawariya_cms_catalog_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    toast.success('Downloaded CMS dataset JSON');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent className="sm:max-w-[840px] max-h-[90vh] p-0 overflow-hidden bg-white/95 backdrop-blur-2xl border border-white/60 shadow-[0_32px_80px_rgba(0,0,0,0.25)] rounded-[32px] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#072448] via-[#0D5C75] to-[#0A6E5C] p-5 sm:p-6 text-white relative overflow-hidden flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-[18px] bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-[#FDE047]">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-teal-200">
                  Headless CMS & GitHub Actions Engine
                </div>
                <DialogTitle className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Staff Diagnostic Test Catalog Manager
                </DialogTitle>
              </div>
            </div>

            <Button
              size="sm"
              variant="outline"
              onClick={handleExportJSON}
              className="bg-white/10 hover:bg-white/20 border-white/20 text-white text-xs gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </Button>
          </div>
          <DialogDescription className="text-xs text-teal-100/90 mt-1">
            Dynamic content editing without a backend server. Changes can be published via GitHub Actions webhooks.
          </DialogDescription>

          {/* Tab Navigation */}
          <div className="flex gap-2 mt-4 pt-3 border-t border-white/10">
            <button
              onClick={() => { setActiveTab('TESTS'); setEditingTest(null); setIsCreatingNew(false); }}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'TESTS' ? 'bg-white text-[#072448]' : 'text-teal-200 hover:text-white'
              }`}
            >
              Diagnostic Tests ({tests.length})
            </button>
            <button
              onClick={() => { setActiveTab('PACKAGES'); setEditingTest(null); setIsCreatingNew(false); }}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'PACKAGES' ? 'bg-white text-[#072448]' : 'text-teal-200 hover:text-white'
              }`}
            >
              Health Packages ({packages.length})
            </button>
            <button
              onClick={() => setActiveTab('WEBHOOK')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'WEBHOOK' ? 'bg-white text-[#072448]' : 'text-teal-200 hover:text-white'
              }`}
            >
              GitHub Actions Webhook
            </button>
            <button
              onClick={() => setActiveTab('SCHEMA')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'SCHEMA' ? 'bg-white text-[#072448]' : 'text-teal-200 hover:text-white'
              }`}
            >
              Sanity Studio Schema
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50">
          {/* TAB 1: TESTS MANAGEMENT */}
          {activeTab === 'TESTS' && (
            <div>
              {/* If editing or creating */}
              {isCreatingNew || editingTest ? (
                <form onSubmit={handleSaveTest} className="bg-white p-5 rounded-[22px] border border-slate-200 shadow-sm space-y-4 max-w-xl mx-auto">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="font-bold text-sm text-slate-900">
                      {isCreatingNew ? 'Add New Diagnostic Test' : `Edit "${editingTest?.name}"`}
                    </h3>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => { setIsCreatingNew(false); setEditingTest(null); }}
                      className="text-xs"
                    >
                      Cancel
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs font-bold text-slate-700">Test Unique ID</Label>
                      <Input
                        value={testForm.id}
                        onChange={(e) => setTestForm({ ...testForm, id: e.target.value })}
                        placeholder="e.g. lipid-extended"
                        disabled={!isCreatingNew}
                        required
                        className="h-10 text-xs mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-bold text-slate-700">Category</Label>
                      <select
                        value={testForm.category}
                        onChange={(e) => setTestForm({ ...testForm, category: e.target.value as 'blood' | 'hormone' | 'specialized' })}
                        className="w-full h-10 bg-slate-50 border border-slate-200 rounded-[12px] px-3 mt-1 text-xs"
                      >
                        <option value="blood">Blood Routine</option>
                        <option value="hormone">Hormone & Endocrine</option>
                        <option value="specialized">Specialized & Immunology</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs font-bold text-slate-700">Test Full Name</Label>
                    <Input
                      value={testForm.name}
                      onChange={(e) => setTestForm({ ...testForm, name: e.target.value })}
                      placeholder="e.g. Vitamin D3 (25-Hydroxy)"
                      required
                      className="h-10 text-xs mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs font-bold text-slate-700">Offer Price (₹)</Label>
                      <Input
                        type="number"
                        value={testForm.price}
                        onChange={(e) => setTestForm({ ...testForm, price: Number(e.target.value) })}
                        required
                        className="h-10 text-xs mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-bold text-slate-700">Original MRP (₹)</Label>
                      <Input
                        type="number"
                        value={testForm.originalPrice}
                        onChange={(e) => setTestForm({ ...testForm, originalPrice: Number(e.target.value) })}
                        className="h-10 text-xs mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs font-bold text-slate-700">Turnaround Time</Label>
                    <Input
                      value={testForm.turnaroundTime}
                      onChange={(e) => setTestForm({ ...testForm, turnaroundTime: e.target.value })}
                      placeholder="e.g. 4-6 hours, 24 hours"
                      className="h-10 text-xs mt-1"
                    />
                  </div>

                  <div>
                    <Label className="text-xs font-bold text-slate-700">Parameters (comma separated)</Label>
                    <Input
                      value={testForm.parameters}
                      onChange={(e) => setTestForm({ ...testForm, parameters: e.target.value })}
                      placeholder="e.g. Fasting Sugar, Post Prandial, HbA1c"
                      className="h-10 text-xs mt-1"
                    />
                  </div>

                  <div>
                    <Label className="text-xs font-bold text-slate-700">Clinical Description</Label>
                    <Input
                      value={testForm.description}
                      onChange={(e) => setTestForm({ ...testForm, description: e.target.value })}
                      placeholder="e.g. Used to assess metabolic sugar control..."
                      className="h-10 text-xs mt-1"
                    />
                  </div>

                  <div className="flex items-center gap-4 pt-1 text-xs">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={testForm.homeCollection}
                        onChange={(e) => setTestForm({ ...testForm, homeCollection: e.target.checked })}
                      />
                      <span>Available for Home Sample</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={testForm.popular}
                        onChange={(e) => setTestForm({ ...testForm, popular: e.target.checked })}
                      />
                      <span>Highlight as Popular</span>
                    </label>
                  </div>

                  <Button type="submit" className="w-full h-11 btn-primary rounded-[14px] text-xs font-bold">
                    Save Changes to CMS
                  </Button>
                </form>
              ) : (
                <div className="space-y-4">
                  {/* Top Toolbar */}
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-slate-600 font-medium">
                      Managing <strong>{tests.length}</strong> tests in active catalog
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleResetDefaults}
                        className="text-xs rounded-full gap-1"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Reset Defaults</span>
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleStartNewTest}
                        className="btn-primary text-xs rounded-full gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add New Test</span>
                      </Button>
                    </div>
                  </div>

                  {/* List of tests */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    {tests.map((test) => (
                      <div
                        key={test.id}
                        className="bg-white p-3.5 rounded-[18px] border border-slate-200 shadow-2xs flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-mono text-slate-400 font-bold">{test.id}</span>
                            <span className="text-xs font-black text-[#0A6E5C]">₹{test.price}</span>
                          </div>
                          <h4 className="font-bold text-xs text-slate-900 leading-snug">{test.name}</h4>
                          <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{test.description}</p>
                        </div>

                        <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-100">
                          <span className="text-[10px] text-slate-400 capitalize">{test.category}</span>
                          <div className="flex gap-1.5">
                            <button
                              onClick={() => handleEditTest(test)}
                              className="p-1 rounded-md text-slate-500 hover:text-[#0A6E5C] hover:bg-slate-100 transition-all cursor-pointer"
                              title="Edit test"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteTest(test.id)}
                              className="p-1 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer"
                              title="Delete test"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: HEALTH PACKAGES */}
          {activeTab === 'PACKAGES' && (
            <div className="space-y-3">
              <div className="text-xs text-slate-600 font-medium">
                Comprehensive Diagnostic Profiles ({packages.length})
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {packages.map((pkg) => (
                  <div key={pkg.id} className="bg-white p-4 rounded-[20px] border border-slate-200 shadow-2xs">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-slate-900">{pkg.name}</span>
                      <span className="text-sm font-black text-[#0A6E5C]">₹{pkg.price}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mb-2">{pkg.description}</p>
                    <div className="text-[10.5px] text-slate-600 bg-slate-50 p-2 rounded-[12px] border border-slate-100">
                      <strong>Includes ({pkg.testsIncluded.length}):</strong> {pkg.testsIncluded.slice(0, 3).join(', ')}...
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: WEBHOOK TRIGGER */}
          {activeTab === 'WEBHOOK' && (
            <div className="bg-white rounded-[22px] border border-slate-200 p-6 space-y-4 max-w-xl mx-auto">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full">
                  Automated CI/CD Integration
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">GitHub Actions Rebuild Webhook</h3>
                <p className="text-xs text-slate-500">
                  When you make changes to diagnostic tests in Sanity.io, Contentful, or here, dispatching a webhook tells GitHub Actions to generate new static HTML pages and deploy them automatically.
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-700">GitHub Personal Access Token (Optional for live dispatch)</Label>
                <Input
                  type="password"
                  placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                  value={githubToken}
                  onChange={(e) => setGithubToken(e.target.value)}
                  className="h-10 text-xs"
                />
                <p className="text-[10px] text-slate-400">
                  Target: <code>Sawariya-Diagnostic/Sawariya-Diagnostic</code> (event: <code>cms_content_update</code>)
                </p>
              </div>

              <Button
                onClick={handleTriggerWebhook}
                disabled={isDispatching}
                className="w-full h-11 btn-primary rounded-[14px] text-xs font-bold gap-2"
              >
                {isDispatching ? (
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 animate-spin text-[#FDE047]" /> Dispatched...
                  </span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Dispatch GitHub Actions SSG Rebuild</span>
                  </>
                )}
              </Button>
            </div>
          )}

          {/* TAB 4: SCHEMA DEFINITION */}
          {activeTab === 'SCHEMA' && (
            <div className="bg-slate-900 text-slate-100 rounded-[22px] p-4 text-xs font-mono overflow-x-auto space-y-2 max-h-[380px]">
              <div className="text-[11px] text-teal-300 font-sans font-bold">
                Sanity Studio Schema Code (Ready to deploy to Sanity.io or Contentful):
              </div>
              <pre className="text-[11px] leading-relaxed text-slate-300">
{`export default {
  name: 'medicalTest',
  title: 'Diagnostic Test',
  type: 'document',
  fields: [
    { name: 'name', title: 'Test Name', type: 'string' },
    { name: 'price', title: 'Price (INR)', type: 'number' },
    { name: 'originalPrice', title: 'MRP', type: 'number' },
    { name: 'turnaroundTime', title: 'Turnaround Time', type: 'string' },
    { name: 'parameters', title: 'Parameters', type: 'array', of: [{type: 'string'}] },
    { name: 'homeCollection', title: 'Home Collection', type: 'boolean' }
  ]
}`}
              </pre>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
