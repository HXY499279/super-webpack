class Plugin1 {
  apply(compiler) {
    compiler.hooks.emit.tap('Plugin1', (compilation) => {
      console.log('emit.tap 触发了')
    })
    compiler.hooks.emit.tapAsync('Plugin1', (compilation, cb) => {
      setTimeout(() => {
        console.log('emit.tapAsync 触发了')
        cb()
      }, 1000);
    })
    compiler.hooks.emit.tapPromise('Plugin1', (compilation) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('emit.tapPromise 触发了')
          resolve()
        }, 1000);
      })
    })


    compiler.hooks.afterEmit.tap('Plugin1', (compilation) => {
      console.log('afterEmit.tap 触发了')
    })

    
    compiler.hooks.done.tap('Plugin1', (stats) => {
      console.log('done.tap 触发了')
    })
  }
}
module.exports = Plugin1