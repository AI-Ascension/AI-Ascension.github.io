const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { execFileSync } = require('node:child_process');
const test = require('node:test');
const root = path.join(__dirname, '..');

test('embedded fixture preserves canonical bytes', () => {
  const html = fs.readFileSync(path.join(root, 'proof.html'), 'utf8');
  const inline = html.match(/<script type="application\/json" id="fixture">([\s\S]*?)<\/script>/)[1];
  const fixture = fs.readFileSync(path.join(root, 'recipes/gateway-lease-fence/fixture.json'), 'utf8');
  assert.equal(inline, fixture);
  assert.equal(crypto.createHash('sha256').update(fixture).digest('hex'), '68f8180b2110b92bdcc283bcbbaf4461bda4ba66e9a7bce78151b6409dcdc769');
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

test('social-preview metadata points at tracked local assets', () => {
  const origin = 'https://ai-ascension.github.io/';
  const trackedFiles = new Set(
    execFileSync('git', ['ls-files'], { cwd: root, encoding: 'utf8' })
      .split('\n')
      .filter(Boolean),
  );

  function metaContent(html, attribute, value) {
    const contents = [];
    for (const tag of html.matchAll(/<meta\b[^>]*>/gi)) {
      const attributes = {};
      for (const match of tag[0].matchAll(/([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g)) {
        const [, name, doubleQuoted, singleQuoted, unquoted] = match;
        attributes[name.toLowerCase()] = doubleQuoted ?? singleQuoted ?? unquoted ?? '';
      }
      if (attributes[attribute]?.toLowerCase() === value) {
        contents.push(attributes.content);
      }
    }
    return contents;
  }

  for (const file of fs.readdirSync(root).filter(f => f.endsWith('.html'))) {
    const html = fs.readFileSync(path.join(root, file), 'utf8');
    const previewUrls = [
      ['Open Graph', ...metaContent(html, 'property', 'og:image')],
      ['Twitter', ...metaContent(html, 'name', 'twitter:image')],
    ];
    for (const [family, ...urls] of previewUrls) {
      assert.equal(urls.length, 1, `${file}: expected exactly one ${family} preview image`);
      const [previewUrl] = urls;
      assert.ok(previewUrl, `${file}: ${family} preview image needs content`);
      const url = new URL(previewUrl);
      assert.equal(url.origin, new URL(origin).origin, `${file}: preview must be a site asset`);
      assert.ok(!url.search && !url.hash, `${file}: preview must identify one stable asset path`);
      const candidate = path.resolve(root, `.${decodeURIComponent(url.pathname)}`);
      const relative = path.relative(root, candidate);
      assert.ok(relative && relative !== '..' && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative), `${file}: preview escapes the site root`);
      const trackedPath = relative.split(path.sep).join('/');
      assert.ok(trackedFiles.has(trackedPath), `${file}: preview asset is not tracked: ${previewUrl}`);
      assert.ok(fs.statSync(candidate).isFile(), `${file}: preview asset is not a file: ${previewUrl}`);
    }
  }
});
