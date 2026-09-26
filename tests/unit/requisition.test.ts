import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { medicalTests } from '../../src/data/publishedCatalog';
import { requisitionReducer } from '../../src/components/requisition/RequisitionContext';

const contextSource = readFileSync(resolve(process.cwd(), 'src/components/requisition/RequisitionContext.tsx'), 'utf8');
const appSource = readFileSync(resolve(process.cwd(), 'src/App.tsx'), 'utf8');
const drawerSource = readFileSync(resolve(process.cwd(), 'src/components/requisition/RequisitionDrawer.tsx'), 'utf8');

describe('requisition selection', () => {
  it('keeps canonical catalog ids, ignores unpublished ids, and deduplicates toggles', () => {
    const first = medicalTests[0].id;
    const second = medicalTests[1].id;
    expect(requisitionReducer([], { type: 'toggle', testId: '__unpublished__' })).toEqual([]);
    expect(requisitionReducer([], { type: 'toggle', testId: first })).toEqual([first]);
    expect(requisitionReducer([first], { type: 'toggle', testId: first })).toEqual([]);
    expect(requisitionReducer([first], { type: 'toggle', testId: second })).toEqual([first, second]);
    expect(requisitionReducer([first, second], { type: 'clear' })).toEqual([]);
  });

  it('does not persist test selections or collect patient details', () => {
    expect(contextSource).not.toMatch(/localStorage|sessionStorage|patient.?name|address|phone|age|gender/i);
    expect(drawerSource).not.toMatch(/<input|<textarea|patientName|patientPhone|patientAddress/i);
    expect(drawerSource).toContain('rel="noopener noreferrer"');
    expect(drawerSource).toContain('No appointment is booked until the lab confirms.');
    expect(drawerSource).not.toMatch(/collection.?fee|free.?collection|estimated.?total/i);
  });

  it('mounts the request state only on the public home/catalog shell', () => {
    expect(appSource).toContain('<RequisitionProvider>');
    expect(appSource).toContain('<RequisitionDrawer />');
  });
});
