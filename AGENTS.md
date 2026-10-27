# 发布候选副本工作规则

- 需求与技术依据见 `docs/PRD.md`、`docs/TECH_DESIGN.md`；实际进展见 `docs/实战记录.md`，检查结果见 `docs/验证记录.md`。这些是经整理的仓库版本，不是全量原始资料。
- 当前首版已确认只展示一个真实 MMC 项目，不按早期的多个精选项目设想编造内容；公开名称仅使用“双非电源仔”。
- 本轮新增的开发文档仅用于仓库阅读，不导入页面、不复制进 `public/`，不得重新带入私人路径、身份资料或未审核的图片。

- 当前是独立发布仓库，已建立干净 Git 历史。用户已将仓库设为 Public，并授权本次配置和发布 GitHub Pages；不连接 Vercel。后续提交/发布按用户当次授权执行。
- React + TypeScript + Vite + Tailwind CSS + React Router Framework Mode；保持ssr:false及公开页面预渲染。
- 保持白色主体、绿色点缀、既有作品与布局；公开名称仅用已确认的昵称。
- 不编造作品、链接或个人资料。工具/分享允许空内容。
- 所有public资源可被公开下载；图片中尚未确认的信息必须完成用户审核后才能首次提交。
- 原开发仓库继续作为内容开发来源；这里只做审核后的同步和发布适配。同步先比较差异，保留本副本的配置与通用隐私检查。
- 测试夹具仅供隔离开发，不能进入生产产物；不删除隔离与隐私检查来通过构建。
- 私有检查词表留在仓库之外，通过PORTFOLIO_PRIVATE_TERMS_FILE按需指定；不复制其内容或路径到代码/README。
- 以npm ci安装锁定依赖；检查类型、lint、内容、隐私、静态构建与实际浏览器。
- 当前采用 GitHub Pages + 手动 GitHub Actions，main 为发布分支，Node.js 24、npm ci、build/client 为公开产物；保留普通静态预渲染，不引入服务端。旧 vercel.json 不参与当前部署。
- 真实站点地址为 https://xuxu312.github.io/shuangfei-portfolio/；构建时通过 PORTFOLIO_SITE_URL 提供，统一处理路由和图片前缀。继续保留 noindex，开放收录须另行确认；noindex 不提供访问保护。
- 部署配置、账号、上传、公开范围、付费及Git提交身份由用户按阶段确认；报告通过/失败/未验证。
