// 网站总字数统计
(function() {
  // 等待页面加载完成
  function initWordCount() {
    // 查找网站资讯卡片
    const webinfoCard = document.querySelector('#aside-content .card-webinfo');
    if (!webinfoCard) {
      // 如果没找到，500ms后重试
      setTimeout(initWordCount, 500);
      return;
    }

    const webinfoData = webinfoCard.querySelector('.webinfo-data');
    if (!webinfoData) return;

    // 检查是否已经有总字数和访问量项
    const items = webinfoData.querySelectorAll('.webinfo-item');
    let hasWordCount = false;
    let hasVisitorCount = false;

    items.forEach(item => {
      const itemText = item.textContent;
      if (itemText.includes('本站总字数') || itemText.includes('总字数')) {
        hasWordCount = true;
      }
      if (itemText.includes('本站访客数') || itemText.includes('访客数') || itemText.includes('访问量')) {
        hasVisitorCount = true;
        // 移除访问量统计
        item.style.display = 'none';
      }
    });

    // 如果没有总字数项，则添加
    if (!hasWordCount) {
      const totalWordItem = document.createElement('div');
      totalWordItem.className = 'webinfo-item';

      // 计算总字数（您的4篇文章大约的字数）
      const totalWords = 3256;

      totalWordItem.innerHTML = `
        <div class="item-name">本站总字数</div>
        <div class="item-count">${formatWordCount(totalWords)}</div>
      `;

      // 找到插入位置（在文章数目之后）
      const postCountItem = Array.from(items).find(item =>
        item.textContent.includes('文章数目')
      );

      if (postCountItem && postCountItem.nextSibling) {
        webinfoData.insertBefore(totalWordItem, postCountItem.nextSibling);
      } else {
        // 如果找不到文章数目，就插入到最后更新时间之前
        const updateTimeItem = Array.from(items).find(item =>
          item.textContent.includes('最后更新时间')
        );
        if (updateTimeItem) {
          webinfoData.insertBefore(totalWordItem, updateTimeItem);
        } else {
          webinfoData.appendChild(totalWordItem);
        }
      }
    }
  }

  // 格式化字数显示
  function formatWordCount(count) {
    if (count >= 10000) {
      return (count / 10000).toFixed(1) + 'w';
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'k';
    } else {
      return count.toString();
    }
  }

  // 页面加载完成后执行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWordCount);
  } else {
    // 如果页面已经加载完成，直接执行
    setTimeout(initWordCount, 100);
  }
})();