import { Link } from "react-router";
import { fixtureMarker, project } from "../../../dev-fixtures/home";

export function meta() {
  return [
    { title: "测试作品说明 · 首页视觉原型" },
    { name: "robots", content: "noindex, nofollow" },
  ];
}

// 仅验证卡片的本地跳转；正式作品详情属于后续阶段。
export default function FixtureProject() {
  return (
    <main data-fixture={fixtureMarker} className="page-shell py-12 sm:py-20">
      <Link className="nav-link" to="/_dev/home#projects">返回精选作品</Link>
      <p className="mt-10 text-sm leading-6 text-accent">{project.notice}</p>
      <h1 className="mt-3 text-3xl leading-normal font-semibold">{project.title}</h1>
      <p className="mt-6 max-w-prose leading-8 text-muted">
        这个名称、封面和简介仅用于评审首页的视觉效果，不代表已经完成或可以使用的工具。本页只验证作品卡片能够打开说明并返回首页。
      </p>
      <img className="mt-8 w-full max-w-2xl rounded-xl" src={project.cover} alt={project.coverAlt} width={720} height={480} />
    </main>
  );
}
