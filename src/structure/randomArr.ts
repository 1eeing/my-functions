/**
 * 随机打乱数组
 */

function sort<T>(arr: T[]): T[]{
  const res = [];
  const handler = (_arr: T[]) => {
      if(!_arr.length) return;
      const length = _arr.length;
      const index = Math.floor(Math.random() * length);
      res.push(_arr.splice(index, 1)[0]);
      handler(_arr);
  }
  handler(arr);
  return res;
}
