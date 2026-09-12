# Documentation Index

Sawariya Diagnostic's documentation is grouped by purpose. Root-level entry points remain intentionally small; detailed plans and operational material live under `docs/`.

## Start here

- [Repository README](../README.md) — product scope, setup, commands, and deployment.
- [Engineering guide](../ENGINEERING.md) — runtime boundaries, configuration, extension rules, and incident basics.
- `CONTRIBUTING.md` — planned in Wave 1; add before accepting external implementation work.

## Active documentation

### Architecture

- [Architecture](architecture/ARCHITECTURE.md) — current system boundaries and extension direction.
- [Architecture target](architecture/ARCHITECTURE-TARGET.md) — target-state decisions and constraints.

### Operations and release

- [Content publication policy](../CONTENT-PUBLICATION-POLICY.md) — owner approval gate for public catalog facts.
- [Legal and operational readiness](../LEGAL-OPERATIONAL-READINESS.md) — launch and ongoing compliance checklist.
- [Ralph audit report](../RALPH-AUDIT-REPORT.md) — latest audited findings and remaining gates.
- [Catalog reset and build plan](operations/CATALOG-RESET-AND-BUILD-PLAN.md) — approved-catalog workflow.
- [Catalog data provenance](operations/CATALOG-DATA-PROVENANCE.md) — source and pricing provenance.

### Content system

- [Catalog workspace](../catalog-workspace/README.md) — raw inventory, review notes, report templates, and approved-catalog boundary.
- [Catalog selection worksheet](content/CATALOG-SELECTION-WORKSHEET.md) — owner selection workflow.
- [Report parameters](../catalog-workspace/report-parameters/README.md) — clinician/owner report-template workflow.

### Design and UX

- [Brand guidelines](../brand-guidelines.md) — identity, color roles, typography, and accessibility rules.
- [Apple synergy design plan](design/APPLE-SYNERGY-DESIGN-PLAN.md) — interaction and material direction.
- [Color schema plan](design/COLOR-SCHEMA-PLAN.md) — semantic color system.
- [Color synergy refinement](design/COLOR-SYNERGY-REFINEMENT-PLAN.md) — current refinement direction.
- [Logo sizing and spacing](design/LOGO-SIZING-SPACING-PLAN.md) — responsive logo contract.
- [Desktop button-wrap audit](design/DESKTOP-BUTTON-WRAP-AUDIT.md) — responsive action-label audit.
- [Team structure blueprint](design/TEAM-STRUCTURE-IMPLEMENTATION-BLUEPRINT.md) — role-first public team system.
- [Team structure plan](design/TEAM-STRUCTURE-PLAN.md) — role hierarchy and ownership questions.

## Historical and planning material

These documents preserve decisions and investigation history. They are not automatically normative when they conflict with the current code, `ENGINEERING.md`, or the content publication policy.

- [PRD](archive/PRD.md)
- [Execution plan](archive/EXECUTION-PLAN.md)
- [Task plan](archive/task_plan.md)
- [Findings](archive/findings.md)
- [Progress log](archive/progress.md)
- [Duplicate review report](archive/DUPLICATE-REVIEW-REPORT.md)
- [CMS security note](../CMS-SECURITY-NOTE.md)
- [Plan continuation](plans/20260913_012832-professional-repository-next-series.md)

## Documentation rules

- Link to exact files; do not rely on filenames discovered by memory.
- Mark a document active or historical when its recommendations may differ from code.
- Keep patient, pricing, clinical, and legal facts in approved source files—not in planning prose.
- Update this index when a new normative document is added.
