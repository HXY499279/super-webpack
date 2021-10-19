"use strict";

// loader本质上是一个函数
var _require = require('loader-utils'),
    getOptions = _require.getOptions;

var _require2 = require('schema-utils'),
    validate = _require2.validate;

var schema = require('./schema.json');

module.exports = function (content, map, meta) {
  // 获取options
  var options = this.getOptions();
  console.log(options); // 校验options是否合法

  validate(schema, options, {
    name: 'loader3'
  });
  return content;
};

module.exports.pitch = function () {
  console.log("pitch 333");
};