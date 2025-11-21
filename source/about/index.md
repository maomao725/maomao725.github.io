---
title: 关于
date: 2025-09-14 17:30:00
type: about
comments: true
top_img: /img/background.png
---

<div class="about-header">
  <div class="bg-text-decoration bg-text-right">INFP</div>
  <div class="bg-text-decoration bg-text-left">DREAMER</div>
  
  <div class="infp-badge">INFP 调停者 🦋</div>
  <h1 class="about-title">你好，我是毛毛 👋</h1>
  <p class="about-subtitle">欢迎来到我的个人博客「重启纪元」！</p>
</div>

<div class="about-grid">
  <div class="about-card">
    <h2>🎯 个人信息</h2>
    <ul class="about-list">
      <li>🐦 <strong>姓名</strong>：毛毛（男）</li>
      <li>💻 <strong>教育经历</strong>：西南民族大学自动化专业本科在读</li>
      <li>🛣️ <strong>相关账号</strong>：<a href="https://maomao725.top">个人博客</a>、<a href="https://github.com/maomao725">Github</a></li>
      <li>🎯 <strong>期望职位</strong>：算法工程师</li>
      <li>💰 <strong>期望薪资</strong>：有奶茶就好了...</li>
      <li>💚 <strong>兴趣方向</strong>：技术学习、个人成长</li>
      <li>🏙️ <strong>期望城市</strong>：有住的地方</li>
    </ul>
  </div>

  <div class="about-card">
    <h2>🔧 技能清单</h2>
    <div class="skill-grid">
      <div class="skill-item">Python</div>
      <div class="skill-item">C++</div>
      <div class="skill-item">C语言</div>
      <div class="skill-item">Git</div>
      <div class="skill-item">Docker</div>
      <div class="skill-item">VS Code</div>
      <div class="skill-item">MySQL</div>
      <div class="skill-item">MongoDB</div>
      <div class="skill-item">Hexo</div>
      <div class="skill-item">Markdown</div>
      <div class="skill-item">LaTeX</div>
    </div>
  </div>
</div>

<div class="about-section">
  <h2>🌟 开源项目</h2>
  <div class="project-grid">
    <div class="project-card">
      <h3>个人博客</h3>
      <p>基于Hexo搭建的技术博客</p>
    </div>
    <div class="project-card">
      <h3>学习记录</h3>
      <p>记录技术学习过程中的心得和总结</p>
    </div>
    <div class="project-card">
      <h3>待补充...</h3>
      <p>更多精彩敬请期待</p>
    </div>
  </div>
</div>

<div class="about-section">
  <h2>📚 关于这个博客</h2>
  <p>在这里，我会分享：</p>
  <div class="feature-grid">
    <div class="feature-item">📝 <strong>技术文章</strong>：编程学习、项目实践、工具使用</div>
    <div class="feature-item">💭 <strong>学习笔记</strong>：读书心得、课程总结、知识整理</div>
    <div class="feature-item">🚀 <strong>实习就业</strong>：技能成长、实习情况、就业情况</div>
    <div class="feature-item">🌱 <strong>成长记录</strong>：学习感悟、思考总结、碎碎念~</div>
  </div>
</div>

<div class="contact-section">
  <h2>📞 联系方式</h2>
  <div class="contact-links">
    <a href="https://github.com/maomao725" class="contact-btn"><i class="fab fa-github"></i> GitHub</a>
    <a href="mailto:yejiale25@gmail.com" class="contact-btn"><i class="fas fa-envelope"></i> Email</a>
    <a href="https://maomao725.top" class="contact-btn"><i class="fas fa-globe"></i> 博客</a>
  </div>
</div>

<hr>

<div class="thanks-section">
  <h2>💝 致谢</h2>
  <p>感谢您花时间阅读我的简历，期待能有机会和您共事🎈</p>
  <p><strong>让我们一起在知识的海洋中扬帆起航！</strong> ⛵</p>
</div>

<style>
/* Inline styles for specific About page layout, complementing custom.css */
.about-header {
  text-align: center;
  margin-bottom: 60px;
  position: relative;
  padding: 40px 0;
}

.about-title {
  font-size: 3rem;
  font-weight: 900;
  margin: 20px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.about-subtitle {
  font-size: 1.2rem;
  color: var(--bokey-text-muted);
}

.about-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.about-card {
  background: var(--bokey-card-bg);
  padding: 30px;
  border-radius: 24px;
  border: var(--bokey-glass-border);
  box-shadow: var(--bokey-card-shadow);
}

.about-list {
  list-style: none;
  padding: 0;
}

.about-list li {
  margin-bottom: 12px;
  font-size: 1rem;
}

.project-grid, .feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.project-card, .feature-item {
  background: rgba(255, 255, 255, 0.5);
  padding: 20px;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.3);
  transition: transform 0.3s;
}

[data-theme="dark"] .project-card, 
[data-theme="dark"] .feature-item {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255,255,255,0.05);
}

.project-card:hover, .feature-item:hover {
  transform: translateY(-5px);
  background: var(--bokey-card-bg);
}

.contact-links {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 20px;
  flex-wrap: wrap;
}

.contact-btn {
  padding: 12px 24px;
  background: var(--bokey-accent);
  color: white !important;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
}

.contact-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.5);
}

.thanks-section {
  text-align: center;
  margin-top: 60px;
  padding: 40px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  border-radius: 24px;
}
</style>