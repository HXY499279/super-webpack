const fs = require('fs')
const { resolve } = require('path')
const webpack = require('webpack')
// 引入webpack里面的资源格式化工具
const { RawSource } = webpack.sources

class Plugin2 {
  apply(compiler) {
    // 初始化compilation钩子
    compiler.hooks.thisCompilation.tap('Plugin2', (compilation) => {
      // debugger
      // console.log(compilation);
      // 添加资源
      compilation.hooks.additionalAssets.tapAsync('Plugin2', (cb) => {
        // 构造资源添加到dist目录
        const content = 'hello plugin2'
        // 往要输出的资源中添加一个a.txt文件
        compilation.assets['a.txt'] = new RawSource(content)
        // 也可以将已有的文件资源添加到dist目录中
        const data = fs.readFileSync(resolve(__dirname, 'b.txt'))
        compilation.assets['b.txt'] = new RawSource(data)
        /* 
          或者这种写法：
          compilation.emitAsset("b.txt",new RawSource(data))
        */

        cb()
      })
    })
  }
}
module.exports = Plugin2