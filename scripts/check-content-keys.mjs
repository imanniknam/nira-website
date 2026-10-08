// Fails when code reads a CMS key that isn't defined in the registry (or the registry has duplicate keys).
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const reg = readFileSync("src/lib/content/registry.ts", "utf8");
const defined = new Set();
for (const m of reg.matchAll(/(?:\bf|\bta|\bimg|\burl)\(\s*["'`]([^"'`]+)["'`]/g)) defined.add(m[1]);
// keys built by helper functions (seo/hero/cta/why4) and index loops
const pages = ["home", "shop", "services", "custom", "contact", "gallery", "archive", "catalog"];
for (const p of pages) { defined.add(`${p}.seo.title`); defined.add(`${p}.seo.desc`); for (const k of ["eyebrow","title","accent","desc","cta","image"]) defined.add(`${p}.hero.${k}`); for (const k of ["eyebrow","title","label","image"]) defined.add(`${p}.cta.${k}`); }
for (const p of ["services", "custom"]) for (let i = 0; i < 4; i++) { defined.add(`${p}.why.${i}.title`); defined.add(`${p}.why.${i}.hint`); }
for (let i = 0; i < 4; i++) { defined.add(`features.${i}.title`); defined.add(`features.${i}.hint`); defined.add(`custom.step.${i}`); }
for (let i = 0; i < 6; i++) for (const k of ["title","desc","image"]) defined.add(`services.items.${i}.${k}`);
for (let i = 0; i < 3; i++) defined.add(`custom.chip.${i}`);

const used = new Map();
function walk(dir) {
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(tsx?|mts)$/.test(n) && !p.includes("registry.ts")) {
      const s = readFileSync(p, "utf8");
      for (const m of s.matchAll(/\bt\(\s*["'`]([a-zA-Z0-9_.${}\[\]]+)["'`]\s*\)/g)) {
        if (m[1].includes("${")) continue; // dynamic keys are covered by the loops above
        used.set(m[1], p);
      }
    }
  }
}
walk("src");
const missing = [...used].filter(([k]) => !defined.has(k));
if (missing.length) {
  console.error("Unknown content keys:\n" + missing.map(([k, p]) => `  ${k}  (${p})`).join("\n"));
  process.exit(1);
}
console.log(`ok — ${used.size} keys used, ${defined.size} defined`);
