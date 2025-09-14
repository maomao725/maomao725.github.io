// 导航栏滚动效果
document.addEventListener('DOMContentLoaded', function() {
  const nav = document.getElementById('nav');

  // 检查滚动位置并更新导航栏样式
  function updateNavStyle() {
    if (window.scrollY > 50) {
      nav.classList.add('nav-fixed');
    } else {
      nav.classList.remove('nav-fixed');
    }
  }

  // 初始检查
  updateNavStyle();

  // 监听滚动事件
  window.addEventListener('scroll', updateNavStyle);

  // 节流处理，提高性能
  let ticking = false;
  function requestTick() {
    if (!ticking) {
      window.requestAnimationFrame(updateNavStyle);
      ticking = true;
      setTimeout(() => { ticking = false; }, 100);
    }
  }

  window.addEventListener('scroll', requestTick);
});