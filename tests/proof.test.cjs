// SPDX-License-Identifier: MIT
// Exercise the real replay script with a minimal DOM; no browser or network.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');

class Element {
  constructor(tag = 'div') {
    this.tagName = tag.toUpperCase();
    this.children = [];
    this.attrs = {};
    this.handlers = {};
    this.classList = { toggle() {} };
    this._text = '';
  }
  set textContent(text) { this._text = String(text); }
  get textContent() { return this._text + this.children.map(c => c.textContent).join(''); }
  appendChild(child) { this.children.push(child); return child; }
  setAttribute(key, value) { this.attrs[key] = value; }
  removeAttribute(key) { delete this.attrs[key]; }
  getAttribute(key) { return this.attrs[key]; }
  addEventListener(key, handler) { this.handlers[key] = handler; }
  querySelectorAll() { return this.children; }
}

function replay(reduced = false) {
  const root = path.resolve(__dirname, '..');
  const ids = {};
  for (const id of ['fixture', 'trace', 'live', 'progress', 'summary', 'run', 'pause', 'step', 'prev', 'reset', 'runs']) {
    ids[id] = new Element();
  }
  ids.fixture.textContent = fs.readFileSync(path.join(root, 'recipes/gateway-lease-fence/fixture.json'), 'utf8');
  ids.progress.children = Array.from({ length: 8 }, () => new Element('button'));
  const document = {
    getElementById: id => ids[id],
    createElement: tag => new Element(tag),
    createElementNS: (_, tag) => new Element(tag),
    addEventListener(key, handler) { this[key] = handler; }
  };
  const values = new Map();
  const localStorage = { getItem: key => values.get(key), setItem: (key, value) => values.set(key, value) };
  let tick;
  const window = {
    location: { search: '' }, matchMedia: () => ({ matches: reduced }),
    setInterval(handler) { tick = handler; return 1; }, clearInterval() { tick = undefined; }
  };
  vm.runInNewContext(fs.readFileSync(path.join(root, 'assets/proof.js'), 'utf8'), { document, localStorage, window });
  return {
    ids,
    click: id => ids[id].handlers.click(),
    jump: n => ids.progress.children[n - 1].handlers.click(),
    key: key => document.keydown({ target: new Element(), key, preventDefault() {} }),
    tick: () => { assert.ok(tick); tick(); },
    counts: () => [Number(values.get('ascent-proof-starts') || 0), Number(values.get('ascent-proof-completes') || 0)]
  };
}

test('pause/resume counts one run; repeated completion navigation counts once', () => {
  const r = replay();
  r.click('run'); r.click('pause'); r.click('run'); r.click('pause');
  assert.deepEqual(r.counts(), [1, 0]);
  r.jump(8); r.jump(8); r.key('ArrowRight');
  assert.deepEqual(r.counts(), [1, 1]);
  r.click('prev'); r.key('ArrowRight');
  assert.deepEqual(r.counts(), [1, 1]);
});

test('manual stepping starts once and reset starts a distinct replay', () => {
  const r = replay();
  for (let i = 0; i < 8; i++) {
    r.click('step');
  }
  assert.deepEqual(r.counts(), [1, 1]);
  const hash = r.ids.trace.getAttribute('data-final-hash');
  r.click('reset');
  assert.equal(r.ids.trace.getAttribute('data-final-hash'), undefined);
  r.jump(8);
  assert.deepEqual(r.counts(), [2, 2]);
  assert.equal(r.ids.trace.getAttribute('data-final-hash'), hash);
});

test('timer and reduced-motion runs agree; Run again counts a new replay', () => {
  const timed = replay();
  timed.click('run');
  for (let i = 0; i < 7; i++) {
    timed.tick();
  }
  assert.deepEqual(timed.counts(), [1, 1]);
  const reduced = replay(true);
  reduced.click('run');
  assert.deepEqual(reduced.counts(), [1, 1]);
  assert.equal(reduced.ids.trace.getAttribute('data-final-hash'), timed.ids.trace.getAttribute('data-final-hash'));
  reduced.click('run');
  assert.deepEqual(reduced.counts(), [2, 2]);
});
