# Dalley Law Firm, P.C. — Bilingual Website (English + Español)

A complete, static, bilingual (English / Spanish) law-firm website built with
plain **HTML + CSS + vanilla JavaScript**. No frameworks, no build step, no
backend — ready to deploy directly to **GitHub Pages**.

> **Companion guides (drop into every future website project):**
> - `IMAGE-SOURCE-GUIDE.md` — universal photo sizes, naming, and the automatic image-handling routine
> - `DEPLOYMENT-GUIDE.md` — git push safety, GitHub Pages rebuild verification, and the map-embed checklist
> - `TEL-LINKS-GUIDE.md` — phone-number links: only fire `tel:` on phones, suppress "Pick an app" dialog on desktop/tablet
>
> This README covers THIS project specifically.

---

## 1. Project Structure

```
/
├─ index.html                 ← Language selector (the site's front door)
├─ robots.txt
├─ sitemap.xml
├─ site.webmanifest           ← PWA manifest (installable / home-screen app)
├─ README.md                  ← this file
├─ IMAGE-SOURCE-GUIDE.md       ← universal image-spec guide (project-agnostic)
│
├─ assets/
│   ├─ css/
│   │   └─ styles.css          ← shared stylesheet (all pages)
│   ├─ js/
│   │   ├─ main.js             ← shared progressive-enhancement JS
│   │   └─ i18n-map.js         ← EN ↔ ES page map (reference; switcher hrefs are hardcoded)
│   └─ images/                 ← all photos + logo + favicon (DO NOT edit by hand for swappable photos — use content/images-source/)
│
├─ en/                         ← ENGLISH website
│   ├─ index.html              ← Home
│   ├─ services-persons.html   ← Services for Persons (hub)
│   ├─ services-business.html  ← Services for Business (hub)
│   ├─ contact.html
│   ├─ persons/                ← 8 individual service pages
│   │   ├─ housing.html
│   │   ├─ bankruptcy.html
│   │   ├─ criminal.html
│   │   ├─ disputes.html
│   │   ├─ divorce.html
│   │   ├─ family.html
│   │   ├─ immigration.html
│   │   └─ estates-wills.html
│   └─ business/               ← 8 individual service pages
│       ├─ creation.html
│       ├─ lease-reviews.html
│       ├─ buying-business.html
│       ├─ accounting-finance.html
│       ├─ contracts.html
│       ├─ commercial-disputes.html
│       ├─ intellectual-property.html
│       └─ selling-business.html
│
└─ es/                         ← SPANISH website (mirror structure)
    ├─ index.html
    ├─ servicios-personas.html
    ├─ servicios-negocios.html
    ├─ contacto.html
    ├─ personas/                ← 8 individual service pages (Spanish slugs)
    │   ├─ vivienda.html
    │   ├─ bancarrota.html
    │   ├─ criminal.html
    │   ├─ disputas.html
    │   ├─ divorcio.html
    │   ├─ familia.html
    │   ├─ inmigracion.html
    │   └─ patrimonios-testamentos.html
    └─ negocios/                ← 8 individual service pages (Spanish slugs)
        ├─ creacion.html
        ├─ revision-arrendamientos.html
        ├─ compra-negocio.html
        ├─ contabilidad-finanzas.html
        ├─ contratos.html
        ├─ disputas-comerciales.html
        ├─ propiedad-intelectual.html
        └─ venta-negocio.html
```

**Total:** 1 root + 20 EN pages + 20 ES pages = **41 HTML files**, plus shared CSS/JS, SEO files, and the curated image set.

`content/images-source/` is a working folder you create (see `IMAGE-SOURCE-GUIDE.md`) where you drop stock-photo downloads; the AI crops/compresses to `assets/images/`. It is NOT required for the site to run.

---

## 2. English ↔ Spanish Page Mapping (language switcher)

The language-switch buttons in each page's header are **hardcoded** to point to the equivalent page in the other language — so users always stay on the same topic, never bounced to the home page. (With JavaScript disabled, the hrefs still work.)

