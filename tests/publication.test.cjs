const assert = require("node:assert/strict");
const childProcess = require("node:child_process");
const fs = require("node:fs");
const os = require("node:os");
const crypto = require("node:crypto");
const path = require("node:path");
const test = require("node:test");

const root = path.join(__dirname, "..");
const output = path.join(root, ".pages-dist");

function filesUnder(directory, prefix = "") {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const relative = prefix ? path.join(prefix, entry.name) : entry.name;
    if (entry.isDirectory()) {
      files.push(...filesUnder(path.join(directory, entry.name), relative));
    } else {
      files.push(relative.split(path.sep).join("/"));
    }
  }
  return files;
}

test("Pages build contains runtime files and excludes source-only material", () => {
  childProcess.execFileSync(process.execPath, ["scripts/build-pages.mjs"], {
    cwd: root,
    stdio: "pipe",
  });

  const files = filesUnder(output);
  const required = [
    ".nojekyll",
    "404.html",
    "architecture.html",
    "assets/identity/tokens.css",
    "assets/site.css",
    "assets/site.js",
    "assets/proof.js",
    "assets/fonts/bricolage-grotesque-latin-wght-normal.woff2",
    "assets/fonts/NOTICES.md",
    "assets/fonts/LICENSE-BricolageGrotesque.txt",
    "assets/fonts/LICENSE-Fraunces.txt",
    "assets/fonts/LICENSE-JetBrainsMono.txt",
    "assets/hero/hero-art-1600.webp",
    "index.html",
    "proof.html",
    "recipes.html",
    "recipes/gateway-lease-fence/fixture.json",
    "recipes/mcp-seam/fixture.json",
  ];
  for (const file of required) {
    assert.ok(files.includes(file), `missing publication file: ${file}`);
  }
  for (const file of [
    "README.md",
    "VERIFICATION.md",
    "LICENSE",
    "NOTICES.md",
    "package.json",
    "package-lock.json",
    "eslint.config.mjs",
    "playwright.config.cjs",
  ]) {
    assert.equal(
      files.includes(file),
      false,
      `source-only file published: ${file}`,
    );
  }
  for (const prefix of [".github/", "scripts/", "tests/", "node_modules/"]) {
    assert.equal(
      files.some((file) => file.startsWith(prefix)),
      false,
      `tooling directory published: ${prefix}`,
    );
  }

  assert.deepEqual(
    files.filter((file) => file.startsWith("recipes/")),
    [
      "recipes/gateway-lease-fence/fixture.json",
      "recipes/mcp-seam/fixture.json",
    ],
  );
  assert.equal(files.includes("assets/identity/review.html"), false);
  assert.equal(
    files.some(
      (file) => file.startsWith("assets/identity/") && file.endsWith(".md"),
    ),
    false,
  );
  assert.equal(
    files.some((file) => file.endsWith("/Cargo.toml")),
    false,
  );
  assert.equal(
    files.some((file) => file.endsWith("/Cargo.lock")),
    false,
  );
  assert.equal(
    files.some((file) => file.endsWith(".rs")),
    false,
  );

  for (const file of files.filter((candidate) => candidate.endsWith(".html"))) {
    const html = fs.readFileSync(path.join(output, file), "utf8");
    for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
      const target = match[1];
      if (/^(?:[a-z]+:|\/\/)/i.test(target)) {
        continue;
      }
      const [pathname, fragment] = target.split("#");
      const resolved = path.join(output, pathname || file);
      assert.ok(fs.existsSync(resolved), `${file}: missing ${target}`);
      if (fragment && resolved.endsWith(".html")) {
        const linkedHtml = fs.readFileSync(resolved, "utf8");
        assert.match(linkedHtml, new RegExp(`id="${fragment}"`));
      }
    }
  }
});

test("publication rejects linked or missing inputs and excludes reports deterministically", () => {
  childProcess.execFileSync(process.execPath, ["scripts/build-pages.mjs"], {
    cwd: root,
  });
  const fixture = fs.mkdtempSync(path.join(os.tmpdir(), "pages-publication-"));
  try {
    fs.cpSync(output, fixture, { recursive: true });
    fs.mkdirSync(path.join(fixture, "scripts"));
    fs.copyFileSync(
      path.join(root, "scripts/build-pages.mjs"),
      path.join(fixture, "scripts/build-pages.mjs"),
    );
    for (const name of [
      "test-results/case/trace.zip",
      "playwright-report/index.html",
      "standards/BASELINE.md",
      "docs/standards/VERIFICATION.md",
      "standards.lock.json",
      "standards-profile.toml",
    ]) {
      fs.mkdirSync(path.dirname(path.join(fixture, name)), { recursive: true });
      fs.writeFileSync(path.join(fixture, name), "SYNTHETIC_NONPUBLIC_MARKER");
    }
    const run = () =>
      childProcess.spawnSync(process.execPath, ["scripts/build-pages.mjs"], {
        cwd: fixture,
        encoding: "utf8",
      });
    const built = path.join(fixture, ".pages-dist");
    const digest = () =>
      filesUnder(built)
        .sort()
        .map((name) => [
          name,
          crypto
            .createHash("sha256")
            .update(fs.readFileSync(path.join(built, name)))
            .digest("hex"),
        ]);
    assert.equal(run().status, 0);
    const first = digest();
    assert.equal(
      first.some(([name]) =>
        /^(test-results|playwright-report|standards|docs)/.test(name),
      ),
      false,
    );
    assert.equal(run().status, 0);
    assert.deepEqual(digest(), first);
    fs.symlinkSync(
      path.join(fixture, "standards.lock.json"),
      path.join(fixture, "assets/linked.css"),
    );
    const linked = run();
    assert.notEqual(linked.status, 0);
    assert.match(linked.stderr, /Publication input is a symlink/);
    assert.deepEqual(digest(), first);
    fs.unlinkSync(path.join(fixture, "assets/linked.css"));
    fs.unlinkSync(path.join(fixture, "proof.html"));
    assert.notEqual(run().status, 0);
    assert.deepEqual(digest(), first);
  } finally {
    fs.rmSync(fixture, { recursive: true });
  }
});
