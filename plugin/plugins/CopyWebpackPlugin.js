const path = require('path')
// 获取校验options的方法
const { validate } = require("schema-utils")
// 获取校验options的标准
const schema = require("./schema.json")
// 用于匹配某一个文件夹下的文件，根据规则忽略一些文件
const globby = require('globby')
// 获取资源格式化的方法
const webpack = require("webpack")
const { RawSource } = webpack.sources

const { readFileSync } = require('fs')

class CopyWebpackPlugin {
  constructor(options = {}) {
    // 验证options是否符合规范

    validate(schema, options, {
      name: "CopyWebpackPlugin"
    })

    this.options = options
  }
  apply(compiler) {
    // 初始化compilation
    compiler.hooks.thisCompilation.tap('CopyWebpackPlugin', async (compilation) => {
      // 添加资源的hooks
      compilation.hooks.additionalAssets.tapAsync('CopyWebpackPlugin', async (cb) => {
        // 我们下面代码要做的是将from中的资源复制到to中，输出出去

        // 获取options里面的配置
        const { from, to = '.', ignore } = this.options

        // 0. 得到from的绝对路径，因为globby最好用绝对路径处理
        // context就是webpack配置
        // 运行node指令的目录
        const context = compiler.options.context // process.cwd()：运行时的路径
        // 将输入路径变成绝对路径
        const absoluteFrom = path.isAbsolute(from) ? from : path.resolve(context, from)
        // 1. 从from里面获取所有文件路径并且过滤掉ignore的文件
        // globby(要处理的文件夹路径，options)，返回值为promise对象
        let paths = await globby(absoluteFrom, { ignore })

        console.log(paths); // 所有要加载的文件路径数组['D:/code/hxy/webpack5/高阶进阶/plugin/public/reset.css']

        // 2. 读取paths中所有资源
        const files = paths.map((absolutepath) => {
          // 读取文件
          const data = readFileSync(absolutepath)
          // 生成该文件的文件名（basename方法得到路径的最后一个文件名称）
          const relativePath = path.basename(absolutepath)
          /* 
            和to属性结合
            没有to --> reset.css
            有to --> css/reset.css
          */
          const filename = path.join(to,relativePath)

          return {
            // 文件数据
            data,
            // 文件名称
            filename
          }
        })

        // 3. 生成webpack格式的资源
        const assets = files.map((file) => {
          const source = new RawSource(file.data)
          const filename = file.filename
          return {
            source,
            filename
          }
        })

        // 4. 添加compilation中，输出出去
        assets.forEach((asset) => {
          compilation.emitAsset(asset.filename, asset.source)
        })

        // 最后调用callback函数结束
        cb()
      })
    })
  }
}
module.exports = CopyWebpackPlugin
