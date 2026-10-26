import { Link, useSearchParams } from "react-router";
import { HomeContent } from "../../components/HomeContent";
import { about, contact, intro, siteNavigation } from "../../data/site";
import { getFeaturedCards, getPublicProjects } from "../../lib/projects";
import { parseScenario, projectFixtureMarker, scenarioProjects, scenarios } from "../../../dev-fixtures/project-scenarios";
import cover from "../../../dev-fixtures/portfolio-fixture-cover.svg";

export function meta() { return [{ title: "多作品管理 · 本地测试" }, { name: "robots", content: "noindex, nofollow" }]; }

export default function FixtureProjects() {
  const [params, setParams] = useSearchParams();
  const scenario = parseScenario(params.get("scenario"));
  const records = scenarioProjects(scenario, cover);
  const detailPath = (slug: string) => `/_dev/projects/${slug}?scenario=${scenario}`;
  const cards = getFeaturedCards(records, detailPath);
  const published = getPublicProjects(records);
  return <div data-fixture={projectFixtureMarker}>
    <aside className="border-b border-line bg-surface" aria-label="多作品测试操作区">
      <div className="page-shell py-5 text-sm leading-7">
        <h1 className="text-lg font-semibold">多作品测试（仅本地）</h1>
        <p className="mt-2 text-muted">按钮切换预设场景，不修改真实 MMC，也不保存内容。取消精选后仍可从下方“公开详情”打开作品；撤下后地址应显示 404。</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {scenarios.map(([key, label]) => <button key={key} type="button" className="primary-link cursor-pointer" aria-pressed={scenario === key} onClick={() => setParams({ scenario: key }, { replace: true })}>{label}</button>)}
          <button type="button" className="nav-link cursor-pointer" onClick={() => setParams({}, { replace: true })}>恢复初始状态</button>
        </div>
        <p role="status" className="mt-3">首页精选 {cards.length} 条 · 模拟公开 {published.length} 条 · 当前：{scenarios.find(([key]) => key === scenario)?.[1]}</p>
        <div className="flex flex-wrap gap-x-5"><span>公开详情：</span>{published.map((item) => <Link className="nav-link" key={item.id} to={detailPath(item.slug)}>{item.title}</Link>)}</div>
        {(scenario === "withdraw" || scenario === "remove") && <Link className="nav-link" to={detailPath("sample-b")}>检查第二条旧地址（应为 404）</Link>}
      </div>
    </aside>
    <HomeContent intro={intro} projects={cards} about={about} contact={contact} navigation={siteNavigation} tools={[]} shares={[]} />
  </div>;
}
