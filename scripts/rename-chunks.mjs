// Some networks (DPI filters) cut plain-HTTP requests whose path contains the
// word "chunks", which Next puts in every script URL (/_next/static/chunks/…).
// Run after `next build`: rename that folder to "assets" and rewrite every
// reference to it in the build output.
import { existsSync, readdirSync, readFileSync, renameSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const FROM = "static/chunks/";
const TO = "static/assets/";
const TEXT = /\.(js|mjs|cjs|json|html|rsc|body|meta|txt|css|map|segment)$/;

const roots = [".next", ".next/standalone/.next"].filter(existsSync);
let renamedDirs = 0;
let rewritten = 0;

function walk(dir) {
  for (const name of readdirSync(dir)) {
    if (name === "cache" || name === "node_modules") continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p);
    else if (TEXT.test(name) || name.includes(".")) {
      if (!TEXT.test(name)) continue;
      const src = readFileSync(p, "utf8");
      const out = src.split(FROM).join(TO).split("static\\/chunks\\/").join("static\\/assets\\/");
      if (out !== src) {
        writeFileSync(p, out);
        rewritten++;
      }
    }
  }
}

for (const root of roots) {
  walk(root);
  const dir = join(root, "static", "chunks");
  if (existsSync(dir)) {
    renameSync(dir, join(root, "static", "assets"));
    renamedDirs++;
  }
}
console.log(`rename-chunks: ${renamedDirs} folder(s) renamed, ${rewritten} file(s) rewritten`);
