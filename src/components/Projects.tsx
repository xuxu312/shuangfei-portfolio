import { ProjectCard } from "./ProjectCard";
import type { ProjectPreview } from "../types/preview";

export function Projects({ projects }: { projects: ProjectPreview[] }) {
  return (
    <section id="projects" aria-labelledby="projects-title" className="scroll-mt-6 pb-12 sm:pb-16">
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h2 id="projects-title" className="text-2xl leading-normal font-semibold tracking-tight sm:text-[1.75rem]">精选作品</h2>
        <p className="text-sm leading-6 text-muted">从一个想法，到一次实践。</p>
      </div>
      {projects.length ? (
        <div className="grid gap-6 sm:gap-8">
          {projects.map((project, index) => <ProjectCard key={project.id} project={project} priority={index === 0} />)}
        </div>
      ) : <p className="py-4 leading-7 text-muted">代表作品正在整理中，之后会在这里分享。</p>}
    </section>
  );
}
