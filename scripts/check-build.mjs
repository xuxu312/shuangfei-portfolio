import { readdir, readFile, stat } from "node:fs/promises";
import { join, relative, resolve } from "node:path";
import { log } from "node:console";
import assert from "node:assert/strict";
import process from "node:process";
import { projects } from "../src/data/projects.ts";
import { shares } from "../src/data/shares.ts";
import { intro } from "../src/data/site.ts";
import { getFeaturedCards, getProjectPaths } from "../src/lib/projects.ts";
import { contentAssets } from "../src/lib/validate-content.ts";
import { privateTerms, privacyFindings } from "./privacy.mjs";
import { resolvePublication, publicationFiles, absoluteSiteUrl } from "../src/lib/publication.ts";

const output = resolve("build/client");
const publication = resolvePublication(process.env.PORTFOLIO_TARGET, process.env.PORTFOLIO_SITE_URL);
// 原始素材仅保留在开发仓库和本地审核备份，候选站点及构建都不得携带旧高清地址。
const retiredImages = [
  "/images/mmc/platform.png", "/images/mmc/platform-487.webp", "/images/mmc/platform-974.webp",
  "/images/mmc/waveform.png", "/images/mmc/sampling.png", "/images/mmc/overview.png",
];
const forbidden = [
  ...retiredImages,
  "查看封面原图", "查看原始项目总览", "查看总览原图", "点击图片可查看原图",
  "/_dev/",
  "dev-fixtures",
  "portfolio-visual-fixture-5-2",
  "portfolio-fixture-cover",
  "portfolio-content-fixture-5-3",
  "portfolio-projects-fixture-5-3",
  "sample-a", "sample-b", "sample-c", "测试作品",
  "tool-card-fixture",
  "工具卡片测试记录",
  "精选分享测试记录",
  "想法收集器",
  "本地测试条目",
  "你的名字",
];
const privateWordList = await privateTerms();
let checked = 0;
const paths = [];

async function inspect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name);
    const name = relative(output, file).replaceAll("\\", "/");
    if (forbidden.some((marker) => `/${name}`.includes(marker))) {
      throw new Error(`Disallowed content found in output path: ${name}`);
    }
    if (entry.isDirectory()) {
      await inspect(file);
    } else {
      paths.push(name);
      const contents = await readFile(file);
      const findings = privacyFindings(contents, privateWordList);
      if (findings.length) throw new Error(`Privacy review required: ${name} (${findings.join(", ")})`);
      if (forbidden.some((marker) => contents.includes(marker))) {
        throw new Error(`Disallowed content found in output file: ${name}`);
      }
      checked += 1;
    }
  }
}

