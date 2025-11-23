/**
 * 动态交互动画脚本 - Avant-Garde Edition
 * 包含：Scroll Reveal, 3D Tilt, Parallax Hero
 */

document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
});

// 监听 PJAX 完成事件 (适配 Hexo 的 PJAX)
document.addEventListener('pjax:complete', () => {
    initAnimations();
});

function initAnimations() {
    initScrollReveal();
    init3DTilt();
    initParallax();
}

/**
 * 1. 滚动显现动画 (Scroll Reveal)
 */
function initScrollReveal() {
    const animatedSelectors = [
        '.recent-post-item',
        '#aside-content .card-widget',
        '#page-header.full_page #site-title',
        '#page-header.full_page #site-subtitle',
        '#footer'
    ];

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedSelectors.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            if (!el.classList.contains('scroll-animation')) {
                el.classList.add('scroll-animation');
                // 瀑布流延迟
                const delayClass = `delay-${(index % 3 + 1) * 100}`;
                el.classList.add(delayClass);
                observer.observe(el);
            }
        });
    });
}

/**
 * 2. 3D 倾斜效果 (Vanilla 3D Tilt)
 * 应用于文章卡片和侧边栏卡片
 */
function init3DTilt() {
    const cards = document.querySelectorAll('.recent-post-item, #aside-content .card-widget');

    cards.forEach(card => {
        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);
    });

    function handleMouseMove(e) {
        const card = this;
        const cardRect = card.getBoundingClientRect();
        const cardWidth = cardRect.width;
        const cardHeight = cardRect.height;
        const centerX = cardRect.left + cardWidth / 2;
        const centerY = cardRect.top + cardHeight / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        // 旋转角度计算 (最大旋转 5deg)
        const rotateX = ((mouseY / cardHeight / 2) * -10).toFixed(2);
        const rotateY = ((mouseX / cardWidth / 2) * 10).toFixed(2);

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    }

    function handleMouseLeave(e) {
        this.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
    }
}

/**
 * 3. 视差滚动效果 (Parallax Hero)
 * 仅在首页全屏 Header 生效
 */
function initParallax() {
    const hero = document.getElementById('page-header');
    const siteTitle = document.getElementById('site-title');
    const siteSubtitle = document.getElementById('site-subtitle');

    if (hero && hero.classList.contains('full_page')) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (scrollY > window.innerHeight) return; // 离开首屏不计算

            // 标题移动速度慢于滚动速度
            if (siteTitle) siteTitle.style.transform = `translateY(${scrollY * 0.5}px)`;
            if (siteSubtitle) siteSubtitle.style.transform = `translateY(${scrollY * 0.7}px)`;

            // 背景也可以做视差，如果 CSS 中设置了背景图
            // hero.style.backgroundPositionY = `${scrollY * 0.5}px`;
        });
    }
}
