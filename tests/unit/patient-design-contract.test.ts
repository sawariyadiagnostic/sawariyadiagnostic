import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { appleSpring, gentleSpring, snappySpring, rubberBand } from "../../src/lib/motion";

const root = resolve(import.meta.dirname, "../..");
const read = (path: string) => readFileSync(resolve(root, path), "utf8");
const tokens = read("src/styles/tokens.css");
const styles = read("src/styles/components.css");
const buttons = read("src/components/ui/button.tsx");
const tailwind = read("tailwind.config.ts");
const metricDisplay = read("src/components/ui/MetricDisplay.tsx");
const patternCard = read("src/components/ui/PatternInterruptCard.tsx");
const squircleConcentric = read("src/components/ui/SquircleConcentric.tsx");

const declarations = tokens.match(/:root\s*\{([^}]*)\}/s)?.[1] ?? "";
const values = new Map(
  Array.from(declarations.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g), ([, name, value]) => [
    name,
    value.trim(),
  ])
);

function token(name: string): string {
  const value = values.get(name);
  if (!value || !/^#[\da-f]{6}$/i.test(value)) throw new Error(`Missing direct hex token ${name}`);
  return value;
}

function luminance(hex: string): number {
  const channels = hex.slice(1).match(/../g)!.map((channel) => parseInt(channel, 16) / 255);
  const linear = channels.map((channel) =>
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
  );
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
}

function contrast(first: string, second: string): number {
  const a = luminance(first);
  const b = luminance(second);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

describe("patient-facing shared control contract", () => {
  it("keeps shared action labels wrappable and icon geometry stable", () => {
    expect(buttons).not.toContain("whitespace-nowrap");
    expect(buttons).toContain('data-ui-size={size ?? "default"}');
    expect(styles).toContain(".ui-button > span");
    expect(styles).toContain("overflow-wrap: anywhere");
    expect(styles).toContain("button.ui-calendar-day");
  });

  it("provides contrast-tested light and dark text roles", () => {
    for (const background of ["--surface-white", "--surface-cream", "--surface-soft"]) {
      expect(contrast(token("--text-muted"), token(background)), `muted on ${background}`).toBeGreaterThanOrEqual(4.5);
    }
    for (const background of ["--brand-blue", "--brand-navy", "--action-primary"]) {
      expect(contrast(token("--text-on-action"), token(background)), `action on ${background}`).toBeGreaterThanOrEqual(4.5);
    }
  });

  it("adds native squircle only as progressive enhancement", () => {
    expect(styles).toContain("@supports (corner-shape: squircle)");
    expect(styles).toContain("corner-shape: squircle");
    expect(styles).toContain("border-radius: var(--radius-control)");
    expect(tailwind).toContain('"var(--radius-card)"');
  });

  // Pillar 1: Motion Physics Contract
  it("enforces Apple fluid physics spring constants and rubber-band attenuation", () => {
    expect(appleSpring.stiffness).toBe(260);
    expect(appleSpring.damping).toBe(24);
    expect(appleSpring.mass).toBe(0.75);

    // Verify damping ratio zeta is within organic underdamped range (0.75 to 0.95)
    const zetaApple = appleSpring.damping / (2 * Math.sqrt(appleSpring.stiffness * appleSpring.mass));
    expect(zetaApple).toBeGreaterThanOrEqual(0.75);
    expect(zetaApple).toBeLessThanOrEqual(0.95);

    // Verify gentle & snappy spring bounds
    expect(gentleSpring.stiffness).toBe(180);
    expect(snappySpring.stiffness).toBe(420);

    // Mathematical verification of UIKit rubber-band resistance
    expect(rubberBand(0, 800)).toBe(0);
    expect(rubberBand(-100, 800)).toBe(-rubberBand(100, 800)); // Sign preserved
    expect(rubberBand(100, 800)).toBeLessThan(100);             // Diminishing returns
    expect(rubberBand(100000, 800)).toBeLessThan(800);          // Strictly bounded by dimension
  });

  // Pillar 2: Pure Black Ban & Clinical Contrast Contract
  it("bans raw #000000 digital void and enforces AAA contrast on clinical surfaces", () => {
    expect(tokens).not.toMatch(/:\s*#(?:000000|000)\b/);
    expect(styles).not.toMatch(/(?:color|background|border):\s*#(?:000000|000)\b/);

    // Neutral clinical badge contrast: > 7:1 AAA
    expect(contrast(token("--badge-neutral-text"), token("--badge-neutral-bg"))).toBeGreaterThanOrEqual(7.0);

    // Peacock Pupil contrast vs pure white: > 17:1 AAA
    expect(contrast(token("--peacock-pupil"), token("--surface-white"))).toBeGreaterThanOrEqual(17.0);
  });

  // Pillar 3: Concentric Radius Formula Contract
  it("enforces concentric geometry R_inner = R_outer - Padding across nested containers", () => {
    expect(tokens).toContain("--radius-concentric-outer");
    expect(tokens).toContain("--radius-concentric-padding");
    expect(tokens).toContain("--radius-concentric-inner");
    expect(styles).toContain(".action-isolated-primary");
    expect(styles).toContain(".badge-neutral-clinical");

    // Verify SquircleConcentric component enforces Math.max(0, outerRadius - padding)
    expect(squircleConcentric).toContain("Math.max(0, outerRadius - padding)");
    expect(squircleConcentric).toContain('data-squircle-concentric="outer"');
    expect(squircleConcentric).toContain('data-squircle-concentric="inner"');
  });

  // Pillar 4: Cognitive Metric First & Touch Target Accessibility Contract
  it("enforces Metric-First DOM ordering and WCAG 44px minimum touch targets", () => {
    // DOM structure: Metric value rendered before label
    const valueIdx = metricDisplay.indexOf('data-slot="metric-value"');
    const labelIdx = metricDisplay.indexOf('data-slot="metric-label"');
    expect(valueIdx).toBeGreaterThan(-1);
    expect(labelIdx).toBeGreaterThan(-1);
    expect(valueIdx).toBeLessThan(labelIdx);

    // Pattern interrupt card verification
    expect(patternCard).toContain('data-pattern-interrupt="true"');

    // Accessibility touch target enforcement: min 44px
    expect(tokens).toContain("--target-size-min: 44px");
    expect(styles).toContain("min-block-size: var(--target-size-min");
    expect(styles).toContain("min-inline-size: var(--target-size-min");
  });
});
