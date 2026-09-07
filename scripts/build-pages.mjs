import { copyFile, lstat, mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, ".pages-dist");
// Explicit runtime inventory keeps new tooling and reports out of publication.
const pages = [
  ".nojekyll",
  "404.html",
  "architecture.html",
  "contributing.html",
  "evidence.html",
  "index.html",
  "proof.html",
  "recipes.html",
  "repositories.html",
  "robots.txt",
  "sitemap.xml",
];
const fixtures = [
  "assets/fonts/NOTICES.md",
  "assets/fonts/LICENSE-BricolageGrotesque.txt",
  "assets/fonts/LICENSE-Fraunces.txt",
  "assets/fonts/LICENSE-JetBrainsMono.txt",
  "recipes/gateway-lease-fence/fixture.json",
  "recipes/mcp-seam/fixture.json",
];
const assetExtensions = new Set([
  ".css",
  ".js",
  ".svg",
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".avif",
  ".ico",
  ".woff",
  ".woff2",
  ".ttf",
  ".otf",
]);

async function admit(relative) {
  let current = root;
  for (const component of relative.split("/")) {
    current = path.join(current, component);
    if ((await lstat(current)).isSymbolicLink()) {
      throw new Error(`Publication input is a symlink: ${relative}`);
    }
  }
  if (!(await lstat(current)).isFile()) {
    throw new Error(`Publication input is not a file: ${relative}`);
  }
  return relative;
}

async function assets(relative, inventory) {
  const directory = path.join(root, relative);
  if ((await lstat(directory)).isSymbolicLink()) {
    throw new Error(`Publication directory is a symlink: ${relative}`);
  }
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) {
      continue;
    }
    const child = `${relative}/${entry.name}`;
    if (entry.isSymbolicLink()) {
      throw new Error(`Publication input is a symlink: ${child}`);
    }
    if (entry.isDirectory()) {
      await assets(child, inventory);
    } else if (assetExtensions.has(path.extname(entry.name).toLowerCase())) {
      inventory.push(await admit(child));
    }
  }
}

const inventory = [];
for (const relative of [...pages, ...fixtures]) {
  inventory.push(await admit(relative));
}
await assets("assets", inventory);
// Check inputs before replacing the previous local build artifact.
await rm(output, { force: true, recursive: true });
await mkdir(output, { recursive: true });
for (const relative of inventory.sort()) {
  const destination = path.join(output, relative);
  await mkdir(path.dirname(destination), { recursive: true });
  await copyFile(path.join(root, relative), destination);
}
