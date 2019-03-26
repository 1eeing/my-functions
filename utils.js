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