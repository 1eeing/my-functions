// TODO finish promisePipe
// export const promisePipe = (...fns) => {
//     return function(...args) {
//         return fns.promiseReduce(async (prev, cur) => {
//             return await cur[Array.isArray(args) ? 'apply' : 'call'](this, prev);
//         }, args)
//     }
// }

// const a = (x, y) => Promise.resolve(x + y);

// const b = (x) => Promise.resolve(x + 1);

// const fn = promisePipe(a, b);
// fn(2,3).then(res => console.log(res)).catch(e => console.log('捕获错误：' + e));
