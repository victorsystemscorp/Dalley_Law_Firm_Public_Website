# Image Source Guide — Universal, Project-Agnostic

A single, self-contained reference you can drop into **any** future website project. It tells you exactly where to deposit stock photos, how to name them, which sizes to download, and what the AI must do automatically to fit them into the website **without distortion and without further input from you**.

---

## 1. Quick Start (the one-line rule)

> Drop each photo into `content/images-source/`, named after the page or slot it belongs to (e.g. `bankruptcy.jpg`). Download **1920×1080** for heroes and **1200×900** for everything else. The AI handles all resizing, cropping, compression, output filenames, and HTML wiring — you do nothing else.

---

## 2. Folder Convention

| Folder | Who writes it | What lives there |
|---|---|---|
| `content/images-source/` | **You** | Raw downloads from Depositphotos (or any stock site). The only place you ever touch. |
| `assets/images/` | **The AI** | Finished, compressed, cropped files the website actually serves. Never edit by hand. |

You only ever interact with `content/images-source/`. The AI reads from there and writes to `assets/images/`.

---

## 3. The 5 Base Sizes (the only sizes you ever download)

| Size tag | Pixels | Aspect | Use for |
|---|---|---|---|
| `hero` | 1920×1080 | 16:9 | Heroes, full-width banners, map backgrounds |
| `content` | 1200×900 | 4:3 | Content images beside text — **the most common slot** |
| `card` | 800×500 | 16:10 | Card thumbnails in grids |
| `og` | 1200×630 | 1.91:1 | Open Graph / social share preview (optional) |
| `square` | 512×512 | 1:1 | Square tiles, avatars, favicon source (optional) |

**Minimum to remember:** heroes need **1920×1080**; everything else is happy with **1200×900**. When in doubt, download 1920×1080 — the AI can always crop it down.

---

## 4. Filename Pattern

```
<slot-name>-<size-tag>.<ext>
```

- **`<slot-name>`** = short slug matching the page or purpose (lowercase, hyphens, no spaces). Examples: `bankruptcy`, `buying-business`, `home`, `team-smith`.
- **`<size-tag>`** = one of `hero`, `content`, `card`, `og`, `square` (from the table above). Optional — see §8 for what happens if you omit it.
- **`<ext>`** = `.jpg` for photos, `.png` for logos / transparent artwork.

### Examples you'd drop in
```
content/images-source/
  home-hero.jpg              ← 1920×1080
  bankruptcy-content.jpg     ← 1200×900
  divorce-hero.jpg           ← 1920×1080
  buying-business-hero.jpg   ← 1920×1080
  logo.png                   ← transparent, ≥240×80
  og-default.jpg             ← 1200×630
```

---

## 5. Filename → Output → Slot Table

The mechanical map the AI follows.

| You drop this in `content/images-source/` | AI writes this to `assets/images/` | AI uses it as |
|---|---|---|
| `home-hero.jpg` | `hero.jpg` | Site-wide hero / home page hero background |
| `<page>-hero.jpg` (e.g. `bankruptcy-hero.jpg`) | `<page>.jpg` (e.g. `bankruptcy.jpg`) | Service-detail content image (beside text) AND gets cropped for the card thumbnail |
| `<page>-content.jpg` (e.g. `bankruptcy-content.jpg`) | `<page>.jpg` | Same — use when you only download the 1200×900 |
| `<page>-card.jpg` (e.g. `bankruptcy-card.jpg`) | `<page>-thumb.jpg` | Hub-grid card thumbnail only |
| `<page>-og.jpg` | `<page>-og.jpg` | Open Graph (social share) for that page |
| `team-<name>.jpg` (e.g. `team-smith.jpg`) | `team-<name>.jpg` | Square avatar tile (cropped to 1:1) |
| `logo.png` | `logo.png` + `favicon.ico` + `favicon-512.png` + `favicon-180.png` | Header logo + favicons |
| `og-default.jpg` | `og-image.jpg` | Site-wide default social-share preview |
| `map-bg.jpg` | `courthouse.jpg` (or `map-placeholder.jpg`) | Contact-page map placeholder background |

> If you deposit only `<page>-hero.jpg` (1920×1080), the AI also crops it down to the 4:3 content slot and the 16:10 card slot automatically — you don't have to download the 1200×900 version separately.

---

## 6. Special One-Time Files (not per-page)

| Drop in `content/images-source/` | AI writes to `assets/images/` | Used as |
|---|---|---|
| `logo.png` (transparent, ≥240×80) | `logo.png` | Header/footer logo (every page) |
| `logo.png` (reused) | `favicon.ico`, `favicon-512.png`, `favicon-180.png` | Browser tab icon, app icon, social avatar |
| `og-default.jpg` (1200×630) | `og-image.jpg` | Site-wide default Open Graph preview |
| `map-bg.jpg` (1920×1080) | `courthouse.jpg` (or `map-placeholder.jpg`) | Contact-page map background |

---

## 7. The Two Acceptable Workflows

### Workflow A — "Two downloads per photo" (recommended)
For each photo you buy, download **1920×1080** and **1200×900**, drop both into `content/images-source/`:

```
bankruptcy-hero.jpg      ← rename the 1920×1080 download to this
bankruptcy-content.jpg   ← rename the 1200×900 download to this
```

AI picks `-hero` for the hero slot, `-content` for the detail-page content slot, and crops `-content` for the card thumbnail.

### Workflow B — "One download, the AI does everything"
Download just **1200×900** and drop it in:

```
bankruptcy.jpg           ← 1200×900
```

The AI uses it for the content slot (perfect fit) and crops down for the card thumbnail. **Limitation:** not big enough for a full-screen hero — heroes must come in as 1920×1080.

