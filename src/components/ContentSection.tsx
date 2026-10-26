import type { ReactNode } from "react";

export function ContentSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-6 border-t border-line py-8 sm:py-10 md:grid md:grid-cols-[1fr_2fr] md:gap-12">
      <h2 id={`${id}-title`} className="detail-heading">{title}</h2>
      <div className="mt-4 min-w-0 md:mt-0">{children}</div>
    </section>
  );
}
