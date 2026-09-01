---
title: "用 Astro + Markdown 建立长期写作工作流"
description: "从 Obsidian 到 GitHub，再到自动部署，建立一个不依赖 CMS 的写作流程。"
pubDate: 2026-08-20
category: "技术"
tags:
  - Astro
  - Obsidian
  - GitHub
  - Markdown
featured: false
draft: false
toc: true
comments: true
---

一个舒服的博客工作流应该让“写作”成为最短路径。

## 推荐工作流

```text
Obsidian
  ↓
Markdown
  ↓
Git
  ↓
GitHub
  ↓
GitHub Actions
  ↓
Astro Build
  ↓
CDN
```

## 写作时不要关心部署细节

你只需要写文章、保存文件、提交 Git。剩下的交给 CI/CD。

## 图片单独存储

文章里的大图片适合进入对象存储，而不是直接堆进 Git 仓库。这样可以独立做压缩、缓存和 CDN。
