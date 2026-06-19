# Scratchpad

## Project

- Repo working copy on this Mac: `/Users/samanthawatkins/Desktop/OnParBeverageRecipes`
- Older downloaded copy exists at `/Users/samanthawatkins/Desktop/OnParBeverageRecipes-main`; use the real repo above for GitHub work.
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
- `Keg Levels`
- `Pricing`
- `Inventory`
- `Weekly Usage`
- `Add Recipe`
- `Old Recipes`

## Tap Wall Pricing

- Tap Wall Pricing now pulls current charge-per-ounce values from Pour My Beer.
- Route: `app/api/tap-pricing/route.js`
- PMB source endpoint: `/api/productlist`
- PMB field mapping:
  - `price_per_unit` is cents per ounce
  - `tapPosition` is the current order from PMB product list, displayed as `Tap 1` through `Tap 102`
- The screen is ordered by the live PMB tap/product order, not grouped by cocktail vs beer.
- Current behavior:
  - cocktail rows are matched back to recipes when possible so cost, profit, margin, pour oz, and charge per pour still calculate
  - beer rows are matched back to keg pricing when possible so keg cost/margin can display
  - unmapped PMB products still display with live charge per ounce
  - manual charge overrides still win over PMB pricing for matched cocktail recipe rows
  - CSV default charge is only a fallback when PMB does not have a matched cocktail row
- Verified examples:
  - `Tap 1` = `Jack Daniel's Whiskey 3`
  - `Tap 2` = `Tito's Vodka 2`
  - `Tap 3` = `Kona Big Wave 1`
  - `Pabst Blue Ribbon 1` and `Pabst Blue Ribbon 2` both appear as separate PMB rows
- Latest local verification showed `102` current PMB taps.

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
- Hidden/duplicate pricing cleanup:
  - duplicate `1152 Blue Dot Juice` was removed from pricing display
  - `Blue Dot Juice` stays under `Made In House`
- Current default ingredient pricing overrides in code:
  - `Blue Dot Juice`: 1 gallon / 128 oz from 6 flavor packets; 6-packet box costs `$1`
  - `Lemonade`: 3 gallon box diluted 5:1 = 18 finished gallons / 2304 oz, `$52`
  - `Cranberry Juice`, `Strawberry Lemonade`, and `Sweet Tea`: same 2304 oz yield, `$85`
  - `Simple Syrup`: `$0.03/oz`
  - `Sour Mix`: `$0.08/oz`
  - `Vanilla`: `$0.31/oz`
  - `Cold Brew`: 2 x 32 oz bottles plus 2.5 gallons water = 384 oz finished; case pricing maps to `$51.67`

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
- Keg pricing notes:
  - beer style/type labels were removed from display/search because they were inaccurate
  - `Summer Ale` default keg pricing is set to 1/2 bbl / 1984 oz and `$185`

## Current Keg Matching Caveat

- PMB line/product matching is tricky.
- Matching logic was improved with alias handling and device-level mapping, but keg percentages may still need spot-checking tap by tap.
- Known examples that needed attention before:
  - `Goose IPA`
  - `Hennessy (Cognac) 3`
  - `Gin & Juice`

## Local Dev Notes

- Important recurring Next.js issue: stale `.next` chunks can cause:
  - `Cannot find module './331.js'`
  - `Cannot find module './833.js'`
  - `__webpack_modules__[moduleId] is not a function`
- Reliable fix on Mac:

```bash
lsof -tiTCP:3000 -sTCP:LISTEN | xargs -r kill
rm -rf .next
npm run dev
```

- Reliable fix on Windows:

```powershell
Stop-Process -Name node -Force -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
npm.cmd run dev
```

- Build check before push:

```bash
npm run build
```

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

## New Mac PMB Connectivity Check - 2026-06-19

- New always-on Mac local IP observed as `192.168.10.93`.
- PMB / TTG server at `http://192.168.10.128:8585` is reachable from this Mac.
- `/api/authtoken` returned `AUTH_OK` with a 62-character token for client id `910423`.
- `/api/productlist` worked with the generated bearer token and returned `103` products.
- `/api/getkeglevels` worked for device `66952915841408`, line `1`.
- `.env.local` was created locally and is ignored by Git.
- Still needed on this Mac for normal operation:
  - install Node.js LTS so `npm run dev` and `npm run build` work outside Codex
  - install Apple Command Line Tools / Git so repo status and commits work
  - install and configure `cloudflared` as a persistent service for the Cloudflare tunnel
  - get the Cloudflare tunnel token or named-tunnel credentials/hostname before making it always-on

