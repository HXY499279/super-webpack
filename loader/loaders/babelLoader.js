const { getOptions } = require('loader-utils')
const { validate } = require('schema-utils')
const babel = require('@babel/core')
const util = require('util')

const babelSchema = require("./babelSchema.json")

// babel.transform是用来编译代码的方法,它是一个普通异步方法
// util.promisify将普通异步方法转化成基于promise的异步方法
const transform = util.promisify(babel.transform)

module.exports = function (content, map, meta) {
  // 获取babelLoader的options配置
  const options = getOptions(this)

  // 校验babelLoader的options的配置
  validate(babelSchema, options, {
    name: "babelLoader"
  })


  // 创建异步
  const callback = this.async()

  // 使用loader
  transform(content, options)
    .then(({ code, map }) => {
      callback(null, code, map, meta)
    })
    .catch((e) => callback(e))

}