module.exports = function deepEqual(prev, next) {
  if (typeof prev !== typeof next) return false;
  if (
    typeof prev === 'string' ||
    typeof prev === 'number' ||
    typeof prev === 'boolean' ||
    typeof prev === 'function' ||
    prev == void 0 ||
    next == void 0
  ) return Object.is(prev, next);
  if (
    Array.isArray(prev) &&
    Array.isArray(next)
  ) {
    if (prev.length !== next.length) return false;
    return prev.every((item, index) => deepEqual(item, next[index]));
  }
  if (
    Object.prototype.toString.call(prev) === '[object Object]' &&
    Object.prototype.toString.call(next) === '[object Object]'
  ) {
    const prevKeys = Object.keys(prev);
    const nextkeys = Object.keys(next);
    if (
      prevKeys.every(key => next.hasOwnProperty(key) && deepEqual(prev[key], next[key])) &&
      nextkeys.every(key => prev.hasOwnProperty(key) && deepEqual(next[key], prev[key]))
    ) return true;
    return false;
  }
  return false;
}
