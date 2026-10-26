import { Link, useLoaderData } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import { contentFixtureMarker, share, toolProject } from "../../../dev-fixtures/content";

// 正式模式不注册此路由，也不会生成它的 +types，使用框架通用参数类型。
export function loader({ params }: LoaderFunctionArgs) {
  if (params.kind !== "tools" && params.kind !== "sharing") throw new Response("Not Found", { status: 404 });
  return { kind: params.kind };
}

export function meta() {
  return [{ title: "本地测试说明" }, { name: "robots", content: "noindex, nofollow" }];
}

export default function FixtureContentPreview() {
  const { kind } = useLoaderData<typeof loader>();
  const content = kind === "tools" ? toolProject : share;
  return (
    <main data-fixture={contentFixtureMarker} className="page-shell py-12">
      <p className="text-sm leading-6 text-accent">{content.notice}</p>
      <h1 className="mt-3 text-3xl leading-normal font-semibold">{content.title}</h1>
      <p className="mt-5 max-w-prose leading-8 text-muted">{content.summary}</p>
      <p className="mt-4 max-w-prose leading-8 text-muted">此页仅验证卡片可以打开并返回，不代表工具功能、外部文章或视频已经可用。</p>
      <Link className="nav-link mt-6" to={`/_dev/content?${kind}=1#${kind}`}>返回测试栏目</Link>
    </main>
  );
}
