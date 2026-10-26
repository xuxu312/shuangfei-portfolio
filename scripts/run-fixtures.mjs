import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import process from "node:process";

const action = process.argv[2];
if (!["dev", "typecheck", "production-typecheck"].includes(action)) {
  throw new Error("Expected dev, typecheck, or production-typecheck.");
}

const require = createRequire(import.meta.url);
const router = resolve(dirname(require.resolve("@react-router/dev/package.json")), "bin.cjs");
const tsc = require.resolve("typescript/bin/tsc");
const isProduction = action === "production-typecheck";
const mode = isProduction ? "production" : "development";
const environment = { ...process.env, NODE_ENV: mode };
if (isProduction) delete environment.PORTFOLIO_FIXTURES;
else environment.PORTFOLIO_FIXTURES = "1";

async function run(file, args) {
  const child = spawn(process.execPath, [file, ...args], {
    env: environment,
    stdio: "inherit",
  });
  const forwardSignal = () => child.kill("SIGINT");
  process.on("SIGINT", forwardSignal);
  const code = await new Promise((resolveExit, reject) => {
    child.once("error", reject);
    child.once("exit", (exitCode) => resolveExit(exitCode ?? 1));
  });
  process.off("SIGINT", forwardSignal);
  if (code !== 0) process.exit(code);
}

await run(router, ["typegen", "--mode", mode]);
if (action === "dev") {
  await run(router, ["dev", "--mode", mode, "--host", "127.0.0.1", "--port", "5174", "--strictPort"]);
} else {
  await run(tsc, ["--noEmit"]);
}
