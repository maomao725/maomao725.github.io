// 网站运行时间计算
function showRuntime() {
  const startTime = new Date('2025-09-14 19:25:00'); // 网站开始运行时间
  const currentTime = new Date();
  const timeDiff = currentTime - startTime;

  // 计算年、天、小时、分钟、秒
  const years = Math.floor(timeDiff / (365 * 24 * 60 * 60 * 1000));
  const days = Math.floor((timeDiff % (365 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000));
  const hours = Math.floor((timeDiff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((timeDiff % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((timeDiff % (60 * 1000)) / 1000);

  // 构建显示文本
  let runtimeText = '本站已安全运行 ';

  if (years > 0) {
    runtimeText += years + ' 年 ';
  }
  runtimeText += days + ' 天 ';
  runtimeText += hours + ' 小时 ';
  runtimeText += minutes + ' 分 ';
  runtimeText += seconds + ' 秒';

  // 更新显示
  const runtimeElement = document.getElementById('runtime');
  if (runtimeElement) {
    runtimeElement.innerHTML = runtimeText;
  }
}

// 页面加载完成后开始计时
document.addEventListener('DOMContentLoaded', function() {
  // 立即显示一次
  showRuntime();

  // 每秒更新一次
  setInterval(showRuntime, 1000);
});