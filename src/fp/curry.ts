const curry = (fn, ...args) => {
  // 一开始，args的length为0
  // 只有当curry后的函数调用的次数或者参数个数等于原始函数要求的参数个数时
  // 才会真正执行原始函数
  if(args.length >= fn.length){
      return fn(...args);
  }
  return function (...args2) {
    // 合并参数
      return curry(fn, ...args, ...args2);
  }
};

export default curry;
