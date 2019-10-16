Array.prototype.map = function (fn) {
  let res = [];
  for (let i = 0; i < this.length; i++) {
      res.push(fn.call(this, this[i]));
  }
  return res;
}
