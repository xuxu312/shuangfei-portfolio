import { sitePath } from "../lib/publication";
import { Link } from "react-router";
import { Header } from "./Header";
import type { Project } from "../types/content";
import { intro, siteNavigation } from "../data/site";
import { coverImage } from "../lib/cover-images";

export function ProjectDetailContent({ project, backHref = "/#projects" }: { project: Project; backHref?: string }) {
  return (
    <>
      <a className="skip-link" href="#main-content">跳到主要内容</a>
      <Header name={intro.name} homePath="/" navigation={siteNavigation} />
      <main id="main-content" className="page-shell pb-16">
        <Link to={backHref} className="nav-link mt-5 sm:mt-7">返回精选作品</Link>
        {project.notice && <p role="note" className="mt-4 border-l-2 border-accent pl-3 text-sm text-muted">{project.notice}</p>}
        <header className="pt-5 pb-8 sm:pt-7 sm:pb-10">
          <p className="text-sm leading-6 text-accent">{project.category}</p>
          <h1 className="mt-3 max-w-4xl text-[1.8rem] leading-[1.45] font-semibold tracking-tight sm:text-[2.5rem]">{project.fullTitle}</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-muted sm:text-lg">{project.summary}</p>
        </header>

        <figure className="overflow-hidden rounded-2xl border border-line bg-surface">
          <a href={sitePath(project.cover)} target="_blank" rel="noopener noreferrer" aria-label="查看封面公开展示图（新标签页）" className="block" title="新标签页查看封面公开展示图">
            <img {...coverImage(project.cover)} sizes="(min-width: 1040px) 974px, (min-width: 640px) calc(100vw - 66px), calc(100vw - 42px)" alt={project.coverAlt} width={project.coverWidth} height={project.coverHeight} fetchPriority="high" loading="eager" className="mx-auto h-auto w-full max-w-[974px]" />
          </a>
          {project.coverCaption && <figcaption className="border-t border-line px-5 py-3 text-sm leading-6 text-muted sm:px-7">{project.coverCaption}</figcaption>}
        </figure>

        <section aria-labelledby="overview-title" className={`detail-section ${project.facts.length ? "lg:grid lg:grid-cols-[1.2fr_1fr] lg:gap-16" : ""}`}>
          <div>
            <h2 id="overview-title" className="detail-heading">项目做什么</h2>
            <p className="mt-5 max-w-prose leading-8 text-muted">{project.overview}</p>
          </div>
          {project.facts.length > 0 && <dl className="mt-7 border-t border-line lg:mt-0">
            {project.facts.map((fact) => (
              <div key={fact.label} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] gap-4 border-b border-line py-3 text-sm leading-6">
                <dt className="text-muted">{fact.label}</dt><dd>{fact.value}</dd>
              </div>
            ))}
          </dl>}
        </section>

        {project.contributions.length > 0 && <section aria-labelledby="contribution-title" className="detail-section border-t border-line">
          <h2 id="contribution-title" className="detail-heading">我负责的工作</h2>
          <ul className="mt-6 grid gap-x-12 gap-y-6 sm:grid-cols-2">
            {project.contributions.map((item) => (
              <li key={item.title}>
                <h3 className="text-lg font-medium leading-7">{item.title}</h3>
                <p className="mt-2 max-w-prose leading-7 text-muted">{item.description}</p>
              </li>
            ))}
          </ul>
        </section>}

        {project.evidence.length > 0 && <section aria-labelledby="evidence-title" className="detail-section border-t border-line">
          <h2 id="evidence-title" className="detail-heading">{project.evidenceHeading ?? "成果展示"}</h2>
          <div className="mt-6 grid items-start gap-8 md:grid-cols-2">
            {project.evidence.map((item) => (
              <figure key={item.title} className="min-w-0">
                <h3 className="mb-4 text-lg font-medium">{item.title}</h3>
                <a href={sitePath(item.src)} target="_blank" rel="noopener noreferrer" aria-label={`查看${item.title}公开展示图（新标签页）`} className="flex min-h-72 items-center justify-center rounded-xl border border-line bg-surface p-4 sm:min-h-80">
                  <img src={sitePath(item.src)} alt={item.alt} width={item.width} height={item.height} loading="lazy" className="h-auto max-h-80 max-w-full object-contain" />
                </a>
                <figcaption className="mt-4 text-sm leading-7 text-muted">{item.caption} 点击图片可查看公开展示图。</figcaption>
              </figure>
            ))}
          </div>
        </section>}

        {project.overviewImage && <details className="group border-y border-line py-4">
          <summary className="min-h-11 cursor-pointer py-2.5 font-medium text-accent">查看项目总览（公开版）</summary>
          <img src={sitePath(project.overviewImage.src)} alt={project.overviewImage.alt} width={project.overviewImage.width} height={project.overviewImage.height} loading="lazy" className="mt-5 h-auto w-full" />
          <a className="nav-link mt-3" href={sitePath(project.overviewImage.src)} target="_blank" rel="noopener noreferrer">新标签页查看公开版总览</a>
        </details>}
        {project.links && project.links.length > 0 && <section aria-labelledby="links-title" className="detail-section border-t border-line">
          <h2 id="links-title" className="detail-heading">相关链接</h2>
          <ul className="mt-4 flex flex-wrap gap-5">{project.links.map((link) => <li key={link.url}><a className="nav-link" href={link.url} target="_blank" rel="noopener noreferrer">{link.label}（新标签页）</a></li>)}</ul>
        </section>}
        <Link className="primary-link mt-9" to={backHref}>返回精选作品</Link>
      </main>
    </>
  );
}
