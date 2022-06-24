class Scheduler {
  limit = 2
  queue: any[] = []
  total = 0

  add (fn: (...args: any) => Promise<any>) {
    return new Promise((resolve, reject) => {
      this.queue.push({fn, resolve, reject})

      if (this.total >= this.limit) {
        return
      }

      this.excute()
    })
  }

  excute() {
    if (this.queue.length) {
      const { fn, resolve, reject } = this.queue.shift()

      this.total ++
      fn().then(res => {
        resolve(res)
        this.total --
        this.excute()
      }, err => {
        reject(err)
        this.total --
        this.excute()
      })
    }
  }
}

const scheduler = new Scheduler()

const promiseCreator = (order: number, timer: number) => () => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(order)
      resolve(order)
    }, timer)
  })
}

const fn1 = promiseCreator(1, 500)
const fn2 = promiseCreator(3, 1000)
const fn3 = promiseCreator(2, 300)
const fn4 = promiseCreator(4, 400)

scheduler.add(fn1)
scheduler.add(fn2)
scheduler.add(fn3)
scheduler.add(fn4)
