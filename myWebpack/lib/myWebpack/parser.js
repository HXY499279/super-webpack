const fs = require('fs')
const path = require('path')
const babelParser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const { transformFromAst } = require('@babel/core')

const parser = {
  // 将文件解析成ast
  getAst(filePath) {
    // 读取文件内容
    const file = fs.readFileSync(filePath, 'utf-8')

    // 将其内容代码解析成ast抽象语法树
    const ast = babelParser.parse(file, {
      sourceType: 'module' // 解析文件的模块化方案是 ES Module
    })
    return ast
  },

  // 获取依赖
  getDeps(ast, filePath) {
    // 获取到入口文件的文件夹路径：./src
    const dirname = path.dirname(filePath)
    // 定义存储依赖的容器
    const deps = {}
    traverse(ast, {
      // 内部会遍历ast中的program.body，判断里面语句类型
      // 如果 type:ImportDeclaration 就会触发当前函数
      ImportDeclaration({ node }) {
        // 文件相对路径relativePath：'./add.js'
        const relativePath = node.source.value
        // 生成基于入口文件的绝对路径
        const absolutePath = path.resolve(dirname, relativePath)
        // 添加依赖
        deps[relativePath] = absolutePath
      }
    })
    return deps
  },

  // 将ast解析成code
  getCode(ast) {
    // 编译代码：将代码中浏览器不能识别的语法进行编译
    const { code } = transformFromAst(ast, null, {
      presets: ['@babel/preset-env']
    })
    return code
  }
}

module.exports = parser