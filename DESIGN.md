# Autodev Design System — Wallet / Autodev Dashboard craft

**Mandatory.** Every generated site must follow this document. The bar is the **Autodev dashboard** itself: dark, calm, sheet-based UI — Coinbase/Trust-wallet density, not a generic shadcn marketing template.

Reference tokens (match this feel even when the brand accent changes):

| Role | Hex | Use |
|------|-----|-----|
| Page bg | `#141414` | Full canvas |
| Elevated sheet | `#1e1e1e` | Panels, lists, forms |
| Hover mist | `#252525` | Row / control hover |
| Ring / hairline | `#2b2b2b` | `ring-1` / row dividers |
| Primary text | `#e4e4e4` | Titles, values |
| Secondary | `#8a8a8a` | Supporting copy |
| Faint label | `#5c5c5c` | Section labels, meta |
| Accent (default cool) | brand primary, prefer muted slate-blue / soft green / warm amber — **never** neon purple |

---

## 1. Stack for UI

- **Next.js 15 App Router** + TypeScript
- **Tailwind CSS v3**
- **Inter** via `next/font/google` (`--font-sans`)
- **lucide-react** for icons (sparse — not icon rows)
- **clsx** + **tailwind-merge** → `cn()` in `lib/utils.ts`
- Hand-roll `components/ui/*` — **only** modules that ship in the Autodev template

### Allowed `components/ui` imports

`button`, `card`, `input`, `label`, `badge`, `separator`, `textarea`, `select`, `checkbox`

**Forbidden:** `dropdown-menu`, `dialog`, `sheet`, `tabs`, `popover`, `avatar`, `switch`, or any other shadcn module not listed.

---

## 2. Typography

```tsx
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
```

| Role | Classes | Notes |
|------|---------|--------|
| Hero / product name | `text-[24px] sm:text-3xl font-semibold tracking-tight text-[#e4e4e4]` | Brand is the hero signal |
| Section title | `text-[17px] font-semibold tracking-tight text-[#e4e4e4]` | |
| Body | `text-[14px] leading-relaxed text-[#8a8a8a]` | |
| Soft section label | `text-[12px] font-medium text-[#5c5c5c]` | **Not** uppercase tracking spam |
| Meta / mono | `font-mono text-[11px] text-[#5c5c5c]` | slugs, timestamps |

Letter-spacing slightly tight (`tracking-tight` on titles). Avoid shouty `font-black` / `uppercase tracking-widest` chrome.

---

## 3. Color tokens

Dark-first by default (Autodev look). Map brand accent into `--primary` as HSL channels; keep neutrals near the table above.

```css
:root {
  --background: 0 0% 8%;          /* ~#141414 */
  --foreground: 0 0% 89%;         /* ~#e4e4e4 */
  --card: 0 0% 12%;               /* ~#1e1e1e */
  --card-foreground: 0 0% 89%;
  --primary: /* brand accent HSL channels */;
  --primary-foreground: 0 0% 8%;
  --secondary: 0 0% 15%;
  --secondary-foreground: 0 0% 89%;
  --muted: 0 0% 15%;
  --muted-foreground: 0 0% 54%;   /* ~#8a8a8a */
  --accent: 0 0% 15%;
  --accent-foreground: 0 0% 89%;
  --destructive: 0 45% 63%;       /* soft red like #c97a7a */
  --border: 0 0% 17%;             /* ~#2b2b2b */
  --input: 0 0% 17%;
  --ring: /* match primary */;
  --radius: 1.25rem;              /* ~20px sheets */
}
```

**Light theme only** if the idea’s visual direction explicitly demands paper/daylight — still use sheet language (`rounded-[20px]`, soft labels, pill CTAs), not purple-on-white SaaS.

**Accent:** one muted brand color. Prefer cool slate-blue, sage, or soft amber. Ban rainbow UI and purple/indigo mesh.

---

## 4. Atmosphere (allowed wash)

Page background may use **one** soft radial wash — matching Autodev:

```css
background:
  radial-gradient(ellipse 80% 50% at 50% -10%, <accent at ~12% alpha>, transparent 55%),
  #141414;
```

Banned: multi-stop purple meshes, linear rainbow heroes, glow blobs, aurora stacks.

---

## 5. Surfaces — sheets, not “cards”

Default composition = **wallet sheets**:

