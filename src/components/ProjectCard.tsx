import { Link } from "react-router";
import type { ProjectCardContent } from "../types/content";
import { coverImage } from "../lib/cover-images";

export function ProjectCard({ project, priority = false }: { project: ProjectCardContent; priority?: boolean }) {
  return (
    <article className="project-card overflow-hidden rounded-2xl border border-line bg-page md:grid md:grid-cols-[1.2fr_1fr]" aria-labelledby={`${project.id}-title`}>
      <div className="flex items-center overflow-hidden bg-cover-surface">
        <img
          {...coverImage(project.cover)}
          sizes="(min-width: 1184px) 610px, (min-width: 768px) calc(54.55vw - 36px), (min-width: 640px) calc(100vw - 66px), calc(100vw - 42px)"
          alt={project.coverAlt}
          width={project.coverWidth}
          height={project.coverHeight}
          fetchPriority={priority ? "high" : undefined}
          loading={priority ? "eager" : "lazy"}
          className="h-auto w-full object-contain"
        />
      </div>
      <div className="flex min-w-0 flex-col items-start p-6 sm:p-8 lg:p-10">
        <p className="text-sm leading-6 text-accent">{project.category}</p>
        <h3 id={`${project.id}-title`} className="mt-3 text-2xl leading-[1.5] font-semibold tracking-tight">
          {project.title}
        </h3>
        <p className="mt-3 max-w-prose text-base leading-[1.8] text-muted">{project.summary}</p>
        <ul aria-label="作品标签" className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-sm leading-6 text-muted">
          {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
        </ul>
        {project.notice && <p className="mt-5 border-l-2 border-accent pl-3 text-sm leading-6 text-muted">{project.notice}</p>}
        <Link to={project.href} className="card-link mt-5 inline-flex min-h-11 items-center gap-2 font-medium text-accent">
          {project.linkLabel}
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
