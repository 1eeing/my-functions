Array.prototype.promiseReduce = async function(fn, initValue) {
  let prev = initValue === void 0 ? await this[0] : initValue;
  for (let i = initValue === void 0 ? 1 : 0; i < this.length; i++) {
      prev = fn.call(this, prev, await this[i], i, this);
  }
  return prev;
}

// const a = [
//   Promise.resolve(1),
//   Promise.reject(2),
//   Promise.resolve(3),
// ]

// a.promiseReduce((prev, cur) => {
//   return prev + cur;
// }).then(res => console.log(res)).catch(e => console.log('捕获错误：' + e));
