import test from "node:test";
import assert from "node:assert/strict";
import { resolvePublication, publicationFiles } from "../src/lib/publication.ts";
import { pageMetadata } from "../src/lib/metadata.ts";
import { readFileSync } from "node:fs";

test("发布拒绝缺网址、本机、示例、带凭据或非根路径地址", () => {
  for (const value of ["", "http://portfolio.pages.dev", "https://localhost", "https://127.0.0.1", "https://[::1]",
    "https://192.168.1.2", "https://sample.invalid", "https://example.com", "https://x.example.org",
    "https://your-project.pages.dev", "https://user:pass@portfolio.pages.dev", "https://portfolio.pages.dev/path",
    "https://portfolio.pages.dev?key=value", "https://portfolio.pages.dev#home", "https://portfolio.pages.dev:4173"]) {
    assert.throws(() => resolvePublication("release", value), /Release refused/);
  }
  assert.throws(() => resolvePublication("unknown"));
  assert.throws(() => resolvePublication("local", "https://portfolio.pages.dev"));
  // 仅检验语法，没有访问、注册或认定这个域名属于用户。
  assert.equal(resolvePublication("release", "https://portfolio.pages.dev/").origin, "https://portfolio.pages.dev");
});

test("网址未定时仍可本地浏览，但不生成伪造canonical、分享图、sitemap", () => {
  const settings = resolvePublication();
  const meta = pageMetadata("标题", "摘要", "/images/cover.png", "/", settings);
  assert(!meta.some((entry) => entry.rel === "canonical" || entry.property === "og:image" || entry.property === "og:url"));
  assert(meta.some((entry) => entry.name === "robots" && entry.content === "noindex, nofollow"));
  assert.equal(publicationFiles(settings, ["/"]).sitemap, null);
});

test("配置模板在隔离资料上同步页面地址、分享图和站点地图，错误页无canonical", () => {
  // .invalid只存在于本测试内，不经环境校验进入构建，也不发网络请求。
  const settings = { target: "release", origin: "https://publication.invalid" };
  const path = "/projects/isolated/";
  const meta = pageMetadata("测试标题", "测试摘要", "/images/isolated.png", path, settings);
  assert(meta.some((entry) => entry.rel === "canonical" && entry.href === settings.origin + path));
  assert(meta.some((entry) => entry.property === "og:image" && entry.content === settings.origin + "/images/isolated.png"));
  assert(!pageMetadata("错误", "返回首页", undefined, undefined, settings).some((entry) => entry.rel === "canonical"));
  const files = publicationFiles(settings, ["/", path]);
  assert.equal((files.sitemap.match(/<url>/g) ?? []).length, 2);
  assert(files.sitemap.includes(settings.origin + path));
  assert(!files.sitemap.includes("404") && !files.sitemap.includes("_dev"));
  const platform = JSON.parse(readFileSync("vercel.json", "utf8"));
  assert(platform.headers[0].headers.some((entry) => entry.key === "X-Robots-Tag" && entry.value === "noindex, nofollow"));
  assert.equal(platform.outputDirectory, "build/client");
  assert.equal(platform.framework, null);
  assert.equal(platform.git.deploymentEnabled, false);
  assert(!platform.rewrites && !platform.routes);
  assert(files.robots.includes("Allow: /") && !files.robots.includes("Disallow: /"));
});