| English | Spanish |
|---|---|
| `/index.html` (root selector) | `/index.html` |
| `/en/index.html` | `/es/index.html` |
| `/en/services-persons.html` | `/es/servicios-personas.html` |
| `/en/services-business.html` | `/es/servicios-negocios.html` |
| `/en/contact.html` | `/es/contacto.html` |
| `/en/persons/housing.html` | `/es/personas/vivienda.html` |
| `/en/persons/bankruptcy.html` | `/es/personas/bancarrota.html` |
| `/en/persons/criminal.html` | `/es/personas/criminal.html` |
| `/en/persons/disputes.html` | `/es/personas/disputas.html` |
| `/en/persons/divorce.html` | `/es/personas/divorcio.html` |
| `/en/persons/family.html` | `/es/personas/familia.html` |
| `/en/persons/immigration.html` | `/es/personas/inmigracion.html` |
| `/en/persons/estates-wills.html` | `/es/personas/patrimonios-testamentos.html` |
| `/en/business/creation.html` | `/es/negocios/creacion.html` |
| `/en/business/lease-reviews.html` | `/es/negocios/revision-arrendamientos.html` |
| `/en/business/buying-business.html` | `/es/negocios/compra-negocio.html` |
| `/en/business/accounting-finance.html` | `/es/negocios/contabilidad-finanzas.html` |
| `/en/business/contracts.html` | `/es/negocios/contratos.html` |
| `/en/business/commercial-disputes.html` | `/es/negocios/disputas-comerciales.html` |
| `/en/business/intellectual-property.html` | `/es/negocios/propiedad-intelectual.html` |
| `/en/business/selling-business.html` | `/es/negocios/venta-negocio.html` |

When adding a page: create it in both `/en/` and `/es/`, then update both pages' language-switch hrefs to point at each other. A reference map also lives in `assets/js/i18n-map.js` (`window.DALLEY_I18N_MAP`).

---

## 3. Where to Place Images

All website images live in **one** folder:

```
assets/images/
```

To replace any photo: drop a new file with the **same filename** into that folder. No HTML editing required. Recommended format: JPG ≤ 500 KB, 4:3 aspect, ≥ 800×600 px (service pages). See `IMAGE-SOURCE-GUIDE.md` for the full universal spec.

### Current image → page map (override any file with the same name)

