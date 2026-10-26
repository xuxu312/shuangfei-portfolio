import type { IntroContent } from "../types/preview";

export function Hero({ intro }: { intro: IntroContent }) {
  return (
    <section id="intro" aria-labelledby="intro-title" className="scroll-mt-6 py-8 sm:py-10">
      <h1 id="intro-title" className="max-w-4xl text-[2rem] leading-[1.45] font-semibold tracking-tight sm:text-[2.75rem]">
        {intro.greeting}{intro.name}。
      </h1>
      <div className="mt-5 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end sm:gap-10">
        <p className="max-w-[37rem] text-base leading-[1.9] text-muted sm:text-lg">
          {intro.description}
        </p>
        <a href="#projects" className="primary-link shrink-0">
          查看作品
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 4v16m-6-6 6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  );
}
