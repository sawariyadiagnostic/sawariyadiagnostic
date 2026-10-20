import * as React from 'react';
import { cn } from '@/lib/utils';

export type MetricDisplaySize = 'sm' | 'md' | 'lg' | 'xl';
export type MetricDisplayAlign = 'start' | 'center' | 'end';

export interface MetricDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  value: React.ReactNode;
  label: string;
  size?: MetricDisplaySize;
  sublabel?: string;
  unit?: string;
  align?: MetricDisplayAlign;
  invert?: boolean;
}

const sizeConfig: Record<
  MetricDisplaySize,
  { valueClass: string; labelClass: string; sublabelClass: string }
> = {
  sm: {
    valueClass: 'text-base sm:text-lg font-bold tracking-tight',
    labelClass: 'text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase',
    sublabelClass: 'text-[9.5px] text-slate-400',
  },
  md: {
    valueClass: 'text-xl sm:text-2xl font-extrabold tracking-tight',
    labelClass: 'text-xs sm:text-[12.5px] font-semibold tracking-wider uppercase',
    sublabelClass: 'text-[10.5px] text-slate-400',
  },
  lg: {
    valueClass: 'text-2xl sm:text-3xl font-black tracking-tight',
    labelClass: 'text-xs sm:text-sm font-semibold tracking-wider uppercase',
    sublabelClass: 'text-xs text-slate-400',
  },
  xl: {
    valueClass: 'text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight',
    labelClass: 'text-sm sm:text-base font-semibold tracking-wider uppercase',
    sublabelClass: 'text-xs sm:text-sm text-slate-400',
  },
};

const alignConfig: Record<MetricDisplayAlign, string> = {
  start: 'items-start text-left',
  center: 'items-center text-center',
  end: 'items-end text-right',
};

/**
 * MetricDisplay - Cognitive App Primitive: Metric First, Label Second
 *
 * Renders tabular, bold quantitative anchors prior to qualitative labels,
 * matching rapid cognitive processing in top consumer healthcare applications.
 */
export const MetricDisplay = React.forwardRef<HTMLDivElement, MetricDisplayProps>(
  (
    {
      value,
      label,
      size = 'md',
      sublabel,
      unit,
      align = 'start',
      invert = false,
      className,
      ...props
    },
    ref
  ) => {
    const config = sizeConfig[size];
    const valueString = typeof value === 'string' || typeof value === 'number' ? String(value) : '';
    const accessibleLabel = `${label}: ${valueString}${unit ? ` ${unit}` : ''}`;

    return (
      <div
        ref={ref}
        role="group"
        aria-label={accessibleLabel}
        data-metric-display="true"
        data-metric-size={size}
        className={cn(
          'inline-flex flex-col justify-center min-w-0 select-none',
          alignConfig[align],
          className
        )}
        {...props}
      >
        {/* METRIC FIRST (Quantitative Anchor) */}
        <div
          data-slot="metric-value"
          className={cn(
            'flex items-baseline gap-1 tabular-nums min-w-0 leading-none',
            config.valueClass,
            invert ? 'text-white' : 'text-[#0A1128]'
          )}
        >
          <span>{value}</span>
          {unit && (
            <span
              className={cn(
                'text-xs font-semibold tracking-normal',
                invert ? 'text-slate-300' : 'text-[#455468]'
              )}
            >
              {unit}
            </span>
          )}
        </div>

        {/* LABEL SECOND (Qualitative Descriptors) */}
        <div
          data-slot="metric-label"
          className={cn(
            'mt-1 leading-snug truncate max-w-full',
            config.labelClass,
            invert ? 'text-[#FFD98A]' : 'text-[#455468]'
          )}
        >
          {label}
        </div>

        {/* OPTIONAL CONTEXTUAL SUBLABEL */}
        {sublabel && (
          <div
            data-slot="metric-sublabel"
            className={cn(
              'mt-0.5 leading-tight truncate max-w-full',
              config.sublabelClass,
              invert ? 'text-slate-400' : 'text-slate-500'
            )}
          >
            {sublabel}
          </div>
        )}
      </div>
    );
  }
);

MetricDisplay.displayName = 'MetricDisplay';
