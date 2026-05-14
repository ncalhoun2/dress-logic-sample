# Design System: Editorial Elegance for Modo

## 1. Overview & Creative North Star: "The Digital Lookbook"
This design system moves away from the "utility-first" appearance of standard e-commerce apps toward a **Digital Lookbook** philosophy. The Creative North Star is centered on **Intentional Asymmetry and Tonal Depth**. 

While traditional apps rely on rigid grids and heavy borders to organize information, this system uses high-contrast typography and subtle shifts in color to guide the eye. We adapt the minimalism of the 'Atelier Noir' principles but soften the brutalism with a palette of dusty roses and muted amethysts. The layout should feel like a premium fashion magazine: airy, high-contrast, and unafraid of "wasted" space. Elements should occasionally overlap—a product image breaking into a header, or a price tag floating over a transition—to create a sense of tactile layering.

---

## 2. Colors: The Tonal Spectrum
Our palette is not just a decoration; it is our primary structural tool. We use a "Soft-Focus" approach where color defines boundaries rather than lines.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning or containment. Separation of concerns must be achieved through background shifts. For instance, a product description section in `surface-container-low` should sit directly against a `surface` background. The transition is the boundary.

### Surface Hierarchy & Nesting
Treat the interface as physical layers of fine vellum paper.
- **Background (`#fbf9f9`):** The canvas.
- **Surface-Container-Lowest (`#ffffff`):** Used for elevated interactive cards that need to "pop" against the background.
- **Surface-Container-High (`#e9e8e8`):** Used for inset areas like search bars or secondary content blocks to create a "recessed" feel.

### The "Glass & Gradient" Rule
To add "soul" to the digital experience, use **Backdrop Blurs** (20px–40px) on navigation bars and floating modals using a semi-transparent `surface` color. For high-impact CTAs, apply a subtle linear gradient from `primary` (#7b535c) to `primary_container` (#d8a7b1) at a 135-degree angle to give buttons a soft, pillowy dimension.

---

### 3. Typography: Sophisticated Contrast
We pair the intellectual, high-fashion feel of a serif with the modern utility of a geometric sans-serif.

*   **Display & Headline (Newsreader):** This is our "Editorial Voice." Use `display-lg` and `headline-lg` with generous leading. These should be treated as graphic elements. Do not be afraid of large-scale titles that take up 40% of the viewport.
*   **Title & Body (Manrope):** Our "Functional Voice." Manrope provides a clean, neutral balance to the expressive Newsreader. Use `title-md` for product names and `body-md` for descriptions to ensure maximum legibility against the soft color palette.
*   **Label (Manrope):** All-caps labels with +5% letter spacing should be used for categories (e.g., "NEW ARRIVALS") to mimic high-end mastheads.

---

## 4. Elevation & Depth: Tonal Layering
In this system, "Elevation" does not mean "Shadow." It means "Contrast."

*   **The Layering Principle:** Instead of a shadow, place a `surface-container-lowest` card on a `surface-container-low` section. This creates a soft, natural lift.
*   **Ambient Shadows:** If a floating element (like a Quick-Buy FAB) requires a shadow, it must be an "Ambient Glow." Use the `on_surface` color at 4% opacity with a 32px blur and 8px Y-offset. It should feel like a soft hum, not a harsh drop.
*   **The "Ghost Border" Fallback:** If accessibility requires a stroke (e.g., in a high-glare environment), use the `outline_variant` (#d4c2c5) at **15% opacity**. This creates a "suggestion" of a border that disappears into the background.
*   **Glassmorphism:** Use `surface_bright` at 70% opacity with a `saturate(180%) blur(20px)` CSS filter for top navigation bars. This allows the lush fashion photography to bleed through the UI, maintaining the editorial flow.

---

## 5. Components: Style & Execution

### Buttons
*   **Primary:** Pill-shaped (`full` roundedness). Background: `primary` (#7b535c). Text: `on_primary` (#ffffff). No shadow.
*   **Secondary:** Pill-shaped. Background: `secondary_container` (#a19afd). Text: `on_secondary_container` (#352c8a).
*   **Tertiary:** Ghost style. No background. `title-sm` typography in `primary`.

### Cards & Lists
*   **Product Cards:** Forbid dividers. Use `xl` (0.75rem) roundedness for images. The product title and price should sit on the `surface` with no containing box, relying on white space (16px–24px) for separation.
*   **Horizontal Lists:** Use "Bleed Layouts" where the last item is partially cut off by the screen edge, signaling scrollability without the need for arrows or scrollbars.

### Input Fields
*   **Styling:** Use the `surface_container` (#efeded) as a solid background fill with a `none` border. On focus, transition the background to `primary_fixed` (#ffd9e0) rather than adding a stroke.
*   **Typography:** Labels should be `label-md` in `on_surface_variant`.

### Editorial Highlights (Special Component)
*   **The Overlap Hero:** A component where a high-quality cutout image of a model overlaps a `display-md` headline. This breaks the grid and enforces the "Atelier" look.

---

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical margins. For example, a 24px left margin and a 40px right margin for text blocks.
*   **Do** prioritize high-quality, desaturated imagery that complements the pink/purple palette.
*   **Do** use `secondary` (#5952af) sparingly as a "vibrancy accent" for active states or notifications.

### Don't
*   **Don't** use 1px dividers. Use a 32px vertical spacer instead.
*   **Don't** use pure black (#000000) for text. Always use `on_surface` (#1b1c1c) to keep the contrast sophisticated, not jarring.
*   **Don't** use sharp corners. Always use at least the `DEFAULT` (0.25rem) roundedness scale to maintain the "Soft Minimalism" aesthetic.