const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");
const path = require("node:path");
const test = require("node:test");

const root = path.join(__dirname, "..");
function lint(filename, input) {
  return spawnSync(
    process.execPath,
    [
      "node_modules/eslint/bin/eslint.js",
      "--stdin",
      "--stdin-filename",
      filename,
      "--format",
      "json",
    ],
    { cwd: root, input, encoding: "utf8" },
  );
}

test("lint gate distinguishes Node and browser globals and rejects dynamic evaluation", () => {
  for (const [filename, input] of [
    ["assets/fixture.js", "document.title = 'Fixture';\n"],
    ["scripts/fixture.mjs", "process.exitCode = 0;\n"],
  ]) {
    const result = lint(filename, input);
    assert.equal(result.status, 0, result.stderr + result.stdout);
  }
  for (const [filename, input, rule] of [
    ["assets/fixture.js", "process.exitCode = 0;\n", "no-undef"],
    ["scripts/fixture.mjs", "document.title = 'Fixture';\n", "no-undef"],
    ["assets/fixture.js", "eval('1');\n", "no-eval"],
  ]) {
    const result = lint(filename, input);
    assert.equal(result.status, 1, result.stderr + result.stdout);
    assert.ok(
      JSON.parse(result.stdout)[0].messages.some(
        (message) => message.ruleId === rule,
      ),
    );
  }
});

test("formatter check rejects unformatted input without editing source", () => {
  for (const [input, status] of [
    ["const value = { a: 1 };\n", 0],
    ["const value={a:1};\n", 1],
  ]) {
    const result = spawnSync(
      process.execPath,
      [
        "node_modules/prettier/bin/prettier.cjs",
        "--check",
        "--stdin-filepath",
        "scripts/fixture.mjs",
      ],
      { cwd: root, input, encoding: "utf8" },
    );
    assert.equal(result.status, status, result.stderr + result.stdout);
  }
});
