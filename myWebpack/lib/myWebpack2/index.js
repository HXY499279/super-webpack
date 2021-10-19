import Compiler from "./Compiler"


function myWebpack(config) {
  return new Compiler(config)
}

module.exports = myWebpack