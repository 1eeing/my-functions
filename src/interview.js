/**
 * 判断下面代码的输出结果
 */
var obj = {
  f1() {
    console.log(this);
  },

  f2() {
    return function() {
      console.log(this);
    }
  },

  f3() {
    return () => {
      console.log(this);
    }
  }
}

obj.f1();

var f2 = obj.f2();
f2();

var f3 = obj.f3();
f3();


/**
 * 实现一个bind函数
 */


/**
 * 实现一个add函数
 * add(1) 输出1
 * add(1)(2) 输出3
 * add(3)(4)(5) 输出12
 */
