/***************** 闭包 ***************/
/**
 * 在外部作用域，保存一个内部作用域的引用
 * 例如:
 * function a(){
 *   var b = 0;
 *   return function add() {
 *     return ++b;
 *   }
 * }
 *
 * var outsideB = a();
 * 会引起内存泄漏，所以，当不需要使用的时候，需要手动释放掉
 * outsideB = null;
 */


/***************** 作用域 ***************/
/**
 * 函数或者块级作用域内部会形成一个内部作用域，外部无法访问
 * es6还新增了临时性死区，详见let const
 * 实现可以参考 [Nvwa.js](https://github.com/1eeing/Nvwa.js) 中关于Scope的实现
 */



/***************** 原型 ***************/
/**
 * 每一个对象的__proto__属性指向它的构造函数的prototype属性
 * 例如:
 * function Car() {};
 * var car = new Car();
 * car.__proto__ === Car.prototype;
 *
 * 或者
 * var a = {};
 * a.__proto__ === Object.prototype;
 *
 * 通过原型，形成原型链
 */



/***************** 继承 ***************/
// es5实现继承

// parent function
function Person(name) {
    this.name = name;
}

Person.prototype.sayHi = function() {
    console.log(`Hi, my name is ${this.name}`);
}

// 一、绑定this继承
// function Hong() {
//     Person.apply(this, arguments);
// };

// const hong = new Hong('xiaohong');
// hong.sayHi();



// 二、原型继承
// function Hong() {};
// Hong.prototype = new Person();

// const hong = new Hong('xiaohong');
// hong.sayHi();



// 三、组合继承
// function Hong() {
//     Person.apply(this, arguments);
// }
// Hong.prototype = new Person();
// Hong.prototype.constructor = Hong;

// const hong = new Hong('ABC');
// hong.sayHi();
// console.log(hong.constructor === Person);



// 四、寄生组合继承
// function Hong() {
//     Person.apply(this, arguments);
// };
// Hong.prototype = Person.prototype;
// Hong.prototype.constructor = Hong;

// const hong = new Hong('xiaohong');
// hong.sayHi();
// console.log(hong.constructor === Hong);




/**
 * es5如何实现构造函数继承
 * 一、在子构造函数内使用apply继承父构造函数的属性
 * 二、子构造函数的prototype属性指向父构造函数的实例或者prototype属性
 * 三、子构造函数的constructor属性指向自身的构造函数（为了使实例的constructor属性指向自身构造函数，惯例）
 */
function inherit(c, p) {
    // 模拟Object.create
    // 1.解决修改c.prototype会同时修改p.prototype的问题
    // 2.解决new p()可能会带来副作用的问题

    // 可以用以下两个方案替代
    // 1. c.prototype = Object.create(p.prototype)
    // 2. Object.setPrototypeOf(c.prototype, p.prototype);

    // 之所以要声明一个新的构造函数，是因为如果p带有副作用的话，会给子类带来麻烦
    function F() {}
    F.prototype = p.prototype;
    c.prototype = new F();
    c.prototype.constructor = c;
}

function Hong() {
    Person.apply(this, arguments);
};
inherit(Hong, Person);
const hong = new Hong('xiaom');
hong.sayHi();
console.log(Hong.prototype.constructor)


/**
 * new 的过程发生了什么？
 * function _new(F){
 *   1、实例化一个对象
 *   var obj = {};
 *
 *   2、该实例对象的__proto__属性指向构造函数的prototype属性
 *   obj.__proto__ = F.prototype;
 *
 *   3、绑定obj的this，并得到返回值
 *   const res = F.call(obj);
 *
 *   4、如果返回值是对象，则返回该返回值；否则返回obj
 *   return Object(res) === res ? res : obj;
 * }
 */
