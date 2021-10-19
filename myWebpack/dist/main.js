
        (function (depsGraph) {
          // require目的：为了加载入口文件
          function require(module){
            // 定义模块内部的require函数
            function localRequire(relativePath){
              // 为了找到要引入模块的绝对路径，通过require加载
              return require(depsGraph[module].deps[relativePath])
            }
            // 定义暴露对象（将来我们模块要暴露的内容）
            var exports = {}

            function a(require, exports, code) {
              eval(code)
            }
            a(localRequire, exports, depsGraph[module].code)
            
            // 作为require函数的返回值返回出去
            // 后面的require函数能得到暴露的内容
            return exports
          }
          // 加载入口文件
          require('./src/index.js')
        })({"./src/index.js":{"code":"\"use strict\";\n\nvar _add = _interopRequireDefault(require(\"./add.js\"));\n\nvar _count = _interopRequireDefault(require(\"./count.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconsole.log((0, _add.default)(1, 2));\nconsole.log((0, _count.default)(3, 1));","deps":{"./add.js":"D:\\code\\hxy\\webpack5\\高阶进阶\\myWebpack\\src\\add.js","./count.js":"D:\\code\\hxy\\webpack5\\高阶进阶\\myWebpack\\src\\count.js"}},"D:\\code\\hxy\\webpack5\\高阶进阶\\myWebpack\\src\\add.js":{"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = add;\n\nvar _hxy = _interopRequireDefault(require(\"./hxy.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n(0, _hxy.default)();\n\nfunction add(x, y) {\n  return x + y;\n}","deps":{"./hxy.js":"D:\\code\\hxy\\webpack5\\高阶进阶\\myWebpack\\src\\hxy.js"}},"D:\\code\\hxy\\webpack5\\高阶进阶\\myWebpack\\src\\hxy.js":{"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = hxy;\n\nfunction hxy() {\n  console.log(\"黄显瑜\");\n}","deps":{}},"D:\\code\\hxy\\webpack5\\高阶进阶\\myWebpack\\src\\count.js":{"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = count;\n\nfunction count(x, y) {\n  return x - y;\n}","deps":{}}})
      