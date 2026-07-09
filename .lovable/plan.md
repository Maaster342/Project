
# Project Review — Suggested Improvements

Pick any items you want and I'll implement them.

## 🐛 Small bugs / polish
1. **Captions get lost on reload** — `src/routes/index.tsx` keeps screenshot captions in `useState`, so any edits in the textareas disappear on refresh. Options: make them read-only (they're your captions, not hers), or persist to `localStorage`.
2. **Favorites modal not scroll-lock-safe on iOS** — works, but the `body` overflow trick can jump the page. Small refinement possible.
3. **VoiceNote modal — background music volume** — if the user pauses the voice note (doesn't close), bg music stays at low volume 6 until they close the modal. Could restore on pause too.
4. **Gashapon 🎁** — the "voucher" state doesn't offer a way to shake/reset for fun. Optional: add a tiny "open another surprise" that cycles through 2–3 vouchers.
5. **`FavoritesTeaser` z-index (150) vs VoiceNote portal (200)** — already fixed, but worth double-checking nothing else uses `z-[200]+`.

## 🎨 UX / feel
6. **Autoplay music warning** — browsers block autoplay until first interaction; today a tiny visual cue that music starts on the first click/tap would be nice (small floating "tap anywhere to start music 🎵" hint that disappears once playing).
7. **Voice note button label** — the outer card still says "▶ play" but clicking only opens the modal. Change to "open" or "listen" to match.
8. **Lightbox keyboard support** — add `Esc` to close and arrow keys to move between screenshots.
9. **Screenshot lightbox — swipe on mobile** — currently only ✕ closes it; add left/right swipe or arrow buttons.
10. **Mimo modal caption** — matches the card's caption exactly (repeated). Could vary it slightly ("look how cute 🐾").

## ⚡ Performance
11. **Fonts** — currently loading 3 font families with many weights via Google Fonts. Trim to the weights actually used (e.g. Fredoka 600/700, Caveat 500, Nunito 400/600) to speed up first paint.
12. **Screenshots** — served at original size. Add `width`/`height` attrs to reduce layout shift; consider a smaller thumb + full-size on lightbox open.
13. **FloatingEmojis + RandomHearts** — both run animations 24/7. Consider pausing when tab hidden (`document.visibilitychange`).

## 🔎 SEO / metadata
14. **Root `og:image`** — currently missing. Add a nice cover (a hero screenshot) so link previews on Discord/WhatsApp look good. Note: put it on leaf routes, not `__root`.
15. **Favorites route** — has good title/description but no `og:*` tags.

## ♿ Accessibility
16. Some emoji buttons have no accessible label (Mimo card button does, but the reminds-me-of-you cards use divs — fine, but if they become interactive, add roles).
17. Color contrast: `text-muted-foreground` on pink-tinted gradients is soft — mostly OK, but could be verified.

## 🧹 Code hygiene
18. **`BackgroundMusic`** uses global `window.__bgMusicSetVolume` — works but a small React context would be cleaner.
19. **Unused deps** — worth a scan; the project pulls in shadcn + tanstack query but only uses a fraction. Not urgent.
20. **`VoiceNote.tsx`** has quite a bit of local logic — could be split into a small hook (`useAudioPlayer`) for readability.

---

**How to proceed:** tell me the numbers you want (e.g. "do 1, 6, 8, 11, 14") or say "do all quick wins" and I'll pick the low-risk polish items.
