/************ 第四章 ************/
// 练习1
const _ = require('ramda');

const words = _.split(' ');
console.log(words('merry christmas!'));

// 练习1a
const sentences = _.map(words);
console.log(sentences(['merry christmas!', 'hello world']));

// 练习2
const filterQs = _.filter(_.match(/q/i));
console.log(filterQs('qq3727117'));

// 练习3
const _keepHighest = (x, y) => x >= y ? x : y;
const max = _.reduce(_keepHighest, -Infinity);

// 彩蛋1
const slice = _.curry(function(start, end, xs) {
    return xs.slice(start, end);
});
console.log(slice(0, 2, [1,2,3,4]));

// 彩蛋2
const take = slice(0);
console.log(take(2, [4,3,5]));

const head = x => x[0];
const reverse = _.reduce((acc, x) => [x].concat(acc), []);
const last = _.compose(head, reverse);
console.log(last(['haha', 'start', 'yes']));


/************ 第五章 ************/
const _ = require('ramda');
// 练习1
const isLastInStock = _.compose(_.prop('in_stock'), _.last);
console.log(isLastInStock([{'in_stock': 'qwe'}]));

// 练习2
const nameOfFirstCar = _.compose(_.prop('name'), _.head);
console.log(nameOfFirstCar([{name: 'BMW'}]));

// 练习3
const _average = xs => _.reduce(_.add, 0, xs) / xs.length;
const averageDollarValue = _.compose(_average, _.map(_.prop('dollar_value')));
console.log(averageDollarValue([{name: 'BMW', dollar_value: 100}]));

// 练习4 TOFIXED
const _underscore = _.replace(/\W+/g, '_');
const sanitizeNames = _.map(_.compose(_underscore, _.toLower));
console.log(sanitizeNames(['Hello World']));

// 彩蛋1

// 彩蛋2