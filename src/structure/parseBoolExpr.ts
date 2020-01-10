/**
 * leetcode 1106.解析布尔表达式
 * 解题思路
 * 1、遍历字符串，把每一项压入栈中。
 * 2、如果遍历到')'，就把之前的布尔值取出来，结合该项之前的表达式，计算出该子表达式的结果，继续压入栈中
 * 3、最后栈中只剩最后的结果，pop出来即可
 *
 * @param {string} expression
 * @return {boolean}
 */
const format = (s) => {
  if(typeof s === 'boolean'){
      return s;
  }else if(typeof s === 'string'){
      return s === 't' ? true : false;
  }
}

var parseBoolExpr = function(expression) {
  const stack = [];
  for(let i = 0; i < expression.length; i++){
      stack.push(expression[i]);
      let cur;
      let op;
      let exprs = [];
      while(expression[i] === ')' && !['&', '|', '!'].includes(cur)){
          cur = stack.pop();
          if(cur === void 0) break;
          if(['&', '|', '!'].includes(cur)){
              op = cur;
          }else if(['t', 'f', true, false].includes(cur)){
              exprs.push(cur);
          }
      }
      if(op && exprs.length){
          const res = exprs.reduce((p, c) => {
              const _prev = format(p);
              const _cur = format(c);
              if(op === '&'){
                  return _prev && _cur;
              }
              if(op === '|'){
                  return _prev || _cur;
              }
              if(op === '!'){
                  return !_prev;
              }
          }, format(exprs[0]));
          stack.push(res);
      }
  }
  return stack.pop();
};
