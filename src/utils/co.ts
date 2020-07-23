/**
 * generator生成器，返回一个迭代器对象，当调用该对象的next方法时，会返回 {value, done}
 * 当遇到yield的时候，暂停执行并交出执行权。只有当调用迭代器对象的next方法，将迭代器指向该yield的时候，才会执行yield后面的语句。
 */

// 自动运行generator
const co = (gen: GeneratorFunction) => {
  const g = gen();

  const next = () => {
    const res = g.next();
    if (res.done) return res.value;
    return next();
  }

  next();
}

// 自动执行基于thunk函数的异步generator
function runThunk(gen) {
  const g = gen();
  const next = (data?: any) => {
    const res = g.next();
    if (res.done) return;
    res.value(next);
  }
  next();
}


// 自动执行基于promise的异步generator
function* chain() {
  console.log(yield Promise.resolve(1));
  console.log(yield Promise.resolve(2));
  console.log(yield Promise.resolve(3));
}

function runPromise(gen: () => Generator<Promise<any>>) {
  var g = gen();

  const next = (data?: any) => {
    const res = g.next(data);
    if (!res.done) {
      return res.value.then(v => {
        return next(v);
      })
    } else {
      return res.value;
    }
  }

  return next();
}

runPromise(chain).then(res => {
  console.log(res);
});
