import { isRouteErrorResponse, Link, useLoaderData, useRouteError, type ClientLoaderFunctionArgs, type LoaderFunctionArgs, type MetaFunction } from "react-router";
import { ProjectDetailContent } from "../../components/ProjectDetailContent";
import { findPublicProject } from "../../lib/projects";
import { pageMetadata } from "../../lib/metadata";
import { parseScenario, scenarioProjects } from "../../../dev-fixtures/project-scenarios";
import cover from "../../../dev-fixtures/portfolio-fixture-cover.svg";

export function loader({ params, request }: LoaderFunctionArgs) {
  const scenario = parseScenario(new URL(request.url).searchParams.get("scenario"));
  const project = findPublicProject(scenarioProjects(scenario, cover), params.slug);
  if (!project) throw new Response("Not Found", { status: 404 });
  return { project, scenario };
}
// 任意测试 slug 没有预渲染数据；先确认当前场景中是否公开，再请求已有记录。
// 不捕获 serverLoader 的网络异常，避免把真实加载故障误报为404。
export async function clientLoader({ params, request, serverLoader }: ClientLoaderFunctionArgs) {
  const scenario = parseScenario(new URL(request.url).searchParams.get("scenario"));
  if (!findPublicProject(scenarioProjects(scenario, cover), params.slug)) {
    throw new Response("Not Found", { status: 404 });
  }
  return serverLoader();
}
export const meta: MetaFunction<typeof loader> = ({ loaderData, error }) => loaderData
  ? pageMetadata(`${loaderData.project.title}｜本地测试`, loaderData.project.summary, loaderData.project.cover)
  : isRouteErrorResponse(error) && error.status === 404
    ? pageMetadata("测试作品未找到", "本地测试：记录不在模拟公开范围内。")
    : pageMetadata("测试页面加载失败", "本地测试资料暂时无法加载，请返回重试。");
export default function FixtureProjectDetail() {
  const { project, scenario } = useLoaderData<typeof loader>();
  return <ProjectDetailContent project={project} backHref={`/_dev/projects?scenario=${scenario}#projects`} />;
}
export function ErrorBoundary() {
  const error = useRouteError();
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  return <main className="page-shell py-16"><h1 className="text-3xl">{notFound ? "404 · 测试作品未公开或已移除" : "测试页面加载失败"}</h1><p className="mt-5">仅影响本地测试资料，真实 MMC 作品没有改变。</p><Link className="primary-link mt-6" to="/_dev/projects">返回多作品测试</Link></main>;
}
