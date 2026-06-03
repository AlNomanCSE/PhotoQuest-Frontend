# PhotoQuest — Combined Frontend

Three connected frontends in one hostable static site:

```
photoquest-frontend/
├── index.html        ← portal / entry (links to the three apps)
├── app/              Public app & marketplace (creator-facing)
│   ├── index.html
│   ├── css/styles.css
│   └── js/app.js
├── auth/             Sign in & registration flow
│   ├── index.html
│   ├── css/styles.css · css/auth.css
│   └── js/app.js
└── admin/            Admin / operations console
    ├── index.html
    ├── css/styles.css · css/admin.css
    └── js/app.js
```

## How the three are linked
- Portal (`/`) → cards to **app/**, **auth/**, **admin/**.
- Auth: "Open PhotoQuest" / social sign-in → opens **app/**. The "Admin sign-in → 2FA" path → opens **admin/**.
- App & Admin: "Sign out" (top-right) → returns to **auth/**. Admin's "View creator app" → **app/**.

## Run locally
- Double-click `index.html`, OR
- VS Code → Live Server on the `photoquest-frontend` folder (recommended).

## Host it (it's a plain static site — no build step)
- **Netlify:** drag the `photoquest-frontend` folder onto app.netlify.com/drop. Done.
- **Vercel:** `vercel` in the folder, or import the repo (framework preset: "Other").
- **GitHub Pages:** push the folder contents to a repo, enable Pages on the branch/root.
- **cPanel / any web host:** upload the folder contents to `public_html` (or a subfolder).

All paths are relative, so it works at a domain root or in a subdirectory.

## Notes
- Photos are Lorem Picsum placeholders and fonts load from Google Fonts — first load needs internet.
- It's a clickable prototype: nothing is persisted, and forms route between screens rather than hitting a backend.
- Each section also ships in this repo as its own folder, so you can deploy any one of them alone if needed.
