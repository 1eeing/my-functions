Function.prototype.bind = function (context, ...args) {
  // 需要注意的细节点
  // 1、this不是function的时候
  // 2、new和bind同时存在时，new的优先级更高
  // 3、如果new的函数返回了一个对象，则new直接返回该对象；否则返回新的实例
  // 4、函数length问题
  const fn = this;
  if (typeof fn !== 'function') {
    throw new TypeError('Function.prototype.bind is not called on' + fn);
  }
  let bound;
  const binder = function(...args2) {
    const finalArgs = args.concat(args2);
    // 解决new后this指向的问题
    // 这样能判断是new出来的原因是，普通执行的时候，this是context或window
    // 但是在new里面，this是实例对象，实例对象的__proto__属性指向bound.prototype，因此会返回true
    if(this instanceof bound){
      const res = fn.apply(this, finalArgs);
      // 解决存在对象返回值的问题
      if(Object(res) === res){
        return res;
      }
      return this;
    }
    return fn.apply(context, finalArgs);
  }

  const boundArgsLength = Math.max(0, fn.length - args.length);
  const boundArgs = [];
  for(let i = 0; i < boundArgsLength; i++){
    boundArgs.push(`$${i}`);
  }

  // 解决length的问题
  bound = Function('binder', `return function(${boundArgs.join(',')}) { return binder.apply(this, [].slice.call(arguments)) }`)(binder);

  // 没有这一步会导致new出来的对象在原型链上找不到fn，而原生的bind是可以找到的
  if(fn.prototype){
    const Empty = function() {};
    Empty.prototype = fn.prototype;
    bound.prototype = new Empty();
    Empty.prototype = null;
  }

  // todo
  // 1、原生bind后的函数是没有prototype属性的
  // 2、原生bind后的函数不允许调用caller、arguments这两个属性，会报TypeError错误

  return bound;
}
