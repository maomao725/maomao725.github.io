// 打字机特效
document.addEventListener('DOMContentLoaded', function() {
  // 检查是否在首页
  const isHomePage = window.location.pathname === '/' || window.location.pathname === '/index.html';

  if (isHomePage) {
    // 尝试多种可能的副标题元素选择器
    let subtitle = document.getElementById('site-subtitle') || 
                   document.querySelector('#site-info #site-subtitle') ||
                   document.querySelector('.site-subtitle') ||
                   document.querySelector('#page-header .subtitle');

    // 如果找不到副标题元素，等待一段时间后再尝试
    if (!subtitle) {
      setTimeout(() => {
        subtitle = document.getElementById('site-subtitle') || 
                   document.querySelector('#site-info #site-subtitle') ||
                   document.querySelector('.site-subtitle') ||
                   document.querySelector('#page-header .subtitle');
        
        if (subtitle) {
          initTypewriter(subtitle);
        }
      }, 1000);
    } else {
      initTypewriter(subtitle);
    }
  }

  function initTypewriter(subtitle) {
    if (subtitle) {
      // 配置打字机内容
      const texts = ['不敢相信～', '簡直八點檔！'];
      let currentTextIndex = 0;
      let charIndex = 0;
      let isDeleting = false;
      let isWaiting = false;

      // 打字速度配置
      const typingSpeed = 120; // 打字速度（毫秒）
      const deletingSpeed = 80; // 删除速度
      const waitingTime = 1500; // 完整显示后等待时间
      const waitBetweenTexts = 500; // 文本之间的等待时间

      function typeWriter() {
        const currentText = texts[currentTextIndex];

        if (isWaiting) {
          return;
        }

        if (!isDeleting) {
          // 打字效果
          if (charIndex < currentText.length) {
            subtitle.textContent = currentText.slice(0, charIndex + 1);
            charIndex++;
            setTimeout(typeWriter, typingSpeed);
          } else {
            // 完成打字，等待一段时间
            isWaiting = true;
            setTimeout(() => {
              isWaiting = false;
              isDeleting = true;
              typeWriter();
            }, waitingTime);
          }
        } else {
          // 删除效果
          if (charIndex > 0) {
            subtitle.textContent = currentText.slice(0, charIndex - 1);
            charIndex--;
            setTimeout(typeWriter, deletingSpeed);
          } else {
            // 完成删除，切换到下一个文本
            isDeleting = false;
            currentTextIndex = (currentTextIndex + 1) % texts.length;
            isWaiting = true;
            setTimeout(() => {
              isWaiting = false;
              typeWriter();
            }, waitBetweenTexts);
          }
        }
      }

      // 添加光标效果的CSS - 使用通用选择器
      const style = document.createElement('style');
      style.textContent = `
        #site-subtitle::after,
        .site-subtitle::after,
        #page-header .subtitle::after {
          content: '|';
          animation: blink 1s infinite;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 100;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `;
      document.head.appendChild(style);

      // 开始打字机效果
      setTimeout(typeWriter, 1000); // 延迟1秒开始
    }
  }
});