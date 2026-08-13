# Asoebi Fashion Week architecture

## Dependency direction

```text
shared infrastructure → features → app composition
```

- `src/app` owns routes, layouts, metadata, providers, and composition.
- `src/features` owns business capabilities and domain-specific UI.
- `src/components` owns feature-agnostic UI.
- `src/sanity` owns the editorial-content integration.
- `convex` owns application and realtime backend functions.
- `src/animation` owns shared motion primitives and lifecycle utilities.
- `src/content/fallback` owns typed development fixtures.

The route layer composes feature modules and never queries services directly. `src/features/content/data.ts` is the replaceable editorial source boundary: typed fixtures render today, while Sanity can be connected later without changing presentational components. Shared modules do not import features, and client-only behavior stays in navigation, forms, motion, and media islands.

Routes and layouts are Server Components by default. Browser APIs, interactive state, Motion, GSAP, and Convex React hooks are isolated in small Client Component islands.

## Data ownership

```text
Sanity → editorial content
Convex → application and realtime state
Mux → video delivery
```

Presentational components receive typed props and do not communicate directly with services. Runtime validation belongs at environment and external-data boundaries.

## Motion ownership

CSS handles micro-feedback, Motion handles interface state and presence, and GSAP handles justified cinematic or scroll-linked sequences. A single property on an element has one animation owner. Mobile and reduced-motion layouts preserve the narrative without desktop choreography.
