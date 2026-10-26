import test from "node:test";
import assert from "node:assert/strict";
import { projects } from "../src/data/projects.ts";
import { shares } from "../src/data/shares.ts";
import { scenarioProjects } from "../dev-fixtures/project-scenarios.ts";
import { getFeaturedCards, getProjectPaths, getPublicProjects, findPublicProject } from "../src/lib/projects.ts";
import { contentAssets, validateContent } from "../src/lib/validate-content.ts";
import { pageMetadata } from "../src/lib/metadata.ts";
const records = (scenario) => scenarioProjects(scenario, "/images/test-cover.svg");

test("公开响应式图片跟随封面进入附件清单，撤下或换封面后不残留", () => {
  const sample = records("one");
  sample[0].cover = "/images/mmc/platform-public-680.webp";
  const assets = contentAssets(sample, []);
  assert(assets.includes("/images/mmc/platform-public-400.webp"));
  assert(assets.includes("/images/mmc/platform-public-680.webp"));
  assert.equal(assets.length, 2);
  assert.deepEqual(contentAssets([], []), []);
  const changed = globalThis.structuredClone(sample);
  changed[0].cover = "/images/replacement.png";
  const after = contentAssets(changed, []);
  assert(after.includes("/images/replacement.png"));
  assert(!after.some((path) => path.includes("/mmc/platform")));
  assert(!contentAssets(records("many"), []).some((path) => path.endsWith(".webp")));
});

test("零/一/多作品同时影响精选与独立地址，排序不修改资料", () => {
  for (const [state, count] of [["empty", 0], ["one", 1], ["many", 3]]) {
    const data = records(state);
    assert.equal(getFeaturedCards(data).length, count);
    assert.equal(getProjectPaths(data).length, count);
  }
  const sorted = records("sort");
  assert.deepEqual(getFeaturedCards(sorted).map((p) => p.id), ["sample-c", "sample-a", "sample-b"]);
  assert.equal(sorted[0].id, "sample-a");
});
test("取消精选保留公开详情；撤下和删除移除所有公开选择结果", () => {
  const data = records("unfeature");
  assert.equal(getFeaturedCards(data).length, 2);
  assert.equal(getProjectPaths(data).length, 3);
  assert(findPublicProject(data, "sample-b"));
  for (const state of ["withdraw", "remove"]) {
    assert.equal(getPublicProjects(records(state)).length, 2);
    assert.equal(findPublicProject(records(state), "sample-b"), undefined);
    assert(!getProjectPaths(records(state)).some((path) => path.includes("sample-b")));
  }
});
test("修改标题、介绍保留稳定URL，元信息使用同一条数据", () => {
  const before = records("many")[1];
  const after = records("edit")[1];
  assert.equal(after.slug, before.slug);
  assert.notEqual(after.title, before.title);
  assert.equal(findPublicProject(records("edit"), before.slug).summary, after.summary);
  const meta = pageMetadata(after.title, after.summary, after.cover);
  assert(meta.some((item) => item.title === after.title));
  assert(meta.some((item) => item.name === "description" && item.content === after.summary));
  assert(!pageMetadata("空首页", "没有精选").some((item) => item.property === "og:image"));
});
test("正式入口拒绝草稿、重复URL、坏图片路径、错误顺序和不安全链接", () => {
  assert.deepEqual(validateContent(projects, shares), []);
  const valid = records("many");
  assert.deepEqual(validateContent(valid, []), []);
  for (const change of [
    (p) => { p.visibility = "draft"; }, (p) => { p.slug = "sample-a"; },
    (p) => { p.id = "sample-a"; }, (p) => { p.cover = "/images/../../private.png"; },
    (p) => { p.order = NaN; }, (p) => { p.summary = " "; },
    (p) => { p.coverWidth = 0; }, (p) => { p.links = [{ label: "测试", url: "javascript:alert(1)" }]; },
  ]) {
    const data = globalThis.structuredClone(valid); change(data[1]);
    assert(validateContent(data, []).length > 0);
  }
  const share = { id: "sample", title: "测试", summary: "测试", platform: "测试", url: "https://example.com/story", relatedProjectId: "missing" };
  assert(validateContent(valid, [share]).some((error) => error.includes("关联")));
  assert(validateContent(valid, [{ ...share, relatedProjectId: "sample-a", url: "https://user:pass@example.com" }]).length);
});
