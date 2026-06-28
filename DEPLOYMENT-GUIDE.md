# Deployment & Git Push Safety Guide

A project-agnostic guide to prevent silent overwrites and ensure changes actually
land on the live site when pushing to GitHub Pages. Born from a real bug where
a `git pull --rebase` conflict resolution silently reverted working code.

> Drop this file into any future website project. It applies to any static site
> deployed via GitHub Pages (or any git-push-to-deploy workflow).

---

## 1. The Lesson (what went wrong once)

When the GitHub repository **already contains files** (e.g. a README auto-created
by GitHub, or an earlier upload), the first `git push` from a fresh local repo
will be **rejected** with `! [rejected] main -> main (fetch first)`.

The instinct is to run `git pull --rebase` and then resolve conflicts with
`git checkout --ours .`. **In a rebase, `--ours` is reversed from what you'd
expect** — it takes the **remote/branch** side, not your local working copy. So
that command silently replaces your latest work with the older remote version.
The push then succeeds, GitHub Pages rebuilds, and the live site looks
unchanged — but you've lost your edits and the problem is invisible.

### The fix that should have been used

In a **rebase** conflict, to keep **your local changes** (the work you just did),
use:

```bash
git checkout --theirs .   # <-- NOT --ours in a rebase!
git add -A
git rebase --continue
```

Or simpler — **avoid rebasing onto an unrelated remote history entirely.** Use
one of the safe first-push patterns in §2 below.

---

## 2. Safe First-Push Patterns (pick one)

### Pattern A — Start from an empty remote (preferred)

Create the GitHub repo with **no** README, no LICENSE, no .gitignore. The repo
must be completely empty. Then:

```bash
cd /your/project
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USER/REPO.git
git push -u origin main
```

No conflicts possible because the remote starts empty.

### Pattern B — Force-push the first time (if the remote isn't empty)

If the remote already has auto-generated files and you want your local copy to
**completely replace** it:

```bash
cd /your/project
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USER/REPO.git
git push -u origin main --force-with-lease   # overwrites remote, keeps it simple
```

`--force-with-lease` is safer than `-f` — it refuses if someone else has pushed
since you last fetched. For a solo first-deploy, this is the cleanest path.

### Pattern C — Pull with merge (if you want to keep remote files)

If the remote has files you want to **keep** (e.g. an existing README you don't
want to clobber):

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USER/REPO.git
git pull origin main --no-rebase --allow-unrelated-histories   # MERGE, not rebase
# resolve conflicts if any (here --ours IS your local copy, as expected)
git add -A
git commit -m "Merge remote"
git push -u origin main
```

In a **merge** (not rebase), `--ours` correctly means your local working copy.
This is the safe choice when you're unsure.

---

## 3. Pre-Push Verification (always do this)

Before pushing anything that touches live content (maps, contact info, copy),
confirm your local file actually contains the change:

```bash
# Replace FILE and NEEDLE with your actual values
grep -c "NEEDLE" en/contact.html          # Linux/macOS
Select-String -Path "en\contact.html" -Pattern "NEEDLE" -SimpleMatch   # PowerShell
```

Then confirm the **staged** copy (what will actually be pushed) matches:

```bash
git show :en/contact.html | grep "NEEDLE"    # colon = staged version
# PowerShell:
git show :en/contact.html | Select-String "NEEDLE"
```

If the staged version doesn't contain your change, **stop** — something
rewrote it. Reapply the fix, `git add`, and re-check before pushing.

---

## 4. Post-Push Verification (always do this)

A successful `git push` only means the code is in the repo — **not** that
GitHub Pages has rebuilt or that the live site reflects your change.

### Wait for the rebuild
GitHub Pages takes ~30–90 seconds after each push. Don't trust the browser
without a hard refresh; CDN caches can linger longer.

### Verify the live HTML actually contains your change

```powershell
# PowerShell (Windows)
$url = "https://USERNAME.github.io/REPO/en/contact.html"
$r = Invoke-WebRequest -Uri $url -UseBasicParsing -Headers @{ "Cache-Control"="no-cache"; "Pragma"="no-cache" }
$r.StatusCode                                       # should be 200
$r.Content.Contains("map-grid")                     # should be True after the maps fix
$r.Content.Contains("map-placeholder")             # should be False (old placeholder gone)
```

```bash
# Linux/macOS
curl -s "https://USERNAME.github.io/REPO/en/contact.html" | grep -c "map-grid"
```

If the live HTML **does not** contain your expected needle, you have not
actually deployed the change — regardless of what `git push` reported.
Re-check `git show origin/main:path/to/file` to see what's actually on the
remote, then re-push if needed.

---

## 5. The Universal Lesson: Don't Trust Push Alone

| What you did | What it proves | What it does NOT prove |
|---|---|---|
| Edited the file locally | File is correct on disk | — |
| `git add` | Staged version is correct | Live site is updated |
| `git commit` | Commit contains the change | Live site is updated |
| `git push` (success) | Remote branch has the change | **Pages rebuilt** or **live HTML reflects it** |
| `Invoke-WebRequest` shows the change | ✅ Live site is updated | — |

**The only proof that the user sees your change is the live-HTML check in §4.**
Everything before that is upstream plumbing.

---

## 6. Map Embeds — Specific Guidance (since maps triggered the original bug)

### Reusable map-insertion checklist

1. **Plan the replacement** — identify the exact placeholder block to remove
   and the exact new block to insert. Use charset-agnostic regex (match by
   **structural markers** like `class="..."`, not by `aria-label` text that may
   contain em-dashes or accents the shell mangles).
2. **Add the matching CSS class** — `assets/css/styles.css` must contain the
   `.map-grid` styles **before** the HTML references them, or the maps render
   unstyled.
3. **Verify locally** — open the page in the browser at
   `http://localhost:8000/en/contact.html` and confirm the maps render.
