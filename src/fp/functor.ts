// 函子，实现了of静态方法的类
class Functor {
  value: any

  constructor(value) {
    this.value = value;
  }

  static of(value) {
    return new Functor(value);
  }

  map(f) {
    return Functor.of(f(this.value));
  }
}

// monad，实现了join和chain方法的类
class Monad {
  value: any

  constructor(value) {
    this.value = value;
  }

  static of(value) {
    return new Monad(value);
  }

  isNothing() {
    return this.value == void 0 ? true : false
  }

  map(f) {
    return Monad.of(f(this.value));
  }

  join() {
    return this.isNothing() ? Monad.of(null) : this.value;
  }

  chain(f) { // 就是抽象了 x.map().join()这个过程，直接拿到里面的值
    return this.map(f).join();
  }
}

console.log(Monad.of(3).chain(x => x + 2));


// applicative functor 实现了ap方法的类
class ApFunctor {
  value: any

  constructor(value) {
    this.value = value;
  }

  static of(value) {
    return new ApFunctor(value);
  }

  isNothing() {
    return this.value == void 0 ? true : false
  }

  map(f) {
    return ApFunctor.of(f(this.value));
  }

  join() {
    return this.isNothing() ? ApFunctor.of(null) : this.value;
  }

  // 就是抽象了 x.map().join()这个过程，直接拿到里面的值
  chain(f) {
    return this.map(f).join();
  }

  // 并行执行，把一个functor的函数值应用到另一个functor的值上
  ap(otherFunctor) {
    // 调用ap时，this.value必须已经是一个函数
    return otherFunctor.map(this.value);
  }
}

// 思考一下，如果没有ap，要把两个monad里面的值合并起来，该怎么做
// 可以使用chain来实现
console.log(ApFunctor.of(3).chain((x) => ApFunctor.of(2).map(y => x + y)))
// 这样虽然实现了，但是执行顺序是一个问题，必须先执行完前一个monad，再执行后一个monad
// ap的作用就是帮助我们并行的执行与合并两个functor里面的值
console.log(ApFunctor.of(x => x + 2).ap(ApFunctor.of(3)))
// 如果调用ap时，this.value是一个curry函数，则效果更好

// F.of(v).map(f) == F.of(f).ap(F.of(v))


// lift 简化
const { curry } = require('ramda');
const add = x => y => z =>  x + y + z;
const liftA2 = curry((f, f1, f2) => {
  return f1.map(f).ap(f2);
})
const liftA3 = curry((f, f1, f2, f3) => {
  return f1.map(f).ap(f2).ap(f3);
})
console.log(liftA3(add, ApFunctor.of(2), ApFunctor.of(3), ApFunctor.of(6)));




// 免费开瓶器
// 1、从of/ap 衍生出map
// 2、从 chain 衍生出map
// 3、从 chain/map 衍生出ap

