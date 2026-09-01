# Aurora Blog：生产部署与运维手册

这份项目默认采用“静态博客 + 动态附加服务”的架构。Astro 负责预渲染页面，Pagefind 在构建阶段生成搜索索引；评论、统计是独立服务。这样博客正文不依赖数据库，迁移和恢复都很简单。

Astro 官方的 Content Loader 支持本地 `glob()` 加载 Markdown/MDX；官方 Sitemap 集成在构建时生成站点地图。citeturn925528search0turn925528search3

## 1. 本地开发

### Windows CMD

```cmd
cd C:\Users\95228\aurora-blog
copy .env.example .env
npm install
npm run dev
```

### Windows PowerShell

```powershell
Copy-Item .env.example .env
npm install
npm run dev
```

生产构建：

```cmd
npm run check
npm run build
npm run preview
```

## 2. 正式发布前配置

编辑 `.env`：

```text
PUBLIC_SITE_URL=https://example.com
PUBLIC_AUTHOR_NAME=你的名字
PUBLIC_TWIKOO_ENV_ID=https://comments.example.com
PUBLIC_TWIKOO_CDN=https://cdn.jsdelivr.net/npm/twikoo@1.7.20/dist/twikoo.min.js
PUBLIC_UMAMI_WEBSITE_ID=你的-umami-site-id
PUBLIC_UMAMI_SRC=https://analytics.example.com/script.js
```

不要把数据库密码、SSH 私钥等秘密变量写入 `.env` 后再提交 Git。生产环境优先放在平台的 Secret / Environment Variables 中。

## 3. GitHub

建议仓库结构：

```text
main
├── src/content/blog
├── src/data/notes
├── src/data/links
├── public
└── .github/workflows
```

第一次提交：

```cmd
git init
git add .
git commit -m "chore: initial Aurora Blog"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

## 4. CI/CD

仓库内的 `production.yml` 会在 PR/main 上执行 `npm install`、`npm run check`、`npm run build`，并上传 `dist/` artifact。

如果使用 GitHub Pages，可以启用 `deploy-github-pages.yml`。Astro 官方维护 `withastro/action`，这是 GitHub Pages 的推荐部署方式；官方 Action 会读取 lockfile 来判断包管理器。citeturn485110search0turn485110search6

GitHub Pages 需要在 Settings → Pages 中选择 GitHub Actions。

## 5. EdgeOne

如果你的目标是中国大陆和海外都获得较好的边缘访问速度，推荐把静态站点部署到 EdgeOne Pages / 对应静态托管，并把图片放在 COS/S3 兼容对象存储，再通过 CDN 加速。

EdgeOne 当前提供 GitHub 仓库部署入口和一键部署按钮机制；仓库 README 也可以加入官方部署按钮。citeturn925528search8

推荐生产流程：

```text
GitHub push
   ↓
EdgeOne Pages build
   ↓
Astro build
   ↓
Pagefind build
   ↓
Edge cache
```

在 EdgeOne 控制台创建项目后：

- 构建命令：`npm run build`
- 输出目录：`dist`
- Node：22.12+
- Git 仓库：你的 GitHub repo

> 不要在源码里硬编码生产域名，使用 `PUBLIC_SITE_URL`，这样预览环境和正式环境可以复用同一套代码。

## 6. 图片存储

推荐：

```text
本地原图
  ↓
压缩 / WebP / AVIF
  ↓
COS / S3
  ↓
img.example.com
  ↓
