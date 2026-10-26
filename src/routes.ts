import { index, route, type RouteConfig } from "@react-router/dev/routes";
import { projects } from "./data/projects";
import { getPublicProjects } from "./lib/projects";

const fixturesEnabled = process.env.PORTFOLIO_FIXTURES === "1";
const isDevelopment = import.meta.env.MODE === "development";

if (fixturesEnabled && !isDevelopment) {
  throw new Error("PORTFOLIO_FIXTURES must be disabled outside development mode.");
}

export default [
  index("routes/home.tsx"),
  ...(getPublicProjects(projects).length ? [route("projects/:slug", "routes/project-detail.tsx")] : []),
  ...(fixturesEnabled && isDevelopment
    ? [
        route("_dev/home", "routes/dev/fixture-home.tsx"),
        route("_dev/project-preview", "routes/dev/fixture-project.tsx"),
        route("_dev/content", "routes/dev/fixture-content.tsx"),
        route("_dev/content-preview/:kind", "routes/dev/fixture-content-preview.tsx"),
        route("_dev/projects", "routes/dev/fixture-projects.tsx"),
        route("_dev/projects/:slug", "routes/dev/fixture-project-detail.tsx"),
      ]
    : []),
] satisfies RouteConfig;
