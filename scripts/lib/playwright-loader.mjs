import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);

export function loadPlaywright() {
  const projectRequire = createRequire(path.join(process.cwd(), "package.json"));
  for (const resolve of [require, projectRequire]) {
    try {
      return resolve("playwright");
    } catch {
      // Try the next installation location.
    }
  }
  throw new Error("Playwright not found. Run `npm install -D playwright` in the skill directory or current project directory, then run `npx playwright install chromium`.");
}

export async function launchChromium(chromium) {
  try {
    return await chromium.launch({ headless: true });
  } catch (firstError) {
    try {
      return await chromium.launch({ headless: true, channel: "chrome" });
    } catch {
      throw firstError;
    }
  }
}
