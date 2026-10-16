import type { RefObject } from 'react';
import { ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import { Button } from './ui/button';

interface BatchPaginationBarProps {
  currentPage: number;
  pageSize?: number;
  totalItems: number;
  onPageChange: (nextPage: number) => void;
  gridTopRef?: RefObject<HTMLElement | null>;
}

export function BatchPaginationBar({
  currentPage,
  pageSize = 12,
  totalItems,
  onPageChange,
  gridTopRef,
}: BatchPaginationBarProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  if (totalItems <= pageSize) {
    return null;
  }

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);
  const progressPercent = Math.round((endItem / totalItems) * 100);

  const handleStep = (targetPage: number) => {
    onPageChange(targetPage);
    if (gridTopRef?.current) {
      gridTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      const testsSection = document.getElementById('tests');
      if (testsSection) {
        testsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <nav
      aria-label="Test catalog pages"
      className="mt-8 rounded-2xl border border-[#CBE0DF] bg-white p-4 shadow-peacock-card sm:p-5"
    >
      {/* Top Row: Batch Counter & Accessible Range Label */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="inline-flex items-center gap-2 font-bold text-[#0A1128]">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-[#0A1128] text-[#FFC300]">
            <Layers className="h-3.5 w-3.5" />
          </span>
          <p className="text-xs font-medium text-slate-700" aria-live="polite">
            Showing {startItem}–{endItem} of {totalItems} tests
          </p>
        </div>

        <span className="rounded-full bg-[#F3F8F8] border border-[#D5E5E4] px-2.5 py-0.5 text-[11px] font-bold text-[#2C465E]">
          Batch {currentPage} of {totalPages}
        </span>
      </div>

      {/* Peacock Spectrum Progress Bar (#0A1128 -> #0A6C82 -> #0B6E66 -> #FFC300) */}
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#EAF3F3]">
        <div
          className="peacock-progress-fill h-full rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Bottom Row: Controls */}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            disabled={currentPage <= 1}
            onClick={() => handleStep(currentPage - 1)}
            className="action-button min-h-11 rounded-[14px] font-bold"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Previous
          </Button>

          <span className="min-w-20 text-center text-xs font-bold text-slate-700" aria-label={`Page ${currentPage} of ${totalPages}`}>
            Page {currentPage} of {totalPages}
          </span>

          <Button
            type="button"
            variant="outline"
            disabled={currentPage >= totalPages}
            onClick={() => handleStep(currentPage + 1)}
            className="action-button min-h-11 rounded-[14px] font-bold"
          >
            Next
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        {/* Page Dot Indicators (Desktop) */}
        <div className="hidden sm:flex items-center gap-1.5" aria-hidden="true">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
            const isActive = pageNum === currentPage;
            return (
              <button
                key={pageNum}
                type="button"
                tabIndex={-1}
                onClick={() => handleStep(pageNum)}
                aria-label={`Go to batch ${pageNum}`}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  isActive
                    ? 'w-7 bg-[#0B6E66]'
                    : 'w-2.5 bg-[#CBE0DF] hover:bg-[#0A6C82]'
                }`}
              />
            );
          })}
        </div>
      </div>
    </nav>
  );
}
