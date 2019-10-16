const curry = (fn, ...args) => {
  if(args.length >= fn.length){
      return fn(...args);
  }
  return function(...args2) {
      return curry(fn, ...args, ...args2);
  }
};

export default curry;
