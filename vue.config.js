//const path = require('path')

module.exports = {
  "transpileDependencies": [
    
  ],
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: '國立虎尾科技大學 追夢者自主學習社群 線上秘書處',
    },
  },
  /*publicPath: process.env.NODE_ENV === 'production'
    ? 'https://flyskypie.github.io/'
    : '/',/**/
}