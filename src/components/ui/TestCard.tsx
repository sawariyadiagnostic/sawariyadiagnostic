import { useState } from 'react';
import { Check, ClipboardList, Home } from 'lucide-react';
import { Button } from './button';
import type { MedicalTest } from '@/data/publishedCatalog';
import { TestDetailModal } from '../catalog/TestDetailModal';
import { formatInr } from '@/lib/utils';

interface TestCardProps {
  test: MedicalTest;
  isSelected: boolean;
  onToggleRequest: (testId: string) => void;
  onViewDetails?: (test: MedicalTest) => void;
}

export function TestCard({ test, isSelected, onToggleRequest, onViewDetails }: TestCardProps) {
  const [showDetail, setShowDetail] = useState(false);

  const handleCardClick = () => {
    if (onViewDetails) {
      onViewDetails(test);
    } else {
      setShowDetail(true);
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category.toLowerCase()) {
      case 'routine':
      case 'blood':
        return 'bg-blue-50 text-blue-900 border-blue-200/80';
      case 'diabetes':
        return 'bg-green-50 text-[#102A43] border-green-200/80';
      case 'thyroid':
      case 'hormone':
        return 'bg-[#F4EEEA] text-[#7A4B2A] border-[#D7C7B8]';
      case 'lipid':
        return 'bg-[#FFF9F3] text-[#7A4B2A] border-[#D7C7B8]';
      case 'specialized':
        return 'bg-blue-50 text-[#102A43] border-blue-200/80';
      default:
        return 'bg-blue-50 text-blue-900 border-blue-200/80';
    }
  };

  return (
    <>
      <div 
        className="glass-card ui-card p-5 sm:p-6 flex flex-col justify-between h-full group bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] hover:border-[#155E9A]/40 transition-surface duration-300 relative overflow-hidden"
      >
        {/* Subtle hover gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-emerald-500/0 to-teal-500/0 group-hover:from-blue-500/5 group-hover:to-[#FFF9F3]0/5 transition-colors duration-500 pointer-events-none" />
        
        <div className="flex-1 flex flex-col justify-between">
          <div>
            {/* Top Badges */}
            <div className="flex items-center justify-between mb-3 gap-2">
              {test.popular ? (
                <span className="bg-[#155E9A] text-[var(--accent-on-dark)] text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-2xs border border-white/20">
                  ★ Popular
                </span>
              ) : (
                <span className={`text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full capitalize border ${getCategoryBadge(test.category)}`}>
                  {test.category}
                </span>
              )}

              {test.homeCollection && (
                <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-800 border border-blue-200/80 text-[10px] sm:text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                  <Home className="w-3 h-3 text-[#155E9A]" /> Home Visit
                </span>
              )}
            </div>
            
            {/* Title & Description */}
            <h3 aria-label={test.name} className="mb-1.5 text-base font-bold leading-snug text-[#1D1D1F] transition-colors sm:text-lg">
              <button
                type="button"
                aria-label={`View details for ${test.name}`}
                onClick={handleCardClick}
                className="text-left underline-offset-4 hover:text-[#155E9A] hover:underline focus-visible:text-[#155E9A] focus-visible:underline"
              >
                {test.name}
              </button>
            </h3>
            
            <p className="text-xs text-[var(--text-muted)] mb-4 line-clamp-2 leading-relaxed font-normal">
              {test.description}
            </p>
          </div>
          
          {/* Parameters Preview */}
          {test.parameters && test.parameters.length > 0 && (
            <div className="mb-4 space-y-1.5">
              <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block">Key Parameters:</span>
              <div className="flex flex-wrap gap-1">
                {test.parameters.slice(0, 3).map((param) => (
                  <span 
                    key={param} 
                    className="text-[10.5px] bg-slate-50 text-slate-700 px-2.5 py-0.5 rounded-md font-medium border border-slate-200/80"
                  >
                    {param}
                  </span>
                ))}
                {test.parameters.length > 3 && (
                  <span className="text-[10.5px] bg-blue-50 text-blue-800 px-2 py-0.5 rounded-md font-semibold border border-blue-200/80">
                    +{test.parameters.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Price & Action */}
        <div className="pt-4 mt-auto border-t border-slate-100">
          <div className="flex items-center justify-between mb-3.5">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-[#1D1D1F]">{formatInr(test.price)}</span>
                {test.originalPrice && test.originalPrice > test.price && (
                  <span className="text-xs text-[var(--text-muted)] line-through font-normal">{formatInr(test.originalPrice)}</span>
                )}
              </div>
              <span className="text-[10px] text-[var(--text-muted)] font-medium">Quality process</span>
            </div>
          </div>

          {/* Request actions */}
          <div className="action-row">
            {isSelected ? (
              <div role="status" aria-live="polite" className="flex min-h-11 w-full items-center justify-center gap-2 rounded-[14px] border border-[#C9DFD5] bg-[#EFF7F2] px-3 py-2 text-xs font-bold text-[#185B3B]">
                <Check className="h-4 w-4 shrink-0" />
                <span>Added to Request</span>
              </div>
            ) : (
              <Button
                type="button"
                size="sm"
                aria-pressed={false}
                onClick={() => onToggleRequest(test.id)}
                className="action-button h-auto min-h-11 w-full min-w-0 rounded-[14px] px-2 text-[11px] font-bold sm:px-3 sm:text-xs"
              >
                <ClipboardList className="h-3.5 w-3.5 shrink-0" />
                <span className="min-w-0">Add to Request</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      <TestDetailModal
        item={test}
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
      />
    </>
  );
}
