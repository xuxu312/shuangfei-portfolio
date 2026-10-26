import type { Project, ToolCardContent } from "../types/content";
import { projectPath } from "./content-paths";
import { getPublicProjects } from "./projects";

// 工具直接派生自项目主记录，标题、图片和状态不另存一份。
export function getToolCards(
  projects: readonly Project[],
  detailPath: (slug: string) => string = projectPath,
): ToolCardContent[] {
  return getPublicProjects(projects)
    .filter((project) => project.areas.includes("tools"))
    .map((project) => ({ ...project, href: detailPath(project.slug), linkLabel: "查看工具介绍" }));
}
