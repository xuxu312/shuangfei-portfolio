# 个人作品集网站 · personal-portfolio

以“双非电源仔”为公开名称的中文个人综合作品集。采用白色主体、绿色点缀，展示真实 MMC 实验平台、65W 准谐振反激电源与 240 W 半桥 LLC 电源作品，并保留工具和精选分享的扩展位置。

2026-10-26 已完成干净首次提交 `fc22ede7` 并推送 74 个审核文件。2026-10-27 用户将仓库改为 Public，授权配置 GitHub Pages，替代 Vercel 方案。现已完成首次上线及线上复测，详细结果见 [验证记录](docs/验证记录.md)。原始开发仓库与实验原图另行保留。

站点地址：[双非电源仔的作品集](https://xuxu312.github.io/shuangfei-portfolio/)。仓库源码和整理文档现为公开内容，网站仅发布构建产物；暂保留 noindex。

2026-11-07 已发布第二个真实作品：[65W 准谐振反激电源](https://xuxu312.github.io/shuangfei-portfolio/projects/ncp1342-flyback-power-supply/)。网站代码版本为 `789a958`，Pages 构建和部署成功；线上验证结果与保留事项见文档记录。

2026-11-10 用户已验收第三个作品“240 W 半桥 LLC 电源”的公开图片和本地网页，并授权本次 GitHub 推送及 Pages 发布。本批沿用现有布局，新增原理图、PCB、样机封面和实际波形；发布及线上复测结果见实战记录与验证记录。

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
- `public/`：基础 404 页面，以及已审核的 5 个 MMC、7 个反激、7 个 LLC 图片文件。
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

反激项目公开素材于 2026-11-07 经用户确认：V1/V2 样机对比封面、V2 实物、VDS 与电流实测波形、启动阶段记录及调试前后波形，共 6 张逻辑图片、7 个 WebP 文件。展示宽 560px、封面缩略宽 360px，保留降清晰度、水印及设备标识/采集时间的不透明遮挡；不上传原图、完整电路、工程文件或本地对照页。第一张新增波形已确认绿色为 VDS、蓝色为电流；启动记录不补写未经核对的通道或电压阈值。

LLC 项目公开素材于 2026-11-10 经用户确认：双面实物封面 560/360px、原理图与 PCB 900px、基础工作及软启动 A/B 波形 720px，共 7 个 WebP 文件。全部带“双非电源仔”水印；图纸文件信息及示波器设备/采集标识已作不透明遮挡。原图、无水印中间合图、内部测试报告、工程文件和审核资料不进入仓库。设计目标为 380–420 VDC 输入、24 V/10 A 输出，不能等同于全部性能已验收；软启动使用中性图注，暂不写未确认的配置值或定量改善结论。

不将build、测试输出、截图、环境文件、私有词表或开发仓库历史加入版本管理。公开源码仓库内容与公开网站产物是不同范围，GitHub私有也不自动保护部署网址。

后续更新：在开发仓库完成并验收，再按审核清单同步源码/数据/素材；逐文件复核差异，保留这里的发布配置；本地检查通过后由用户确认提交、推送与部署范围。
