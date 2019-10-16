// 从右往左执行
const compose = (...args) => {
  const length = args.length;
  if(length < 1) return () => {};
  let count = length - 1;
  let res;
  return function f1(...args1) {
      res = args[count].apply(this, args1);
      if(count <= 0){
          return res;
      }
      count--;
      return f1(res);
  }
};

export default compose;
