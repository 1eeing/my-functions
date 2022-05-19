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

function print() {
    console.log(Date.now() / 1000)
}

const p = throttle(print, 2000);

for(let i = 0; i < 5; i++) {
    p()
}

export default throttle;
