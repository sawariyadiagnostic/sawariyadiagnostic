import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "../..");
const read = (path: string) => readFileSync(resolve(root, path), "utf8");
const tokens = read("src/styles/tokens.css");
const styles = read("src/styles/components.css");
const buttons = read("src/components/ui/button.tsx");
const tailwind = read("tailwind.config.ts");
const declarations = tokens.match(/:root\s*\{([^}]*)\}/s)?.[1] ?? "";
const values = new Map(Array.from(declarations.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g), ([, name, value]) => [name, value.trim()]));

function token(name: string): string {
  const value = values.get(name);
  if (!value || !/^#[\da-f]{6}$/i.test(value)) throw new Error(`Missing direct hex token ${name}`);
  return value;
}

function luminance(hex: string): number {
  const channels = hex.slice(1).match(/../g)!.map((channel) => parseInt(channel, 16) / 255);
  const linear = channels.map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
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
    expect(buttons).toContain("data-ui-size={size ?? \"default\"}");
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
});
