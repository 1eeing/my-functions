// TODO finish promisePipe
export const promisePipe = (...fns) => {
    return function(...args) {
        return fns.reduce(async (prev, cur) => {
            return await cur[Array.isArray(prev) ? 'apply' : 'call'](this, prev);
        }, args)
    }
}

const a = (x, y) => Promise.resolve(x + y);

const b = (x) => Promise.resolve(x + 1);

const fn = promisePipe(a, b);
fn(2,3).then(console.log)
