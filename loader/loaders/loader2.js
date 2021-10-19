// loader本质上是一个函数

module.exports = function (content,map,meta){
  console.log(222);

  const callback = this.async()

  setTimeout(() => {
    callback(null,content)
  }, 1000);
}

module.exports.pitch = () => {
  console.log("pitch 222");
}