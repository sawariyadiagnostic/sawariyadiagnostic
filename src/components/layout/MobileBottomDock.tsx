// File: src/components/layout/MobileBottomDock.tsx
'use client';

import { FileText, Home, PhoneCall, MessageCircle, Sparkles } from 'lucide-react';
import { useKeyboardOpen } from '@/hooks/useKeyboardOpen';
import { useRequisition } from '../requisition/RequisitionContext';
import { ReportDownloadModal } from '../ui/ReportDownloadModal';
import { siteConfig, telHref, whatsappHref } from '@/config/site';

export interface MobileBottomDockProps {
  selectedCount?: number;
  totalPrice?: number;
  isAnyModalOpen?: boolean;
  onOpenReportModal?: () => void;
  onOpenVisitModal?: () => void;
  onOpenCartModal?: () => void;
}

export function MobileBottomDock({
  selectedCount: propSelectedCount,
  totalPrice: propTotalPrice,
  isAnyModalOpen = false,
  onOpenReportModal,
  onOpenVisitModal,
  onOpenCartModal,
}: MobileBottomDockProps = {}) {
  const isKeyboardOpen = useKeyboardOpen();
  const requisition = useRequisition();

  const selectedCount =
    propSelectedCount !== undefined ? propSelectedCount : requisition.selectedTests.length;
  const totalPrice =
    propTotalPrice !== undefined
      ? propTotalPrice
      : requisition.selectedTests.reduce((sum, t) => sum + (t.price || 0), 0);

  // Hide dock when virtual keyboard or a modal is open
  if (isKeyboardOpen || isAnyModalOpen) {
    return null;
  }

  const handlePrimaryVisitOrCart = () => {
    if (selectedCount > 0) {
      if (onOpenCartModal) {
        onOpenCartModal();
      } else {
        requisition.setOpen(true);
      }
    } else if (onOpenVisitModal) {
      onOpenVisitModal();
    } else {
      const el = document.getElementById('home-collection');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const phoneHref = telHref(siteConfig.contact.phone);
  const handleWhatsApp = () => {
    const url = whatsappHref('Hello Sawariya Diagnostic Lab, I need assistance with a diagnostic test or home collection.');
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <nav
      aria-label="Mobile Quick Actions"
      className="fixed bottom-3 inset-x-0 z-40 px-3 md:hidden pointer-events-none"
    >
      <div className="mx-auto max-w-md pointer-events-auto">
        <div
          data-squircle="26"
          className="squircle-tray flex items-center justify-between gap-1.5 rounded-[26px] p-2 border-0 shadow-2xl"
          style={{
            background:
              'radial-gradient(circle at 85% 15%, rgba(21, 94, 154, 0.28), transparent 55%), rgba(16, 42, 67, 0.94)',
            backdropFilter: 'blur(24px) saturate(190%)',
            WebkitBackdropFilter: 'blur(24px) saturate(190%)',
          }}
        >
          {/* 1. Reports Button (Frosted Sapphire Pill) */}
          {onOpenReportModal ? (
            <button
              type="button"
              data-squircle="18"
              onClick={onOpenReportModal}
              className="squircle-dock-btn apple-pressable flex items-center justify-center gap-1.5 rounded-[18px] bg-white/[0.08] px-3.5 py-3 text-xs font-extrabold text-white hover:bg-white/[0.14] cursor-pointer"
            >
              <FileText className="h-4 w-4 text-blue-300 shrink-0" />
              <span>Reports</span>
            </button>
          ) : (
            <ReportDownloadModal
              trigger={
                <button
                  type="button"
                  data-squircle="18"
                  className="squircle-dock-btn apple-pressable flex items-center justify-center gap-1.5 rounded-[18px] bg-white/[0.08] px-3.5 py-3 text-xs font-extrabold text-white hover:bg-white/[0.14] cursor-pointer"
                  aria-label="Report assistance"
                >
                  <FileText className="h-4 w-4 text-blue-300 shrink-0" />
                  <span>Reports</span>
                </button>
              }
            />
          )}

          {/* 2. Primary Action: Request Visit in Hero Primary Gradient (Sawariya Crimson & Amber Coral) */}
          <button
            type="button"
            data-squircle="18"
            onClick={handlePrimaryVisitOrCart}
            className="squircle-dock-btn apple-pressable flex flex-1 items-center justify-center gap-1.5 rounded-[18px] px-3.5 py-3 text-xs font-black text-white shadow-md cursor-pointer min-w-0"
            style={{
              background: 'linear-gradient(135deg, #8F1D1D 0%, #C62828 48%, #D96B43 100%)',
              border: '1px solid rgba(254, 215, 170, 0.45)',
              boxShadow:
                'inset 0 1px 0 0 rgba(255, 255, 255, 0.45), 0 4px 16px -2px rgba(198, 40, 40, 0.45)',
            }}
          >
            {selectedCount > 0 ? (
              <>
                <Sparkles className="h-4 w-4 shrink-0 text-[#FFD98A]" />
                <span className="tabular-nums truncate font-black">
                  Book ({selectedCount}) • ₹{totalPrice}
                </span>
              </>
            ) : (
              <>
                <Home className="h-4 w-4 shrink-0 stroke-[2.4]" />
                <span className="truncate">Request Visit</span>
              </>
            )}
          </button>

          {/* 3. Direct Call Button with Warm Amber Gold Accent */}
          <a
            href={phoneHref}
            data-squircle="18"
            aria-label="Call Sawariya Diagnostic Lab"
            className="squircle-dock-btn apple-pressable flex h-11 w-11 shrink-0 items-center justify-center rounded-[18px] bg-white/[0.08] text-[#FFD98A] hover:bg-white/[0.15]"
          >
            <PhoneCall className="h-4 w-4" />
          </a>

          {/* 4. Peacock Emerald WhatsApp Button (Preserved exactly as requested) */}
          <button
            type="button"
            data-squircle="18"
            onClick={handleWhatsApp}
            aria-label="Chat on WhatsApp"
            className="squircle-dock-btn apple-pressable flex h-11 w-11 shrink-0 items-center justify-center rounded-[18px] text-white shadow-md cursor-pointer"
            style={{
              background: 'linear-gradient(145deg, #059669 0%, #04724D 100%)',
              boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.35)',
            }}
          >
            <MessageCircle className="h-5 w-5 fill-white/15" />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default MobileBottomDock;
