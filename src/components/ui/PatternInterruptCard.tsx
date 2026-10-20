import * as React from 'react';
import { m, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { appleSpring } from '@/lib/motion';

export interface PatternInterruptCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  badgeText?: string;
  interactive?: boolean;
}

/**
 * PatternInterruptCard - Conversion Surface Primitive
 *
 * Flips the interface rhythm from daytime clinical porcelain (#F8FAFC)
 * to authoritative Peacock Midnight Sapphire (#0A1128 to #112240)
 * with specular gold/cyan highlights to break scroll autopilot at checkout.
 */
export const PatternInterruptCard = React.forwardRef<HTMLDivElement, PatternInterruptCardProps>(
  (
    {
      children,
      badgeText,
      interactive = true,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <m.div
        ref={ref}
        data-pattern-interrupt="true"
        whileHover={interactive ? { y: -2, scale: 1.005 } : undefined}
        whileTap={interactive ? { scale: 0.985 } : undefined}
        transition={appleSpring}
        className={cn(
          'pattern-interrupt-card relative flex flex-col justify-between overflow-hidden p-5 sm:p-6',
          'rounded-[var(--radius-card-outer,1.5rem)] text-white shadow-xl',
          'border border-[rgba(255,195,0,0.35)]',
          className
        )}
        style={{
          background:
            'radial-gradient(circle at 90% 10%, rgba(10, 108, 130, 0.35), transparent 50%), linear-gradient(145deg, #0A1128 0%, #112240 100%)',
          boxShadow:
            'inset 0 1px 0 0 rgba(255, 255, 255, 0.25), 0 12px 32px -8px rgba(10, 17, 40, 0.55), 0 0 24px -2px rgba(10, 108, 130, 0.30)',
        }}
        {...props}
      >
        {/* Subtle Ambient Ocellus Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#0A6C82]/20 blur-3xl"
        />

        {/* Optional Interrupt Pill */}
        {badgeText && (
          <div className="mb-3 flex items-center">
            <span className="inline-flex items-center gap-1 rounded-[var(--radius-badge,0.625rem)] border border-[#FFC300]/40 bg-[#FFC300]/15 px-2.5 py-0.5 text-[10.5px] font-extrabold tracking-wide text-[#FFD98A] shadow-xs backdrop-blur-md">
              ★ {badgeText}
            </span>
          </div>
        )}

        <div className="relative z-10 flex flex-1 flex-col justify-between">
          {children}
        </div>
      </m.div>
    );
  }
);

PatternInterruptCard.displayName = 'PatternInterruptCard';
