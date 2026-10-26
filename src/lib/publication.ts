export type Publication = { target: "local" | "release"; origin: string | null };

// 发布地址必须显式提供；不把本机或示例域名写进可公开的产物。
export function resolvePublication(target = "local", address = ""): Publication {
  if (target !== "local" && target !== "release") throw new Error("PORTFOLIO_TARGET must be local or release.");
  if (target === "local") {
    if (address) throw new Error("A public URL requires PORTFOLIO_TARGET=release.");
    return { target, origin: null };
  }
  if (!address) throw new Error("Release refused: provide the confirmed PORTFOLIO_SITE_URL first.");
  let url: URL;
  try { url = new URL(address); } catch { throw new Error("Release refused: invalid HTTPS site URL."); }
  const host = url.hostname;
  if (url.protocol !== "https:" || url.username || url.password || url.port
    || url.pathname !== "/" || url.search || url.hash || address !== address.trim()
    || !host.includes(".") || host.includes(":") || host.includes("[") || /^[\d.]+$/.test(host)
    || /(^|\.)(localhost|local|internal|test|invalid|example)$/.test(host)
    || /(^|\.)example\.(com|net|org)$/.test(host)
    || /(placeholder|your-domain|your-project)/.test(host)) {
    throw new Error("Release refused: use a confirmed public HTTPS origin, without path, credentials or placeholders.");
  }
  return { target, origin: url.origin };
}

export function publicationFiles(publication: Publication, paths: readonly string[]) {
  // 允许抓取才能让搜索引擎读到 noindex；这不是访问控制。
  const robots = "User-agent: *\nAllow: /\n";
  const escapeXml = (text: string) => text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;");
  const sitemap = publication.origin
    ? '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
      + paths.map((path) => `  <url><loc>${escapeXml(new URL(path, publication.origin!).href)}</loc></url>`).join("\n")
      + "\n</urlset>\n"
    : null;
  // 试运行暂不在 robots 中推广 sitemap；真正开放收录须另行确认。
  return { robots, sitemap };
}
