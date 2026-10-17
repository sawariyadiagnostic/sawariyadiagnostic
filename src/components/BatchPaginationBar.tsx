// File: src/components/BatchPaginationBar.tsx
import type { RefObject } from 'react';
import { ChevronLeft, ChevronRight, Layers } from 'lucide-react';

interface BatchPaginationBarProps {
  currentPage: number;       // 1-indexed (1..7)
  pageSize?: number;         // 12 tests per batch
  totalItems: number;        // e.g., 74 tests
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
  const remainingCount = Math.max(0, totalItems - endItem);
  const nextBatchSize = Math.min(pageSize, remainingCount);

  const handleStep = (targetPage: number) => {
    if (targetPage < 1 || targetPage > totalPages || targetPage === currentPage) return;
    onPageChange(targetPage);
    if (gridTopRef?.current) {
      gridTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      const testsSection = document.getElementById('tests');
      if (testsSection) {
        testsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 280, behavior: 'smooth' });
      }
    }
  };

  return (
    <nav
      aria-label="Test catalog pages"
      className="mt-8 rounded-[24px] bg-white/95 p-5 sm:p-6 border border-[#CBE0DF] shadow-[0_8px_24px_-6px_rgba(10,17,40,0.06),inset_0_1px_0_0_#FFFFFF]"
    >
      {/* Top Row: Showing X-Y of 74 tests + Batch Pill */}
      <div className="flex items-center justify-between gap-2">
        <div className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-bold text-[#0A1128]">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-[10px] bg-[#0A1128] text-[#FFC300] shadow-xs">
            <Layers className="h-4 w-4" />
          </span>
          <span className="tabular-nums">
            Showing <span className="font-extrabold text-[#0A6C82]">{startItem}–{endItem}</span> of{' '}
            <span className="font-extrabold">{totalItems}</span> tests
          </span>
        </div>

        <span className="tabular-nums rounded-full bg-[#F2F7F9] border border-[#CBE0DF] px-3 py-1 text-xs font-extrabold text-[#0A1128]">
          Batch {currentPage} of {totalPages}
        </span>
      </div>

      {/* Iridescent Peacock Progress Track */}
      <div className="mt-3.5 h-2 w-full overflow-hidden rounded-full bg-[#E6F0F0] p-[1px]">
        <div
          className="h-full rounded-full transition-all duration-300 ease-out"
          style={{
            width: `${progressPercent}%`,
            background:
              'linear-gradient(90deg, #0A1128 0%, #0A6C82 40%, #0B6E66 75%, #FFC300 100%)',
          }}
        />
      </div>

      {/* Bottom Row: Previous Button (Left) | Sleek Pill Dots (Center) | Next Button (Right) */}
      <div className="mt-5 flex items-center justify-between gap-3">
        {/* Previous Button — Full Unclipped Border */}
        <button
          type="button"
          aria-label="Previous"
          disabled={currentPage <= 1}
          onClick={() => handleStep(currentPage - 1)}
          style={{ minHeight: '40px' }}
          className="inline-flex items-center justify-center gap-1.5 rounded-[14px] border border-[#B8D4D2] bg-white px-4 py-2 text-xs font-extrabold text-[#0A1128] shadow-2xs transition-all hover:border-[#0A6C82] hover:bg-[#F3F8F8] active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4 stroke-[2.5]" />
          <span>Previous 12</span>
        </button>

        {/* Center Compact Pill Dots (Explicitly overrides global button min-width/min-height!) */}
        <div className="hidden sm:flex items-center justify-center gap-1.5 px-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
            const isActive = pageNum === currentPage;
            return (
              <button
                key={pageNum}
                type="button"
                onClick={() => handleStep(pageNum)}
                aria-label={`Go to batch ${pageNum} of ${totalPages}`}
                aria-current={isActive ? 'page' : undefined}
                style={{
                  minWidth: isActive ? '28px' : '10px',
                  minHeight: '10px',
                  width: isActive ? '28px' : '10px',
                  height: '10px',
                  padding: 0,
                }}
                className={`rounded-full transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#0B6E66] shadow-[0_0_8px_rgba(11,110,102,0.4)]'
                    : 'bg-[#CBE0DF] hover:bg-[#0A6C82]/60'
                }`}
              />
            );
          })}
        </div>

        {/* Next Batch Button — Iridescent Peacock Teal Pill */}
        <button
          type="button"
          aria-label="Next"
          disabled={currentPage >= totalPages}
          onClick={() => handleStep(currentPage + 1)}
          style={{
            minHeight: '40px',
            background:
              currentPage >= totalPages
                ? '#94A3B8'
                : 'linear-gradient(135deg, #0A1128 0%, #0A6C82 52%, #0B6E66 100%)',
          }}
          className="inline-flex items-center justify-center gap-1.5 rounded-[14px] px-5 py-2 text-xs font-extrabold text-white shadow-[0_4px_12px_-2px_rgba(10,108,130,0.35),inset_0_1px_0_rgba(255,255,255,0.25)] transition-all hover:brightness-110 active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
        >
          <span>
            {nextBatchSize > 0 ? `Next ${nextBatchSize} Tests` : 'Final Batch'}
          </span>
          <ChevronRight className="h-4 w-4 stroke-[2.5]" />
        </button>
      </div>
    </nav>
  );
}

export default BatchPaginationBar;
