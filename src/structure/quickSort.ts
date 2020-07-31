/**
 * 快速排序
 */

function quickSort(arr: number[]) {
  // 递归的结束条件是元素小于等于1个
  if (arr.length <= 1) {
      return arr;
  }
  // 先把最后一个元素找出来
  const mid = arr[arr.length - 1];
  // 比该元素小的放左边
  const left = arr.filter((item, index) => item < mid && index < arr.length - 1);
  // 比该元素大的放右边
  const right = arr.filter(item => item > mid);
  // 递归该过程
  return [...quickSort(left), mid, ...quickSort(right)]
}

export default quickSort
