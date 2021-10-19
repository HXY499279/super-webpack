// loader本质上是一个函数
const { getOptions } = require('loader-utils')
const { validate } = require('schema-utils')

const schema = require('./schema.json')

module.exports = function (content, map, meta) {
  // 获取options
  const options = this.getOptions()
  console.log(options);

  // 校验options是否合法
  validate(schema, options, {
    name: 'loader3'
  })


  return content
}
module.exports.pitch = () => {
  console.log("pitch 333");
}