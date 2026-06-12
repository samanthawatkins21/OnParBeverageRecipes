# Scratchpad

## Project

- Repo working copy: `C:\Users\info\Projects\OnParBeverageRecipes`
- Stack: `Next.js` App Router
- Main UI: `app/page.jsx`
- Main styles: `app/globals.css`
- Main dashboard logic: `public/dashboard.js`
- Data files: `public/data`
- Local site: `http://localhost:3000`
- Main branch deploys to Vercel

## Main Tabs

- `Recipes`
- `Tap Wall Pricing`
- `Cocktail Ingredients`
- `Add Recipe`
- `Inventory`
- `Keg Levels`
- `Old Recipes`

## Current Recipe Behavior

- Recipe cards support edit / deactivate / reactivate.
- Recipe cards show:
  - total cost
  - total oz
  - ABV
  - profit margin
- Recipe ingredient lines now:
  - show gallons on the recipe line for `Cranberry Juice`, `Lemonade`, `Strawberry Lemonade`, and `Simple Syrup`
  - keep ounces in the `oz` column
  - show bottle sizes in parentheses when bottle-based, like `(1L)`, `(1.75L)`, `(750mL)`
- `On Par Tee` is categorized as `Whiskey`.
- `Add Recipe` auto-calculates ounces from mapped bottle sizes or gallons.
- Recipes default to `12 gallon keg`.

## Cocktail Ingredients Notes

- Ingredient page includes update buttons and last-updated timestamps.
- `Used In` was removed.
- Schnapps were split out into:
  - `Blueberry Schnapps`
  - `Strawberry Schnapps`
  - `Raspberry Schnapps`
  - `Watermelon Schnapps`
  - `Peach Schnapps`
  - plus existing `Apple`, `Apple Pucker`, and `Pomegranate`
- Current category structure is aligned around vendor / storage logic, including:
  - `Liquor`
  - `Proof`
  - `Buckeye Beverage`
  - `Food Vendors`
  - `Made In House`
  - `Other`
- `Cold Brew` is in `Food Vendors`.
- `Creme de Cacao`, `Mint`, `Lemon Juice`, and `Lime Juice` are in `Proof`.
- `Simple Syrup` and `Blue Dot Juice` are `Made In House`.
- `Sweet and Sour` is treated as the same item as `Sour Mix`.

## Vendor Price Sync

- Sync route: `app/api/vendor-sync/route.js`
- OHLQ pricing sync is currently routed through Provi session-based access.
- Proof mixer pricing is also pulled through Provi, but should always resolve from `Southern Glazer's Wine & Spirits`, not OHLQ.
- Mixer/liquor mappings live in `public/dashboard.js`.
- Price-change notes were added so ingredient rows can show prior price after sync.

## Provi / OHLQ Notes

- Preferred Provi location: `On Par Entertainment`
- User also has another location in Provi, so captures/sessions should always use `On Par Entertainment`
- Hosted Vercel setup expects env-based Provi session values rather than local session files
- Important env names already in use:
  - `PROVI_COOKIE_HEADER`
  - `PROVI_RETAILER_CONTEXT`
  - `PROVI_OHLQ_ACCOUNT_NUMBER`
  - `PROVI_OHLQ_DISTRIBUTOR_ID`
  - `PROVI_OHLQ_DISTRIBUTOR_ACCOUNT_ID`
  - `PROVI_OHLQ_RETAILER_DISTRIBUTOR_ID`

## Inventory Tab

- Inventory groups are matched to ingredient pricing organization, but inventory display is cabinet-based:
  - `Mixer Cabinet`
  - `Liquor Cabinet`
  - `Other`
- `On Hand` is editable.
- `Par` is intended to be visually distinct and less frequently edited.
- Negative reorder values should display as `0`.
- `Need to Order` updates automatically from `On Hand` vs `Par`.
- Mixer cabinet reorder values are rounded up to cases of `12`.
- Liquor reorder values stay bottle-based.
- Totals were added for:
  - current inventory dollar amount
  - reorder totals
  - vendor-specific reorder totals
- `Non Alcoholic Beer` belongs in `Other` inventory and reorder views, but should not count in beverage inventory dollar totals.
- `Sweet and Sour` should not populate `Need to Order`.
- Weekly inventory snapshots can be saved, recalled, resubmitted, timestamped, and deleted from browser storage.

## Inventory Display Order

### Mixer Cabinet order

1. `Blue Rasp Powder`
2. `Bitters`
3. `Lemon Juice`
4. `Raspberry Schnapps`
5. `Pomegranate Schnapps`
6. `Strawberry Schnapps`
7. `Triple Sec`
8. `Peach Schnapps`
9. `Blueberry Schnapps`
10. `Lime Juice`
11. `Watermelon Schnapps`
12. `Apple Schnapps`
13. `Creme de Cacao`
14. `Kahlua`
15. `Cold Brew`
16. `Sweet and Sour`

### Liquor Cabinet order

1. `Bulleit`
2. `Crown Royal`
3. `Svedka Blue Raspberry Vodka`
4. `Jose Cuervo Silver`
5. `Tito's`
6. `Ketel One Cucumber Vodka`
7. `Absolut Citron`
8. `Crown Apple`
9. `Captain Morgan`
10. `Bombay Sapphire`
11. `Jack Daniel's`

## Keg Levels

- Keg Levels is part of the regular dashboard now, not a separate app.
- Template CSV exists at `public/data/keg-levels-template.csv`.
- Keg levels now support:
  - `Current level`
  - editable `On hand kegs`
  - editable `Par kegs`
  - computed `Need`
  - `Refresh keg levels`
  - `Send config update`
- Layout was changed to vertical/stacked walls for easier smaller-screen use.
- Data routes:
  - `app/api/keg-levels/route.js`
  - `app/api/keg-config-update/route.js`
- PMB env values expected locally:
  - `PMB_API_BASE_URL`
  - `PMB_API_USERNAME`
  - `PMB_API_PASSWORD`
  - `PMB_API_CLIENT_ID`
  - `PMB_API_CLIENT_NAME`
  - optional `PMB_KEG_DEVICE_ID`

## Current Keg Matching Caveat

- PMB line/product matching is tricky.
- Matching logic was improved with alias handling and device-level mapping, but keg percentages may still need spot-checking tap by tap.
- Known examples that needed attention before:
  - `Goose IPA`
  - `Hennessy (Cognac) 3`
  - `Gin & Juice`

## Local Dev Notes

- Important recurring Windows issue: stale `.next` chunks can cause:
  - `Cannot find module './331.js'`
  - `Cannot find module './833.js'`
  - `__webpack_modules__[moduleId] is not a function`
- Reliable fix:

```powershell
Stop-Process -Name node -Force -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
npm.cmd run dev
```

- Build check before push:

```powershell
npm.cmd run build
```

## Useful Commands

```powershell
npm.cmd run dev
npm.cmd run build
npm.cmd run provi:session
npm.cmd run provi:capture
npm.cmd run provi:extract
```

## Transfer Notes For New Computer

- Copy the repo folder.
- Copy `.env.local` manually and do not commit it.
- Reinstall dependencies with `npm install`.
- Start with `npm.cmd run dev` on Windows or `npm run dev` on Mac.
- If using Vercel-only vendor sync, make sure the same env vars are set in Vercel.
- If using local Provi/PMB testing, the new machine will need:
  - local env values
  - network access to the PMB local IP
  - fresh local login/session capture if browser session files are part of the flow
