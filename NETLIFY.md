# Deploying to Netlify

This app is a TanStack Start (SSR + server functions) project. On Netlify it
builds with Nitro's `netlify` preset: static assets go to `dist`, and the SSR /
server-function handler is emitted as a Netlify Function in
`.netlify/functions-internal`.

## 1. Connect the repo

New site → Import an existing project → pick this repository.
Netlify reads `netlify.toml`, so build command and publish directory are
already configured:

- Build command: `npm run build`
- Publish directory: `dist`
- Node version: 22 (also pinned in `.nvmrc`)

## 2. Environment variables

Add these in Site configuration → Environment variables (values come from the
project's `.env` / backend settings):

| Variable | Scope | Purpose |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | build + runtime | Backend URL used by the browser client |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | build + runtime | Public (safe) API key |
| `VITE_SUPABASE_PROJECT_ID` | build | Project identifier |
| `SUPABASE_URL` | runtime | Backend URL for server functions |
| `SUPABASE_PUBLISHABLE_KEY` | runtime | Public key for server-side reads |
| `SUPABASE_SERVICE_ROLE_KEY` | runtime | Secret key used by admin server functions (never expose to the client) |

`NITRO_PRESET=netlify` is already set in `netlify.toml`; no need to add it.

## 3. Deploy

Push to the production branch, or run:

```bash
npm install
npx netlify deploy --build --prod
```

## Notes

- Routing (deep links, refresh on `/admin/enquiries`, etc.) is handled by the
  generated `dist/_redirects` — do not hand-edit it.
- Local Lovable builds still target Cloudflare; the Netlify preset is selected
  automatically because Netlify sets `NETLIFY=true` (see `vite.config.ts`).
- The admin area and enquiry submission run as server functions inside the
  Netlify Function, so the service-role key must be set as a runtime env var.
