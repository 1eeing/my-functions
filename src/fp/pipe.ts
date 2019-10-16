// 从左往右执行
const pipe = (...fns) => {
  return function(...args) {
      return fns.reduce((prev, cur) => cur[Array.isArray(prev) ? 'apply' : 'call'](this, prev), args);
  };
}

export default pipe;