## Cloudflare Tunnel - 2026-06-19

- Cloudflare domain: `onparbev.com`.
- Named tunnel: `onparbev-dashboard`.
- Tunnel id: `35a2d83d-aa45-4ad0-a1ad-b0735a66fa63`.
- DNS routes created:
  - `onparbev.com`
  - `www.onparbev.com`
- Public dashboard verified at `https://onparbev.com`.
- Public keg API verified at `https://onparbev.com/api/keg-levels`.
- Tunnel routes to the dashboard app on `http://localhost:3000`; it does not expose the PMB server directly.
- macOS LaunchAgents installed:
  - `~/Library/LaunchAgents/com.onpar.beverage-dashboard.plist`
  - `~/Library/LaunchAgents/com.onpar.cloudflared.plist`
- Runtime service folder is `/Users/onparmarketing/OnParBeverageRecipes-service` because macOS blocked launchd from executing reliably out of Desktop.
- Service logs live in `/Users/onparmarketing/OnParBeverageRecipes-service/logs`.
- The Cloudflare cert and tunnel credentials are in `~/.cloudflared` and must stay secret.

## Provi Session Refresh - 2026-06-19

- Fresh Provi browser session saved under `~/.FoodOrderAgent/provi`.
- Active retailer context captured as `402312`.
- `.env.local` was updated with `PROVI_COOKIE_HEADER` and `PROVI_RETAILER_CONTEXT` in both:
  - Desktop working copy
  - `/Users/onparmarketing/OnParBeverageRecipes-service`
- Always-on dashboard LaunchAgent was restarted after env update.
- Public `https://onparbev.com/api/vendor-sync` verified for:
  - `Provi` scope
  - `OHLQ` scope

## Recent Fixes - 2026-06-19

- Beer keg pricing sync now only accepts standard 15.5 gal / 1984 oz keg packages by default.
- Summer Ale is not allowed to map to the available 1/6 bbl Provi item because On Par only uses 15.5 gal kegs for that beer.
- Stella Artois is the special keg-size exception:
  - expected size is 50 L / about 1690.7 oz
  - Provi price verified at `$170`
- Related commits pushed:
  - `ed62fe5` - require standard half-barrel beer keg pricing
  - `fa76674` - handle Stella 50L keg pricing exception

## Keg Levels Recovery - 2026-06-19

- Symptom: public `Keg Levels` tab stayed broken / stuck while PMB API was reachable.
- Root causes found:
  - `public/dashboard.js` called `isRoughlyEqual()` in browser code, but the helper only existed in the server vendor-sync route.
  - The always-on service copy at `/Users/onparmarketing/OnParBeverageRecipes-service` was missing its `.next` production build, causing Cloudflare 502s until rebuilt.
  - Cloudflare was serving `/dashboard.js` with a 4-hour browser cache header, so an already-open browser tab could keep the old broken script.
- Fixes applied:
  - Added `isRoughlyEqual()` to `public/dashboard.js`.
  - Rebuilt the Desktop repo and service copy with `npm run build`.
  - Restarted `com.onpar.beverage-dashboard`.
  - Added `Cache-Control: no-store, no-cache, must-revalidate, proxy-revalidate` for `/dashboard.js` in `next.config.mjs`.
  - Restarted both `com.onpar.beverage-dashboard` and `com.onpar.cloudflared`.
- Verification after fix:
  - `https://onparbev.com/dashboard.js` returns `cf-cache-status: BYPASS`.
  - `https://onparbev.com/api/keg-levels` returns `103` live PMB products.
  - Browser automation opened `https://onparbev.com`, clicked `Keg Levels`, found `3` wall cards, and showed `Found live levels for 103 products`.
- Related commits pushed:
  - `92a5ef6` - restore dashboard keg tab helper
  - `f296b0f` - bypass Cloudflare cache for dashboard script

## Always-On Service Recovery Commands - Mac

```bash
cd /Users/onparmarketing/OnParBeverageRecipes-service
PATH=/Users/onparmarketing/OnParBeverageRecipes-service/.tools/node/bin:$PATH npm run build
launchctl kickstart -k gui/$(id -u)/com.onpar.beverage-dashboard
launchctl kickstart -k gui/$(id -u)/com.onpar.cloudflared
curl -sS https://onparbev.com/api/keg-levels | head -c 500
curl -I 'https://onparbev.com/dashboard.js?v=check'
```
