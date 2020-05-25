const transformNumber = (n: number) => {
  // 因为js采用IEEE 754 双精度版本（64位）
  // 有一些小数在二进制中是无限循环的
  // 因此，先将小数转成字符串，再转回小数即可
  return parseFloat(n.toFixed(2));
}

const flat = (arr: number[][]): number[] => {
  const res = [];
  arr.forEach(item => {
    res.push(...item);
  })
  return res;
}

function dispatch(totalPrice: number, totalCount: number): number[] {
  const average = totalPrice / totalCount;
  const isOdd = totalCount % 2 !== 0;
  const count = isOdd ? (totalCount - 1) / 2 : totalCount / 2;
  const res: number[][] = new Array(count).fill([average, average]);
  for(let i = 0; i < res.length; i++){
      const random = Math.random() * average;
      const cur = res[i];
      res[i] = [transformNumber(cur[0] + random), transformNumber(cur[1] - random)];
  }
  return isOdd ? flat(res).concat(transformNumber(average)) : flat(res);
}

console.log(dispatch(100, 10));
