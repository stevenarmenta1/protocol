const target = new Date('2026-07-01T00:00:00');
const now = new Date();
const diffDays = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
const diffWeeks = Math.ceil(diffDays / 7);

document.getElementById('days-out').textContent = diffDays > 0 ? diffDays : 0;
document.getElementById('weeks-out').textContent = diffWeeks > 0 ? diffWeeks : 0;

const today = now.getDay();
const dayMap = [6, 0, 1, 2, 3, 4, 5];
const days = document.querySelectorAll('.day');
days.forEach(d => d.classList.remove('today'));
if (days[dayMap[today]]) days[dayMap[today]].classList.add('today');

const PERIODIZATION = {
  10: { phase: 'Hypertrophy', scheme: '4×8', squat: 205, bench: 170, deadlift: 225, ohp: 115 },
   9: { phase: 'Hypertrophy', scheme: '4×8', squat: 215, bench: 175, deadlift: 230, ohp: 120 },
   8: { phase: 'Hypertrophy', scheme: '4×8', squat: 220, bench: 185, deadlift: 240, ohp: 125 },
   7: { phase: 'Strength',    scheme: '5×5', squat: 235, bench: 195, deadlift: 255, ohp: 130 },
   6: { phase: 'Strength',    scheme: '5×5', squat: 240, bench: 200, deadlift: 265, ohp: 135 },
   5: { phase: 'Retest',      scheme: null,  squat: null, bench: null, deadlift: null, ohp: null },
   4: { phase: 'Strength',    scheme: '5×3', squat: 250, bench: 210, deadlift: 275, ohp: 140 },
   3: { phase: 'Peak',        scheme: '4×3', squat: 260, bench: 215, deadlift: 285, ohp: 145 },
   2: { phase: 'Peak',        scheme: '3×2', squat: 270, bench: 225, deadlift: 295, ohp: 150 },
   1: { phase: 'Deload',      scheme: '3×3', squat: 175, bench: 145, deadlift: 195, ohp: 100 },
   0: { phase: 'Test Day',    scheme: null,  squat: null, bench: null, deadlift: null, ohp: null },
};

const ACCESSORY_SCHEMES = {
  'Hypertrophy': '3×10–12',
  'Strength':    '3×8–10',
  'Retest':      '3×10–12',
  'Peak':        '3×6–8',
  'Deload':      '2×10',
  'Test Day':    '2×10',
};

const PHASE_ABBREV = {
  'Hypertrophy': 'HYP',
  'Strength':    'STR',
  'Retest':      'TST',
  'Peak':        'PEAK',
  'Deload':      'DLD',
  'Test Day':    '1RM',
};

(function applyPeriodization() {
  const clampedWeek = Math.min(Math.max(diffWeeks, 0), 10);
  const weekData = PERIODIZATION[clampedWeek];

  const phaseEl = document.getElementById('current-phase');
  if (phaseEl) phaseEl.textContent = PHASE_ABBREV[weekData.phase] || weekData.phase.toUpperCase();

  document.querySelectorAll('[data-lift]').forEach(function(row) {
    const lift = row.dataset.lift;
    const weight = weekData[lift];
    const schemeSpan = row.querySelector('.ex-scheme');
    const weightSpan = row.querySelector('.ex-weight');

    if (schemeSpan) {
      schemeSpan.textContent = weekData.scheme
        ? weekData.scheme
        : (clampedWeek === 5 ? 'recalibrate' : 'max effort');
    }
    if (weightSpan) {
      weightSpan.innerHTML = (weight !== null && weight !== undefined)
        ? weight + '<span class="unit">lb</span>'
        : '—';
    }
  });

  const accessoryScheme = ACCESSORY_SCHEMES[weekData.phase];
  document.querySelectorAll('[data-accessory-scheme="true"]').forEach(function(row) {
    const schemeSpan = row.querySelector('.ex-scheme');
    if (schemeSpan && accessoryScheme) schemeSpan.textContent = accessoryScheme;
  });

  const pathTable = document.getElementById('path-table');
  if (pathTable) {
    pathTable.querySelectorAll('tr').forEach(function(tr) { tr.classList.remove('current-week'); });
    const activeRow = pathTable.querySelector('[data-weeks-out="' + clampedWeek + '"]');
    if (activeRow) activeRow.classList.add('current-week');
  }
})();
