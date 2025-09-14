---
title: GitHub Pages部署指南：从零到一搭建个人博客
date: 2025-09-14 20:30:00
categories: 
  - 技术教程
tags:
  - GitHub-Pages
  - 部署
  - 博客搭建
  - Git
cover: /img/background.png
description: 详细介绍如何使用GitHub Pages部署个人博客，包括域名配置、自动化部署等实用技巧。
---

## 简介

GitHub Pages是GitHub提供的免费静态网站托管服务，非常适合用来部署个人博客、项目文档等静态网站。本文将详细介绍如何使用GitHub Pages部署博客。

## 准备工作

### 1. 创建GitHub仓库

首先需要在GitHub上创建一个新的仓库：

- 仓库名格式：`username.github.io`（其中username是你的GitHub用户名）
- 设置为Public仓库
- 初始化时可以添加README文件

### 2. 本地环境准备

确保本地已安装：
- Git
- Node.js（如果使用Hexo等静态网站生成器）

## 部署方式

### 方式一：直接推送静态文件

最简单的方式是直接将生成的静态文件推送到仓库的main分支：

```bash
# 克隆仓库
git clone https://github.com/username/username.github.io.git

# 进入目录
cd username.github.io

# 添加文件
echo "Hello World" > index.html

# 提交并推送
git add .
git commit -m "Initial commit"
git push origin main
```

### 方式二：使用gh-pages分支

对于使用静态网站生成器的项目，推荐使用gh-pages分支：

```bash
# 安装hexo-deployer-git
npm install hexo-deployer-git --save

# 配置_config.yml
deploy:
  type: git
  repo: https://github.com/username/username.github.io.git
  branch: gh-pages

# 部署
hexo deploy
```

## 自定义域名配置

### 1. 添加CNAME文件

在仓库根目录创建CNAME文件：

```
yourdomain.com
```

### 2. DNS配置

在域名服务商处配置DNS记录：

```
# A记录
@ 185.199.108.153
@ 185.199.109.153
@ 185.199.110.153
@ 185.199.111.153

# CNAME记录（可选）
www username.github.io
```

### 3. 启用HTTPS

在仓库Settings → Pages中：
- 选择正确的分支
- 勾选"Enforce HTTPS"

## 自动化部署

### GitHub Actions配置

创建`.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
        
    - name: Install dependencies
      run: npm install
      
    - name: Build
      run: npm run build
      
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./public
```

## 常见问题解决

### 1. 404错误

- 检查仓库名是否正确
- 确认分支设置是否正确
- 验证index.html文件是否存在

### 2. 自定义域名不生效

- 检查CNAME文件内容
- 验证DNS配置是否正确
- 等待DNS传播（可能需要24小时）

### 3. 样式文件加载失败

检查配置文件中的URL设置：

```yaml
# _config.yml
url: https://yourdomain.com
root: /
```

## 性能优化

### 1. 图片优化

- 使用WebP格式
- 压缩图片大小
- 使用CDN加速

### 2. 代码压缩

```bash
# 安装压缩插件
npm install hexo-html-minifier --save
npm install hexo-clean-css --save
npm install hexo-uglify --save
```

### 3. 缓存策略

在`_config.yml`中配置：

```yaml
# 静态文件缓存
static_prefix:
  enable: true
  prefix: /static
```

## 监控与分析

### 1. Google Analytics

添加跟踪代码到主题模板中：

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

### 2. 网站地图

生成并提交sitemap.xml：

```bash
# 安装sitemap插件
npm install hexo-generator-sitemap --save

# 配置_config.yml
sitemap:
  path: sitemap.xml
```

## 总结

GitHub Pages提供了一个简单、免费且可靠的静态网站托管解决方案。通过合理的配置和优化，可以搭建出性能优秀的个人博客。

关键要点：
- 选择合适的部署方式
- 正确配置自定义域名
- 使用自动化部署提高效率
- 持续优化网站性能

希望这份指南能帮助你成功部署自己的GitHub Pages博客！

---

*有任何问题欢迎在评论区讨论交流！*