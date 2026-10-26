import type { Share } from "../types/content";
import { ContentSection } from "./ContentSection";

export function Sharing({ items }: { items: readonly Share[] }) {
  return (
    <ContentSection id="sharing" title="精选分享">
      {items.length === 0 ? (
        <p className="max-w-prose text-base leading-8 text-muted">这里会收录我分享的文章、视频和其他内容，目前还在整理中。</p>
      ) : (
        <div className="space-y-5">
          {items.map((share) => (
            <article key={share.id} aria-labelledby={`share-${share.id}-title`} className="rounded-xl border border-line p-5 sm:flex sm:items-start sm:gap-5">
              {share.cover && <img src={share.cover.src} alt={share.cover.alt} width={share.cover.width} height={share.cover.height} loading="lazy" className="mb-4 h-auto w-full rounded-lg object-contain sm:mb-0 sm:w-40 sm:shrink-0" />}
              <div className="min-w-0">
                <p className="text-sm leading-6 text-accent">{share.platform}</p>
                <h3 id={`share-${share.id}-title`} className="mt-2 text-xl leading-8 font-semibold wrap-anywhere">{share.title}</h3>
                <p className="mt-2 text-base leading-7 text-muted wrap-anywhere">{share.summary}</p>
                {share.notice && <p className="mt-3 text-sm leading-6 text-muted">{share.notice}</p>}
                <a href={share.url} target="_blank" rel="noopener noreferrer" className="card-link mt-2 inline-flex min-h-11 items-center font-medium text-accent" aria-label={`查看原内容：${share.title}（新标签页）`}>查看原内容<span className="ml-2 text-xs font-normal">（新标签页）</span></a>
              </div>
            </article>
          ))}
        </div>
      )}
    </ContentSection>
  );
}
