/**
 * 主题切换功能 - 亮色/暗色模式
 * 参考 bokey.space 的主题切换实现
 */

(function() {
  'use strict';

  // 主题配置
  const THEMES = {
    DARK: 'dark',
    LIGHT: 'light'
  };

  const STORAGE_KEY = 'blog-theme';

  // 获取当前主题
  function getCurrentTheme() {
    // 1. 尝试从 localStorage 获取
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if (savedTheme && Object.values(THEMES).includes(savedTheme)) {
      return savedTheme;
    }

    // 2. 检测系统偏好
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return THEMES.DARK;
    }

    // 3. 默认暗色主题
    return THEMES.DARK;
  }

  // 应用主题
  function applyTheme(theme) {
    const html = document.documentElement;

    if (theme === THEMES.LIGHT) {
      html.setAttribute('data-theme', 'light');
    } else {
      html.removeAttribute('data-theme');
    }

    // 保存到 localStorage
    localStorage.setItem(STORAGE_KEY, theme);

    // 触发自定义事件
    const event = new CustomEvent('themechange', { detail: { theme } });
    window.dispatchEvent(event);
  }

  // 切换主题
  function toggleTheme() {
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
    applyTheme(newTheme);
    return newTheme;
  }

  // 创建主题切换按钮
  function createThemeToggleButton() {
    // 检查是否已存在切换按钮
    if (document.getElementById('theme-toggle-btn')) {
      return;
    }

    const button = document.createElement('button');
    button.id = 'theme-toggle-btn';
    button.className = 'theme-toggle-button';
    button.setAttribute('aria-label', '切换主题');
    button.innerHTML = `
      <svg class="theme-icon sun-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
      <svg class="theme-icon moon-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    `;

    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
      .theme-toggle-button {
        position: fixed;
        bottom: 80px;
        right: 20px;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: var(--card-bg);
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: var(--shadow-md);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 100;
        transition: all 0.3s ease;
        color: var(--text-primary);
      }

      .theme-toggle-button:hover {
        transform: translateY(-3px);
        box-shadow: var(--shadow-lg);
        border-color: var(--accent-primary);
      }

      .theme-icon {
        transition: opacity 0.3s ease, transform 0.3s ease;
        position: absolute;
      }

      .sun-icon {
        opacity: 0;
        transform: rotate(180deg);
      }

      .moon-icon {
        opacity: 1;
        transform: rotate(0deg);
      }

      [data-theme="light"] .sun-icon {
        opacity: 1;
        transform: rotate(0deg);
      }

      [data-theme="light"] .moon-icon {
        opacity: 0;
        transform: rotate(-180deg);
      }

      @media (max-width: 768px) {
        .theme-toggle-button {
          bottom: 60px;
          right: 15px;
          width: 44px;
          height: 44px;
        }
      }
    `;

    // 添加点击事件
    button.addEventListener('click', function() {
      const newTheme = toggleTheme();

      // 添加点击动画
      button.style.transform = 'scale(0.9)';
      setTimeout(() => {
        button.style.transform = '';
      }, 150);

      console.log(`主题已切换为: ${newTheme === THEMES.DARK ? '暗色' : '亮色'}模式`);
    });

    // 插入到页面
    document.head.appendChild(style);
    document.body.appendChild(button);
  }

  // 初始化
  function init() {
    // 在页面加载前应用主题，避免闪烁
    const theme = getCurrentTheme();
    applyTheme(theme);

    // 页面加载完成后创建切换按钮
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', createThemeToggleButton);
    } else {
      createThemeToggleButton();
    }

    // 监听系统主题变化
    if (window.matchMedia) {
      const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
      darkModeQuery.addEventListener('change', (e) => {
        // 只有在用户没有手动设置主题时才自动切换
        if (!localStorage.getItem(STORAGE_KEY)) {
          applyTheme(e.matches ? THEMES.DARK : THEMES.LIGHT);
        }
      });
    }
  }

  // 导出 API
  window.BlogTheme = {
    toggle: toggleTheme,
    get current() {
      return getCurrentTheme();
    },
    set: applyTheme,
    THEMES: THEMES
  };

  // 立即执行初始化
  init();
})();