| File | Used on |
|---|---|
| `logo.png` | Header/footer logo, favicon, app icon (don't change — transparent PNG) |
| `hero.jpg` | Root selector + EN/ES home hero backgrounds |
| `vivienda.jpg` | Housing / Vivienda |
| `bancarrota.jpg` | Bankruptcy / Bancarrota |
| `criminal.jpg` | Criminal / Criminal |
| `disputas.jpg` | Disputes / Disputas |
| `divorcio.jpg` | Divorce / Divorcio |
| `familia.jpg` | Family / Familia |
| `inmigracion.jpg` | Immigration / Inmigración |
| `patrimonios.jpg` | Estates & Wills / Patrimonios |
| `creacion.jpg` | Business Creation / Creación |
| `revision-arrendamientos.jpg` | Lease Reviews / Revisión Arrendamientos |
| `compra-negocio.jpg` | Buying a Business / Compra de Negocios |
| `contabilidad-finanzas.jpg` | Accounting & Finance / Contabilidad |
| `contratos.jpg` | Contracts / Contratos |
| `disputas-comerciales.jpg` | Commercial Disputes / Disputas Comerciales |
| `propiedad-intelectual.jpg` | Intellectual Property / Propiedad Intelectual |
| `venta-negocio.jpg` | Selling a Business / Venta de Negocios |
| `courthouse.jpg` | Map placeholder background (contact pages) |
| `persons-hub.jpg` | Services for Persons hub card |
| `business-hub.jpg` | Services for Business hub card |
| `abogados-cliente.jpg`, `man-free.jpg` | unused reserve (available for future pages) |

> The CSS sets `.split__media { aspect-ratio: 4/3 }` so all service images render at an identical size regardless of the source's native aspect ratio — no more "huge portrait image" blow-ups. `object-fit: cover` does the cropping.

---

## 4. Where to Edit Service Descriptions (Copy)

Each page is a self-contained HTML file with the copy inline. To change the marketing copy on a service page:

1. Open the matching HTML file (e.g. `en/persons/immigration.html` or `es/personas/inmigracion.html`).
2. Edit the `<h1>`, `<h2>`, paragraph (`<p>`), and list-item (`<li>`) text inside `<main>`.
3. Save. Reload the browser. Done.

Each service page follows the **same conversion-oriented structure**:
`Hero → Problem statement → How We Help → Why Choose Us → 3-Step Process → FAQ → CTA bar → Contact block`.

The source Spanish copy for many services lives in `Content/Servicios para Personas/` and `Content/Servicios para Negocios/` (provided RTF/DOCX files). Pages were rewritten from that source as persuasive marketing copy preserving factual accuracy. Pages for services that had **no source text** (Business Creation, Lease Reviews, Buying a Business) were drafted from scratch to match the established format.

**Important:** Do NOT fabricate attorney credentials, awards, case results, or certifications. The "Our Attorneys" section on the home pages is a **clearly-labeled placeholder** for you to fill in with real bios.

---

## 5. How to Customize (Key Spots)

| To change… | Edit… |
|---|---|
| Phone number | Do a project-wide find/replace of `(718) 554-6300` and `tel:+17185546300` |
| Office addresses | Find/replace `420 Lexington Avenue, Suite 2250` and `81-05 Roosevelt Avenue` (note: 2nd floor / 2do Piso) — appears in footers and contact pages |
| Office hours | Edit the contact cards on `/en/contact.html` and `/es/contacto.html` |
| Logo | Replace `assets/images/logo.png` (transparent PNG, ≥ 240×80, ideally 360×120) |
| Testimonials | Currently disabled per your request. Add later by inserting a `<section class="section">` block on each home page |
| Attorney bios | Fill in the `attorney-placeholder` div on `/en/index.html` and `/es/index.html` with real cards (photo + name + areas of practice + short bio) |
| Map on contact pages | Replace the `<div class="map-placeholder">…</div>` block on `/en/contact.html` and `/es/contacto.html` with your Google Maps `<iframe>` embed |
| Appointment booking embed | See §6 below |

---

## 6. Appointment Booking Embed (Trafft)

The contact pages (`/en/contact.html` and `/es/contacto.html`) include the live Trafft booking embed inside the `#appointment` section. To keep it synced between languages:

- The EN page sets `data-lang="en"`.
- The ES page sets `data-lang="es"`.

If you regenerate the embed from your Traffit dashboard (new UUID, different services, etc.), paste the new snippet into the `<!-- Embedded booking begin --> … <!-- Embedded booking end -->` blocks in **both** `en/contact.html` and `es/contacto.html`, preserving the `data-lang` value per page.

---

## 7. SEO Configuration Before You Deploy

Two files use a **placeholder domain** you MUST replace with your real published URL:

```
sitemap.xml       → <loc>https://www.dalleylawfirm.com/en/...</loc>
robots.txt        → Sitemap: https://www.dalleylawfirm.com/sitemap.xml
<link rel="canonical" href="https://www.dalleylawfirm.com/...">  ← every HTML page
<meta property="og:url" ...>                                      ← add if you want
```

**Search-and-replace this placeholder with your real domain before deploying:**

```
Find:    https://www.dalleylawfirm.com
Replace: https://your-actual-domain.com
```

Apply to all `*.html`, `sitemap.xml`, and `robots.txt` files. (No JavaScript needed — use any text-editor "Find in Files".)

> If you do NOT yet have a custom domain, you can still deploy on `https://YOUR-USERNAME.github.io/REPO-NAME/` — the relative internal links work either way. Just replace the canonical/sitemap/robots placeholder with your GitHub Pages URL (e.g. `https://dalleylawfirm.github.io/dalleylawfirm/`) so Google indexes the right URLs.

---

## 8. Deploying to GitHub Pages

### Option A — GitHub repository (recommended)

1. Create a new public GitHub repository (e.g. `dalleylawfirm`).
2. Upload all the files in this project folder to the repository root (drag-and-drop on github.com, or use `git`):
   ```
   git init
   git add .
   git commit -m "Initial bilingual website"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/dalleylawfirm.git
   git push -u origin main
   ```
3. In the repo on GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / root**. Save.
4. Wait ~1 minute. Your site goes live at `https://YOUR-USERNAME.github.io/dalleylawfirm/`.

### Option B — Custom domain (recommended for a law firm)

1. Buy a domain (e.g. `dalleylawfirm.com`).
2. In the Pages settings, under **Custom domain**, enter your domain and click **Save**.
3. At your DNS provider, add a CNAME or A record pointing at GitHub Pages (GitHub prompts you with the exact records to add).
4. Create a file named `CNAME` at the project root containing your custom domain (just one line, e.g. `www.dalleylawfirm.com`).
5. Wait for DNS to propagate, then run the §7 search-and-replace with your real domain.

### Testing locally before deploying

From this project folder:
```
python -m http.server 8000
```
Then open **http://localhost:8000/** in your browser.

> **⚠ Before you push:** Read `DEPLOYMENT-GUIDE.md` §2 — it covers the safe
> first-push patterns (empty remote, force-with-lease, or no-rebase merge) and
> the post-push verification checklist that confirms the live GitHub Pages HTML
> actually reflects your changes. Skipping that checklist is how the maps fix
> silently reverted once; following it prevents it from ever happening again.

---

## 9. Performance & Accessibility Notes

- One shared CSS file (`assets/css/styles.css`, ~15 KB) and one shared JS file (`main.js`, ~3 KB).
- All images are lazy-loaded (`loading="lazy"`) with explicit `width`/`height` to prevent layout shift.
- Service-detail images cropped to a 4:3 box via `aspect-ratio` + `object-fit: cover` so renders are consistent.
- Mobile-first responsive: hamburger menu at ≤ 760 px, stack layouts on small screens.
- Semantic HTML5 (header, nav, main, breadcrumb, footer), ARIA on the menu toggle and FAQ accordion, skip-to-content link, visible focus rings, sufficient color contrast (dark blue + burgundy + white text).
- `lang` attribute on every `<html>` and every language-switcher `<a>` (helps screen readers and Google).
- `prefers-reduced-motion` respected — animations disabled for users who request it.
- No tracking scripts loaded by default — add Google Analytics/Plausible later by pasting their snippet before `</body>` in each page (or use a one-time find/replace).

---

## 10. Updating / Adding a Page Later

1. Create the new HTML file in **both** `/en/` (or `/en/persons/` etc.) and the matching `/es/...` folder.
2. Easiest: copy an existing similar service page and swap the copy, image, slugs, FAQ, and breadcrumb.
3. Update the language-switch hrefs in BOTH pages to point at each other.
4. Add the page to `sitemap.xml` (both EN and ES rows).
5. Add it to the relevant hub page's grid (the service tile cards).
6. Add it to `assets/js/i18n-map.js` `window.DALLEY_I18N_MAP` for documentation.
7. Re-run the §7 domain search-and-replace on the new file if you've already deployed with a custom domain.

---

## 11. Credits & Source

- Firm description, services copy (Spanish): provided RTF/DOCX files in `Content/` — rewritten as persuasive sales copy preserving factual accuracy.
- Stock photography: provided in `Content/Stock Photos/` — curated and copied into `assets/images/`.
- Logo: `LOGO - Dalley Law Firm - No Background.png` (provided) — used as `assets/images/logo.png`.
- Telephone, addresses, and 20-year-firm-history: provided `Law Firm Description.docx` and `Nuestra Firma.rtf`.

This website is for general information only and does not constitute legal advice. No attorney-client relationship is created by visiting this site.