if (!(await stat(join(output, "index.html"))).isFile()) {
  throw new Error("Build output is missing index.html.");
}
for (const path of retiredImages) {
  assert(!(await stat(join("public", path.slice(1))).catch(() => null)), `旧素材仍留在 public：${path}`);
}
await inspect(output);
const escapeHtml = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("'", "&#x27;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const bodyWithoutScripts = (html) => html.split("<body>")[1]?.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "") ?? "";
const home = await readFile(join(output, "index.html"), "utf8");
const homeBody = bodyWithoutScripts(home);
const projectSection = homeBody.match(/<section id="projects"[\s\S]*?<\/section>/)?.[0] ?? "";
const cards = getFeaturedCards(projects);
assert.deepEqual([...projectSection.matchAll(/<h3 id="([^"]+)-title"/g)].map((match) => match[1]), cards.map((card) => card.id), "首页精选数量或顺序错误");
for (const project of projects) {
  const path = `projects/${project.slug}/`;
  const html = await readFile(join(output, path, "index.html"), "utf8");
  const body = bodyWithoutScripts(html);
  assert(body.includes(escapeHtml(project.fullTitle)), `缺少静态详情标题：${path}`);
  assert(body.includes(escapeHtml(project.overview)), `缺少静态详情正文：${path}`);
  assert(html.includes(`<title>${escapeHtml(`${project.title}｜${intro.name}`)}</title>`), `标题不同步：${path}`);
  assert(html.includes(`name="description" content="${escapeHtml(project.summary)}"`), `摘要不同步：${path}`);
  assert(html.includes('property="og:title"'), `分享标题缺失：${path}`);
  assert((await readFile(join(output, path, "_.data"), "utf8")).includes(project.slug), `导航数据缺失：${path}`);
}
const expectedProjectFiles = getProjectPaths(projects).flatMap((path) => [`${path.slice(1)}index.html`, `${path.slice(1)}_.data`]).sort();
assert.deepEqual(paths.filter((path) => path.startsWith("projects/")).sort(), expectedProjectFiles, "存在旧作品页面或缺失预渲染文件");
assert.deepEqual(paths.filter((path) => path.startsWith("images/")).sort(), contentAssets(projects, shares).map((path) => path.slice(1)).sort(), "作品图片缺失或有撤下后残留附件");
assert((await readFile(join(output, "404.html"), "utf8")).includes("没有找到这个页面"), "缺少静态404文件");
const publicationPaths = ["/", ...getProjectPaths(projects)];
const expectedFiles = publicationFiles(publication, publicationPaths);
assert.equal(await readFile(join(output, "robots.txt"), "utf8"), expectedFiles.robots);
assert(!paths.includes("_headers"), "Cloudflare-only headers must not be published on Vercel");
if (publication.origin) assert.equal(await readFile(join(output, "sitemap.xml"), "utf8"), expectedFiles.sitemap);
else assert(!paths.includes("sitemap.xml"), "网址未定时不生成站点地图");
for (const path of publicationPaths) {
  const html = await readFile(join(output, path.slice(1), "index.html"), "utf8");
  assert(html.includes('name="robots" content="noindex, nofollow"'), "试运行必须保留noindex");
  assert(!/https?:\/\/(localhost|127\.0\.0\.1)/.test(html), "页面含本机公开链接");
  const project = projects.find((item) => path === `/projects/${item.slug}/`);
  const image = path === "/" ? cards[0]?.cover : project?.cover;
  if (publication.origin) {
    assert(html.includes(`rel="canonical" href="${absoluteSiteUrl(path, publication)}"`), "canonical地址不同步");
    assert(html.includes(`property="og:url" content="${absoluteSiteUrl(path, publication)}"`), "分享地址不同步");
    if (image) assert(html.includes(`property="og:image" content="${absoluteSiteUrl(image, publication)}"`), "分享图地址不同步");
  } else {
    assert(!html.includes('rel="canonical"') && !html.includes('property="og:image"') && !html.includes('property="og:url"'), "本地审核包不得伪造正式分享地址");
  }
}
assert((await readFile(join(output, "404.html"), "utf8")).includes('content="noindex, nofollow"'), "404必须不收录");
assert((await readFile(join(output, "404.html"), "utf8")).includes(`href="${publication.basePath}"`), "404返回链接必须使用站点前缀");
if (publication.basePath !== "/") {
  for (const file of paths.filter((path) => path.endsWith(".html"))) {
    const html = await readFile(join(output, file), "utf8");
    for (const match of html.matchAll(/(?:href|src)="(\/(?!\/)[^"]*)"/g)) {
      assert(match[1].startsWith(publication.basePath), `遗漏站点前缀：${file} ${match[1]}`);
    }
  }
}
const buildPublication = JSON.parse(await readFile("build/publication.json", "utf8"));
assert.equal(buildPublication.origin, publication.origin);
assert.equal(buildPublication.target, publication.target);
log(`Production isolation passed: checked ${checked} files, no fixture markers; generic and optional external privacy checks passed.`);
log(`Static pages passed: ${projects.length} public detail pages, ${cards.length} featured cards, metadata, navigation data, assets and 404.`);
log(`Publication check passed: ${publication.target}, noindex; ${publication.origin ?? "no public origin — local review only"}.`);
