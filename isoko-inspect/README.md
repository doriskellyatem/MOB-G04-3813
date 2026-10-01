# Isoko Inspect — Field Operations · Musanze Safe Markets

## Install

```bash
npm i
```

## Run

```bash
npx expo start
```

## Main flows

1. Market catalogue: review assigned zones, filter by status, and use a stall to pre-populate the inspection form.
2. Inspect: complete vendor, stall, category, contact, risk, consent, and evidence details before reviewing the report.
3. Records: save inspections, open the saved list, and view each completed record with metadata and attachment details.

## Known limitations

- Offline-only: app state is kept in memory and does not persist across app restarts.
- No real camera permission persistence is simulated in a mock flow with Expo Image Picker permissions.
- The catalogue and records are demo data for the Musanze Safe Markets pilot, not live backend data.