CDN
```

文章 Markdown 只保存 URL，不把海量原图塞进 Git 仓库。

命名建议：

```text
2026/09/astro-blog-cover.webp
2026/09/travel-01.webp
```

长期缓存的资源建议使用带版本号或内容哈希的文件名。

## 7. Twikoo

Twikoo 前端需要和后端/云函数保持兼容版本。官方文档说明它由前端与云函数两部分组成；非腾讯云开发场景可以使用精简的 `twikoo.min.js`。citeturn925528search5turn667182search6

本站通过：

```text
PUBLIC_TWIKOO_ENV_ID
PUBLIC_TWIKOO_CDN
```

控制是否启用评论。

不配置 `PUBLIC_TWIKOO_ENV_ID` 时，文章页面不会加载评论脚本。

## 8. Umami

Umami 官方提供 Docker / Docker Compose + PostgreSQL 的自托管方式。当前项目的 `docker/docker-compose.yml` 已经准备好这一结构。citeturn667182search0turn667182search1

进入 `docker/`：

```bash
docker compose up -d
```

生产环境请修改：

```text
UMAMI_DB_PASSWORD
UMAMI_APP_SECRET
```

不要使用示例里的默认值。

然后反向代理：

```text
analytics.example.com → 127.0.0.1:3000
```

项目提供了 `docker/Caddyfile.example`。

## 9. 数据库备份

Umami 的重要数据在 PostgreSQL。

每天至少做一次：

```bash
pg_dump -Fc -h 127.0.0.1 -U umami -d umami > umami-$(date +%F).dump
```

把 dump 上传到另一份对象存储，保留至少 7～30 天。

> 评论数据库的备份方式取决于你实际部署的 Twikoo 后端和存储类型，请按实际后端的数据导出方案执行。

## 10. HTTPS / DNS

推荐：

```text
example.com        → 主站
www.example.com    → 301 到主站
img.example.com    → 图片 CDN
analytics.example.com → Umami
comments.example.com  → Twikoo
```

只保留一个 canonical 域名。

## 11. 安全

静态站点侧已经放置了 `_headers` 示例，建议至少开启：

```text
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy
Strict-Transport-Security
```

动态服务器：

- SSH 使用密钥
- 禁止密码登录
- 不让 PostgreSQL 暴露公网
- Docker 服务只绑定 localhost / 内网
- 通过 Caddy / Nginx 提供 HTTPS
- 评论服务增加限流与垃圾评论防护

## 12. 监控

最低配：

```text
Uptime Kuma
   ↓
https://example.com
https://comments.example.com
https://analytics.example.com
```

同时建议监控证书、DNS 和 HTTP 状态。

## 13. 发布流程

日常写作：

```text
Obsidian
  ↓
Markdown
  ↓
git add .
git commit -m "post: ..."
git push
  ↓
GitHub Actions / EdgeOne
  ↓
生产
```

每次发文前最好执行：

```cmd
npm run check
npm run build
```

## 14. SEO 上线清单

- `PUBLIC_SITE_URL` 正确
- `/sitemap-index.xml` 可以访问
- `/robots.txt` 可以访问
- RSS 可以访问
- 每篇文章有唯一 canonical
- 每篇文章有 title / description
- 文章有 Open Graph metadata
- 站点有 WebSite JSON-LD
- Google Search Console / Bing Webmaster / 百度站长平台按需提交 sitemap

## 15. 内容迁移

从 WordPress / Hexo / Hugo 迁移时，目标格式统一为：

```text
src/content/blog/*.md
```

只要 frontmatter 符合 schema，正文无需进入数据库。

## 16. 恢复

最关键的恢复材料：

```text
GitHub 仓库
COS/S3 图片
评论数据备份
Umami 数据库备份
.env 中的非敏感配置
```

新机器只需：

```cmd
npm install
npm run build
```

然后重新部署 `dist/`。

## 17. 当前推荐架构

```text
                       ┌─────────────────┐
                       │     GitHub      │
                       │ Code + Content  │
                       └───────┬─────────┘
                               │
                          Actions / Build
                               │
                               ▼
                       ┌─────────────────┐
                       │      Astro      │
                       │ Static HTML/CSS │
                       │ Markdown / MDX   │
                       └───────┬─────────┘
                               │
                         Pagefind index
                               │
                               ▼
                    ┌─────────────────────┐
                    │ EdgeOne / CDN / GH  │
                    └──────────┬──────────┘
                               │
                              用户

        ┌───────────────┬───────────────┬───────────────┐
        ▼               ▼               ▼
      COS/S3          Twikoo          Umami
      图片             评论             统计
                                       │
                                   PostgreSQL
```
