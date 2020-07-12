/**
 * 实现一个带超时功能的fetch
 */
function _fetch(fn: (...params: any) => Promise<unknown>, delay: number){
  const delayP = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('超时了');
    }, delay);
  });

  return Promise.race([
    fn(),
    delayP
  ])
}
