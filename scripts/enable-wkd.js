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

const enableWKD = process.env.ENABLE_WKD === "true";
if (!enableWKD) {
  console.log("WKD disabled, skipping.");
  process.exit(0);
}

const src = path.resolve("identity/openpgpkey");
const dst = path.resolve("public/.well-known/openpgpkey");

const domainFolder = path.join(src, domain);
if (!fs.existsSync(domainFolder) || !fs.statSync(domainFolder).isDirectory()) {
  console.error(`Error: WKD domain folder missing: "${domainFolder}"`);
  process.exit(1);
} else {
  console.log(`WKD domain folder exists: "${domainFolder}"`);
}

console.log(`Copying WKD files from ${src} -> ${dst}`);

fs.mkdirSync(dst, { recursive: true });
fs.cpSync(src, dst, { recursive: true });

console.log("WKD copied successfully.");
