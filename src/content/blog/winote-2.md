---
title: 测试视频（WiNote 开发进度）
description: 无
pubDate: 2026-09-10
updatedDate: 2026-09-10
category: 技术
tags:
  - Astro
  - Obsidian
  - 博客
featured: true
draft: false
toc: true
comments: true
---
我最近都在跟WiNote（Wi wi 的Key note替代品）的开发搏斗中，都快要没时间管Wiwi.Blog 啦！来跟大家分享一下进度。

目前最基本的东西──文字、插图、背景、划线、形状、框框──差不多都有了，而且还做了许多连Keynote 都做不出来的动画和摄影机缩放功能。我个人是觉得，目前版本的动画功能已经比Keynote 还要酷了！

另一个大进展是删掉了肥大的依赖。原本WiNote 是依赖另一个叫做HyperFrames的专案来输出影片，但后来我发现HyperFrames 自己也只是依赖另一个输出影擎Puppeteer而已。所以，我把WiNote 直接接到Puppeteer上面，把HyperFrames 整个拿掉，现在预览速度比之前快了大概十倍吧！

以下是目前的WiNote 版本的小小Demo！先跟你们分享！

（以下影片的原始档只是一个.txt 纯文字档，制作过程没有使用其他动画或剪辑软体）
<video
  src="/media/videos/demo.mp4"
  controls
  playsinline
  preload="metadata">
</video>
当然，WiNote 现在的bug 还是超级多，语法也超级乱，除了我自己以外大概没有人会用，所以目前还无法跟大家见面。如果要让大众能用，可能还需要写许多范例、模板和说明文件等等的。

所以接下来，我打算先在柠檬卷的影片中少量试用，经过实战才能够发现更多问题。

最近觉得自己做自己的工具超爽的，有新的开发进度再跟大家分享！