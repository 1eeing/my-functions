/**
 * 有三种括号，[]、()、{}，验证输入的字符串是否是正确匹配的
 * @param str
 */

function isValid(str: string) {
  const stack = [];
  const map = {
    '(': ')',
    '[': ']',
    '{': '}',
  }

  for(let i = 0; i < str.length; i++){
    const item = str[i];
    if(['(', '[', '{'].includes(item)){
      stack.push(item);
    }

    if([')', ']', '}'].includes(item) && map[stack[stack.length - 1]] === item){
      stack.pop();
    }
  }

  return !stack.length;
}

console.log(
  isValid(''),
  isValid('()'),
  isValid('()[]{}'),
  isValid('(]'),
  isValid('([)]'),
  isValid('{[]}')
)
