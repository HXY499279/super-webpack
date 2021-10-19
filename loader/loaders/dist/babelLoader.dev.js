"use strict";

var _require = require('loader-utils'),
    getOptions = _require.getOptions;

var _require2 = require('schema-utils'),
    validate = _require2.validate;

var babel = require('@babel/core');

var util = require('util');

var babelSchema = require("./babelSchema.json"); // babel.transform是用来编译代码的方法,它是一个普通异步方法
// util.promisify将普通异步方法转化成基于promise的异步方法


var transform = util.promisify(babel.transform);

module.exports = function (content, map, meta) {
  // 获取babelLoader的options配置
  var options = getOptions(this); // 校验babelLoader的options的配置

  validate(babelSchema, options, {
    name: "babelLoader"
  }); // 创建异步

  var callback = this.async(); // 使用loader

  transform(content, options).then(function (_ref) {
    var code = _ref.code,
        map = _ref.map;
    callback(null, code, map, meta);
  })["catch"](function (e) {
    return callback(e);
  });
};