> **Plain rule:** heroes demand ≥ 1920×1080. Everything else is happy with 1200×900. When unsure, download 1920×1080 — the AI can always crop it down.

---

## 8. Aspect-Ratio Fallback (if you skip the size tag)

If you just deposit `bankruptcy.jpg` with no `-hero` / `-content` suffix, the AI reads the **detected aspect ratio** at build time and routes the photo itself:

| Detected aspect | Assumed slot | AI action |
|---|---|---|
| ~16:9 (wide) | Hero | Used for hero, then cropped for content & cards |
| ~4:3 (content) | Content image | Used for content slot, cropped for cards |
| ~16:10 | Card | Used only for cards |
| ~1:1 (square) | Square tile / avatar | Used as-is |

So even minimal naming works — the AI reads the dimensions and routes the photo.

---

## 9. What the AI Does Automatically at Build Time

1. **Select** the source variant whose aspect ratio is closest to the slot's target aspect AND whose pixels are ≥ the slot's display size × 2. Never upscale. Never distort.
2. **Center-crop** (never stretch) the chosen source to the slot's target aspect ratio, keeping the main subject in frame. Preserve a ~10% safe margin inside every edge. Prefer faces/text/logos when multiple subjects exist.
3. **Compress** to JPG ≤ 500 KB for content images, ≤ 800 KB for heroes. Preserve sRGB color profile. Logos stay PNG with transparency; favicons stay PNG or ICO.
4. **Save** each finished file into `assets/images/` using a short, slug-style, lowercase filename matching the page or slot (e.g. `hero.jpg`, `bankruptcy.jpg`, `logo.png`, `favicon.ico`). Overwrite any existing placeholder of the same name.
5. **Wire** the finished file into the correct HTML/CSS automatically (`<img src>`, `background-image`, `og:image` meta, `<link rel="icon">`, etc.) using the clean filename from step 4.
6. **Placeholder when missing** — if a source photo is missing for a given slot, generate a clearly-labeled placeholder (flat block with the slot name and target dimensions in readable text) so you can see exactly which photo is still needed and at what size.

---

## 10. Absolute Rules the AI Must Follow

- **Never upscale** a source photo to fill a slot.
- **Never stretch or squash** a photo's aspect ratio.
- **Always crop instead.**
- **Keep the main subject centered** and inside the safe zone.
- **Use sRGB** color profile for every raster image.
- **Prefer one download** (1920×1080 OR 1200×900) and crop, rather than asking you for additional sizes.
- **Only flag you** if no source variant is large enough for the slot's display size × 2; in every other case, the AI silently does the right thing.

---

## 11. Worked Example — 3 Service Pages + Logo

You buy 3 photos on Depositphotos and download the 1920×1080 version of each. You rename and drop them in:

```
content/images-source/
  housing-hero.jpg          ← 1920×1080, from Depositphotos
  divorce-hero.jpg          ← 1920×1080, from Depositphotos
  buying-business-hero.jpg  ← 1920×1080, from Depositphotos
  logo.png                  ← your existing logo (transparent PNG)
```

AI automatically produces:

```
assets/images/
  hero.jpg                  ← cropped from housing-hero (or whichever you designate as site hero)
  housing.jpg               ← cropped 1920×1080 → 1200×900 (4:3) for the content slot
  housing-thumb.jpg         ← cropped 1200×900 → 800×500 (16:10) for the card slot
  divorce.jpg               ← same pattern
  divorce-thumb.jpg
  buying-business.jpg
  buying-business-thumb.jpg
  logo.png
  favicon.ico
  favicon-512.png
  favicon-180.png
  og-image.jpg              ← site default (cropped from a hero if no og-default supplied)
```

And wires each into the correct `<img src>`, `background-image`, `og:image`, and `<link rel="icon">` automatically.

---

## 12. Slot Reference (the AI matches each slot to this target spec)

| Slot | Target size | Aspect | Format | Max KB |
|---|---|---|---|---|
| Hero / full-width banner | 1920×1080 | 16:9 | JPG | 800 |
| Content image (beside text) | 1200×900 | 4:3 | JPG | 500 |
| Card thumbnail (in grids) | 800×500 | 16:10 | JPG | 200 |
| Square tile / avatar | 512×512 | 1:1 | JPG/PNG | 200 |
| Open Graph (social share) | 1200×630 | 1.91:1 | JPG | 300 |
| Logo | ≥ 240×80 | any | PNG transparent | 200 |
| Favicon | 512×512 (exports ICO + PNG) | 1:1 | PNG/ICO | 100 |

---

## 13. Pre-Send Checklist (before downloading from the stock site)

| # | Check | Why |
|---|---|---|
| 1 | Longest side ≥ 1200 px (content) or ≥ 1920 px (hero) | Below this → blurry when displayed larger |
| 2 | Aspect ratio matches the slot? (16:9 hero, 4:3 content) | Wrong ratio → either cropped (cuts content) or distorted |
| 3 | Subject centered with ~10% safe margin on each edge | CSS often center-crops; edges may get cut |
| 4 | Format correct? JPG for photos, PNG for logos/transparent | Wrong format = bigger file or missing transparency |
| 5 | File < 1 MB after compression | Big files slow the site and hurt Google ranking |
| 6 | Photo looks OK at both desktop (600 px wide) and mobile (350 px wide) | Mobile is where most visitors see it |

---

## 14. The Golden Rule (the one sentence to remember)

> **Drop photos named after their page into `content/images-source/`. Download 1920×1080 for heroes and 1200×900 for everything else. The AI handles all resizing, cropping, compression, output filenames, and HTML wiring — you do nothing else.**