# 个人作品集网站 · 技术设计

版本：仓库整理版，2026-10-26。以当前源码为依据，保留已采用的方案及关键取舍，不把早期建议目录当作现有实现。

## 1. 技术栈与取舍

| 技术 | 采用方式 | 原因 |
| --- | --- | --- |
| React + TypeScript | 页面和函数式组件，内容类型约束 | 组件复用，更新内容时及早发现数据问题 |
| Vite | 本地开发与构建 | 沿用教程基础和现有工程 |
| React Router Framework Mode | `ssr: false`，显式预渲染公开页面 | 详情可直达，初始 HTML 有正文和元信息 |
| Tailwind CSS | 响应式布局和样式 | 保持已确认的白绿视觉 |
| TypeScript 数据文件 | 项目、分享、个人信息 | 不建设数据库或后台，方便 Codex 更新 |
| Node.js 24.x、npm 锁文件 | `npm ci` 安装 | 保留当前验证过的依赖组合 |

未安装 Motion，也没有新增服务端运行或在线 AI 接口。准确依赖版本以 [package.json](../package.json) 和 [锁文件](../package-lock.json) 为准。

采用框架模式后使用 `root.tsx` 与路由模块，不另建教程普通 SPA 示例中的 `App.tsx`、`main.tsx`。静态站仍会在构建时执行预渲染，所以首次渲染不能直接依赖浏览器专有对象。

## 2. 当前目录

```text
src/
  components/       导航、介绍、卡片、详情、工具、分享、关于我与联系
  data/             projects.ts、shares.ts、site.ts
  lib/              内容校验、排序、路径、图片与发布元信息
  routes/           首页、详情和独立的开发测试路由
  styles/           共享样式
  types/            内容与预览类型
  root.tsx
  routes.ts
public/
  404.html
  images/mmc/       五个公开展示版图片文件
scripts/            构建、内容、发布与隐私检查
dev-fixtures/       开发测试专用数据与图片
docs/               仓库整理版开发过程文档
```

测试源文件可以随私有仓库保存以重现检查，但不进入网站。`docs/` 同样不作为网站资源。

## 3. 数据与路由

项目主记录位于 [projects.ts](../src/data/projects.ts)，类型定义在 [content.ts](../src/types/content.ts)。`visibility`、`featured`、`order` 和 `areas` 分别控制公开状态、首页精选、顺序及项目/工具展示位置。

- 公开作品按 `order` 升序排列，同值时按稳定标识排序。
- 首页选择公开、精选且属于作品区域的记录。
- 工具从同一份项目记录派生，避免两个栏目维护两份项目资料。
- 每个公开项目均生成 `/projects/{slug}/` 对应页面；取消精选不会删除详情。
- 当前真实详情为 `/projects/single-phase-five-level-mmc/`。
- 正式项目数组拒绝草稿；需要撤下内容时同时检查资源，不以“界面看不到”作为保密方式。
- 通用详情组件根据实际数据展示贡献、事实、证据和链接，缺少的可选部分不强制显示。

[react-router.config.ts](../react-router.config.ts) 从公开项目数据枚举预渲染地址。新增项目时不手写另一份页面地址列表。

## 4. 测试隔离

只有 `development` 模式与 `PORTFOLIO_FIXTURES=1` 同时成立，才注册开发测试路由。使用 `npm run dev:fixtures` 启动，脚本固定监听本机和测试端口；页面明确标识测试内容。

正式入口不导入测试资料。开发与生产分别生成类型；正式构建拒绝测试开关，扫描 HTML、脚本、数据与资源中的测试标记。隔离构建测试在临时目录验证多作品、撤下、空数据及草稿排除，不修改真实 MMC 数据。

## 5. 图片与公开资料

五张公开版 WebP 已代替旧高清地址，封面响应式资源、详情和放大入口保持一致。旧图片文件和原图入口由构建检查拦截。

公开图片已降分辨率、压缩、加水印，并在本地处理敏感区域。原始文件、私有处理词表、前后对照及未审核素材不在仓库内。后续处理仍须核对原图校验值，另存输出，再交用户审核。

通用隐私扫描检查源码和构建产物。用户专用词表通过环境变量 `PORTFOLIO_PRIVATE_TERMS_FILE` 指向仓库外文件；不把私人词条写成检查脚本中的字符串。扫描结果为零不能证明未定义的敏感内容全部不存在，图片仍需人工审核。

