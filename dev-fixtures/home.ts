import cover from "./portfolio-fixture-cover.svg";
import type { IntroContent, ProjectPreview } from "../src/types/preview";

// 只由受开发开关保护的路由导入，不能作为正式作品数据。
export const fixtureMarker = "portfolio-visual-fixture-5-2";

export const intro: IntroContent = {
  name: "你的名字",
  greeting: "你好，我是",
  description: "探索 AI 应用、工程实践与内容创作。在这里，把想法做成作品，也分享一路上的思考。",
};

export const project: ProjectPreview = {
  id: fixtureMarker,
  title: "想法收集器（视觉样例）",
  summary: "把零散的灵感收在一处，为下一个创作找到起点。此处仅演示作品的封面、介绍与入口样式。",
  category: "AI 应用 / 界面概念",
  tags: ["概念设计", "内容整理"],
  notice: "本地测试条目—非真实作品",
  cover,
  coverWidth: 720,
  coverHeight: 480,
  coverAlt: "测试封面：以绿色卡片和纸张构成的想法收集器概念示意，并非实际产品截图",
  href: "/_dev/project-preview",
  linkLabel: "查看样例说明",
};
