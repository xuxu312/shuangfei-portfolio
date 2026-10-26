import { spawnSync } from "node:child_process";
import process from "node:process";
import { resolvePublication } from "../src/lib/publication.ts";

// 先验证，再启动构建；缺网址时不把旧构建冒充发布成功。
resolvePublication("release", process.env.PORTFOLIO_SITE_URL);
if (!process.env.npm_execpath) throw new Error("Run with npm run build:release.");
const child = spawnSync(process.execPath, [process.env.npm_execpath, "run", "build"], {
  env: { ...process.env, PORTFOLIO_TARGET: "release" }, stdio: "inherit",
});
if (child.error) throw child.error;
process.exit(child.status ?? 1);
