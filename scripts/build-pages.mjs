import { cp, mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, ".pages-dist");
const excluded = new Set([
  ".git",
  ".github",
  ".pages-dist",
  ".gitignore",
  ".gitattributes",
  "LICENSE",
  "NOTICES.md",
  "README.md",
  "VERIFICATION.md",
  "eslint.config.mjs",
  "node_modules",
  "package-lock.json",
  "package.json",
  "playwright.config.cjs",
  "scripts",
  "tests",
]);

function shouldCopy(relativePath, isDirectory) {
  const normalized = relativePath.split(path.sep).join("/");
  const parts = normalized.split("/");

  if (parts.some((part) => part.startsWith("."))) {
    return false;
  }
  if (normalized.startsWith("recipes/")) {
    return isDirectory || path.posix.basename(normalized) === "fixture.json";
  }
  if (
    normalized === "assets/identity/review.html" ||
    (normalized.startsWith("assets/identity/") && normalized.endsWith(".md"))
  ) {
    return false;
  }
  return true;
}

async function copyTree(source, destination, relative = "") {
  await mkdir(destination, { recursive: true });
  for (const entry of await readdir(source, { withFileTypes: true })) {
    const childRelative = relative
      ? path.join(relative, entry.name)
      : entry.name;
    if (!shouldCopy(childRelative, entry.isDirectory())) {
      continue;
    }
    const childSource = path.join(source, entry.name);
    const childDestination = path.join(destination, entry.name);
    if (entry.isDirectory()) {
      await copyTree(childSource, childDestination, childRelative);
    } else {
      await cp(childSource, childDestination);
    }
  }
}

await rm(output, { force: true, recursive: true });
await mkdir(output, { recursive: true });

for (const entry of await readdir(root, { withFileTypes: true })) {
  if (excluded.has(entry.name) || entry.name.startsWith(".")) {
    continue;
  }
  const source = path.join(root, entry.name);
  const destination = path.join(output, entry.name);
  if (entry.isDirectory()) {
    await copyTree(source, destination, entry.name);
  } else {
    await cp(source, destination);
  }
}

await cp(path.join(root, ".nojekyll"), path.join(output, ".nojekyll"));
