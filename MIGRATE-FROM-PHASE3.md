# 从 Phase 3 升级到 Production Pack

你已经成功运行 Phase 3，因此这次不是重新搭项目，而是把 Phase 4-8 文件覆盖进去。

## 最稳妥方式

1. 备份当前 `C:\Users\95228\aurora-blog`。
2. 解压本包到一个新目录，例如 `C:\Users\95228\aurora-blog-production`。
3. 把你在 Phase 3 中已经修改过的文章和图片复制到新项目：
   - `src/content/blog/`
   - `public/`
4. 把 `.env` 重新复制过来：

```cmd
copy C:\Users\95228\aurora-blog\.env C:\Users\95228\aurora-blog-production\.env
```

5. 安装并启动：

```cmd
cd C:\Users\95228\aurora-blog-production
npm install
npm run dev
```

## 如果你想直接覆盖原目录

先关闭 dev server，再解压覆盖。`node_modules` 可以继续保留。

## 你的文章不会被项目代码覆盖

只要先备份 `src/content/blog/`，再覆盖即可。

## 这次新增的内容

```text
src/data/notes/
src/data/links/
privacy page
Docker Compose
Caddy example
production GitHub Actions
GitHub Pages deployment workflow
security.txt
site.webmanifest
_headers
```
