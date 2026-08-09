import { createRequire } from "node:module";
import path from "node:path";

// Resolving from import.meta.url walks up from THIS file, i.e. from wherever the skill
// itself is installed. When the skill lives outside the clone project (for example
// ~/.claude/skills/web-clone), that walk never reaches the clone project's node_modules,
// so `npm install -D playwright` in the clone project — what the error below tells you to
// do — could not actually take effect. Resolve from the working directory first so that
// instruction is true, then fall back to the skill's own location.
const requireFromSkill = createRequire(import.meta.url);
const requireFromCwd = createRequire(path.join(process.cwd(), "__playwright_resolution__.js"));

export function loadPlaywright() {
  const attempts = [
    () => requireFromCwd("playwright"),
    () => requireFromSkill("playwright"),
    () => requireFromSkill("/Users/jane/.shared-skills/Browser/node_modules/playwright"),
    () => requireFromSkill("/Users/jane/ZenDrop/node_modules/playwright"),
    () => requireFromSkill("/Users/jane/.nvm/versions/node/v22.14.0/lib/node_modules/@playwright/mcp/node_modules/playwright"),
  ];
  for (const attempt of attempts) {
    try {
      return attempt();
    } catch {
      // Try next candidate.
    }
  }
  throw new Error("Playwright not found. Run `npm install -D playwright` in the clone project, or install the Browser skill dependencies.");
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
