import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { healthPackages, medicalTests } from '../../src/data/mockTests';
import { siteConfig, validateSiteConfig } from '../../src/config/site';
import { teamStructure } from '../../src/data/team-structure';

const uniqueIds = (items: { id: string }[]) => new Set(items.map((item) => item.id));

describe('approved public catalog', () => {
  it('keeps test and package identifiers unique', () => {
    expect(uniqueIds(medicalTests).size).toBe(medicalTests.length);
    expect(uniqueIds(healthPackages).size).toBe(healthPackages.length);
  });

  it('keeps listed values at or above customer prices', () => {
    expect(medicalTests.every((test) => test.originalPrice === undefined || test.originalPrice >= test.price)).toBe(true);
    expect(healthPackages.every((pkg) => pkg.originalPrice >= pkg.price)).toBe(true);
  });

  it('does not expose insurer-branded packages', () => {
    expect(healthPackages.some((pkg) => /starhealth|niva\s*bupa/i.test(pkg.name))).toBe(false);
  });
});

describe('public site configuration', () => {
  it('accepts the current public configuration', () => {
    expect(validateSiteConfig()).toBe(siteConfig);
  });

  it('rejects invalid required contact data', () => {
    expect(() => validateSiteConfig({
      ...siteConfig,
      contact: { ...siteConfig.contact, email: 'invalid' },
    })).toThrow('Invalid public contact email');
  });
});

describe('public role structure', () => {
  it('keeps the approved role taxonomy', () => {
    expect(teamStructure.map((role) => role.label)).toEqual([
      'Pathology Oversight',
      'Laboratory Director',
      'Quality Manager',
      'Technical Manager',
      'Logistics Manager',
      'Medical Technologists',
      'Laboratory Technicians',
      'Phlebotomy Team',
      'Laboratory Assistants',
    ]);
    for (const tier of ['governance', 'operations'] as const) {
      const orders = teamStructure.filter((role) => role.tier === tier).map((role) => role.order);
      expect(orders).toEqual([...orders].sort((a, b) => a - b));
    }
  });
});

describe('deployment asset contract', () => {
  it('keeps the logo source base-path relative', () => {
    const source = readFileSync(resolve(process.cwd(), 'src/components/ui/Logo.tsx'), 'utf8');
    expect(source).toContain('`${import.meta.env.BASE_URL}brand/sawariya-dna-original.svg`');
    expect(existsSync(resolve(process.cwd(), 'public/brand/sawariya-dna-original.svg'))).toBe(true);
  });
});
