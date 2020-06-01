/**
 * 随机打乱数组
 */

function sort<T>(arr: T[]): T[]{
  const handler = (_arr: T[], res: T[]) => {
      if(!_arr.length) return res;
      const length = _arr.length;
      const index = Math.floor(Math.random() * length);
      res.push(_arr.splice(index, 1)[0]);
      return handler(_arr, res);
  }
  return handler(arr, []);
}
