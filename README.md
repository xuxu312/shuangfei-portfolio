# 个人作品集网站 · personal-portfolio

以“双非电源仔”为公开名称的中文个人综合作品集。采用白色主体、绿色点缀，展示真实 MMC 工程作品，并保留工具和精选分享的扩展位置。

2026-10-26 已完成干净首次提交 `fc22ede7` 并推送 74 个审核文件。2026-10-27 用户将仓库改为 Public，授权配置 GitHub Pages，替代 Vercel 方案。本次先完成发布适配和本地检查，实际线上结果见 [验证记录](docs/验证记录.md)。原始开发仓库与实验原图另行保留。

站点地址：[双非电源仔的作品集](https://xuxu312.github.io/shuangfei-portfolio/)。仓库源码和整理文档现为公开内容，网站仅发布构建产物；暂保留 noindex。

## 开发过程文档

这些是适合随源码保存的仓库整理版，保留需求、决策、实际操作、返工和验证结论；不包含原始聊天、私人文件路径、内部附件或全量测试截图。完整原始记录继续留在本地。

| 文档 | 用途 |
| --- | --- |
| [文档导航与当前状态](docs/README.md) | 阅读顺序、整理边界、尚未完成的事项 |
| [需求研究](docs/RESEARCH.md) | 目标、参考案例与调研发现 |
| [产品需求](docs/PRD.md) | 已确认范围、验收标准与未来设想 |
| [技术设计](docs/TECH_DESIGN.md) | 实际架构、数据管理、构建与发布方案 |
| [开发指令](AGENTS.md) | 继续开发时的约束 |
| [实战记录与复盘](docs/实战记录.md) | 五步开发过程、问题处理与经验 |
| [开发流程对照表](docs/开发流程对照表.md) | 教程建议与实际做法的差异 |
| [验证记录](docs/验证记录.md) | 历史证据摘要、本轮检查与未验证事项 |

## 源码范围

- `src/`：页面、组件、公开内容与数据校验逻辑。
- `public/`：基础 404 页面和五张已审核的 MMC 公开展示图片。
- `scripts/`、`dev-fixtures/`：内容、构建、隔离与隐私检查，以及明确标记的开发测试资料。
- 根目录配置、`package.json`、`package-lock.json`：依赖与可复现构建的必要文件。
- `docs/`：经过整理的开发过程文档；不复制到网站的公开目录。

GitHub 保存源码与文档；未来托管平台仅发布 `build/client/`。两者范围不同。`node_modules/`、构建产物、本地审核输出、实验原图、旧 Git 历史和环境文件均不在上传清单中。

## 本地运行

使用Node.js 24.x，依次运行npm ci、npm run build、npm run preview。开发预览使用npm run dev。

检查命令：npm run lint、npm run typecheck:fixtures、npm run test:content、npm run test:publication、npm run test:privacy、npm run test:build。

生产构建包含内容、类型、预渲染、元信息及通用隐私检查。npm run check:privacy扫描候选源码和构建产物；私有检查词表可通过PORTFOLIO_PRIVATE_TERMS_FILE指定仓库外文件。缺省不含用户专用词，不将通用扫描描述为完整秘密审计。

## GitHub Pages 发布与更新

- 工作流：[Publish portfolio to GitHub Pages](https://github.com/xuxu312/shuangfei-portfolio/actions/workflows/pages.yml)。仅手动触发，普通 push 不自动上线。
- 完成内容审核和本地检查，将批准的修改推送至 `main`；打开 Actions → 上述工作流 → Run workflow，选择 `main`。
- 工作流在 Linux 上使用 Node.js 24、`npm ci`，运行 lint、类型、内容、隐私、隔离构建检查，再生成静态预渲染页面，只上传 `build/client/`。成功后检查首页、详情直达、图片与未知地址。
- Pages 设置使用 GitHub Actions，生产分支限制为 `main`，HTTPS 已开启。没有付费服务或自定义域名。
- 本地检查 Pages 包：设置 `PORTFOLIO_SITE_URL=https://xuxu312.github.io/shuangfei-portfolio/`，运行 `npm run build:release`。预览同一产物时再设置 `PORTFOLIO_TARGET=release`，执行 `npm run preview`，打开终端显示的带仓库名前缀地址。
- 普通本地开发和根路径构建不设置这两个变量，仍使用 `npm run dev` 或 `npm run build`。
- 构建会同步 Router basename、资源前缀、canonical、分享图片、sitemap 和 404 返回链接。Pages 使用自己的缓存规则，不支持旧 `vercel.json` 的响应头设置。HTML 保留 noindex；不使用全站 200 首页兜底。
- 仅完整静态产物发布到 Pages，开发文档和隔离测试源码仍只属于源码仓库。图片仅使用审核过的公开版。
- 更新出错先定位并保护未提交内容。必要时把正常版本恢复为一个新提交，再手动发布；不改写旧历史，也不对原开发仓库强制回滚。

旧 `vercel.json` 留作历史候选配置，不影响 Pages；本次未连接 Vercel。

## 图片和后续提交边界

首次提交身份已确认并在本仓库局部配置为公开昵称与 GitHub noreply 邮箱。新文件仍须先审核公开范围。MMC图片现采用用户已审核的公开展示版：大图九处、小图四处水印，并已遮挡设备与窗口等敏感区域；本次用户已批准将现有公开版用于网站发布。新增图片仍须单独核对设备序列号、时间、文件名和窗口文字。

MMC公开素材共五个文件：实物照片680px/400px、波形480px、采样376px、总览1000px。封面、响应式图片、分享数据及放大入口统一指向公开版。原始素材留在开发仓库与仓库外本地备份，不得再复制进public；check:build会拦截旧图片地址或原图入口残留。

不将build、测试输出、截图、环境文件、私有词表或开发仓库历史加入版本管理。公开源码仓库内容与公开网站产物是不同范围，GitHub私有也不自动保护部署网址。

后续更新：在开发仓库完成并验收，再按审核清单同步源码/数据/素材；逐文件复核差异，保留这里的发布配置；本地检查通过后由用户确认提交、推送与部署范围。