## 6. 构建与检查

| 命令 | 用途 |
| --- | --- |
| `npm ci` | 安装锁定依赖 |
| `npm run dev` | 正常开发预览 |
| `npm run dev:fixtures` | 开发测试预览 |
| `npm run lint` | 静态代码检查 |
| `npm run typecheck` | 生产模式类型检查 |
| `npm run typecheck:fixtures` | 开发测试类型检查 |
| `npm run test:content` | 数据、排序、路由与内容行为检查 |
| `npm run test:publication` | 发布地址和元信息逻辑检查 |
| `npm run test:privacy` | 隐私扫描规则的正反例检查 |
| `npm run test:build` | 独立临时目录中的隔离构建检查 |
| `npm run build` | 内容校验、生产类型、静态构建和产物检查 |
| `npm run check:privacy` | 源码和生产产物的隐私扫描 |
| `npm run preview` | 本地生产产物预览 |

公开产物只取 `build/client/`，不能只拿 HTML 而丢失页面数据、脚本或图片。依赖目录、构建缓存和测试输出不提交 Git。

## 7. 历史 Vercel 候选适配（未启用）

当前配置为普通静态网站候选：Framework Preset `Other`、Node.js `24.x`、安装 `npm ci`、构建 `npm run build`、输出 `build/client`。没有接入 Vercel 服务或新增平台依赖。

[vercel.json](../vercel.json) 声明尾斜杠、暂不收录的响应头和保守缓存；关闭 Git 自动部署，没有设置把所有未知地址返回首页的 200 重写。基础 `404.html` 仍需在真实托管环境验证状态码。

未确定正式网址时使用本地发布模式，不写假的 canonical、分享绝对地址或 sitemap。取得用户确认的真实 HTTPS 站点地址后，在相应环境设置 `PORTFOLIO_SITE_URL`，按 `npm run build:release` 生成并复核发布包；这一步不自动意味着授权上传或开放搜索收录。

本地预览不等于平台验证。生产分支、自动部署范围、Authentication 保护、线上 404、缓存、HTTPS 和分享预览，待账号与部署阶段分别核实。`public: false`、私有 GitHub 仓库或 `noindex` 都不代替平台访问控制的实际验证。

## 8. 更新与恢复

保留原始开发仓库及其历史；当前发布副本未复制旧 `.git`，已在 2026-10-26 完成干净首次提交 `fc22ede7`。

后续由用户提供新作品与允许公开的材料，Codex 在原开发仓库完成实现和验收，再按明确文件清单同步此副本。同步前比较差异，保留这里的公开图片、隐私检查和发布配置，不能直接整目录覆盖。

更新数据后检查卡片、详情、稳定地址、元信息和预渲染是否同步。构建通过并审核公开范围后，按当次授权提交和推送。遇到问题先定位，恢复操作先保护未提交成果，不对原仓库执行破坏性回滚。

## 9. GitHub Pages 适配（2026-10-27）

用户已将仓库设为 Public 并授权本次发布，当前采用 GitHub Actions 手动构建与部署，main 为唯一允许的发布分支。Pages 已启用且强制 HTTPS，站点地址是 `https://xuxu312.github.io/shuangfei-portfolio/`。

- `PORTFOLIO_SITE_URL` 的受校验路径同时用于 Vite base、Router basename、原生链接/图片和绝对元信息。Router Link 继续使用站点内地址，由框架加前缀，防止重复。
- 当前 React Router 把 basename 写入 HTML 和导航数据的输出目录；构建收尾仅移动已知预渲染文件到 `build/client` 根，避免 Pages 再挂载一次目录。保留完整内容断言，不用空 SPA 首页代替静态正文。
- 独立 404 的首页链接在构建时加前缀；不存在的地址由平台返回 404，不做全站 200 重写。
- 工作流使用 Node.js 24 和锁文件安装，运行本地同类检查，只上传静态产物。未添加依赖或服务端功能；公开图片、内容数据和样式不变。
- 普通根路径开发仍使用 local 模式。测试资料、原图和文档不进入生产产物。页面保留 noindex；Pages 不执行 Vercel 响应头配置。

Linux 云端构建、真实 HTTPS 页面与线上 404 的最终结果见验证记录。第三方分享平台的实际卡片展示、手机真机与跨网络访问仍需分别验收。
