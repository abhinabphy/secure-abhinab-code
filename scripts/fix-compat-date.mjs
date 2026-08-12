import { readFileSync, writeFileSync } from "node:fs";

const path = ".output/server/wrangler.json";
const config = JSON.parse(readFileSync(path, "utf-8"));

config.compatibility_date = "2026-08-08";

writeFileSync(path, JSON.stringify(config, null, 2));
console.log(`Patched compatibility_date → ${config.compatibility_date}`);
