# NewStill

NewStill is a React single-page application built with Vite. The store is served
at `/`, and the vision and mission page is served at `/vision-mision`. Unknown
application paths show an in-app 404 page. The older
`/vision-mision/index.html` address is also recognized.

## Run locally

From this directory:

```sh
npm install
npm run dev
```

Build and preview the production bundle with:

```sh
npm run build
npm run preview
```

The Vite development and preview servers provide SPA history fallback, so
application routes can be opened directly or reloaded. Navigation between
application pages uses the History API. Hash links, external links, downloads,
modified clicks, and `/api/` links retain normal browser behavior.

## Deployment

The production output is `dist/`. No hosting provider or deployment
configuration is defined in this repository. Deploy the contents of `dist/` at
the site root and configure the host to serve `/index.html` for application
routes that do not match a file. Keep existing static-file and `/api/` handling
ahead of that fallback. This fallback is required for direct visits and reloads
of routes such as `/vision-mision`; it is separate from Vite's local preview
behavior.
