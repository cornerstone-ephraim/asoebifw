# Application architecture

## Boundaries

- `src/app` owns routing, metadata and page composition.
- `src/features` owns product behavior, feature UI, validation and server actions.
- `src/components` owns reusable presentation primitives and must not depend on a feature.
- `src/lib` owns framework-agnostic shared helpers. Server-only infrastructure lives in `src/lib/server`.
- `src/sanity` owns editorial content queries and schemas. `convex` owns transactional submissions.

## Data flow

Editorial reads use Sanity on the server and are validated with Zod before entering the application. Curated local content is a resilience fallback when Sanity is not configured or returns invalid data.

Public forms call server actions. Each action validates untrusted input with Zod, sends only allow-listed fields to a Convex mutation, and returns a serializable success or error result. Convex validates the mutation arguments again and prevents duplicate submissions.

## Security and errors

Production access to `/internal/*` requires Basic Authentication through `src/proxy.ts`. Production deployments must define both internal documentation credentials. Missing credentials deny access.

Expected form errors return safe messages. Unexpected server and render errors are captured by Sentry when a DSN is configured. Error boundaries provide recovery UI without exposing implementation details.

## Verification

- Vitest covers validation and isolated feature behavior.
- Playwright covers public journeys and automated axe accessibility checks.
- Lighthouse CI records a performance, accessibility and SEO baseline.
- GitHub Actions checks formatting, linting, types, tests, production build, browser journeys and Lighthouse budgets.
