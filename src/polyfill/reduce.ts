Array.prototype.reduce = function(fn, initValue) {
  let prev = initValue === void 0 ? this[0] : initValue;
  for (let i = initValue === void 0 ? 1 : 0; i < this.length; i++) {
      prev = fn.call(this, prev, this[i], i, this);
  }
  return prev;
}
