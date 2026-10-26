import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { relative, resolve, sep } from "node:path";
import { resolvePublication } from "./src/lib/publication.ts";

const publication = resolvePublication(process.env.PORTFOLIO_TARGET, process.env.PORTFOLIO_SITE_URL);

export default defineConfig({
  define: { __PORTFOLIO_PUBLICATION__: JSON.stringify(publication) },
  plugins: [
    {
      name: "portfolio-static-preview",
      config: {
        order: "post",
        handler(_config, environment) {
          // 仅改变构建预览：未知地址不复用首页，避免200兜底及水合错误。
          if (environment.isPreview && process.env.IS_RR_BUILD_REQUEST !== "yes") {
            return { appType: "custom" };
          }
        },
      },
      configurePreviewServer(server) {
        // React Router预渲染也临时启动preview；该内部过程仍交给框架处理。
        if (process.env.IS_RR_BUILD_REQUEST === "yes") return;
        const root = resolve(server.config.root, server.config.build.outDir);
        const notFoundHtml = readFileSync(resolve(root, "404.html"));
        server.middlewares.use((request, _response, next) => {
          if (request.method !== "GET" && request.method !== "HEAD") return next();
          try {
            const url = new URL(request.url ?? "/", "http://localhost");
            const pathname = decodeURIComponent(url.pathname);
            const indexFile = resolve(root, `.${pathname}`, "index.html");
            const fromRoot = relative(root, indexFile);
            if (fromRoot !== ".." && !fromRoot.startsWith(`..${sep}`) && existsSync(indexFile)) {
              // 交给Vite提供文件，兼容目录地址、末尾斜杠和查询参数。
              request.url = `${url.pathname.replace(/\/$/, "")}/index.html${url.search}`;
            }
          } catch {
            // 无效编码不参与路径重写，由后面的404处理。
          }
          next();
        });
        return () => {
          // 已有静态文件先由Vite处理；这里只接收未匹配的请求。
          server.middlewares.use((request, response) => {
            const html = (request.method === "GET" || request.method === "HEAD")
              && request.headers.accept?.includes("text/html");
            response.statusCode = 404;
            response.setHeader("Content-Type", html ? "text/html; charset=utf-8" : "text/plain; charset=utf-8");
            response.setHeader("X-Content-Type-Options", "nosniff");
            response.end(request.method === "HEAD" ? undefined : html ? notFoundHtml : "Not Found");
          });
        };
      },
    },
    {
      name: "portfolio-fixture-build-guard",
      apply: "build",
      // Type generation resolves build config too; only reject actual builds.
      buildStart() {
        if (process.env.PORTFOLIO_FIXTURES === "1") {
          throw new Error("Build refused: disable PORTFOLIO_FIXTURES before building.");
        }
        execFileSync(process.execPath, ["scripts/validate-content.mjs"], { stdio: "pipe" });
      },
    },
    tailwindcss(),
    reactRouter(),
  ],
  publicDir: "public",
  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: true,
  },
  preview: {
    host: "127.0.0.1",
    port: 4173,
    strictPort: true,
  },
});
