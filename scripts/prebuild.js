import { execSync } from "node:child_process";

const env = { ...process.env, NODE_ENV: "production" };

const run = (cmd) => {
  execSync(cmd, { stdio: "inherit", env });
};

try {
  run("node scripts/enable-wkd.js");
  run("node scripts/enable-keybase-proof.js");
  run("node scripts/enable-pgp-public-key.js");
} catch (err) {
  console.error("Error: Prebuild step failed");
  process.exit(1);
}

