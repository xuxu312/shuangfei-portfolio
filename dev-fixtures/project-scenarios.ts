import type { Project } from "../src/types/content.ts";

export const projectFixtureMarker = "portfolio-projects-fixture-5-3";
export const scenarios = [
  ["empty", "零条作品"], ["one", "一条作品"], ["many", "添加至三条"],
  ["edit", "修改第二条"], ["sort", "第三条排最前"],
  ["unfeature", "取消第二条精选"], ["withdraw", "撤下第二条"],
  ["remove", "移除第二条"],
] as const;
export type Scenario = typeof scenarios[number][0];
export function parseScenario(value: string | null): Scenario {
  return scenarios.find(([key]) => key === value)?.[0] ?? "one";
}

// 预设场景只在本地测试路由与测试脚本内使用，不导入真实 MMC 记录。
export function scenarioProjects(scenario: Scenario, cover: string): Project[] {
  const records: Project[] = ["a", "b", "c"].map((key, index) => ({
    id: `sample-${key}`, slug: `sample-${key}`, visibility: "public",
    featured: true, order: (index + 1) * 10, areas: ["projects"],
    status: "仅用于本地检查", title: `测试作品 ${key.toUpperCase()}`, fullTitle: `测试作品 ${key.toUpperCase()} · 通用详情样例`,
    summary: "明确标记的隔离测试资料，用于检查多作品布局与内容更新，不代表真实成果。",
    category: index === 1 ? "软件工具 / 测试" : "内容创作 / 测试",
    tags: ["测试内容"], notice: "本地测试条目—非真实作品",
    cover, coverAlt: "本地多作品测试封面", coverWidth: 720, coverHeight: 480,
    overview: "这里用于检查不同类型项目的通用介绍。没有实验参数、波形或设备标注时，不显示相关区域。",
    contributions: index === 1 ? [{ title: "测试工作说明", description: "仅验证可选工作描述的显示。" }] : [],
    facts: [], evidence: [],
  }));
  if (scenario === "empty") return [];
  if (scenario === "one") return records.slice(0, 1);
  if (scenario === "edit") {
    records[1].title = "测试作品 B · 已修改";
    records[1].fullTitle = "测试作品 B · 修改后的详情标题";
    records[1].summary = "修改后的测试简介；作品地址仍为 sample-b，不随标题变化。";
  }
  if (scenario === "sort") records[2].order = 0;
  if (scenario === "unfeature") records[1].featured = false;
  if (scenario === "withdraw") records[1].visibility = "draft";
  if (scenario === "remove") return records.filter((record) => record.id !== "sample-b");
  return records;
}
