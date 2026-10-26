import type { AboutContent } from "../types/content";

export function About({ content }: { content: AboutContent }) {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-6 border-t border-line py-9 sm:py-12 md:grid md:grid-cols-[1fr_2fr] md:gap-12">
      <h2 id="about-title" className="detail-heading">关于我</h2>
      <div className="mt-5 max-w-2xl space-y-3 text-base leading-8 text-muted md:mt-0">
        {content.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
    </section>
  );
}
