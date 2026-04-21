# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the App

No build step required. Open `index.html` directly in a browser, or serve it:

```bash
python -m http.server 8000
```

## Architecture

Single-file static app — all HTML, CSS, and JS live in `index.html`. No frameworks, no dependencies, no build tools.

**Sections (in DOM order):**
- Header — brand + training cycle metadata
- Countdown — live JS calculation to July 1, 2026 target date
- The Numbers — four max lift cards (Squat/Bench/Deadlift/OHP) with progress bars
- The Week — 7-day schedule grid with JS-highlighted current day
- The Sessions — 5 detailed workout breakdowns with sets/reps/weights
- The Path — 10-week periodization table (Hypertrophy → Strength → Peak → Deload → Test)
- The Rules — training principle cards

**JavaScript (inline `<script>` at bottom):**
- Countdown to `July 1, 2026` computed on page load
- Current weekday highlighted via `new Date().getDay()`
- Scroll-reveal animations with `IntersectionObserver`

**CSS (inline `<style>`):**
- Dark theme, orange accents; theming via CSS variables in `:root` (`--bg`, `--ink`, `--accent`, `--muted`, `--rule`, `--warn`)
- Responsive breakpoint at `768px`
- Fonts: Bebas Neue (headers), Fraunces (body), JetBrains Mono (data/numbers)

## Key Data

Training goal date: **July 1, 2026**

Lift targets: Squat 295→315 lb, Bench 245→265 lb, Deadlift 320→365 lb, OHP 165→185 lb

Periodization phases: Hypertrophy (3 wks) → Strength (4 wks) → Peak (2 wks) → Deload → Test Day
