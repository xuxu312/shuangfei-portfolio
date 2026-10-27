import { copyFile, mkdir, readFile, writeFile, rm, stat, unlink, rmdir } from "node:fs/promises";
import { resolve, join, dirname } from "node:path";
import process from "node:process";
import { log } from "node:console";
import { resolvePublication, publicationFiles } from "../src/lib/publication.ts";
import { projects } from "../src/data/projects.ts";
import { getProjectPaths } from "../src/lib/projects.ts";

const publication = resolvePublication(process.env.PORTFOLIO_TARGET, process.env.PORTFOLIO_SITE_URL);
const routes = ["/", ...getProjectPaths(projects)];
const files = publicationFiles(publication, routes);
// 当前框架把 basename 写入预渲染目录；Pages 已将上传根目录挂载到该前缀。
// 将已知的 HTML / 导航数据移到产物根，避免网址需要重复两次仓库名。
if (publication.basePath !== "/") {
  const client = resolve("build/client");
  const nested = join(client, publication.basePath.slice(1));
  for (const route of routes) {
    for (const name of ["index.html", "_.data"]) {
      const source = join(nested, route.slice(1), name);
      if (name === "_.data" && !(await stat(source).catch(() => null))) continue;
      const destination = join(client, route.slice(1), name);
      await mkdir(dirname(destination), { recursive: true });
      await copyFile(source, destination);
      await unlink(source);
    }
  }
  // 仅移除上述已知生成路径留下的空目录；有其他文件时失败，不能递归清理未知内容。
  const emptyDirs = new Set();
  for (const route of routes) {
    for (let dir = resolve(nested, route.slice(1)); dir !== client; dir = dirname(dir)) emptyDirs.add(dir);
  }
  for (const dir of [...emptyDirs].sort((a, b) => b.length - a.length)) await rmdir(dir);
}
await writeFile("build/client/robots.txt", files.robots);
await rm("build/client/_headers", { force: true });
// 静态404由托管平台直接返回，不会经过 React Router；返回链接也必须带站点前缀。
const notFound = await readFile("public/404.html", "utf8");
await writeFile("build/client/404.html", notFound.replace('href="/"', `href="${publication.basePath}"`));
await writeFile("build/client/.nojekyll", "");
if (files.sitemap) await writeFile("build/client/sitemap.xml", files.sitemap);
else await rm("build/client/sitemap.xml", { force: true });
// 保留在 client 外：审核记录本身不是公开网站内容。
await writeFile("build/publication.json", JSON.stringify({ ...publication, indexing: "noindex", status: publication.origin ? "awaiting-upload-authorization" : "local-review-only" }, null, 2));
log(publication.origin ? "Release metadata prepared; upload remains a separate authorized action." : "Local review only: no confirmed site URL, canonical, absolute share image or sitemap.");
