import type { Project, ProjectCardContent } from "../types/content.ts";
import { projectPath } from "./content-paths.ts";

// 排序不修改原始数组。精选只控制首页，所有公开作品均有独立地址。
export function getPublicProjects(records: readonly Project[]): Project[] {
  return records.filter((item) => item.visibility === "public")
    .sort((a, b) => a.order - b.order || a.id.localeCompare(b.id, "en"));
}

export function getFeaturedCards(
  records: readonly Project[],
  detailPath: (slug: string) => string = projectPath,
): ProjectCardContent[] {
  return getPublicProjects(records)
    .filter((item) => item.featured && item.areas.includes("projects"))
    .map((item) => ({ ...item, href: detailPath(item.slug), linkLabel: "查看项目" }));
}

export function getProjectPaths(records: readonly Project[]): string[] {
  return getPublicProjects(records).map((item) => projectPath(item.slug));
}

export function findPublicProject(records: readonly Project[], slug: string | undefined) {
  return getPublicProjects(records).find((item) => item.slug === slug);
}
