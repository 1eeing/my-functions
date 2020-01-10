const assert = require('assert');
const parseBoolExpr = require('../src/structure/parseBoolExpr/v2.ts');

describe('test parseBoolExprV2', function () {
  const tests = [
    {
      value: 't',
      res: true
    },
    {
      value: 'f',
      res: false
    },
    {
      value: 't && t',
      res: true && true
    },
    {
      value: 't && f',
      res: true && false
    },
    {
      value: 'f && f',
      res: false && false
    },
    {
      value: 't || f',
      res: true || false
    },
    {
      value: 't || t',
      res: true || true
    },
    {
      value: 'f || f',
      res: false || false
    },
    {
      value: 'f || f || t',
      res: false || false || true
    },
    {
      value: 'f || (f || t)',
      res: false || (false || true)
    },
    {
      value: '(t && t) || t',
      res: (true && true) || true
    },
    {
      value: '(t && t) || f',
      res: (true && true) || false
    },
    {
      value: '(t && t) || (f && f)',
      res: (true && true) || (false && false)
    },
    {
      value: '(f && t) || (t || f)',
      res: (false && true) || (true || false)
    },
    {
      value: '(f || t) && (f && t)',
      res: (false || true) && (false && true)
    },
    {
      value: '(f || t) && (f || f)',
      res: (false || true) && (false || false)
    },
    {
      value: '((t && t) || (f && f)) || (t && f)',
      res: ((true && true) || (false && false)) || (true && false)
    },
    {
      value: '((t && t) && (f && f)) && (t && f)',
      res: ((true && true) && (false && false)) && (true && false)
    },
    {
      value: 't && t && f',
      res: true && true && false
    },
    {
      value: 't && (t || f)',
      res: true && (true || false)
    },
  ];

  tests.forEach((item) => {
    it(`should return ${item.res} when input is ${item.value}`, function () {
      assert.strictEqual(item.res, parseBoolExpr(item.value));
    })
  })
})
