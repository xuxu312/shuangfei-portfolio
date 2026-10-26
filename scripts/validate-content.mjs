import { readdir, stat } from "node:fs/promises";
import { resolve, relative, join } from "node:path";
import { pathToFileURL } from "node:url";
import { log } from "node:console";
import process from "node:process";
import { projects } from "../src/data/projects.ts";
import { shares } from "../src/data/shares.ts";
import { contentAssets, validateContent } from "../src/lib/validate-content.ts";

export async function validateProductionContent() {
  const errors = validateContent(projects, shares);
  const assets = new Set(contentAssets(projects, shares));
  const root = resolve("public");
  for (const path of assets) {
    // 错误路径交给字段校验，不读取 public 之外的文件。
    if (!/^\/images\/[\w/-]+\.[a-z]+$/.test(path)) continue;
    try { if (!(await stat(join(root, path))).isFile()) throw new Error(); }
    catch { errors.push(`图片缺失：${path}`); }
  }
  async function inspect(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const file = join(directory, entry.name);
      const path = `/${relative(root, file).replaceAll("\\", "/")}`;
      if (entry.isDirectory()) await inspect(file);
      else if (entry.isSymbolicLink() || (!assets.has(path) && path !== "/404.html")) errors.push(`未引用的公开附件：${path}；撤下作品时请移出 public，不能仅隐藏卡片`);
    }
  }
  await inspect(root);
  if (errors.length) throw new Error(`内容校验失败：\n${errors.join("\n")}`);
  return { projects: projects.length, shares: shares.length, assets: assets.size };
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  log("内容校验通过", await validateProductionContent());
}
