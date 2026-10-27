import { sitePath } from "../lib/publication";
import type { NavigationItem } from "../types/content";

interface HeaderProps {
  name: string;
  homePath?: string;
  navigation?: NavigationItem[];
}

export function Header({ name, homePath = "", navigation = [{ label: "作品", anchor: "projects" }, { label: "简介", anchor: "intro" }] }: HeaderProps) {
  return (
    <header className="page-shell">
      <div className="flex min-h-22 flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-line py-4 sm:min-h-24">
        <a
          className="inline-flex min-h-11 items-center gap-3 text-lg font-semibold tracking-tight"
          href={`${sitePath(homePath)}#intro`}
          aria-label={`${name}，返回简介`}
        >
          <span aria-hidden="true" className="brand-mark" />
          {name}
        </a>
        <nav aria-label="主导航" className="flex flex-wrap items-center gap-x-3 gap-y-1 sm:gap-x-8">
          {navigation.map((item) => <a key={item.anchor} className="nav-link" href={`${sitePath(homePath)}#${item.anchor}`}>{item.label}</a>)}
        </nav>
      </div>
    </header>
  );
}
