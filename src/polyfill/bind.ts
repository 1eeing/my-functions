Function.prototype.bind = function(target, ...args) {
  const fn = this;
  return function(...args1) {
      return fn.apply(target, args.concat(args1));
  }
}
