/**
 * 查找数组中某一项出现的次数
 */

function find<T>(arr: T[], k: T){
  let count = 0;
  const handler = (_arr: T[], _k: T) => {
      if(!_arr || !_arr.length || _k == void 0) return;
      const midIndex = Math.floor((_arr.length - 1) / 2);
      const mid = _arr[midIndex];
      const left = _arr.slice(0, midIndex);
      const right = _arr.slice(midIndex + 1, _arr.length);
      if(mid === _k){
          count ++;
      }
      if(left.length) handler(left, k);
      if(right.length) handler(right, k);
  }
  handler(arr, k);
  return count;
}

console.log(find([1,2,3,4,5,2,2,3], 2))
