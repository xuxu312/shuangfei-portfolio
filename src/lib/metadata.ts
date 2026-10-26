import { resolvePublication, type Publication } from "./publication.ts";

const publication = typeof __PORTFOLIO_PUBLICATION__ === "undefined" ? resolvePublication() : __PORTFOLIO_PUBLICATION__;

export function pageMetadata(title: string, description: string, image?: string, path?: string, settings: Publication = publication) {
  return [
    { title },
    { name: "description", content: description },
    { name: "robots", content: "noindex, nofollow" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    ...(settings.origin && path ? [
      { tagName: "link" as const, rel: "canonical", href: new URL(path, settings.origin).href },
      { property: "og:url", content: new URL(path, settings.origin).href },
    ] : []),
    ...(settings.origin && image ? [{ property: "og:image", content: new URL(image, settings.origin).href }] : []),
  ];
}