4. **Check staged version contains the change** — `git show :en/contact.html`
   must contain `map-grid` before you push. If it doesn't, reapply.
5. **Push** — `git push` succeeds.
6. **Wait 90 seconds** for GitHub Pages to rebuild.
7. **Verify the live HTML** — fetch `https://USERNAME.github.io/REPO/en/contact.html`
   with `Cache-Control: no-cache` and confirm `Content.Contains("map-grid")` is
   `True` and `Content.Contains("map-placeholder")` is `False`.
8. **Only then tell the user the site is fixed.**

### Map format that works on GitHub Pages (no API key needed)

```html
<div class="map-grid">
  <figure>
    <figcaption>Manhattan Office<small>420 Lexington Ave, Suite 2250, New York, NY 10170</small></figcaption>
    <iframe title="Manhattan Office" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=420%20Lexington%20Avenue%2C%20New%20York%2C%20NY%2010170&output=embed"></iframe>
  </figure>
  <figure>
    <figcaption>Queens Office<small>81-05 Roosevelt Ave, 2nd Floor, Jackson Heights, NY 11372</small></figcaption>
    <iframe title="Queens Office" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=81-05%20Roosevelt%20Avenue%2C%20Jackson%20Heights%2C%20NY%2011372&output=embed"></iframe>
  </figure>
</div>
```

Key points:
- `output=embed` is the **no-API-key** endpoint — works on GitHub Pages.
- URL-encode the address query (`%20` for spaces, `%2C` for commas, `+` also works).
- `loading="lazy"` keeps the page fast; `referrerpolicy="no-referrer-when-downgrade"`
  avoids mixed-content warnings.
- Match each iframe's `title` to the office name for accessibility.
- The accompanying CSS (`.map-grid`, `.map-grid figure`, `.map-grid iframe`) makes
  the two maps responsive — grid on desktop, stacked on mobile.

### To change office addresses later

1. URL-encode the new address (PowerShell:
   `[uri]::EscapeDataString('NEW ADDRESS HERE')`).
2. Replace the `q=...` value in every `iframe src` on all 4 pages (home + contact,
   EN + ES).
3. Update the `<figcaption><small>...</small></figcaption>` text to match.
4. Run §4's live-HTML verification before announcing done.

---

## 7. Quick Pre-Deploy Checklist (save and reuse)

```
[ ] Local file contains the change          (Select-String / grep)
[ ] Staged copy contains the change          (git show :path)
[ ] Committed copy contains the change       (git show HEAD:path)
[ ] git push reported success                (main -> main, no rejection)
[ ] Waited at least 90 seconds
[ ] Live HTML fetched with no-cache headers  (Invoke-WebRequest / curl)
[ ] Live HTML contains the change            (.Contains / grep -c)
[ ] Live HTML no longer contains old marker  (e.g. map-placeholder == False)
[ ] Browser hard-refresh (Ctrl+F5) confirms visually
```

If ANY of those fails, do not announce success — keep digging.

---

## 8. Add This to Every Future Build Prompt

> Whenever the website is deployed via `git push` to GitHub Pages, the AI must
> follow the checklist in §7 of `DEPLOYMENT-GUIDE.md` before announcing the
> site is live or fixed. Specifically:
> 1. Verify the staged, committed, and live (fetched with `Cache-Control:
>    no-cache`) versions of any changed file all contain the expected change.
> 2. Never use `git checkout --ours .` to resolve a **rebase** conflict while
>    intending to keep local changes — in a rebase, `--ours` is the upstream
>    side. Use `git checkout --theirs .` or, better, prefer Pattern A (empty
>    remote), Pattern B (`--force-with-lease` first push), or Pattern C
>    (`--no-rebase` merge) from §2.
> 3. Always fetch the live HTML after the Pages rebuild window and confirm the
>    new content is present before telling the user the deployment succeeded.