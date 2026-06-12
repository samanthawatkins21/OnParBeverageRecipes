# Setup Checklist

## New Computer Setup

### 1. Install the basics

- Install `Node.js` LTS
- Install `Git`
- Install `VS Code` if you want a code editor
- Install the `Vercel` CLI only if you want local Vercel commands

### 2. Copy the project

- Clone or copy this repo to your new computer
- Main working repo:
  - `OnParBeverageRecipes`

### 3. Copy your local env file

- Copy `.env.local` from the old computer into the repo root
- Do not commit `.env.local`

### 4. Install packages

Run:

```bash
npm install
```

### 5. Start the app locally

Run:

```bash
npm run dev
```

Then open:

- [http://localhost:3000](http://localhost:3000)

### 6. If local Next.js gets weird

If you see chunk/module errors like:

- `Cannot find module './331.js'`
- `Cannot find module './833.js'`
- `__webpack_modules__[moduleId] is not a function`

Delete `.next` and restart:

```bash
rm -rf .next
npm run dev
```

On Windows PowerShell, use:

```powershell
Stop-Process -Name node -Force -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
npm.cmd run dev
```

### 7. Build before pushing

Run:

```bash
npm run build
```

### 8. Push / deploy flow

- GitHub `main` deploys to Vercel
- Before pushing:
  - run local check
  - run `npm run build`

### 9. Vercel env vars

Make sure Vercel has the same env vars your app needs.

Important ones used in this project include:

- `PROVI_COOKIE_HEADER`
- `PROVI_RETAILER_CONTEXT`
- `PROVI_OHLQ_ACCOUNT_NUMBER`
- `PROVI_OHLQ_DISTRIBUTOR_ID`
- `PROVI_OHLQ_DISTRIBUTOR_ACCOUNT_ID`
- `PROVI_OHLQ_RETAILER_DISTRIBUTOR_ID`
- `PMB_API_BASE_URL`
- `PMB_API_USERNAME`
- `PMB_API_PASSWORD`
- `PMB_API_CLIENT_ID`
- `PMB_API_CLIENT_NAME`
- `PMB_KEG_DEVICE_ID`

### 10. Local network note

For Pour My Beer / keg level work:

- the computer must be on the same network as the PMB server
- the PMB local IP must still be reachable

### 11. Helpful files

- [scratchpad.md](C:\Users\info\Projects\OnParBeverageRecipes\scratchpad.md)
- [app/page.jsx](C:\Users\info\Projects\OnParBeverageRecipes\app\page.jsx)
- [app/globals.css](C:\Users\info\Projects\OnParBeverageRecipes\app\globals.css)
- [public/dashboard.js](C:\Users\info\Projects\OnParBeverageRecipes\public\dashboard.js)

### 12. Quick sanity check after setup

- Open the dashboard
- Check `Recipes`
- Check `Cocktail Ingredients`
- Check `Inventory`
- Check `Keg Levels`
- Run a vendor sync test
- Make sure local edits refresh correctly
