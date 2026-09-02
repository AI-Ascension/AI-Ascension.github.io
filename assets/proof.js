/* AI-Ascension proof replay engine. Deterministic; reads the inline fixture only; no requests; no eval. */
(function () {
  'use strict';
  var fixtureEl = document.getElementById('fixture');
  var trace = document.getElementById('trace');
  var live = document.getElementById('live');
  if (!fixtureEl || !trace || !live) { return; }

  var fixture;
  try { fixture = JSON.parse(fixtureEl.textContent); } catch (e) { live.textContent = 'Fixture could not be parsed.'; return; }
  var steps = fixture.steps || [];
  var total = steps.length;

  var SOURCE_BASE = 'https://github.com/AI-Ascension/sts2-gateway/blob/e7bce21d0cbd48a02c25d6463a3376ea1c94e253/crates/gateway/tests/control_plane.rs';
  /* Line numbers verified by reading the file at that revision. */
  var LINES = {
    allocation_reconciles_through_readiness: 12,
    stale_epoch_and_wrong_instance_are_denied_before_transport: 32,
    release_then_cleanup_removes_instance: 72,
    readiness_and_crash_fail_closed: 143,
    shutdown_reports_stop_failure_and_closes_admission: 186,
    fixed_transport_is_bounded_and_fail_closed: 209
  };
  var MARK = {
    allowed: { cls: 'decision--allowed', word: 'allowed', text: 'allowed', d: 'M6.5 10.2l2.4 2.4 4.8-5' },
    'denied-before-transport': { cls: 'decision--denied', word: 'denied', text: 'denied before transport', d: 'M6.2 13.8l7.6-7.6M6.2 6.2l7.6 7.6' },
    'denied-by-limit': { cls: 'decision--denied', word: 'denied', text: 'denied by limit', d: 'M6.2 13.8l7.6-7.6M6.2 6.2l7.6 7.6' },
    released: { cls: 'decision--released', word: 'released', text: 'released', d: 'M7 7h6v6H7z' }
  };

  var query = window.location.search;
  var fast = /[?&]fast=1(?:&|$)/.test(query);
  var autorun = /[?&]autorun=1(?:&|$)/.test(query);
  var reduced = false;
  try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { reduced = false; }
  var INTERVAL = fast ? 50 : 5000;

  var idx = 0;          /* number of revealed steps, 0..total */
  var timer = null;
  var running = false;

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) { node.className = cls; }
    if (text !== undefined) { node.textContent = text; }
    return node;
  }
  function flat(value) {
    if (value === null || typeof value !== 'object') { return String(value); }
    var parts = [];
    for (var k in value) {
      if (Object.prototype.hasOwnProperty.call(value, k)) {
        var v = value[k];
        parts.push(k + (typeof v === 'object' && v !== null ? ' { ' + flat(v) + ' }' : ': ' + String(v)));
      }
    }
    return parts.join(', ');
  }
  function svgEl(name, attrs, parent) {
    var node = document.createElementNS('http://www.w3.org/2000/svg', name);
    for (var a in attrs) { if (Object.prototype.hasOwnProperty.call(attrs, a)) { node.setAttribute(a, attrs[a]); } }
    if (parent) { parent.appendChild(node); }
    return node;
  }
  function svgMark(d) {
    var svg = svgEl('svg', { viewBox: '0 0 20 20', 'aria-hidden': 'true', focusable: 'false' });
    var g = svgEl('g', { fill: 'none', stroke: 'currentColor', 'stroke-width': '1.8', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, svg);
    svgEl('circle', { cx: '10', cy: '10', r: '7.5' }, g);
    svgEl('path', { d: d }, g);
    return svg;
  }
  function field(dl, name, value) {
    dl.appendChild(el('dt', null, name));
    var dd = el('dd');
    if (typeof value === 'string') { dd.textContent = value; } else { dd.appendChild(value); }
    dl.appendChild(dd);
  }
  function build(step) {
    var art = el('li', 'step');
    art.id = 'step-' + step.n;
    art.hidden = true;
    var head = el('div', 'step__head');
    head.appendChild(el('span', 'step__n', 'step ' + step.n + ' of ' + total));
    head.appendChild(el('h3', 'step__action', step.action));
    art.appendChild(head);
    var dl = el('dl', 'field');
    field(dl, 'Input', flat(step.input));
    field(dl, 'Result', step.result);
    field(dl, 'Boundary', step.boundary);
    var mark = MARK[step.decision] || MARK.released;
    var dec = el('span', 'decision ' + mark.cls);
    dec.appendChild(svgMark(mark.d));
    dec.appendChild(el('span', 'word', mark.word));
    var wrap = el('span');
    wrap.appendChild(dec);
    if (mark.text !== mark.word) { wrap.appendChild(el('span', 'mono', ' — ' + mark.text)); }
    field(dl, 'Decision', wrap);
    art.appendChild(dl);
    var foot = el('div', 'step__foot');
    foot.appendChild(el('span', null, 'transport calls: ' + step.transport_calls));
    var link = el('a', null, 'source test: ' + step.source_test);
    var line = LINES[step.source_test];
    link.href = SOURCE_BASE + (line ? '#L' + line : '');
    foot.appendChild(link);
    art.appendChild(foot);
    return art;
  }
  for (var i = 0; i < total; i++) { trace.appendChild(build(steps[i])); }

  var progress = document.getElementById('progress');
  var pbuttons = progress ? progress.querySelectorAll('button') : [];
  var summary = document.getElementById('summary');
  var btnRun = document.getElementById('run'), btnPause = document.getElementById('pause');
  var btnStep = document.getElementById('step'), btnPrev = document.getElementById('prev'), btnReset = document.getElementById('reset');

  function hash32(text) {
    var h = 0x811c9dc5;
    for (var c = 0; c < text.length; c++) { h ^= text.charCodeAt(c); h = Math.imul(h, 0x01000193) >>> 0; }
    return ('00000000' + h.toString(16)).slice(-8);
  }
  function counters(bump) {
    var starts = 0, completes = 0;
    try { /* local storage only; never transmitted; unavailable storage leaves the counter at 0 */
      starts = (parseInt(localStorage.getItem('ascent-proof-starts') || '0', 10) || 0) + (bump === 'start' ? 1 : 0);
      completes = (parseInt(localStorage.getItem('ascent-proof-completes') || '0', 10) || 0) + (bump === 'complete' ? 1 : 0);
      if (bump) { localStorage.setItem('ascent-proof-starts', String(starts)); localStorage.setItem('ascent-proof-completes', String(completes)); }
    } catch (e) { starts = 0; completes = 0; }
    var out = document.getElementById('runs');
    if (out) { out.textContent = 'runs in this browser: ' + starts + ' started · ' + completes + ' completed'; }
  }
  function announce(text) { live.textContent = text; }
  function describe(step) {
    var mark = MARK[step.decision] || MARK.released;
    return 'Step ' + step.n + ' of ' + total + ': ' + step.action + ' — ' + step.result + ' — ' + mark.text + '; transport calls: ' + step.transport_calls + '.';
  }
  function render(newIdx) {
    var items = trace.children;
    for (var k = 0; k < items.length; k++) {
      var shown = k < idx;
      items[k].hidden = !shown;
      items[k].classList.toggle('is-current', k === idx - 1);
      items[k].classList.toggle('is-new', shown && k >= (newIdx === undefined ? idx : newIdx) - 1 && k === idx - 1);
      if (pbuttons[k]) {
        pbuttons[k].classList.toggle('done', k < idx);
        if (k === idx - 1) { pbuttons[k].setAttribute('aria-current', 'step'); } else { pbuttons[k].removeAttribute('aria-current'); }
      }
    }
    var complete = idx === total;
    if (summary) { summary.hidden = !complete; }
    if (complete) {
      var text = '';
      for (var t = 0; t < items.length; t++) { text += items[t].textContent + '\n'; }
      trace.setAttribute('data-final-hash', hash32(text));
    } else {
      trace.removeAttribute('data-final-hash');
    }
    if (btnRun) { btnRun.textContent = complete ? 'Run again' : (running ? 'Running…' : (idx > 0 ? 'Resume' : 'Run')); }
    if (btnPause) { btnPause.disabled = !running; }
    if (btnStep) { btnStep.disabled = complete; }
    if (btnPrev) { btnPrev.disabled = idx === 0; }
    if (btnReset) { btnReset.disabled = idx === 0 && !running; }
  }
  function stopTimer() { if (timer) { window.clearInterval(timer); timer = null; } running = false; }
  function finish() {
    stopTimer(); render(); counters('complete');
    var s = fixture.summary || {};
    announce('Replay complete: ' + total + ' of ' + total + ' steps; allowed ' + s.allowed + ', denied before transport ' + s.denied_before_transport +
      ', denied by limit ' + s.denied_by_limit + ', released ' + s.released + '; transport calls total ' + s.transport_calls_total +
      '. Trace hash ' + trace.getAttribute('data-final-hash') + '.');
  }
  function next(fromTimer) {
    if (idx >= total) { finish(); return; }
    idx += 1;
    render(idx);
    if (idx === total) { finish(); return; }
    announce(describe(steps[idx - 1]) + (fromTimer ? '' : ' (' + idx + ' of ' + total + ')'));
  }
  function prev() {
    stopTimer(); idx = Math.max(0, idx - 1); render();
    announce(idx === 0 ? 'Back to the start. No steps shown.' : describe(steps[idx - 1]));
  }
  function run() {
    if (running) { return; }
    if (idx >= total) { idx = 0; }
    counters('start');
    if (reduced) { idx = total; finish(); return; }
    running = true;
    next(true);
    if (idx >= total) { return; }
    render();
    timer = window.setInterval(function () { next(true); }, INTERVAL);
  }
  function pause() {
    if (!running) { return; }
    stopTimer();
    render();
    announce('Paused at step ' + idx + ' of ' + total + '.');
  }
  function reset() {
    stopTimer();
    idx = 0;
    render();
    announce('Reset. No steps shown.');
  }
  function stepOnce() { stopTimer(); next(false); }
  var handlers = [[btnRun, run], [btnPause, pause], [btnStep, stepOnce], [btnPrev, prev], [btnReset, reset]];
  for (var h = 0; h < handlers.length; h++) { if (handlers[h][0]) { handlers[h][0].addEventListener('click', handlers[h][1]); } }
  for (var b = 0; b < pbuttons.length; b++) {
    (function (n) {
      pbuttons[n].addEventListener('click', function () {
        stopTimer(); idx = n + 1; render(idx);
        if (idx === total) { finish(); } else { announce(describe(steps[idx - 1])); }
      });
    })(b);
  }
  document.addEventListener('keydown', function (ev) {
    var t = ev.target;
    var tag = t && t.tagName ? t.tagName.toLowerCase() : '';
    if (tag === 'textarea' || tag === 'input' || tag === 'select' || tag === 'button' || (t && t.isContentEditable)) { return; }
    if (ev.altKey || ev.ctrlKey || ev.metaKey) { return; }
    var k = ev.key, fn = null;
    if (k === ' ' || k === 'Spacebar') { fn = running ? pause : run; }
    else if (k === 'ArrowRight' || k === 'j' || k === 'J') { fn = stepOnce; }
    else if (k === 'ArrowLeft' || k === 'k' || k === 'K') { fn = prev; }
    else if (k === 'r' || k === 'R') { fn = reset; }
    if (fn) { ev.preventDefault(); fn(); }
  });

  /* share: copy the plain-text card */
  var copyBtn = document.getElementById('copy'), shareText = document.getElementById('share-text');
  if (copyBtn && shareText) {
    copyBtn.addEventListener('click', function () {
      var text = shareText.value;
      function done(ok) { announce(ok ? 'Share text copied to the clipboard.' : 'Copy failed; select the text and copy it manually.'); }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { done(true); }, function () { shareText.select(); done(false); });
      } else {
        shareText.select();
        var ok = false;
        try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
        done(ok);
      }
    });
  }

  counters();
  render();
  if (autorun) { run(); }
})();
