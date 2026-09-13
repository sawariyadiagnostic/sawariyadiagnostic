# Catalog reset and rebuild plan

## Phase 1 — reset
- Public runtime returns no tests/packages until records are approved.
- Raw source inventory remains in `catalog-workspace/raw-inventory/`.
- Existing generated catalog is retained as technical history, not public data.

## Phase 2 — report truth
- Owner fills parameter templates from real reports.
- Normalize names, specimen, method, preparation, reference intervals, units, and report layout.

## Phase 3 — individual test approval
- One canonical record per test/method/specimen variant.
- Owner approves price, availability, home collection, turnaround, and SEO publication.

## Phase 4 — package construction
- Packages are composed only from approved individual tests.
- Included-test list value is calculated from approved test list prices.
- Customer price and crossed-out value are separately reviewed.

## Phase 5 — publication
- Approved records move into `catalog-workspace/approved-catalog/`.
- Website catalog is regenerated from approved records only.
