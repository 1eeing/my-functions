Function.prototype.bind = function (target, ...args) {
  if (typeof target !== 'function') {
    throw new TypeError('targte must to be a function');
  }
  const fn = this;
  return function(...args1) {
      return fn.apply(target, args.concat(args1));
  }
}
