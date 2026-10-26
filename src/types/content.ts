export interface IntroContent {
  name: string;
  greeting: string;
  description: string;
}

export interface NavigationItem {
  label: string;
  anchor: string;
}

export interface AboutContent {
  paragraphs: string[];
}

export interface ContactContent {
  platform: string;
  nickname: string;
}

export interface ProjectCardContent {
  id: string;
  title: string;
  summary: string;
  category: string;
  tags: string[];
  notice?: string;
  cover: string;
  coverAlt: string;
  coverWidth: number;
  coverHeight: number;
  href: string;
  linkLabel: string;
}

export interface Project extends Omit<ProjectCardContent, "href" | "linkLabel"> {
  slug: string;
  // 草稿仅供隔离测试/本地资料使用，正式项目数组只允许 public。
  visibility: "public" | "draft";
  featured: boolean;
  order: number;
  areas: ("projects" | "tools")[];
  status: string;
  fullTitle: string;
  overview: string;
  coverCaption?: string;
  evidenceHeading?: string;
  contributions: { title: string; description: string }[];
  facts: { label: string; value: string }[];
  evidence: {
    title: string;
    src: string;
    alt: string;
    width: number;
    height: number;
    caption: string;
  }[];
  overviewImage?: { src: string; width: number; height: number; alt: string };
  links?: { label: string; url: string }[];
}

export interface ToolCardContent extends ProjectCardContent {
  status: string;
}

export interface Share {
  id: string;
  title: string;
  summary: string;
  platform: string;
  url: string;
  cover?: { src: string; alt: string; width: number; height: number };
  relatedProjectId?: string;
  notice?: string;
}
