import { writeFile, rm } from "node:fs/promises";
import process from "node:process";
import { log } from "node:console";
import { resolvePublication, publicationFiles } from "../src/lib/publication.ts";
import { projects } from "../src/data/projects.ts";
import { getProjectPaths } from "../src/lib/projects.ts";

const publication = resolvePublication(process.env.PORTFOLIO_TARGET, process.env.PORTFOLIO_SITE_URL);
const files = publicationFiles(publication, ["/", ...getProjectPaths(projects)]);
await writeFile("build/client/robots.txt", files.robots);
await rm("build/client/_headers", { force: true });
if (files.sitemap) await writeFile("build/client/sitemap.xml", files.sitemap);
else await rm("build/client/sitemap.xml", { force: true });
// 保留在 client 外：审核记录本身不是公开网站内容。
await writeFile("build/publication.json", JSON.stringify({ ...publication, indexing: "noindex", status: publication.origin ? "awaiting-upload-authorization" : "local-review-only" }, null, 2));
log(publication.origin ? "Release metadata prepared; upload remains a separate authorized action." : "Local review only: no confirmed site URL, canonical, absolute share image or sitemap.");
