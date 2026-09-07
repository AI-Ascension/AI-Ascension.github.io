import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

export function checkRecipe(directory, runner = spawnSync) {
  const result = runner("cargo", ["+1.97.1", "run", "--locked", "--release"], {
    cwd: directory,
    timeout: 120000,
    maxBuffer: 1024 * 1024,
  });
  if (result.error || result.signal || result.status !== 0) {
    throw new Error(
      "Pinned recipe process failed or exceeded its execution bound",
    );
  }
  const expected = readFileSync(resolve(directory, "fixture.json"));
  if (!Buffer.isBuffer(result.stdout) || !expected.equals(result.stdout)) {
    throw new Error("Pinned recipe output differs from its frozen fixture");
  }
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const root = fileURLToPath(new URL("../", import.meta.url));
  const directory = process.cwd();
  if (
    !["gateway-lease-fence", "mcp-seam"].some(
      (recipe) => directory === resolve(root, "recipes", recipe),
    )
  ) {
    throw new Error(
      "Run this check from one of the two pinned recipe directories",
    );
  }
  checkRecipe(directory);
  console.log(
    "Pinned recipe process succeeded and exact fixture bytes matched",
  );
}
