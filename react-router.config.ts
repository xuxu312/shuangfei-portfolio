import type { Config } from "@react-router/dev/config";
import { projects } from "./src/data/projects";
import { getProjectPaths } from "./src/lib/projects";

const includeFixtures =
  import.meta.env.MODE === "development" && process.env.PORTFOLIO_FIXTURES === "1";

export default {
  appDirectory: "src",
  ssr: false,
  // The dev server uses this list too, allowing fixture pages to render without JS.
  prerender: ["/", ...getProjectPaths(projects), ...(includeFixtures ? ["/_dev/home", "/_dev/project-preview", "/_dev/content", "/_dev/content-preview/tools", "/_dev/content-preview/sharing", "/_dev/projects", "/_dev/projects/sample-a", "/_dev/projects/sample-b", "/_dev/projects/sample-c"] : [])],
} satisfies Config;
