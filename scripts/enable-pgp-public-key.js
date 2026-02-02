import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV}`, debug: false, override: true });
dotenv.config({ path: ".env.local", debug: false, override: false });

const enablePGPPublicKey = process.env.ENABLE_PGP_PUBLIC_KEY === "true";
if (!enablePGPPublicKey) {
  console.log("PGP public key disabled, skipping.");
  process.exit(0);
}

const src = path.resolve("identity/pgp.asc");
const dstDir = path.resolve("public/");
const dstFile = path.join(dstDir, "pgp.asc");

if (!fs.existsSync(src) || !fs.statSync(src).isFile()) {
  console.error(`Error: PGP public key file missing: ${src}`);
  process.exit(1);
}

console.log(`Copying PGP public key from ${src} -> ${dstFile}`);

fs.mkdirSync(dstDir, { recursive: true });
fs.cpSync(src, dstFile, { recursive: true });

console.log("PGP public key copied successfully.");
