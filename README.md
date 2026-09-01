# Aurora Blog

一个面向长期运营的中文独立博客，基于 Astro + Markdown/MDX + Pagefind，默认静态输出，并为 Twikoo、Umami、COS/S3、EdgeOne、GitHub Actions 预留完整接入路径。

## 现在已经包含

- 首页、文章、分类、标签、归档
- 随记（Notes）与友情链接（Links）
- Markdown / MDX 内容工作流
- 新版 Astro Content Layer：`glob()` loader + schema
- 文章目录、阅读进度、相关推荐、上一篇/下一篇
- Pagefind 全文搜索
- RSS / Sitemap / robots.txt / Canonical
- Open Graph / Twitter Card / Article / WebSite JSON-LD
- 暗黑模式、响应式移动端、无障碍跳转链接
- Twikoo 评论（可选）
- Umami 统计（可选）
- GitHub Actions：检查、构建、产物上传、GitHub Pages 部署模板
- Docker Compose：Umami + PostgreSQL
- Caddy 反向代理示例
- 静态部署安全 Header 示例
- 完整部署与运维文档

## 本地启动（Windows CMD）

```cmd
copy .env.example .env
npm install
npm run dev
```

浏览器打开 `http://localhost:4321/`。

生产构建：

```cmd
npm run check
npm run build
npm run preview
```

注意：Pagefind 索引是在 `npm run build` 时生成的，因此开发模式下搜索框会提示“索引尚未生成”是正常现象。

## 文章

文章放在 `src/content/blog/`，例如：

```markdown
---
title: "我的新文章"
description: "文章摘要"
pubDate: 2026-09-02
updatedDate: 2026-09-02
category: "技术"
tags:
  - Astro
  - Web
featured: false
draft: false
toc: true
comments: true
---

正文……
```

## 随记与友情链接

随记放在 `src/data/notes/`，友情链接放在 `src/data/links/`。

## 环境变量

复制 `.env.example` 为 `.env`，至少设置：

```text
PUBLIC_SITE_URL=https://example.com
PUBLIC_AUTHOR_NAME=你的名字
```

评论：填写 `PUBLIC_TWIKOO_ENV_ID`。统计：填写 `PUBLIC_UMAMI_WEBSITE_ID` 与 `PUBLIC_UMAMI_SRC`。

## 推荐生产架构

```text
Obsidian / VS Code
        ↓
      GitHub
        ↓
 GitHub Actions
        ↓
   Astro build
        ↓
 Pagefind index
        ↓
EdgeOne / GitHub Pages / 其他静态 CDN
        ↓
      用户

Twikoo / Umami → 独立动态服务
COS / S3       → 图片存储
```

详细部署：见 [`DEPLOYMENT.md`](./DEPLOYMENT.md)。

### EdgeOne 部署按钮

仓库准备上线后，可以把以下官方按钮加入你的 README，并将仓库地址替换为自己的：

```md
[![使用 EdgeOne Makers 部署](https://cdnstatic.tencentcs.com/edgeone/pages/deploy.svg)](https://console.cloud.tencent.com/edgeone/makers/new?repository-url=https://github.com/<you>/<repo>)
```

EdgeOne 官方当前提供该 GitHub 仓库一键部署入口。citeturn925528search8
