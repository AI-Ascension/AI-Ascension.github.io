const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(process.argv[2] || ".");
const port = Number(process.env.PORT || 4173);
const mime = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8",
};

function safePath(requestPath) {
  let decoded;
  try {
    decoded = decodeURIComponent(requestPath);
  } catch {
    return null;
  }
  if (decoded.includes("\0")) {
    return null;
  }
  const candidate = path.resolve(root, `.${decoded}`);
  return candidate === root || candidate.startsWith(`${root}${path.sep}`)
    ? candidate
    : null;
}

const server = http.createServer((request, response) => {
  const requestUrl = new URL(request.url || "/", "http://127.0.0.1");
  let file = safePath(requestUrl.pathname);
  if (!file) {
    response.writeHead(400, { "content-type": "text/plain; charset=utf-8" });
    response.end("Bad request");
    return;
  }
  if (file === root) {
    file = path.join(root, "index.html");
  }
  fs.stat(file, (statError, stats) => {
    if (!statError && stats.isDirectory()) {
      file = path.join(file, "index.html");
    }
    fs.readFile(file, (readError, content) => {
      if (readError) {
        response.writeHead(readError.code === "ENOENT" ? 404 : 500, {
          "content-type": "text/plain; charset=utf-8",
        });
        response.end(
          readError.code === "ENOENT" ? "Not found" : "Server error",
        );
        return;
      }
      response.writeHead(200, {
        "cache-control": "no-store",
        "content-type":
          mime[path.extname(file).toLowerCase()] || "application/octet-stream",
      });
      response.end(content);
    });
  });
});

server.listen(port, "127.0.0.1");
