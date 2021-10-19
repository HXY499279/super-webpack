"use strict";

var _require = require('path'),
    resolve = _require.resolve;

module.exports = {
  module: {
    rules: [{
      test: /\.js$/,
      // 将多个loader放入use数组里面
      // use:[
      //   'loader1',
      //   'loader2',
      //   {
      //     loader:'loader3',
      //     options:{
      //       name:"hxy"
      //     }
      //   }
      // ]
      loader: 'babelLoader',
      options: {
        presets: ['@babel/preset-env']
      }
    }]
  },
  resolveLoader: {
    modules: ['node_modules', resolve(__dirname, 'loaders')]
  },
  mode: "development"
};