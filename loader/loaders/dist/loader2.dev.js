"use strict";

// loader本质上是一个函数
module.exports = function (content, map, meta) {
  console.log(222);
  var callback = this.async();
  setTimeout(function () {
    callback(null, content);
  }, 1000);
};

module.exports.pitch = function () {
  console.log("pitch 222");
};