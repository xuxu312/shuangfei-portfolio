import cover from "./portfolio-fixture-cover.svg";
import type { Project, Share } from "../src/types/content";

// 只能从受开发模式与开关保护的路由导入，绝不加入正式数组。
export const contentFixtureMarker = "portfolio-content-fixture-5-3";
export const fixtureCover = { src: cover, alt: "本地测试封面，不代表真实内容", width: 720, height: 480 };

export const toolProject: Project = {
  id: `${contentFixtureMarker}-tool`,
  slug: "tool-card-fixture",
  visibility: "public",
  featured: false,
  order: 20,
  areas: ["tools"],
  status: "仅用于本地界面测试",
  title: "工具卡片测试记录",
  fullTitle: "工具卡片测试记录",
  summary: "用于检查工具名称、用途、图片、状态和介绍入口；没有实际工具功能。",
  category: "本地测试",
  tags: [],
  notice: "本地测试条目—非真实作品",
  cover,
  coverAlt: fixtureCover.alt,
  coverWidth: fixtureCover.width,
  coverHeight: fixtureCover.height,
  overview: "这是一条隔离的界面测试记录，不是已开发的公开工具。",
  contributions: [],
  facts: [],
  evidence: [],
  overviewImage: fixtureCover,
};

export const share: Share = {
  id: `${contentFixtureMarker}-share`,
  title: "精选分享测试记录",
  summary: "用于检查标题、简介、来源与内容入口；本页没有发布真实文章或视频。",
  platform: "本地测试来源",
  url: "/_dev/content-preview/sharing",
  notice: "本地测试条目—非真实作品",
};
