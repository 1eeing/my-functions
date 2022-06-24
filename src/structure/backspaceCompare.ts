/**
 * 844. 比较含退格的字符串
 * 给定 s 和 t 两个字符串，当它们分别被输入到空白的文本编辑器后，如果两者相等，返回 true 。# 代表退格字符。
 * 注意：如果对空文本输入退格字符，文本继续为空。
 */

function backspaceCompare(s: string, t: string) {
  return getFinalString(s) === getFinalString(t)
}

function getFinalString(s: string) {
  const res = []
  s.split('').forEach(item => {
    if (item !== '#') {
      res.push(item)
    } else {
      res.pop()
    }
  })
  return res.join('')
}

console.log(getFinalString('a#c'))
