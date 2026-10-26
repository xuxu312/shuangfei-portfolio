import type { Project, Share } from "../types/content.ts";
import { coverAssets } from "./cover-images.ts";

export function contentAssets(projects: readonly Project[], shares: readonly Share[]): string[] {
  return [...new Set([
    ...projects.flatMap((p) => [p.cover, ...coverAssets(p.cover), ...p.evidence.map((item) => item.src), ...(p.overviewImage ? [p.overviewImage.src] : [])]),
    ...shares.flatMap((s) => s.cover ? [s.cover.src] : []),
  ])];
}

// 校验正式数据入口；draft 不是保密措施，必须在导入生产代码之前隔离。
export function validateContent(projects: readonly Project[], shares: readonly Share[]): string[] {
  const errors: string[] = [];
  const text = (value: unknown, field: string) => {
    if (typeof value !== "string" || !value.trim()) errors.push(`${field}：不能为空`);
  };
  const unique = (values: string[], field: string) => {
    if (new Set(values).size !== values.length) errors.push(`${field}：存在重复值`);
  };
  const url = (value: string, field: string) => {
    try {
      const parsed = new URL(value);
      if (parsed.protocol !== "https:" || parsed.username || parsed.password || !parsed.hostname.includes(".")) throw new Error();
    } catch { errors.push(`${field}：必须使用无账号密码的完整 HTTPS 链接`); }
  };
  const image = (value: { src: string; alt: string; width: number; height: number }, field: string) => {
    // 禁止路径穿越、编码绕过、查询参数或任意外部图片。
    if (!/^\/images\/(?:[a-zA-Z0-9_-]+\/)*[a-zA-Z0-9_-]+\.(png|jpg|jpeg|webp|avif|svg)$/.test(value.src)) errors.push(`${field}：图片需在 public/images 中，路径只使用字母、数字、连字符或下划线`);
    text(value.alt, `${field}.alt`);
    if (![value.width, value.height].every((n) => Number.isSafeInteger(n) && n > 0)) errors.push(`${field}：宽高必须为正整数`);
  };
  unique(projects.map((p) => p.id), "作品 ID");
  unique(projects.map((p) => p.slug), "作品 slug");
  unique(shares.map((s) => s.id), "分享 ID");
  projects.forEach((p, i) => {
    const at = `作品[${i}]`;
    for (const key of ["id", "title", "fullTitle", "summary", "overview", "category", "status"] as const) text(p[key], `${at}.${key}`);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.id)) errors.push(`${at}.id：使用小写字母、数字和连字符`);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug)) errors.push(`${at}.slug：使用稳定的小写地址，不随标题改名`);
    if (p.visibility !== "public") errors.push(`${at}：未发布资料禁止放入正式数据，请移出 src/public 及生产导入链`);
    if (typeof p.featured !== "boolean") errors.push(`${at}.featured：必须明确是否首页精选`);
    if (!Number.isSafeInteger(p.order) || p.order < 0) errors.push(`${at}.order：必须是非负整数`);
    if (!p.areas.length || p.areas.some((area) => area !== "projects" && area !== "tools")) errors.push(`${at}.areas：仅支持 projects/tools`);
    unique(p.areas, `${at}.areas`);
    if (p.featured && !p.areas.includes("projects")) errors.push(`${at}：首页精选需要 projects 展示位置`);
    image({ src: p.cover, alt: p.coverAlt, width: p.coverWidth, height: p.coverHeight }, `${at}.cover`);
    unique(p.tags, `${at}.tags`);
    p.tags.forEach((tag) => text(tag, `${at}.tags`));
    p.facts.forEach((item) => { text(item.label, `${at}.facts.label`); text(item.value, `${at}.facts.value`); });
    unique(p.facts.map((item) => item.label), `${at}.facts`);
    p.contributions.forEach((item) => { text(item.title, `${at}.contributions.title`); text(item.description, `${at}.contributions.description`); });
    unique(p.contributions.map((item) => item.title), `${at}.contributions`);
    p.evidence.forEach((item) => { text(item.title, `${at}.evidence.title`); text(item.caption, `${at}.evidence.caption`); image(item, `${at}.evidence`); });
    unique(p.evidence.map((item) => item.title), `${at}.evidence`);
    if (p.overviewImage) image(p.overviewImage, `${at}.overviewImage`);
    if (p.coverCaption !== undefined) text(p.coverCaption, `${at}.coverCaption`);
    if (p.evidenceHeading !== undefined) text(p.evidenceHeading, `${at}.evidenceHeading`);
    p.links?.forEach((item) => { text(item.label, `${at}.links.label`); url(item.url, `${at}.links.url`); });
    if (p.links) unique(p.links.map((item) => item.url), `${at}.links`);
  });
  shares.forEach((s, i) => {
    const at = `分享[${i}]`;
    for (const key of ["id", "title", "summary", "platform"] as const) text(s[key], `${at}.${key}`);
    url(s.url, `${at}.url`);
    if (s.cover) image(s.cover, `${at}.cover`);
    if (s.relatedProjectId && !projects.some((p) => p.id === s.relatedProjectId && p.visibility === "public")) errors.push(`${at}：关联作品不存在或未公开`);
  });
  return errors;
}
