# 粤BA · 广东省城市篮球联赛官方网站

> 一战城名 · 粤战粤勇 —— Guangdong Urban Basketball League

一个为 **广东省篮球协会运营的「粤BA」广东省城市篮球联赛** 打造的公益性质官方网站。覆盖赛程、积分榜、球员数据、票务、全明星票选、商城等完整功能，采用「大气如 CBA 官网」的红色主视觉，并以木棉、镬耳墙、回纹、满洲窗等岭南文化元素点缀。

---

## ✨ 项目亮点（工程能力展示）

- **数据驱动架构**：积分榜、效率榜、榜单等均由 `src/lib/` 内的纯函数**从赛果数据实时计算**，改一处数据即可全站联动，无需手动维护。
- **前端工程化**：React 18 + Vite 5，路由级代码分割（`React.lazy`）+ 手动分包（echarts / vendor 独立 chunk）。
- **数据可视化**：ECharts 5 柱状图、散点图、雷达图，含 ResizeObserver 自适应缩放。
- **中英双语 i18n**：文案集中管理于 `I18nContext`，语言偏好持久化到 localStorage。
- **设计系统**：CSS 变量（design tokens）+ 组件化岭南纹样（SVG），响应式布局 + 微动效。
- **确定性数据生成**：122 场比赛（100 常规赛 + 22 季后赛）由 Node 脚本基于种子随机生成，保证数据自洽、可复现。

---

## 🧭 页面结构

| 路由 | 页面 | 说明 |
| --- | --- | --- |
| `/` | 首页 | Hero、公告滚动、全明星倒计时、积分榜快照、得分领跑、资讯、21 城风采、合作伙伴 |
| `/news` · `/news/:id` | 资讯中心 / 详情 | 分类筛选、置顶、相关推荐 |
| `/schedule` | 赛程与赛果 | 日历 / 列表双视图、阶段筛选、球队筛选 |
| `/standings` | 积分榜 | 东/西区完整积分榜 + 季后赛对阵图（含黄金九分、三局两胜） |
| `/teams` · `/teams/:id` | 球队 / 详情 | 分区筛选、赛季数据、球员名单、近期赛果、荣誉 |
| `/players` · `/players/:id` | 球员 / 详情 | 搜索筛选、能力雷达图、投篮热区、荣誉 |
| `/stats` | 数据看板 | 五大榜单 + ECharts 图表 + 球队效率榜 |
| `/tickets` | 票务中心 | 场次选择、互动选座、微信小程序购票引导 |
| `/community` | 互动社区 | 全明星票选、胜负竞猜、球迷评论 |
| `/store` | 官方商城 | 分类筛选、购物车（localStorage 持久化） |
| `/about` / `/login` / `/register` | 关于 / 登录 / 注册 | 品牌与文化、表单页 |

---

## 🛠 技术栈

- **框架**：React 18 · React Router v6
- **构建**：Vite 5（`base: './'`，适配 GitHub Pages 子路径）
- **图表**：ECharts 5
- **样式**：纯 CSS（CSS 变量设计系统，无 UI 框架依赖）

---

## 📁 数据架构

```
src/
├── data/            # 数据层（JSON 风格的 JS 模块）
│   ├── teams.js     # 21 支城市球队档案
│   ├── players.js   # 约 126 名球员（真实核心球员 + 示例阵容）
│   ├── matches.js   # 122 场比赛（赛程 + 比分）
│   ├── playoffs.js  # 季后赛对阵图
│   ├── news.js      # 资讯（16 篇）
│   ├── store.js     # 商城商品（12 件）
│   └── announcements.js
├── lib/             # 计算层（纯函数，数据驱动）
│   ├── standings.js # 积分榜计算（胜 2 分 / 负 1 分，胜率→净胜分→总得分）
│   ├── stats.js     # 榜单 / 效率值 / 单场最高
│   └── format.js    # 日期 / 身高 / 位置 等格式化
├── components/      # 可复用组件 + 岭南纹样 SVG
├── context/         # I18nContext（中英双语）
├── pages/           # 16 个页面（懒加载）
└── styles/          # global.css（设计系统）
```

**积分榜是「活」的**：`computeStandings()` 读取 `matches.js` 的赛果，自动算出胜/负、胜率、净胜分、积分、连胜/连败并排序。因此每周更新赛果时，积分榜、效率榜、领跑榜会**同步自动刷新**。

---

## 🚀 本地开发

```bash
npm install
npm run dev        # 启动开发服务器
npm run build      # 构建生产版本到 dist/
npm run preview    # 本地预览构建产物
```

---

## 🔄 每周更新指南（与数据同步）

所有可更新的内容都在 `src/data/` 下，改完保存即生效：

1. **更新比分**：在 `src/data/matches.js` 找到对应场次，改 `homeScore` / `awayScore` / `status`。
2. **新增资讯**：在 `src/data/news.js` 数组头部追加一条（含 `title` / `summary` / `body` / `category`）。
3. **更新球员数据**：在 `src/data/players.js` 修改对应球员 `stats`。
4. **更新公告 / 商品**：对应 `announcements.js` / `store.js`。

> 积分榜、榜单、效率值等**无需手动改**，会自动依据 `matches.js` 与 `players.js` 重算。

---

## 🌐 部署到 GitHub Pages

```bash
# 1. 在 GitHub 新建仓库并关联（首次）
git init
git remote add origin https://github.com/<你的用户名>/yueba-website.git

# 2. 一键构建并发布（gh-pages 分支）
npm run deploy
```

然后在仓库 **Settings → Pages** 中将 source 设为 `gh-pages` 分支。因站点使用 **HashRouter**，无需服务端重写即可支持刷新与子路由直达。

---

## 🎨 设计语言

- **主色**：中国红 `#c8102e` · 岭南金 `#e2b44a` · 墨色 `#141417` · 满洲窗青 `#2f6b5b`
- **岭南元素**：木棉（Kapok）、镬耳墙（Roofline）、回纹（Meander）、满洲窗（ManchuriaWindow）
- **字体**：系统无衬线 + 宋体（文化副标题）+ 等宽数字（数据）

---

*本项目为公益性质的信息展示平台，与广东省篮球协会无商业关联。*
