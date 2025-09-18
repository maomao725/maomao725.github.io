# 项目记忆文件 - maomao725博客网站

## 项目概述
- **项目名称**: 重启纪元 - 毛毛的个人博客
- **技术栈**: Hexo + Butterfly主题
- **部署方式**: GitHub Pages (gh-pages分支)
- **访问地址**:
  - GitHub Pages: https://maomao725.github.io
  - 自定义域名: https://maomao725.top

## 项目结构
```
maomao725-blog-final/
├── source/          # Hexo源文件目录
│   ├── _posts/      # 博客文章markdown文件
│   ├── css/         # 自定义CSS样式
│   └── js/          # 自定义JavaScript
├── public/          # Hexo生成的静态文件（已忽略）
├── themes/          # 主题文件
├── _config.yml      # Hexo配置文件
├── _config.butterfly.yml  # Butterfly主题配置
└── package.json     # 项目依赖
```

## 重要命令
```bash
# 安装依赖
npm install

# 清理缓存
npx hexo clean

# 生成静态文件
npx hexo generate

# 本地预览
npx hexo server

# 部署流程
npx hexo clean && npx hexo generate
cp -r public/* .  # 复制生成的文件到根目录
git add -A
git commit -m "更新内容"
git push origin gh-pages
```

## 已实现的功能
1. **Hexo博客系统**: 基础博客功能
2. **Butterfly主题**: 美观的界面主题
3. **GitHub评论系统**: Utterances评论
4. **本站总字数统计**: 显示11.8k字（4篇文章）
5. **深色模式优化**: 文字颜色和对比度优化
6. **导航栏透明化**: 45%透明度+模糊效果
7. **Whimsical渐变背景**: 柔和的动态渐变背景
8. **打字机效果**: 标题动画
9. **运行时间统计**: 网站运行时长显示

## 自定义样式特点
- **导航栏**: 滚动时45%透明度，blur(25px)模糊效果
- **背景渐变**: 粉紫绿黄的柔和渐变，20秒动画循环
- **卡片样式**: 95%透明度的毛玻璃效果
- **深色模式**: 完整的深色主题适配

## 当前文章统计
- 文章数量: 4篇
- 总字数: 约3.4k字
- 分类: 技术教程(3)、生活感悟(1)
- 标签: 14个

## 常见问题处理
1. **修改样式后不生效**: 需要运行 `npx hexo clean && npx hexo generate`
2. **GitHub Pages 404错误**: 确保有.nojekyll文件，禁用Jekyll处理
3. **导航栏遮挡文字**: 调整css/custom.css中的透明度值
4. **背景渐变修改**: 编辑source/css/custom.css的body渐变色

## Git信息
- **仓库**: https://github.com/maomao725/maomao725.github.io
- **主要分支**: gh-pages（用于GitHub Pages部署）
- **提交历史**: 30+个提交

## 项目维护注意事项
1. 所有修改都需要在source/目录下进行
2. 修改后必须运行hexo generate重新生成
3. 生成的文件需要复制到根目录供GitHub Pages使用
4. 推送到gh-pages分支进行部署
5. CLAUDE.md文件已加入.gitignore，不会上传到GitHub

## 快速开始
- 项目位置: C:\Users\30382\Desktop\maomao725\maomao725-blog-final
- 常用修改: CSS样式优化、添加新功能、文章发布
- 注意事项: 总是先hexo generate，再复制文件，最后git push

---
最后更新: 2025-09-18