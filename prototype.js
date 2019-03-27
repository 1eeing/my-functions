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
    c.prototype = new p();
    c.prototype.constructor = c;
}

function Hong() {
    Person.apply(this, arguments);
};
inherit(Hong, Person);
const hong = new Hong('xiaom');
hong.sayHi();