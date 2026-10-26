import { Link } from "react-router";

export function MissingPage({ notFound = true, project = false }: { notFound?: boolean; project?: boolean }) {
  return <main className="page-shell py-16">
    {notFound && <p className="mb-4 text-sm text-accent">404</p>}
    <h1 className="text-3xl font-semibold">{notFound ? (project ? "没有找到这个作品" : "没有找到这个页面") : "页面暂时无法加载"}</h1>
    <p className="mt-5 leading-8 text-muted">{notFound ? "这个地址不存在，或内容已撤下。请返回首页查看现有作品。" : "请刷新页面重试，或返回首页。"}</p>
    <Link className="primary-link mt-7" to="/">返回首页</Link>
  </main>;
}
