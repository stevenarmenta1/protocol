# PROTOCOL

A personal strength training tracker built as a single-page web app. Tracks a 10-week periodized program leading to a 1RM test day, with sets, reps, and weights that automatically update each week based on the current phase.

## Features

- **Dynamic periodization** — exercises update weekly (Hypertrophy → Strength → Peak → Deload → Test Day)
- **Live countdown** to test day with current phase display
- **Weekly schedule** with today's session highlighted
- **Progress tracking** for Squat, Bench, Deadlift, and Overhead Press
- **10-week progression table** with current week highlighted automatically

## Current Program

| Lift | Current | Goal |
|------|---------|------|
| Squat | 295 lb | 315 lb |
| Bench | 245 lb | 265 lb |
| Deadlift | 320 lb | 365 lb |
| OHP | 165 lb | 185 lb |

**Test Day:** July 1, 2026

## Run Locally

No build step — open `index.html` in any browser, or serve it:

```bash
python -m http.server 8000
```

## Roadmap

- [ ] User profiles so anyone can enter their own lifts and goals
- [ ] Persistent workout logging
- [ ] Auto-recalibration after retest week
- [ ] Mobile app
