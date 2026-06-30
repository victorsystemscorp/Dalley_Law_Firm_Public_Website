# Phone Number Link Behavior — Desktop vs Mobile Guide

A project-agnostic memory for any website that displays phone numbers as
clickable `tel:` links. Drop this file into any future website project.

---

## The Problem

On **desktop and tablet** browsers, clicking a `tel:` link triggers an
annoying **"Pick an app"** or **"Choose a program"** dialog because the
operating system tries to find a phone-dialer application that often isn't
installed. This creates a broken UX where the user expected to see the number
or copy it, not launch a missing application.

On **phones** (which have a built-in dialer), `tel:` links work exactly as
intended — tap to call.

## The Rule

> **`tel:` links should only fire on touch devices (phones).**
> On desktop and tablets, the phone number should display as selectable
> text that can be copied — not as a link that launches a missing app.

## The Solution (copy-paste this into your project's JS file)

```javascript
/* tel: links: only fire on touch devices (phones) */
/* On desktop/tablet the browser shows an annoying "Pick an app" dialog.
   We detect touch capability and suppress the click on non-touch devices,
   so the phone number shows as text and can be copied instead. */
(document.addEventListener("DOMContentLoaded", function () {
  var isTouch = (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) ||
                ("ontouchstart" in window) ||
                (navigator.maxTouchPoints > 0);
  if (isTouch) return; /* phones — let tel: work normally */
  document.querySelectorAll('a[href^="tel:"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      /* copy the number to clipboard for convenience */
      var num = a.getAttribute("href").replace("tel:", "");
      if (navigator.clipboard && num) {
        navigator.clipboard.writeText(num.replace("+1", "")).catch(function(){});
      }
    });
    a.style.cursor = "text"; /* reads as copyable text on desktop */
  });
})();
```

> **Note:** If your JS file already wraps code in an IIFE, adapt the wrapper
> accordingly. The detection logic is what matters, not the wrapper shape.

## Detection Logic Explained

The script uses **three signals** and fires `tel:` links only if ANY is true:

| Signal | What it detects |
|---|---|
| `window.matchMedia("(pointer: coarse)")` | Modern — primary input is touch (not mouse/stylus) |
| `"ontouchstart" in window` | Legacy — touch events are supported |
| `navigator.maxTouchPoints > 0` | Hardware has a touch digitizer (covers touch laptops, Surface, etc.) |

Using all three maximizes compatibility across browsers while correctly
excluding pure desktops/mice and correctly including phones.

> **Edge case — touch laptops / Surface:** Some laptops report touch
> capability. If you'd rather be more conservative and ONLY treat phones as
> touch (excluding touch laptops entirely), your fallback is to also check
> the screen width: `isTouch = isTouch && window.innerWidth < 768;`
> This is optional; most teams are fine with the broader detection above.

## How Phone Links Should Be Authored in HTML

Always write the link with the international `+1` prefix so mobile dialers
handle it correctly:

```html
<a href="tel:+17185546300">(718) 554-6300</a>
```

### Where to use `tel:` links

| Slot | Use `tel:`? | Notes |
|---|---|---|
| Primary CTA buttons ("Call Now") | ✅ Yes | The hero/CTA phone |
| Header phone in nav | ✅ Yes | Visible on every page |
| Footer phone | ✅ Yes | Visible on every page |
| Contact page phone card | ✅ Yes | The big phone display |
| Contact card inline text | ✅ Yes | Wherever the number appears |
| Map section under map | ❓ Optional | Link is fine; user can choose |

### The "desktop tagline" companion (optional, recommended)

On desktop, where `tel:` won't fire, it helps to display a **small tagline**
below or beside the phone number to set expectations. Example:

```html
<a class="phone" href="tel:+17185546300">
  <span class="phone-num">(718) 554-6300</span>
  <span class="phone-tag">7 days a week</span>
</a>
```

CSS that hides the tagline on mobile (where the number speaks for itself):

```css
.phone { display: flex; flex-direction: column; align-items: flex-end; line-height: 1.15; }
.phone-num { font-size: 1.05rem; }
.phone-tag { font-size: .72rem; font-weight: 500; color: var(--muted, #5b6275); }
@media (max-width: 480px) {
  .phone-tag { display: none; } /* mobile — keep it compact */
}
```

## Why Not Just Remove `tel:` on Desktop at Build Time?

Three reasons to keep the `tel:` link in the HTML and handle it via JS:

1. **Server detection is unreliable.** User-agent sniffing breaks for touch
   laptops, Surface, iPad, and progressive web apps installed on desktop.
2. **Touch JS activates real tap-to-call.** On any phone, the link works
   exactly as the user expects — push the button, place the call.
3. **Graceful degradation.** If JS is disabled, the link still works as a
   fallback — it just shows the app picker on desktop. Acceptable, not broken.

## Pre-Deploy Checklist (add to your QA)

- [ ] On desktop, clicking any phone number does NOT show "Pick an app"
- [ ] On desktop, clicking the number copies it to clipboard (optional feature)
- [ ] On desktop, the cursor over phone numbers is `text` (not pointer hand)
- [ ] On a phone (or Chrome dev-tools mobile emulation), clicking the number
      actually places a call
- [ ] On tablet, the "Pick an app" dialog is also suppressed (touch device)
- [ ] Test in Chrome, Firefox, Safari, and Edge (different detection paths)
- [ ] The phone number is still visible as text if JS is disabled

## Paste-Ready Prompt Addendum (for any future website build)

> Whenever the website displays phone numbers as clickable `tel:` links, the
> AI must include the touch-device detection script from
> `TEL-LINKS-GUIDE.md` in the project's JavaScript so that:
> 1. On phones, `tel:` links fire normally and place a call.
> 2. On desktop and tablet, the click is suppressed (no "Pick an app"
>    dialog), the cursor becomes `text`, and the number is copied to the
>    clipboard when clicked.
> 3. Phone numbers are always visible as copyable text even if JS is
>    disabled — the link degrades gracefully.
> Add the tagline pattern (`phone-num` + `phone-tag`) to give desktop users
> context ("7 days a week", "24/7", etc.) since they cannot tap-to-call.