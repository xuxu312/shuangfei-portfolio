import { useSearchParams } from "react-router";
import { HomeContent } from "../../components/HomeContent";
import { projects } from "../../data/projects";
import { about, contact, intro, siteNavigation } from "../../data/site";
import { projectPath } from "../../lib/content-paths";
import { getToolCards } from "../../lib/tool-cards";
import { getFeaturedCards } from "../../lib/projects";
import { contentFixtureMarker, fixtureCover, share, toolProject } from "../../../dev-fixtures/content";

export function meta() {
  return [
    { title: "工具与分享 · 本地切换检查" },
    { name: "robots", content: "noindex, nofollow" },
  ];
}

export default function FixtureContent() {
  const [params, setParams] = useSearchParams();
  const showTools = params.get("tools") === "1";
  const showSharing = params.get("sharing") === "1";
  const showCover = params.get("cover") === "1";
  const records = showTools ? [...projects, toolProject] : projects;

  function toggle(key: string) {
    setParams((previous) => {
      const next = new URLSearchParams(previous);
      if (next.get(key) === "1") next.delete(key);
      else next.set(key, "1");
      return next;
    }, { replace: true });
  }

  return (
    <div data-fixture={contentFixtureMarker}>
      <aside aria-label="本地内容测试" className="border-b border-line bg-surface">
        <div className="page-shell py-4 text-sm leading-6">
          <h2 className="text-lg font-semibold">测试操作区（仅本地）</h2>
          <p className="mt-2 text-muted">先点绿色按钮添加，再点下方导航“工具”或“分享”查看卡片。回到页顶，点同一个按钮即可移除。</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" onClick={() => toggle("tools")} aria-pressed={showTools} className="primary-link cursor-pointer">{showTools ? "移除工具测试记录" : "添加工具测试记录"}</button>
            <button type="button" onClick={() => toggle("sharing")} aria-pressed={showSharing} className="primary-link cursor-pointer">{showSharing ? "移除分享测试记录" : "添加分享测试记录"}</button>
            {showSharing && <button type="button" onClick={() => toggle("cover")} aria-pressed={showCover} className="inline-flex min-h-12 cursor-pointer items-center rounded-lg border border-accent bg-page px-5 font-medium text-accent">{showCover ? "隐藏分享测试封面" : "显示分享测试封面"}</button>}
          </div>
          <p role="status" aria-live="polite" className="mt-3 text-muted">当前：工具 {showTools ? 1 : 0} 条，分享 {showSharing ? 1 : 0} 条。均为测试内容，不会加入正式网站。</p>
        </div>
      </aside>
      <HomeContent
        intro={intro}
        projects={getFeaturedCards(projects)}
        tools={getToolCards(records, (slug) => slug === toolProject.slug ? "/_dev/content-preview/tools" : projectPath(slug))}
        shares={showSharing ? [{ ...share, ...(showCover ? { cover: fixtureCover } : {}) }] : []}
        about={about}
        contact={contact}
        navigation={siteNavigation}
      />
    </div>
  );
}
