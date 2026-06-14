// Rasterizes the brand SVG marks into PNG/ICO favicon assets.
// Run: node brand/build-icons.mjs   (from repo root)
import sharp from "sharp";
import pngToIco from "png-to-ico";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");

const rounded = readFileSync(join(here, "../favicon.svg"));   // rounded-square tile
const appIcon = readFileSync(join(here, "app-icon.svg"));     // full-bleed square tile

async function png(svg, size, outPath) {
  await sharp(svg, { density: 384 })
    .resize(size, size, { fit: "contain" })
    .png()
    .toFile(outPath);
  console.log("  wrote", outPath.replace(root + "\\", "").replace(root + "/", ""));
}

console.log("Rasterizing favicon set...");

// Browser favicons + social avatar from the rounded-square tile
await png(rounded, 16, join(root, "favicon-16.png"));
await png(rounded, 32, join(root, "favicon-32.png"));
await png(rounded, 48, join(here, "favicon-48.png"));
await png(rounded, 512, join(here, "avatar-512.png"));

// Apple touch + PWA icons from the full-bleed square (Apple masks corners itself)
await png(appIcon, 180, join(root, "apple-touch-icon.png"));
await png(appIcon, 192, join(here, "icon-192.png"));
await png(appIcon, 512, join(here, "icon-512.png"));

// Multi-resolution .ico (16 + 32 + 48)
const ico = await pngToIco([
  join(root, "favicon-16.png"),
  join(root, "favicon-32.png"),
  join(here, "favicon-48.png"),
]);
writeFileSync(join(root, "favicon.ico"), ico);
console.log("  wrote favicon.ico");

console.log("Done.");
