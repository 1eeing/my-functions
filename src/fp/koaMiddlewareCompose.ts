/**
 * koa 洋葱圈模型实现
 */

 const middleware: any[] = []
 middleware.push((next) => {
     console.log(1)
     next()
     console.log(1.1)
 })
 middleware.push((next) => {
     console.log(2)
     next()
     console.log(2.1)
 })
 middleware.push((next) => {
     console.log(3)
     next()
     console.log(3.1)
 })

 const fn = compose(middleware)
 fn()

function compose(fns){
  return function() {
      const handler = (index) => {
          const cur = fns[index]
          if (!cur) return () => {}
          return () => {
              cur(handler(index + 1))
          };
      }
      const fn = fns[0]
      if (fn) {
          fn(handler(1))
      }
  }
}
