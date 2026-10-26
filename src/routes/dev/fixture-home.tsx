import { HomeContent } from "../../components/HomeContent";
import { fixtureMarker, intro, project } from "../../../dev-fixtures/home";

export function meta() {
  return [
    { title: "首页视觉原型 · 待评审" },
    { name: "description", content: "仅本地查看的首页设计样例，包含明确标记的测试内容。" },
    { name: "robots", content: "noindex, nofollow" },
  ];
}

export default function FixtureHome() {
  return (
    <div data-fixture={fixtureMarker}>
      <aside aria-label="原型状态" className="border-b border-line bg-surface">
        <div className="page-shell flex flex-wrap justify-between gap-x-6 gap-y-1 py-2.5 text-xs leading-5 text-muted sm:text-sm">
          <p>本地视觉原型 · 待你评审</p>
          <p>姓名为占位，作品为测试内容</p>
        </div>
      </aside>
      <HomeContent intro={intro} projects={[project]} />
    </div>
  );
}
