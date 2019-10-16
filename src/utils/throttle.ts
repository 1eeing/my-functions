const throttle = (fn, delay) => {
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

export default throttle;
