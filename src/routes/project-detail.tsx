import { isRouteErrorResponse, useLoaderData, useRouteError, type ClientLoaderFunctionArgs, type LoaderFunctionArgs, type MetaFunction } from "react-router";
import { ProjectDetailContent } from "../components/ProjectDetailContent";
import { MissingPage } from "../components/MissingPage";
import { projects } from "../data/projects";
import { intro } from "../data/site";
import { findPublicProject } from "../lib/projects";
import { pageMetadata } from "../lib/metadata";

export function loader({ params }: LoaderFunctionArgs) {
  const project = findPublicProject(projects, params.slug);
  if (!project) throw new Response("Not Found", { status: 404 });
  return project;
}

// 未预渲染的动态地址没有 .data 文件，先判断是否公开，再请求已存在的静态数据。
// 已公开作品若发生网络异常，继续显示加载失败，不将其误报为内容不存在。
export async function clientLoader({ params, serverLoader }: ClientLoaderFunctionArgs) {
  if (!findPublicProject(projects, params.slug)) throw new Response("Not Found", { status: 404 });
  try {
    return await serverLoader();
  } catch (error) {
    // 作品已在公开列表中：静态数据文件丢失或版本不同步不等于作品被撤下。
    // 真正未知的 slug 在上面返回404，这里只将数据请求404视为暂时不可用。
    if ((isRouteErrorResponse(error) || error instanceof Response) && error.status === 404) {
      throw new Response("Project data temporarily unavailable", { status: 503 });
    }
    throw error;
  }
}

export const meta: MetaFunction<typeof loader> = ({ loaderData: data, error }) => {
  if (!data) return pageMetadata(isRouteErrorResponse(error) && error.status === 404 ? "没有找到这个作品" : "作品页面暂不可用", "请返回首页查看现有项目。");
  return pageMetadata(`${data.title}｜${intro.name}`, data.summary, data.cover, `/projects/${data.slug}/`);
};

export default function ProjectDetail() {
  return <ProjectDetailContent project={useLoaderData<typeof loader>()} />;
}

export function ErrorBoundary() {
  const error = useRouteError();
  return <MissingPage notFound={isRouteErrorResponse(error) && error.status === 404} project />;
}
