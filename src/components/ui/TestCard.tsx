import { Clock, Home, ArrowRight } from 'lucide-react';
import { Button } from './button';
import type { MedicalTest } from '@/data/mockTests';

interface TestCardProps {
  test: MedicalTest;
  onBook?: (testId: string) => void;
}

export function TestCard({ test, onBook }: TestCardProps) {
  const handleBook = () => {
    if (onBook) {
      onBook(test.id);
    } else {
      const contactSection = document.getElementById('contact');
      contactSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category.toLowerCase()) {
      case 'routine':
        return 'bg-blue-50 text-blue-900 border-blue-200/80';
      case 'diabetes':
        return 'bg-emerald-50 text-emerald-900 border-emerald-200/80';
      case 'thyroid':
        return 'bg-purple-50 text-purple-900 border-purple-200/80';
      case 'lipid':
        return 'bg-amber-50 text-amber-900 border-amber-200/80';
      case 'vitamins':
        return 'bg-cyan-50 text-cyan-900 border-cyan-200/80';
      case 'women':
        return 'bg-rose-50 text-rose-900 border-rose-200/80';
      default:
        return 'bg-teal-50 text-teal-900 border-teal-200/80';
    }
  };

  return (
    <div className="glass-card p-5 sm:p-6 flex flex-col justify-between group rounded-[24px] bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.1)] transition-all duration-300 relative overflow-hidden">
      {/* Subtle hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 via-emerald-500/0 to-teal-500/0 group-hover:from-teal-500/5 group-hover:to-emerald-500/5 transition-colors duration-500 pointer-events-none" />
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between mb-3 gap-2">
          {test.popular ? (
            <span className="bg-gradient-to-r from-[#072448] via-[#0D5C75] to-[#0A6E5C] text-[#FDE047] text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-2xs border border-teal-300/30">
              ★ Popular
            </span>
          ) : (
            <span className={`text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full capitalize border ${getCategoryBadge(test.category)}`}>
              {test.category}
            </span>
          )}

          {test.homeCollection && (
            <span className="inline-flex items-center gap-1 bg-teal-50 text-teal-800 border border-teal-200/80 text-[10px] sm:text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
              <Home className="w-3 h-3 text-[#0A6E5C]" /> Home Visit
            </span>
          )}
        </div>
        
        {/* Title & Description */}
        <h3 className="font-bold text-base sm:text-lg text-[#1D1D1F] mb-1.5 group-hover:text-[#0A6E5C] transition-colors leading-snug">
          {test.name}
        </h3>
        
        <p className="text-xs text-slate-500 mb-4 line-clamp-2 leading-relaxed font-normal">
          {test.description}
        </p>
        
        {/* Parameters Preview */}
        {test.parameters && test.parameters.length > 0 && (
          <div className="mb-4 space-y-1.5">
            <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block">Key Parameters:</span>
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
                <span className="text-[10.5px] bg-teal-50 text-teal-800 px-2 py-0.5 rounded-md font-semibold border border-teal-200/80">
                  +{test.parameters.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Price, Turnaround & Action */}
      <div className="pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between mb-3.5">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-[#1D1D1F]">₹{test.price}</span>
              {test.originalPrice && (
                <span className="text-xs text-slate-400 line-through font-normal">₹{test.originalPrice}</span>
              )}
            </div>
            <span className="text-[9.5px] text-slate-400 font-medium">Inclusive of taxes</span>
          </div>

          <div className="flex items-center gap-1 text-[10.5px] font-semibold text-slate-700 bg-slate-50 border border-slate-200/70 px-2.5 py-1 rounded-full">
            <Clock className="w-3 h-3 text-[#0A6E5C]" />
            <span>{test.turnaroundTime}</span>
          </div>
        </div>

        {/* Book Button */}
        <Button 
          onClick={handleBook}
          className="w-full btn-primary h-11 sm:h-12 text-xs sm:text-sm font-bold rounded-[16px] active:scale-[0.98] transition-all shadow-xs hover:shadow-md"
        >
          <span>Book Test Now</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
        </Button>
      </div>
    </div>
  );
}
