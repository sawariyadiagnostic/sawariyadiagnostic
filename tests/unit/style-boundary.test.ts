import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "../..");
const indexCss = readFileSync(resolve(root, "src/index.css"), "utf8");

const styleLayers = ["tokens.css", "base.css", "layout.css", "components.css"];

describe("style layer boundary", () => {
  it.each(styleLayers)("provides and imports %s from index.css", (layer) => {
    expect(existsSync(resolve(root, "src/styles", layer))).toBe(true);
    expect(indexCss).toContain(`@import './styles/${layer}';`);
  });
});
