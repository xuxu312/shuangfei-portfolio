// 封面、分享及放大入口统一使用已审核的公开版；响应式变体也只关联公开素材。
// 作品撤下时由 contentAssets 同步核对附件。
const variants: Record<string, readonly { src: string; width: number }[]> = {
  "/images/mmc/platform-public-680.webp": [
    { src: "/images/mmc/platform-public-400.webp", width: 400 },
    { src: "/images/mmc/platform-public-680.webp", width: 680 },
  ],
};

export function coverAssets(original: string): string[] {
  return (variants[original] ?? []).map((image) => image.src);
}

export function coverImage(original: string): { src: string; srcSet?: string } {
  const images = variants[original];
  if (!images?.length) return { src: original };
  return {
    src: images[images.length - 1].src,
    srcSet: images.map((image) => `${image.src} ${image.width}w`).join(", "),
  };
}
