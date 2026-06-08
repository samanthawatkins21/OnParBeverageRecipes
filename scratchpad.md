# Scratchpad

## Current project state

- Main working copy: `C:\Users\info\Projects\OnParBeverageRecipes`
- Live deploys from GitHub `main` to Vercel
- Local preview: `http://localhost:3000/`

## Vendor sync setup

- `OHLQ` liquor pricing is now synced through the saved `Provi` retailer session.
- `Proof` mixer pricing is also synced through `Provi`, but still displays as `Proof` in the ingredient UI.
- Server sync route:
  - `app/api/vendor-sync/route.js`
- Ingredient/vendor mappings:
  - `public/dashboard.js`

## Provi session notes

- Preferred retailer/location: `On Par Entertainment`
- Provi retailer context: `402312`
- The hosted Vercel app now supports env-based Provi session access first, then local file fallback on localhost.

### Vercel env vars in use

- `PROVI_COOKIE_HEADER`
- `PROVI_RETAILER_CONTEXT`
- `PROVI_OHLQ_ACCOUNT_NUMBER`
- `PROVI_OHLQ_DISTRIBUTOR_ID`
- `PROVI_OHLQ_DISTRIBUTOR_ACCOUNT_ID`
- `PROVI_OHLQ_RETAILER_DISTRIBUTOR_ID`

## OHLQ / Provi account details

- OHLQ account number: `6537633`
- OHLQ distributor id: `16114`
- OHLQ distributor account id: `784111046`
- OHLQ retailer distributor id: `3744661`

## Matching rules

- Liquor sync stays on the `OHLQ` path.
- Mixer sync stays on the `Provi` path.
- Proof/mixer sync is restricted to `Southern Glazer's Wine & Spirits` matches only.

## Mixer alias work

- Added smarter Provi search aliases for hard-to-match Proof products.
- Confirmed match paths for:
  - `Apple Pucker`
  - `Apple Schnapps`
  - `Bitters`
  - `Blueberry Schnapps`
  - `Creme de Cacao`
  - `Lemon Juice`
  - `Lime Juice`
  - `Mint`
  - `Peach Schnapps`
  - `Pomegranate Schnapps`
  - `Raspberry Schnapps`
  - `Strawberry Schnapps`
  - `Triple Sec`
  - `Watermelon Schnapps`

## Known caveat

- `Raspberry Schnapps` in Provi appears under raspberry/razzmatazz variants and may currently resolve to a `750 mL` Southern Glazer option instead of a `1 L` exact match. This is the main remaining mapping detail to watch.

## Inventory / app notes

- Inventory tab supports editable `On Hand` and locked/editable `Par`.
- Weekly inventory snapshots can be saved, recalled, and deleted from browser storage.
- Add Recipe supports bottle/gallon-driven ounce calculation.
- Recipe cards show estimated cost and ABV.

## Useful commands

- Start local dev:
  - `npm.cmd run dev`
- Production build check:
  - `npm.cmd run build`
- Provi one-time login/session capture:
  - `npm.cmd run provi:session`
- Provi request capture:
  - `npm.cmd run provi:capture`
- Provi captured value extraction:
  - `npm.cmd run provi:extract`
