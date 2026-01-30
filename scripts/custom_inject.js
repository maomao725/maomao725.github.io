const logger = require('hexo-log')();

hexo.extend.filter.register('theme_inject', function(injects) {
  logger.info('Injecting custom.css via script...');
  injects.head.push('<link rel="stylesheet" href="/css/custom.css?v=script_inject_1.0">');
});
