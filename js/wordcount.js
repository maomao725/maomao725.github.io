// 网站总字数统计
document.addEventListener('DOMContentLoaded', function() {
  // 延迟执行，确保DOM完全加载
  setTimeout(function() {
    const webinfoData = document.querySelector('#aside-content .card-webinfo .webinfo-data');

    if (webinfoData) {
      // 检查是否已经有总字数项
      let totalWordItem = Array.from(webinfoData.querySelectorAll('.webinfo-item')).find(
        item => item.textContent.includes('本站总字数') || item.textContent.includes('总字数')
      );

      if (!totalWordItem) {
        // 创建新的总字数显示项
        totalWordItem = document.createElement('div');
        totalWordItem.className = 'webinfo-item';

        // 获取所有文章的总字数（这里使用预设值，实际应从后端获取）
        // 您可以根据实际文章内容调整这个数值
        const totalWords = calculateSiteWordCount();

        totalWordItem.innerHTML = `
          <div class="item-name">本站总字数</div>
          <div class="item-count">${formatWordCount(totalWords)}</div>
        `;

        // 插入到最后更新时间之前
        const updateTimeItem = Array.from(webinfoData.querySelectorAll('.webinfo-item')).find(
          item => item.textContent.includes('最后更新时间')
        );

        if (updateTimeItem) {
          webinfoData.insertBefore(totalWordItem, updateTimeItem);
        } else {
          webinfoData.appendChild(totalWordItem);
        }
      }
    }
  }, 100);
});

// 计算网站总字数（示例函数，实际应从后端获取）
function calculateSiteWordCount() {
  // 基于实际文章内容的统计值
  // 4篇文章的总字符数约为11833
  return 11833; // 实际统计值
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