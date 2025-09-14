// 评论系统页面控制
document.addEventListener('DOMContentLoaded', function() {
  // 获取当前页面路径
  const currentPath = window.location.pathname;

  // 定义不需要评论的页面
  const noCommentPages = [
    '/',           // 主页
    '/index.html', // 主页
    '/categories/', // 分类页面
    '/categories/index.html'
  ];

  // 检查是否为分类页面（包括子分类）
  const isCategoryPage = currentPath.includes('/categories/');

  // 检查是否为主页
  const isHomePage = currentPath === '/' || currentPath === '/index.html';

  // 如果是主页或分类页面，隐藏评论区
  if (isHomePage || isCategoryPage) {
    const commentSection = document.querySelector('#post-comment, .comment-wrap, #utterances');
    if (commentSection) {
      commentSection.style.display = 'none';
    }
  } else {
    // 其他页面（标签、关于、归档、文章等）显示评论
    const commentSection = document.querySelector('#post-comment, .comment-wrap');
    if (commentSection) {
      commentSection.style.display = 'block';
    }
  }
});