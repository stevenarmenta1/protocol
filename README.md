# PROTOCOL

A personal strength training tracker built as a static web app. Tracks a 10-week periodized program leading to a 1RM test day, with sets, reps, and weights that automatically update each week based on the current phase.

## Features

- **Dynamic periodization** — exercises update weekly (Hypertrophy → Strength → Peak → Deload → Test Day)
- **Accessory rep ranges** — accessory work adjusts per phase alongside the main lifts
- **Live countdown** to test day with current phase display
- **Weekly schedule** with today's session highlighted
- **Progress tracking** for Squat, Bench, Deadlift, and Overhead Press
- **10-week progression table** with current week highlighted automatically
- **Workout logger** — log actual weight, reps, and notes for any exercise; persisted in localStorage
- **Session history** — view all logged entries grouped by date with delete support

## Ex. Program

| Lift | Current | Goal |
|------|---------|------|
| Squat |  |  |
| Bench |  |  |
| Deadlift |  |  |
| OHP |  |  |

**Test Day:** Choose Test Date

## Project Structure

```
protocol/
  index.html          # markup and layout
  css/
    styles.css        # all styles and theming
  js/
    periodization.js  # countdown, phase logic, weekly weight/rep updates
    logger.js         # workout logging, modal, localStorage persistence
```

## Run Locally

Requires a local server (external JS/CSS files won't load over `file://`):

```bash
# Node
npx serve .

# or install Live Server in VS Code and right-click index.html
```

## Roadmap

- [ ] User profiles so anyone can enter their own lifts and goals
- [ ] Auto-recalibration after retest week
- [ ] Persistent workout log export
- [ ] Mobile app
