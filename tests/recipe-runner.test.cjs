const assert = require("node:assert/strict");
const { mkdtempSync, writeFileSync, rmSync } = require("node:fs");
const { tmpdir } = require("node:os");
const { join } = require("node:path");
const test = require("node:test");

test("recipe gate requires successful bounded execution and exact output bytes", async () => {
  const { checkRecipe } = await import("../scripts/check-recipe.mjs");
  const directory = mkdtempSync(join(tmpdir(), "recipe-gate-"));
  const output = Buffer.from("fixture\r\n");
  writeFileSync(join(directory, "fixture.json"), output);
  try {
    checkRecipe(directory, (command, args, options) => {
      assert.equal(command, "cargo");
      assert.deepEqual(args, ["+1.97.1", "run", "--locked", "--release"]);
      assert.equal(options.cwd, directory);
      assert.equal(options.timeout, 120000);
      assert.equal(options.maxBuffer, 1024 * 1024);
      return { status: 0, stdout: output };
    });
    for (const result of [
      { status: 1, stdout: output },
      { status: null, signal: "SIGTERM", stdout: output },
      { status: 0, error: new Error("timeout"), stdout: output },
      { status: 0, stdout: Buffer.from("fixture\n") },
      { status: 0, stdout: Buffer.alloc(0) },
    ]) {
      assert.throws(() => checkRecipe(directory, () => result));
    }
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
