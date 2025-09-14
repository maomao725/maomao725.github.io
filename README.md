# 重启纪元 - 个人博客

基于 Hexo + Butterfly 主题搭建的个人博客，使用 GitHub Actions 自动部署到 GitHub Pages。

## ✨ 特性

- 🎨 **美观现代**：使用 Butterfly 主题，界面简洁优雅
- 📱 **响应式设计**：完美适配各种设备
- ⚡ **快速加载**：优化的资源加载和CDN加速
- 🔍 **搜索功能**：支持本地搜索
- 🏷️ **分类标签**：完整的文章分类和标签系统
- 🌓 **深色模式**：支持明暗主题切换
- 📊 **SEO优化**：完善的SEO配置

## 🚀 快速开始

### 环境要求

- Node.js 18.x 或更高版本
- Git

### 本地开发

1. 克隆仓库
```bash
git clone https://github.com/maomao725/maomao725.github.io.git
cd maomao725.github.io
```

2. 安装依赖
```bash
npm install
```

3. 安装 Hexo CLI
```bash
npm install -g hexo-cli
```

4. 启动本地服务器
```bash
hexo server
```

访问 `http://localhost:4000` 预览博客。

### 写作

```bash
# 新建文章
hexo new post "文章标题"

# 新建页面
hexo new page "页面名称"

# 生成静态文件
hexo generate

# 清理缓存
hexo clean
```

## 📝 配置说明

### 基本配置

主要配置文件：
- `_config.yml` - Hexo 主配置文件
- `_config.butterfly.yml` - Butterfly 主题配置文件

### 部署配置

本博客使用 GitHub Actions 自动部署，配置文件位于 `.github/workflows/deploy.yml`。

推送到 `main` 分支后会自动触发部署流程：
1. 安装依赖
2. 生成静态文件
3. 部署到 `gh-pages` 分支

### 自定义域名

项目已配置自定义域名 `maomao725.top`，DNS解析配置：

1. 在域名解析中添加 CNAME 记录：
   - 记录类型：CNAME
   - 主机记录：@
   - 记录值：maomao725.github.io

## 🎨 主题定制

### 修改个人信息

编辑 `_config.butterfly.yml` 文件中的以下配置：

```yaml
# 头像
avatar:
  img: /img/avatar.jpg

# 社交链接
social:
  fab fa-github: https://github.com/maomao725 || Github
  fas fa-envelope: mailto:yejiale25@gmail || Email

# 作者信息
card_author:
  enable: true
  description: 自能生羽翼，何必仰云梯
```

### 添加图片资源

图片文件放置在 `source/img/` 目录下：
- `avatar.jpg` - 头像
- `favicon.png` - 网站图标
- `background.png` - 首页背景

## 📚 技术栈

- **静态站点生成器**: Hexo 6.3.0
- **主题**: Butterfly v4.12.0
- **部署平台**: GitHub Pages
- **CI/CD**: GitHub Actions
- **域名**: 腾讯云

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE)。

---

**座右铭**: 自能生羽翼，何必仰云梯

如果这个项目对你有帮助，请给个 ⭐️ 支持一下！