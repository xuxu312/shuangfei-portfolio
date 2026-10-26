import { Link } from "react-router";
import type { ToolCardContent } from "../types/content";
import { ContentSection } from "./ContentSection";

export function Tools({ items }: { items: readonly ToolCardContent[] }) {
  return (
    <ContentSection id="tools" title="我的工具">
      {items.length === 0 ? (
        <p className="max-w-prose text-base leading-8 text-muted">这里将陆续展示我制作的实用工具，目前还没有公开发布的工具。</p>
      ) : (
        <div className="space-y-5">
          {items.map((tool) => (
            <article key={tool.id} aria-labelledby={`tool-${tool.id}-title`} className="rounded-xl border border-line p-5 sm:flex sm:items-start sm:gap-5">
              <img src={tool.cover} alt={tool.coverAlt} width={tool.coverWidth} height={tool.coverHeight} loading="lazy" className="h-auto w-full rounded-lg object-contain sm:w-40 sm:shrink-0" />
              <div className="mt-4 min-w-0 sm:mt-0">
                <p className="text-sm leading-6 text-accent">{tool.status}</p>
                <h3 id={`tool-${tool.id}-title`} className="mt-2 text-xl leading-8 font-semibold wrap-anywhere">{tool.title}</h3>
                <p className="mt-2 text-base leading-7 text-muted wrap-anywhere">{tool.summary}</p>
                {tool.notice && <p className="mt-3 text-sm leading-6 text-muted">{tool.notice}</p>}
                <Link to={tool.href} className="card-link mt-2 inline-flex min-h-11 items-center font-medium text-accent" aria-label={`${tool.linkLabel}：${tool.title}`}>{tool.linkLabel}</Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </ContentSection>
  );
}
