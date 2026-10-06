# Validation results — onboarding and user activity data

Validation: 6 October 2026 (India). Checks used the locked frontend dependencies, a production Next.js build and headless Chromium. Invoice browser/contract checks used a local ERP mock with representative responses from the supplied backend. No live extraction provider or database was contacted.

## Completed checks

| Check | Result |
| --- | --- |
| ESLint | Passed |
| TypeScript / production build | Passed; Next.js 16.3.0, 47 static pages generated |
| `npm run test:demo` | 10 regression groups passed |
| `npm run test:invoices` | 12 integration groups passed |
| `npm run test:onboarding` | 7 new regression groups passed |
| Browser intake/onboarding workflows | 11 groups passed; no unexpected runtime/console/HTTP errors |
| Changed inventory/management views | 19 routes/views passed with user data and empty sample baselines |
| Additional dashboard display checks | Tiny manual entry, valid zero invoice and Scope 3-only invoice passed |
| Mobile Activity Data | 390 px viewport, 390 px page width |
| Report PDF | Valid bytes; extracted text verified and rendered for inspection |
| Dependency lock / shell launchers | Dependency declarations match lockfile; shell syntax passed |

## Browser evidence

1. Fresh sign-in opened university onboarding. Create Workspace saved the name and opened Activity Data. The hierarchy remained 2 campuses / 4 buildings / 12 floors, with 2 original fiscal periods; duplicate setup was not created.
2. Onboarding draft university fields survived refresh. Profile save did not remove the sample ledger. Returning sign-in resumed Activity Data after completed setup.
3. Manual Diesel 100 L, Save & calculate, produced 268 kgCO2e. The first save removed all sample activities and sample baseline/targets from active totals. Dashboard, donut and October single-month point displayed the user result; reload retained it.
4. Messy XLSX preview retained the sample ledger and flagged one invalid row. Import & calculate saved only the three valid rows, totaling 11,577 kgCO2e with illustrative factors.
5. Six PDF files reached the ERP multipart `file` endpoint through the Next proxy. Five extraction documents remained after one explicit country failure. Extraction alone retained the sample dashboard.
6. Saving the reviewed multi-line invoice copied the original backend results: 8,896.25 kgCO2e for 12,500 kWh and 128.8 kgCO2e for 80 L LPG. User-only total was 9,025.05 kgCO2e; invoice values were not replaced by demo factors. Saved date, campus/building/floor, status and source values survived reopening/reload without duplicate import.
7. A selected unmatched invoice line stayed SUBMITTED with no calculation and did not increase emissions. The PDF snapshot contained two backend records, zero illustrative rows, one pending row and 9.02505 tCO2e before display rounding. Its text explicitly excluded the sample ledger.
8. User-data dashboard, inventory, calculations, baseline, targets, recommendations, quality and changed university management views rendered without unexpected errors. Activity Data fit a mobile viewport.
9. Additional display fixtures verified 1 L Diesel / 2.68 kgCO2e remains visible at 0.0027 tCO2e, valid zero-emission biomass has finite chart/bar values, and a 3.6 tCO2e Scope 3 invoice appears in the donut and monthly chart. No NaN values or runtime errors occurred.

## Contract coverage

The regression suites check credential handling, exact totals, period locks, invalid quantities/units/dates, real CSV/XLSX normalization, invoice file forwarding/signatures/limits/origin/session validation, provider failures/timeouts without fabricated results, generic/nested invoice responses, converted units, valid zero/missing values, atomic selection/import, duplicate prevention, original-factor provenance and immutable report snapshots.

New tests cover the SAMPLE → USER transition, failed writes and previews retaining samples, first/next entry accumulation, immediate calculation, pending unmatched invoice lines, version-1 workspace migration preserving real rows, and deletion of the final draft leaving an empty user dashboard. Only explicit Reset demo restores samples and requires onboarding again.

## Archive and live verification limits

The ZIP is packaged using standard DEFLATE without encryption/ZIP64, and checked for CRC, required files and complete extraction. All 286 original backend source files remain unchanged; the blank `.env.example` is the only added backend file. Actual secrets, dependency/build folders and temporary files are excluded. Database restore/migrations were not run.

Live Gemini/Affinda/Mistral/Climatiq extraction and backend database connectivity require the user's already-working `.env`; no credentials were supplied here. Manual/Excel estimates use illustrative factors. University authentication, activity persistence and report snapshots remain browser-local demo facilities, not the missing production V2 service. Invoice uploads use the actual supplied backend and its existing provider/database behavior when configured locally.
