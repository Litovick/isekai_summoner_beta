# Yumeiro game visual assets

## Contents
- `characters/`: 5 separate transparent PNG character portraits.
- `backgrounds/`: 10 original pastel bakery classroom backgrounds in WebP.

## Important provenance
These portraits are **new AI-generated interpretations**, NOT extracted official anime frames or licensed original artwork. They were generated for this project and split from a transparent character lineup. Backgrounds are original programmatic illustrations, not screenshots from the series.

## Suggested code mapping
characterArt: 감딸기 -> characters/gam-ddalgi.png, 원가온 -> characters/won-gaon.png, 안도하 -> characters/an-doha.png, 서로진 -> characters/seo-rojin.png, 바닐라 -> characters/vanilla.png.
sceneArt: backgrounds/stage-01.webp through stage-10.webp.

Copy both folders into `src/games/yumeiro/assets/`, then import each file in `art.ts` (Vite static imports) rather than using hotlinked image URLs.

**Note**: These are provisional custom illustrations, not a visually verified reproduction of the official anime characters.
