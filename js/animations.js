/**
 * 动态交互动画脚本
 * 仿照 Bokey Space 的 vueuse/motion 效果
 */

document.addEventListener('DOMContentLoaded', () => {
    // 需要添加动画的元素选择器
    const animatedSelectors = [
        '.recent-post-item', // 文章卡片
        '#aside-content .card-widget', // 侧边栏卡片
        '#page-header.full_page #site-title', // 首页标题
        '#page-header.full_page #site-subtitle', // 首页副标题
        '#footer' // 页脚
    ];

    // 创建 Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // 添加 visible 类触发动画
                entry.target.classList.add('visible');
                // 动画触发后停止观察，避免重复触发
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // 元素出现 10% 时触发
        rootMargin: '0px 0px -50px 0px' // 稍微提前一点触发
    });

    // 为元素添加初始类并开始观察
    animatedSelectors.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            // 添加基础动画类
            el.classList.add('scroll-animation');

            // 添加延迟类，制造层叠效果 (每行3个或列表顺序)
            // 简单的逻辑：根据 index % 3 来设置延迟
            const delayClass = `delay-${(index % 3 + 1) * 100}`;
            el.classList.add(delayClass);

            // 开始观察
            observer.observe(el);
        });
    });

    // 监听 PJAX 完成事件 (如果开启了 PJAX)
    document.addEventListener('pjax:complete', () => {
        // 重新初始化动画
        animatedSelectors.forEach((selector) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((el, index) => {
                if (!el.classList.contains('scroll-animation')) {
                    el.classList.add('scroll-animation');
                    const delayClass = `delay-${(index % 3 + 1) * 100}`;
                    el.classList.add(delayClass);
                    observer.observe(el);
                }
            });
        });
    });
});
