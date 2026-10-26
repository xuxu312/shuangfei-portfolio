import { cp, mkdir, mkdtemp, readFile, readdir, symlink, unlink, writeFile } from "node:fs/promises";
import { resolve, join, relative, sep } from "node:path";
import { execFileSync } from "node:child_process";
import process from "node:process";
import { log } from "node:console";
import assert from "node:assert/strict";
import { scenarioProjects } from "../dev-fixtures/project-scenarios.ts";

// 真正构建一个临时副本；绝不替换主项目的资料、图片或 build/client。
const source = resolve(".");
const output = join(source, "output");
await mkdir(output, { recursive: true });
const root = await mkdtemp(join(output, "isolated-build-"));
for (const file of ["src", "dev-fixtures", "scripts", "package.json", "tsconfig.json", "vite.config.ts", "react-router.config.ts"]) await cp(join(source, file), join(root, file), { recursive: true });
await symlink(join(source, "node_modules"), join(root, "node_modules"), "junction");
await mkdir(join(root, "public/images"), { recursive: true });
await cp(join(source, "public/404.html"), join(root, "public/404.html"));
await writeFile(join(root, "private-draft.txt"), "PRIVATE_BUILD_SENTINEL_53");
const env = { ...process.env, NODE_ENV: "production", PORTFOLIO_TARGET: "local" };
delete env.PORTFOLIO_FIXTURES;
delete env.PORTFOLIO_SITE_URL;
const run = (args) => execFileSync(process.execPath, args, { cwd: root, env, encoding: "utf8", stdio: "pipe", timeout: 120000 });
const dataFile = join(root, "src/data/projects.ts");
const save = (records) => writeFile(dataFile, `import type { Project } from "../types/content";\nexport const projects: Project[] = ${JSON.stringify(records, null, 2)};\n`);
const imageFor = (id) => `/images/${id}.svg`;
let data = scenarioProjects("edit", imageFor("sample-a"));
for (const item of data) {
  item.cover = imageFor(item.id);
  await cp(join(source, "dev-fixtures/portfolio-fixture-cover.svg"), join(root, "public", item.cover));
}
data[1].featured = false;
data[2].order = 0;
const results = [];
async function allFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await allFiles(path)); else files.push(path);
  }
  return files;
}
async function build(name, records) {
  await save(records);
  const checks = run(["scripts/run-fixtures.mjs", "production-typecheck"]);
  const buildLog = run(["node_modules/@react-router/dev/bin.cjs", "build", "--mode", "production"]);
  await writeFile(join(root, `${name}.log`), checks + buildLog);
  const client = join(root, "build/client");
  const files = await allFiles(client);
  const home = await readFile(join(client, "index.html"), "utf8");
  const section = home.match(/<section id="projects"[\s\S]*?<\/section>/)?.[0] ?? "";
  const expected = records.filter((p) => p.featured).sort((a, b) => a.order - b.order).map((p) => p.id);
  assert.deepEqual([...section.matchAll(/<h3 id="([^"]+)-title"/g)].map((m) => m[1]), expected);
  assert.equal(files.filter((f) => relative(client, f).startsWith(`projects${sep}`) && f.endsWith("index.html")).length, records.length);
  for (const p of records) {
    const html = await readFile(join(client, "projects", p.slug, "index.html"), "utf8");
    const body = html.split("<body>")[1].replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
    assert(body.includes(p.fullTitle) && body.includes(p.overview));
    assert(html.includes(`<title>${p.title}｜双非电源仔</title>`));
    assert(html.includes(`name="description" content="${p.summary}"`));
    assert(html.includes('property="og:title"') && !html.includes('property="og:image"'));
    assert(html.includes('name="robots" content="noindex, nofollow"'));
    assert((await readFile(join(client, "projects", p.slug, "_.data"), "utf8")).includes(p.slug));
    assert(!body.includes("实物运行与采样结果") && !body.includes("照片保留原有设备标注"));
  }
  for (const file of files) {
    const content = await readFile(file);
    assert(!content.includes("PRIVATE_BUILD_SENTINEL_53"));
    assert(!content.includes("/_dev/"));
    if (!records.some((p) => p.id === "sample-b")) {
      assert(!relative(client, file).includes("sample-b"));
      assert(!content.includes("sample-b"));
    }
  }
  results.push({ name, publicPages: records.length, featuredOrder: expected, files: files.length, passed: true });
  log(`隔离构建通过：${name}`);
}
await build("many-edited-unfeatured", data);
data = data.filter((p) => p.id !== "sample-b");
// 仅移除刚在这个随机临时目录中创建的测试附件，不接触真实素材。
await unlink(join(root, "public/images/sample-b.svg"));
await build("removed", data);
for (const p of data) await unlink(join(root, "public", p.cover));
await build("empty", []);
await cp(join(source, "dev-fixtures/portfolio-fixture-cover.svg"), join(root, "public/images/sample-a.svg"));
await save([{ ...scenarioProjects("one", imageFor("sample-a"))[0], visibility: "draft" }]);
assert.throws(() => run(["scripts/validate-content.mjs"]), /未发布资料禁止放入正式数据/);
await unlink(join(root, "public/images/sample-a.svg"));
await save([]);
results.push({ name: "draft-rejected", passed: true });
env.PORTFOLIO_FIXTURES = "1";
assert.throws(() => run(["node_modules/@react-router/dev/bin.cjs", "build", "--mode", "production"]), /PORTFOLIO_FIXTURES/);
delete env.PORTFOLIO_FIXTURES;
results.push({ name: "fixture-build-rejected", passed: true });
await writeFile(join(root, "results.json"), JSON.stringify(results, null, 2));
log(`隔离证据目录：${root}`);
