const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const test = require('node:test');
const root = path.join(__dirname, '..');

test('embedded fixture preserves canonical bytes', () => {
  const html = fs.readFileSync(path.join(root, 'proof.html'), 'utf8');
  const inline = html.match(/<script type="application\/json" id="fixture">([\s\S]*?)<\/script>/)[1];
  const fixture = fs.readFileSync(path.join(root, 'recipes/gateway-lease-fence/fixture.json'), 'utf8');
  assert.equal(inline, fixture);
  assert.equal(crypto.createHash('sha256').update(fixture).digest('hex'), '1115b6f6fab379ddf161614d783c65f92be11f2fbcfcc41d3b12fc648fa6695d');
});

test('entry-page local links and fragments resolve', () => {
  for (const file of fs.readdirSync(root).filter(f => f.endsWith('.html'))) {
    const html = fs.readFileSync(path.join(root, file), 'utf8');
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
    assert.equal(new Set(ids).size, ids.length, `${file}: duplicate id`);
    for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
      const target = match[1];
      if (/^(?:[a-z]+:|\/\/)/i.test(target)) continue;
      const [pathname, fragment] = target.split('#');
      const resolved = path.join(root, pathname || file);
      assert.ok(fs.existsSync(resolved), `${file}: missing ${target}`);
      if (fragment && resolved.endsWith('.html')) {
        assert.ok(fs.readFileSync(resolved, 'utf8').includes(`id="${fragment}"`), `${file}: missing fragment ${target}`);
      }
    }
  }
});
