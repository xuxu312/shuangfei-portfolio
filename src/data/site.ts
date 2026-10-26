import type { AboutContent, ContactContent, IntroContent, NavigationItem } from "../types/content";

export const intro: IntroContent = {
  name: "双非电源仔",
  greeting: "你好，我是",
  description: "探索 AI 应用、工程实践与内容创作。在这里，把想法做成作品，也分享一路上的思考。",
};

export const about: AboutContent = {
  paragraphs: [
    "我有电气工程背景，关注电力电子、AI 应用与内容创作。",
    "希望把学习与探索落成真实作品，也在这里分享实践中的思考。",
  ],
};

// 用户选择先公开平台昵称；未提供主页链接时只展示文字，不猜测账号地址。
export const contact: ContactContent = {
  platform: "小红书",
  nickname: "双非电源仔",
};

export const siteNavigation: NavigationItem[] = [
  { label: "作品", anchor: "projects" },
  { label: "工具", anchor: "tools" },
  { label: "分享", anchor: "sharing" },
  { label: "关于我", anchor: "about" },
  { label: "联系", anchor: "contact" },
];
