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
| Squat |  lb |  lb |
| Bench |  lb |  lb |
| Deadlift |  lb |  lb |
| OHP |  lb |  lb |

**Test Day:** Choose Test Date

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
