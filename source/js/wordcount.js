// 网站总字数统计
function calculateTotalWordCount() {
  // 获取所有文章内容
  const articles = document.querySelectorAll('.post-content, article');
  let totalWords = 0;

  articles.forEach(article => {
    // 获取文章文本内容
    const text = article.innerText || article.textContent || '';
    // 统计中文字符
    const chineseCount = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
    // 统计英文单词
    const englishCount = (text.match(/[a-zA-Z]+/g) || []).length;
    // 总字数 = 中文字符数 + 英文单词数
    totalWords += chineseCount + englishCount;
  });

  return totalWords;
}

// 格式化数字显示
function formatNumber(num) {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + 'w';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  } else {
    return num.toString();
  }
}

// 在页面加载完成后显示总字数
document.addEventListener('DOMContentLoaded', function() {
  // 查找显示总字数的元素
  const wordcountElement = document.querySelector('.webinfo-item .item-count');
  if (wordcountElement && wordcountElement.parentElement.textContent.includes('总字数')) {
    const totalWords = calculateTotalWordCount();
    wordcountElement.textContent = formatNumber(totalWords);
  }

  // 如果在侧边栏显示
  const asideWordcount = document.querySelector('#aside-content .card-webinfo .webinfo-data');
  if (asideWordcount) {
    // 查找或创建总字数显示项
    let wordcountItem = Array.from(asideWordcount.querySelectorAll('.webinfo-item')).find(
      item => item.textContent.includes('总字数')
    );

    if (!wordcountItem) {
      // 创建新的总字数显示项
      wordcountItem = document.createElement('div');
      wordcountItem.className = 'webinfo-item';
      wordcountItem.innerHTML = `
        <div class="item-name">总字数</div>
        <div class="item-count">0</div>
      `;
      asideWordcount.appendChild(wordcountItem);
    }

    // 更新总字数
    const countElement = wordcountItem.querySelector('.item-count');
    if (countElement) {
      // 使用 Hexo 生成的总字数（如果有）或实时计算
      const hexoWordcount = window.btf?.wordcount?.totalcount;
      if (hexoWordcount) {
        countElement.textContent = formatNumber(hexoWordcount);
      } else {
        const totalWords = calculateTotalWordCount();
        countElement.textContent = formatNumber(totalWords);
      }
    }
  }
});