- Panel: `rounded-[20px] bg-[#1e1e1e] ring-1 ring-[#2b2b2b]` (or `bg-card ring-1 ring-border`)
- List rows: `px-4 py-3.5` with `border-b border-[#2b2b2b]/80` between cells — **not** a grid of identical Card boxes
- Nested inset: `rounded-[16px] bg-[#181818] ring-1 ring-[#2b2b2b]`
- Hover row: `hover:bg-[#252525]`
- **No** heavy `shadow-xl` / colored glows
- Radius: sheets `rounded-[20px]`, controls `rounded-[10px]`–`rounded-xl`, CTAs often `rounded-full`

Avoid wrapping everything in shadcn `Card` with `shadow-sm` — prefer sheet + cell rows.

---

## 6. Spacing & shell

- Base 4px. Comfortable gaps: `gap-4` / `gap-5`, section stack `space-y-5` / `gap-6`
- Shell: `mx-auto max-w-lg` or `max-w-xl` for tool/wallet products; `max-w-5xl` only when archetype needs width
- Padding: `px-4 sm:px-5`, generous bottom pad for mobile
- One job per section: soft label + one sheet or one interactive block

---

## 7. Buttons & CTAs

- Primary: solid light pill on dark — e.g. `rounded-full bg-[#e4e4e4] text-[#141414] font-semibold` **or** solid `--primary` with readable foreground
- Secondary: `rounded-full bg-[#1e1e1e] ring-1 ring-[#2b2b2b] text-[#e4e4e4]`
- Ghost: text `#8a8a8a` → hover sheet
- One solid primary per cluster
- Map shadcn Button variants to this language via `className` / CVA — don’t ship default bright blue rectangles

---

## 8. Navigation & chrome

Follow the **LAYOUT ARCHETYPE** in the build prompt.

Forbidden cookie-cutter:
- Sticky blur `border-b` marketing nav on every ship
- Logo + 5 links + solid CTA right
- Three-column footer link farms

Prefer Autodev-like chrome when it fits:
- Centered title in a slim sticky header + mark top-left
- Floating bottom pill nav **only** for multi-view apps
- Tool-first: almost no chrome

Logo: always `/logo.svg`. Display as a **squircle** when used as an avatar (`rounded-[14px]`–`rounded-[22px]`), or as a bare mark (no plate) in headers.

---

## 9. Hero & first viewport

Wallet / tool products:
- Product mark (squircle) + name + one short line + primary action
- Or skip hero and open straight into the tool sheet

Rules:
- Brand name is hero-level — don’t bury it under a louder headline
- No floating badge stickers on media
- No identical 3-card feature grids under every hero
- Optional soft radial wash only (see §4)

---

## 10. Forms & tools

- Put controls inside a sheet (`rounded-[20px] …`)
- Soft `text-[12px] text-[#5c5c5c]` labels above fields
- Inputs: dark fill, `ring-1 ring-[#2b2b2b]`, `rounded-[10px]`, light text
- Cell-style settings rows (label left, control right) for toggles/meta
- Primary submit: full-width pill
- Results: second sheet or cell list — not a loud Card carousel

---

## 11. Motion

2–3 intentional motions max:
1. `transition-colors` on rows/buttons
2. Soft opacity on primary hover
3. Optional 150–250ms fade-in on first paint

No bounce, parallax, or shimmer spam (except tiny status dots if needed). Respect `prefers-reduced-motion`.

---

## 12. Quality checklist

- [ ] Dark wallet canvas (`#141414`) + sheet language unless light is explicit
- [ ] Soft section labels (`#5c5c5c`), not uppercase chrome
- [ ] Sheets `rounded-[20px]` + `#2b2b2b` rings; cell rows over Card grids
- [ ] Pill CTAs; one primary
- [ ] `/logo.svg` used; squircle where product identity shows in lists
- [ ] Inter via `next/font`; tokens in CSS variables
- [ ] Accent muted, singular — no purple mesh
- [ ] Mobile-first; tap targets ≥40px
- [ ] Real copy — zero lorem / “your amazing product”

---

## 13. Anti-patterns (reject)

- Purple / indigo gradient heroes
- Cream page + terracotta + decorative serif (AI default #2)
- Broadsheet hairline newspaper layouts
- Generic shadcn light SaaS: sticky blur nav → hero → 3 feature Cards → footer
- Glow, neon, glassmorphism soup
- Huge `rounded-3xl` colorful shadow cards
- Icon-row feature strips and pill-chip spam
- Stock photo grids as the product

---

## 14. File expectations

```
app/globals.css          # tokens + base + optional radial wash
app/layout.tsx           # Inter, metadata
app/page.tsx             # composition
components/ui/*          # allowed modules only
components/*             # product sections
lib/utils.ts
public/logo.svg          # from brand step — do not invent a worse mark
```

When in doubt: open a mental picture of the **Autodev approve / overview screens** — match that craft.
