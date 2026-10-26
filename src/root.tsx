import type { ReactNode } from "react";
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { MissingPage } from "./components/MissingPage";
import type { Route } from "./+types/root";
import "./styles/app.css";

export function meta({ error }: Route.MetaArgs) {
  if (isRouteErrorResponse(error) && error.status === 404) return [
    { title: "没有找到这个页面｜双非电源仔" },
    { name: "robots", content: "noindex, nofollow" },
  ];
  return [
    { title: "个人综合作品集网站" },
    { name: "description", content: "这里将逐步整理我的项目、创作与实践。" },
    { name: "robots", content: "noindex, nofollow" },
  ];
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:," />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error) && error.status === 404) return <MissingPage />;
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-24">
      <h1 className="text-2xl font-semibold">页面暂时无法显示</h1>
      <p className="mt-6 leading-7">请返回首页后重试。</p>
      <a className="mt-6 inline-block underline underline-offset-4" href="/">
        返回首页
      </a>
      {import.meta.env.DEV && error instanceof Error && (
        <pre className="mt-8 overflow-x-auto whitespace-pre-wrap break-words text-sm">
          {error.stack ?? error.message}
        </pre>
      )}
    </main>
  );
}
