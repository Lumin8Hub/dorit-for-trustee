# Dorit Campaign Intelligence Dashboard

Internal desktop-first campaign dashboard for Dorit for Vaughan King School Board Trustee.

## What is included

- Local runnable dashboard in `index.html`, `styles.css`, and `app.js`
- Role-aware views for Candidate, Campaign Manager, and Volunteer
- Event calendar, stakeholder CRM, map intelligence, goals, field ops, training guide, and update forms
- Supabase schema and Edge Function contracts under `supabase/`
- Backend functions for `dashboard-read-model`, `upsert-dashboard-record`, `approve-account`, `campaign-rollups`, and `geocode-location`
- Local preview mode using `localStorage`
- Optional Supabase mode through `window.CAMPAIGN_CONFIG`

## Run locally

Open `index.html` directly in a browser, or run a static server from this folder.

```powershell
python -m http.server 5173
```

Then visit `http://localhost:5173`.

## Supabase setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Deploy the functions in `supabase/functions/`.
4. Copy `config.example.js` to `config.js`, fill in your project URL and anon key, and add this line before `app.js` in `index.html`:

```html
<script src="./config.js"></script>
```

The dashboard will keep working locally if Supabase is not configured.

## Account approval workflow

- New signups are created as volunteer accounts with `approval_status = pending`.
- Pending, rejected, and suspended users cannot access campaign data.
- Candidate and Campaign Manager accounts can approve, reject, suspend, or reactivate volunteers from the Accounts section.
- Initial Candidate/Campaign Manager users should be created manually in Supabase Auth, then their rows in `public.profiles` should be set to `role = 'candidate'` or `role = 'manager'` and `approval_status = 'approved'`.
- Deploy the `approve-account` Edge Function before using the in-app approval buttons.

## Privacy model

The data model is intentionally campaign-operations oriented:

- Allowed: public organizations, role-based contacts, campaign interactions, aggregate goals, canvass zone totals, volunteer assignments, consent-safe notes.
- Avoid: inferred ethnicity, religion, disability, medical status, family status, precise voter-level sensitive traits, or private political opinions.
- Persona guidance is training material only and should not be attached to individual voter records.

## Next implementation step

Connect live Supabase auth, migrate seed data into Postgres, and replace local form persistence with the Edge Function response path.
