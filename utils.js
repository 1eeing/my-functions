Function.prototype.bind = function(target, ...args) {
    const fn = this;
    return function(...args1) {
        return fn.apply(target, args.concat(args1));
    }
}


// 从右往左执行
export const compose = (...args) => {
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

// 从左往右执行
export const pipe = (...fns) => {
    return function(...args) {
        return fns.reduce((prev, cur) => cur[Array.isArray(prev) ? 'apply' : 'call'](this, prev), args);
    };
}

const a = (x, y) => x + y;

const b = (x) => x + 1;

const fn = pipe(a, b);
console.log(fn(2, 3));


Array.prototype.map = function(fn) {
    let res = [];
    for (let i = 0; i < this.length; i++) {
        res.push(fn.call(this, this[i]));
    }
    return res;
}

Array.prototype.reduce = function(fn, initValue) {
    let prev = initValue === void 0 ? this[0] : initValue;
    for (let i = initValue === void 0 ? 1 : 0; i < this.length; i++) {
        prev = fn.call(this, prev, this[i], i, this);
    }
    return prev;
}

const a = (x, y) => x + y;
console.log([1,2,3,4].reduce(a, 5))

Array.prototype.promiseReduce = async function(fn, initValue) {
    let prev = initValue === void 0 ? await this[0] : initValue;
    for (let i = initValue === void 0 ? 1 : 0; i < this.length; i++) {
        prev = fn.call(this, prev, await this[i], i, this);
    }
    return prev;
}

const a = [
    Promise.resolve(1),
    Promise.reject(2),
    Promise.resolve(3),
]

a.promiseReduce((prev, cur) => {
    return prev + cur;
}).then(res => console.log(res)).catch(e => console.log('捕获错误：' + e));


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


export const curry = (fn, ...args) => {
    if(args.length >= fn.length){
        return fn(...args);
    }
    return function(...args2) {
        return curry(fn, ...args, ...args2);
    }
};

const b = function(x, y, z) {
    return x + y + z;
};

const a = curry(b);
console.log(a(1)(2)(3));

export const debounce = (fn, delay) => {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay)
    }
};

export const throttle = (fn, delay) => {
    let last = 0;
    let timer;
    return function(...args) {
        const cur = Date.now();
        if(cur - last > delay){
            fn.apply(this, args);
            last = cur;
        }else{
            clearTimeout(timer);
            timer = setTimeout(() => {
                fn.apply(this, args);
                last = cur;
            }, delay);
        }
    }
};