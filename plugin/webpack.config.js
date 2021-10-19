// const Plugin1 = require('./plugins/Plugin1')
// const Plugin2 = require('./plugins/Plugin2')
const CopyWebpackPlugin = require('./plugins/CopyWebpackPlugin')

module.exports = {
  plugins:[
    // new Plugin1(),
    // new Plugin2(),
    new CopyWebpackPlugin({
      // 从哪里复制
      from:'public',
      // to:'css',
      // 忽略文件
      ignore:['**/index.html'],
    }),
  ]
}