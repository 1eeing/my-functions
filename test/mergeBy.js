const assert = require('assert');
const mergeBy = require('../src/structure/mergeBy.ts');

describe('test mergeBy', function () {
  const tests = [
    {
      oldItem: [
        { key: 'userName', value: 'jack', total: 3 },
        {
          key: 'pay', value: 'hahah', total: 0, event_variable: [
            {
              key: 'pay_money',
              value: 'haha',
              total: 4,
            },
            {
              key: 'pay_success',
              value: 10,
              total: 5,
            }
          ]
        }
      ],
      newItem: [
        { key: 'userName', value: 'tom', total: 5 },
        {
          key: 'pay', value: 'xixi', total: 2, event_variable: [
            {
              key: 'pay_money',
              value: 'hehe',
              total: 5,
            },
            {
              key: 'pay_success',
              value: 8,
              total: 5,
            }
          ],
        }],
      value: [
        { key: 'userName', value: 'tom', total: 4, event_variable: [] },
        {
          key: 'pay', value: 'xixi', total: 1, event_variable: [
            {
              key: 'pay_money',
              value: 'hehe',
              total: 4,
              event_variable: [],            },
            {
              key: 'pay_success',
              value: 8,
              total: 13,
              event_variable: [],
            }
          ]
        }
      ]
    },
  ]

  tests.forEach(item => {
    it('should be equal', function () {
      assert.deepStrictEqual(item.value, mergeBy(item.oldItem, item.newItem));
    })
  })
})
