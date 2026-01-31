import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV}`, debug: false, override: true });
dotenv.config({ path: ".env.local", debug: false, override: false });

const domain = process.env.DOMAIN;
if (!domain) {
  console.error("DOMAIN env variable is missing!");
  process.exit(1);
}

const enableKeybaseProof = process.env.ENABLE_KEYBASE_PROOF === "true";
if (!enableKeybaseProof) {
  console.log("Keybase proof disabled, skipping.");
  process.exit(0);
}

const src = path.resolve("identity/keybase.txt");
const dstDir = path.resolve("public/.well-known");
const dstFile = path.join(dstDir, "keybase.txt");

if (!fs.existsSync(src) || !fs.statSync(src).isFile()) {
  console.error(`Error: Keybase proof file missing: ${src}`);
  process.exit(1);
}

const contents = fs.readFileSync(src, "utf-8");
if (!contents.includes(domain)) {
  console.warn(`Error: keybase.txt does not mention the expected domain "${domain}".`);
  process.exit(1);
} else {
  console.log(`Keybase proof file contains expected domain: "${domain}"`);
}

console.log(`Copying Keybase proof from ${src} -> ${dstFile}`);

fs.mkdirSync(dstDir, { recursive: true });
fs.cpSync(src, dstFile, { recursive: true });

console.log("Keybase proof copied successfully.");
