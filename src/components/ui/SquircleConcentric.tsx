import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SquircleConcentricProps extends React.HTMLAttributes<HTMLDivElement> {
  outerRadius?: number; // in pixels (default: 24 = 1.5rem)
  padding?: number;     // in pixels (default: 10 = 0.625rem)
  children: React.ReactNode;
}

export interface SquircleInnerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * SquircleConcentric - Mathematically Enforced Concentric Geometry
 *
 * Implements R_inner = max(0, R_outer - padding) to ensure parallel curvature lines
 * between card edges and nested control buttons/badges.
 */
export function SquircleConcentric({
  outerRadius = 24,
  padding = 10,
  children,
  className,
  style,
  ...props
}: SquircleConcentricProps) {
  const innerRadius = Math.max(0, outerRadius - padding);

  const customStyle: React.CSSProperties = {
    ...style,
    borderRadius: `${outerRadius}px`,
    padding: `${padding}px`,
    ['--concentric-outer' as string]: `${outerRadius}px`,
    ['--concentric-inner' as string]: `${innerRadius}px`,
    ['--concentric-padding' as string]: `${padding}px`,
  };

  return (
    <div
      data-squircle-concentric="outer"
      data-outer-radius={outerRadius}
      data-inner-radius={innerRadius}
      className={cn('apple-squircle-card relative overflow-hidden', className)}
      style={customStyle}
      {...props}
    >
      {children}
    </div>
  );
}

export function SquircleInner({
  children,
  className,
  style,
  ...props
}: SquircleInnerProps) {
  const customStyle: React.CSSProperties = {
    ...style,
    borderRadius: 'var(--concentric-inner, 0.875rem)',
  };

  return (
    <div
      data-squircle-concentric="inner"
      className={cn('apple-squircle-inner relative overflow-hidden', className)}
      style={customStyle}
      {...props}
    >
      {children}
    </div>
  );
}

SquircleConcentric.Inner = SquircleInner;
