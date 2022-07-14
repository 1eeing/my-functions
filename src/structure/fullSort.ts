/**
 * 全排列
 * 输入 [['a', 'b'], ['c', 'd'], ['e', 'f']]
 * 输出 [
 *   'ace', 'bce',
 *   'ade', 'bde',
 *   'acf', 'bcf',
 *   'adf', 'bdf',
 * ]
 */

 function compose(arr: string[][]): string[] {
  return arr.reduce((prev: string[], cur: string[]) => {
    const res: string[] = []
    cur.forEach(i => {
      if (prev.length) {
        prev.forEach(j => {
          res.push(j + i)
        })
      } else {
        res.push(i)
      }
    })
    return res
  }, [])
}

console.log(compose([['a', 'b'], ['c', 'd'], ['e', 'f']]))
