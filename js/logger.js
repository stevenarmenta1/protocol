const LOG_KEY = 'protocol_log';
let pendingLog = null;

function getLog() {
  try { return JSON.parse(localStorage.getItem(LOG_KEY)) || []; }
  catch(e) { return []; }
}

function saveLog(entries) {
  localStorage.setItem(LOG_KEY, JSON.stringify(entries));
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function formatDate(iso) {
  const d = new Date(iso + 'T12:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
}

function getExerciseName(exEl) {
  return exEl.querySelector('.ex-name').textContent.replace('★', '').trim();
}

function getSessionName(exEl) {
  const workout = exEl.closest('.workout');
  if (!workout) return '';
  return workout.querySelector('.workout-day').textContent.replace(/^\d+/, '').trim();
}

function isLoggedToday(exerciseName) {
  const today = todayStr();
  return getLog().some(function(e) { return e.date === today && e.exercise === exerciseName; });
}

function addLogButtons() {
  document.querySelectorAll('.ex').forEach(function(exEl) {
    const name = getExerciseName(exEl);
    if (name === 'Steady-state run') return;

    const btn = document.createElement('button');
    btn.className = 'log-btn';
    btn.title = 'Log this set';
    btn.textContent = '+';
    btn.setAttribute('data-ex', name);

    if (isLoggedToday(name)) btn.classList.add('logged');

    btn.addEventListener('click', function() { openLogModal(exEl, btn); });
    exEl.appendChild(btn);
  });
}

function openLogModal(exEl, btn) {
  const name = getExerciseName(exEl);
  const session = getSessionName(exEl);
  const scheme = exEl.querySelector('.ex-scheme').textContent;
  const weightEl = exEl.querySelector('.ex-weight');
  const weightText = weightEl ? weightEl.textContent.replace('lb', '').replace('—', '').trim() : '';

  pendingLog = { exercise: name, session: session, scheme: scheme, btn: btn };

  document.getElementById('log-modal-title').textContent = name;
  document.getElementById('log-modal-sub').textContent = 'Prescribed: ' + scheme + (weightText ? ' @ ' + weightText + 'lb' : '');
  document.getElementById('log-input-weight').value = weightText || '';
  document.getElementById('log-input-reps').value = '';
  document.getElementById('log-input-notes').value = '';

  document.getElementById('log-overlay').classList.add('open');
  document.getElementById('log-input-weight').focus();
}

function closeLogModal() {
  document.getElementById('log-overlay').classList.remove('open');
  pendingLog = null;
}

function submitLog() {
  if (!pendingLog) return;
  const weight = document.getElementById('log-input-weight').value.trim();
  const reps = document.getElementById('log-input-reps').value.trim();
  const notes = document.getElementById('log-input-notes').value.trim();

  const entry = {
    id: Date.now(),
    date: todayStr(),
    exercise: pendingLog.exercise,
    session: pendingLog.session,
    scheme: pendingLog.scheme,
    weight: weight ? parseFloat(weight) : null,
    reps: reps,
    notes: notes,
  };

  const log = getLog();
  log.unshift(entry);
  saveLog(log);

  if (pendingLog.btn) pendingLog.btn.classList.add('logged');
  closeLogModal();
  renderLog();
}

function renderLog() {
  const container = document.getElementById('log-entries');
  const log = getLog();

  if (!log.length) {
    container.innerHTML = '<div class="log-empty">No sessions logged yet — hit + on any exercise to start.</div>';
    return;
  }

  const byDate = {};
  log.forEach(function(e) {
    if (!byDate[e.date]) byDate[e.date] = [];
    byDate[e.date].push(e);
  });

  container.innerHTML = Object.keys(byDate).map(function(date) {
    const entries = byDate[date];
    const rows = entries.map(function(e) {
      const weightHtml = e.weight
        ? e.weight + '<span class="unit">lb</span>'
        : '<span style="color:var(--muted)">—</span>';
      const repsHtml = e.reps ? e.reps : '—';
      const notesHtml = e.notes
        ? '<div class="log-entry-notes">' + e.notes + '</div>'
        : '';
      return '<div class="log-entry">' +
        '<div><div class="log-entry-name">' + e.exercise + '</div>' +
        '<div class="log-entry-session">' + e.session + '</div>' + notesHtml + '</div>' +
        '<div class="log-entry-scheme">' + repsHtml + '</div>' +
        '<div class="log-entry-weight">' + weightHtml + '</div>' +
        '<button class="log-delete" data-id="' + e.id + '">×</button>' +
        '</div>';
    }).join('');

    const isToday = date === todayStr();
    return '<div class="log-day">' +
      '<div class="log-day-header">' +
      '<span class="log-day-date">' + formatDate(date) + '</span>' +
      (isToday ? '<span style="font-size:10px;color:var(--accent);letter-spacing:0.12em">TODAY</span>' : '') +
      '</div>' + rows + '</div>';
  }).join('');

  container.querySelectorAll('.log-delete').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const id = parseInt(btn.getAttribute('data-id'));
      const updated = getLog().filter(function(e) { return e.id !== id; });
      saveLog(updated);
      renderLog();
      refreshLogButtons();
    });
  });
}

function refreshLogButtons() {
  document.querySelectorAll('.log-btn').forEach(function(btn) {
    const name = btn.getAttribute('data-ex');
    btn.classList.toggle('logged', isLoggedToday(name));
  });
}

document.getElementById('log-cancel').addEventListener('click', closeLogModal);
document.getElementById('log-confirm').addEventListener('click', submitLog);
document.getElementById('log-overlay').addEventListener('click', function(e) {
  if (e.target === this) closeLogModal();
});
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeLogModal();
  if (e.key === 'Enter' && document.getElementById('log-overlay').classList.contains('open')) {
    e.preventDefault();
    submitLog();
  }
});

addLogButtons();
renderLog();
