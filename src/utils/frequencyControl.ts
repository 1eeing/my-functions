const frequencyControl = (fn: (...args: any) => Promise<any>, delay: number) => {
  const queue: any[] = []
  let last = 0;
  let timer: any;

  return function(...args: any) {
    return new Promise((resolve, reject) => {
      queue.push({resolve, reject})

      const cur = Date.now()

      const consumer = (success: boolean, res: any) => {
        while(queue.length) {
          const { resolve, reject } = queue.shift()
          success ? resolve(res) : reject(res)
        }
      }

      const excute = () => {
        last = cur
        if (!queue.length) return
        fn.apply(this, args).then(res => {
          consumer(true, res)
        }, (err) => {
          consumer(false, err)
        })
      }

      if (cur - last > delay) {
        excute()
      } else {
        clearTimeout(timer)
        timer = setTimeout(() => {
          excute()
        }, delay)
      }
    })
  }
}

function print() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('do it')
      resolve('hello')
    }, 300)
  })
}

const p = frequencyControl(print, 2000);

setTimeout(() => {
  p().then(res => {console.log(res)})
}, 0);
setTimeout(() => {
  p().then(res => {console.log(res)})
}, 1000);
setTimeout(() => {
  p().then(res => {console.log(res)})
}, 2000);
setTimeout(() => {
  p().then(res => {console.log(res)})
}, 3000);
setTimeout(() => {
  p().then(res => {console.log(res)})
}, 4000);
