import { useEffect, useState } from "react";
import type { ContactContent } from "../types/content";

export function Contact({ content }: { content: ContactContent }) {
  const [interactive, setInteractive] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  useEffect(() => setInteractive(true), []);

  async function copyNickname() {
    try {
      await navigator.clipboard.writeText(content.nickname);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-6 border-t border-line pt-9 pb-12 sm:pt-12 sm:pb-16 md:grid md:grid-cols-[1fr_2fr] md:gap-12">
      <h2 id="contact-title" className="detail-heading">交流与联系</h2>
      <div className="mt-5 max-w-2xl md:mt-0">
        <p className="leading-8 text-muted">欢迎交流项目、学习与创作。可以在{content.platform}搜索我的昵称。</p>
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 rounded-xl border border-line bg-surface p-5">
          <div className="min-w-0 flex-1">
            <p className="text-sm leading-6 text-muted">{content.platform}</p>
            <p className="mt-1 select-text text-xl leading-8 font-medium">{content.nickname}</p>
          </div>
          {interactive && (
            <button type="button" className="min-h-11 shrink-0 cursor-pointer rounded-lg border border-accent px-4 text-sm font-medium text-accent hover:bg-page" onClick={copyNickname}>
              {copyState === "copied" ? "已复制昵称" : "复制昵称"}
            </button>
          )}
        </div>
        <p aria-live="polite" role="status" className="mt-3 min-h-6 text-sm leading-6 text-muted">
          {copyState === "copied" ? `已复制“${content.nickname}”，可以粘贴到${content.platform}搜索。` : copyState === "failed" ? "复制未成功，请选中或长按昵称手动复制。" : "也可以选中或长按昵称，手动复制。"}
        </p>
      </div>
    </section>
  );
}
