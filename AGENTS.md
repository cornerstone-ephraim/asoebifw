<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN: tailwindcss-canonical-class-rules -->

## Tailwind CSS conventions

This project uses **Tailwind CSS v4**. Treat Tailwind v4 syntax as a hard project requirement, not a preference.

### Source of truth

When writing or modifying Tailwind classes, use this priority order:

1. Existing project design-system utilities and `@theme` tokens.
2. Tailwind CSS v4 canonical utilities.
3. Tailwind CSS v4 canonical arbitrary-value syntax only when no first-class utility or project token exists.

Do **not** copy Tailwind v3 classes from memory, old snippets, tutorials, Stack Overflow answers, generated examples, or existing legacy code.

A class continuing to compile for backward compatibility does **not** make it acceptable. If Tailwind v4 has a canonical replacement, use the v4 form.

### Canonical-class requirement

- Always use Tailwind v4 canonical utility classes.
- Never introduce a legacy, deprecated, compatibility, or noncanonical equivalent when a canonical v4 class exists.
- When touching existing markup, fix nearby noncanonical Tailwind classes in the changed code rather than propagating them.
- Never silence, ignore, or work around a `suggestCanonicalClasses` diagnostic.
- Before completing frontend work, resolve **every `suggestCanonicalClasses` diagnostic in every changed file**.
- If the Tailwind language tooling proposes a canonical class that preserves the intended styling, apply it.
- Do not mark a frontend task complete while changed files still contain known canonicalization warnings.

### Canonical Tailwind v4 examples

Use:

```txt
bg-linear-to-r
```

not:

```txt
bg-gradient-to-r
```

Use:

```txt
rounded-4xl
```

not:

```txt
rounded-[2rem]
```

Use:

```txt
aspect-4/3
```

not:

```txt
aspect-[4/3]
```

Use:

```txt
max-w-375
```

not:

```txt
max-w-[1500px]
```

Use project tokens:

```txt
bg-asoebi-mist
text-asoebi-ink
border-asoebi-plum
```

not hard-coded brand values:

```txt
bg-[#eee8f8]
text-[#16131d]
border-[#6f4a8e]
```

### Tailwind v4 renamed and removed utilities

Do not use removed v3 utilities when the v4 replacement exists:

```txt
bg-opacity-*          -> color opacity modifier, e.g. bg-black/50
text-opacity-*        -> text-black/50
border-opacity-*      -> border-black/50
divide-opacity-*      -> divide-black/50
ring-opacity-*        -> ring-black/50
placeholder-opacity-* -> placeholder-black/50

flex-shrink-*         -> shrink-*
flex-grow-*           -> grow-*
overflow-ellipsis     -> text-ellipsis
decoration-slice      -> box-decoration-slice
decoration-clone      -> box-decoration-clone
```

Be especially careful with utilities whose scales changed in v4:

```txt
v3 intent             v4 canonical equivalent
shadow-sm             shadow-xs
shadow                shadow-sm
drop-shadow-sm        drop-shadow-xs
drop-shadow           drop-shadow-sm
blur-sm               blur-xs
blur                   blur-sm
backdrop-blur-sm      backdrop-blur-xs
backdrop-blur         backdrop-blur-sm
rounded-sm            rounded-xs
rounded               rounded-sm
outline-none          outline-hidden   # when preserving the old accessible outline behavior
ring                   ring-3          # when preserving the old 3px ring
```

Do not mechanically preserve the class name when upgrading old code; preserve the **visual intent** using the v4 scale.

### Gradients

Use the v4 gradient vocabulary:

```txt
bg-linear-to-r
bg-linear-to-br
bg-linear-45
bg-radial
bg-conic-180
```

Do not generate v3-style directional gradient utilities such as:

```txt
bg-gradient-to-r
bg-gradient-to-br
```

Use normal v4 color-stop utilities:

```txt
from-asoebi-plum
via-asoebi-violet
to-asoebi-mist
```

### Ratios, sizing, and spacing

Prefer first-class v4 utilities over arbitrary values whenever the value can be represented canonically.

Examples:

```txt
aspect-4/3       not aspect-[4/3]
aspect-3/2       not aspect-[3/2]

max-w-375        not max-w-[1500px]
w-8              not w-[32px]
h-12             not h-[48px]
size-8           instead of w-8 h-8 when width and height are intentionally identical
```

Do not convert a deliberate value to a scale utility unless they are actually equivalent in this project's theme.

### Border radius

Use the named v4 radius scale whenever possible:

```txt
rounded-xs
rounded-sm
rounded-md
rounded-lg
rounded-xl
rounded-2xl
rounded-3xl
rounded-4xl
```

Prefer:

```txt
rounded-4xl
```

over:

