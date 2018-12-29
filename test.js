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