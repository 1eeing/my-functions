/**
 * 表达式形如 (t && t) || (f && f) || (f || t)，同一维度下，op是相同的
 *
 * @param {string} expression
 * @return {boolean}
 */
var format = (s) => {
  if(typeof s === 'boolean'){
      return s;
  }else if(typeof s === 'string'){
      return s === 't' ? true : false;
  }
}

var parseBoolExpr = function (expression) {
  if (expression === 't') return true;
  if (expression === 'f') return false;
  // 转换为一种友好的格式，更易处理
  expression = '(' + expression.replace(/\&+/g, '&').replace(/\|+/g, '|') + ')';

  const stack = [];
  for(let i = 0; i < expression.length; i++){
      stack.push(expression[i]);
      let cur;
      let op;
      let exprs = [];
      while(expression[i] === ')' && cur !== '('){
          cur = stack.pop();
          if(cur === void 0) break;
          if(['&', '|'].includes(cur)){
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
          }, format(exprs[0]));
          stack.push(res);
      }
  }
  return stack.pop();
};

module.exports = parseBoolExpr;