```txt
rounded-[2rem]
```

Use arbitrary radii only when the design intentionally requires a value that has no equivalent theme utility.

### Design-system tokens before arbitrary values

Brand colors, recurring dimensions, typography, radii, shadows, breakpoints, and other reusable design decisions belong in the project's Tailwind v4 theme.

Prefer defining or reusing tokens in CSS with `@theme`, then consuming the generated utility:

```css
@theme {
  --color-asoebi-mist: #eee8f8;
  --color-asoebi-ink: #16131d;
}
```

Then use:

```txt
bg-asoebi-mist
text-asoebi-ink
```

Do not repeatedly write:

```txt
bg-[#eee8f8]
text-[#16131d]
```

Rules:

- Reuse an existing token before creating a new one.
- If a brand/design value is reused or conceptually belongs to the design system, make it a token.
- Arbitrary values are a last resort for genuinely one-off values.
- Do not use arbitrary values merely because they are easier to generate.

### CSS custom properties in utilities

Use Tailwind v4's canonical custom-property shorthand.

Prefer:

```txt
bg-(--brand-color)
max-w-(--content-width)
aspect-(--media-ratio)
```

over legacy/noncanonical variable forms such as:

```txt
bg-[--brand-color]
```

Use bracket arbitrary syntax when the value is truly an arbitrary CSS expression, for example:

```txt
rounded-[calc(var(--radius-xl)-1px)]
```

### Important modifier

When an important utility is genuinely required, use the Tailwind v4 form with `!` at the end:

```txt
flex!
bg-asoebi-mist!
hover:bg-asoebi-plum!
```

Do not introduce the old form:

```txt
!flex
!bg-asoebi-mist
```

Avoid `!important` unless there is a demonstrated cascade requirement.

### Tailwind v4 CSS setup

Do not introduce legacy v3 setup syntax.

Use:

```css
@import "tailwindcss";
```

Do not add:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Prefer Tailwind v4's CSS-first configuration and `@theme` for design tokens. Do not add or expand a legacy `tailwind.config.js` unless the project already requires it for a specific compatibility reason.

### Preserve semantic intent

Canonicalization must not alter the intended UI.

When replacing a class:

1. Determine the intended computed result.
2. Find the Tailwind v4 canonical equivalent.
3. Prefer the project token if one exists.
4. Verify responsive, hover, focus, dark-mode, and motion variants still behave correctly.
5. Do not change unrelated styling merely to satisfy a cosmetic rewrite.

### Variants

Use normal Tailwind v4 variants and preserve their intended order.

Examples:

```txt
hover:bg-asoebi-plum
focus-visible:outline-2
md:grid-cols-2
lg:max-w-375
motion-reduce:transition-none
```

Do not depend on touch devices emulating `hover` for essential functionality.

### Class generation

Tailwind scans source files as plain text, so class names must be statically discoverable.

Do not construct class names dynamically like:

```tsx
`bg-${color}-500`;
```

Prefer complete class strings selected explicitly:

```tsx
const variants = {
  plum: "bg-asoebi-plum",
  mist: "bg-asoebi-mist",
};
```

### Required frontend completion check

Before declaring frontend work complete:

1. Inspect every changed frontend file.
2. Resolve all `suggestCanonicalClasses` diagnostics.
3. Search changed code for obvious Tailwind v3/legacy forms.
4. Replace arbitrary values with canonical utilities where an exact equivalent exists.
5. Replace repeated brand/design arbitrary values with existing design-system tokens.
6. Confirm newly added design tokens are defined through the project's Tailwind v4 theme.
7. Run the project's lint/type/build checks that are relevant to the change.
8. Re-check the final diff so no old canonical classes were introduced during later edits.

Useful legacy patterns to search for include:

```txt
bg-gradient-
bg-opacity-
text-opacity-
border-opacity-
divide-opacity-
ring-opacity-
placeholder-opacity-
flex-shrink-
flex-grow-
overflow-ellipsis
decoration-slice
decoration-clone
```

Also review bare or old-scale utilities such as:

```txt
shadow
shadow-sm
blur
blur-sm
backdrop-blur
backdrop-blur-sm
rounded
rounded-sm
ring
outline-none
```

These are not always invalid in v4, but old code may rely on their v3 meaning. Verify intent before keeping them.

### Final rule

**Compatibility is not canonicality.**

When Tailwind v4 provides a canonical utility, Codex must use it even if an older form still happens to compile.

The expected result is frontend code that is:

- Tailwind CSS v4-native;
- free of `suggestCanonicalClasses` diagnostics in changed files;
- based on project design tokens;
- minimally dependent on arbitrary values;
- free of newly introduced v3 compatibility syntax.

<!-- END: tailwindcss-canonical-class-rules -->
