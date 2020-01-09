const assert = require('assert');
const isEqual = require('../src/utils/isEqual.ts');

describe('isEqual', function() {
  it('should return true when values are equal', function () {
    assert.equal(true, isEqual(1, 1));
  });
  it('should return false when values are not equal', function () {
    assert.equal(false, isEqual(1, 2));
  });
  it('should return false when values are not equal', function () {
    assert.equal(false, isEqual(1, '1'));
  });
  it('should return false when values are not equal', function () {
    assert.equal(false, isEqual(1, false));
  });
  it('should return false when values are not equal', function () {
    assert.equal(false, isEqual(1, true));
  });
  it('should return false when values are not equal', function () {
    assert.equal(false, isEqual(1, NaN));
  });
  it('should return false when values are not equal', function () {
    assert.equal(false, isEqual(1, null));
  });
  it('should return false when values are not equal', function () {
    assert.equal(false, isEqual(1, undefined));
  });
  it('should return false when values are not equal', function () {
    assert.equal(false, isEqual(1, []));
  });
  it('should return false when values are not equal', function () {
    assert.equal(false, isEqual(1, {}));
  });
  it('should return false when values are not equal', function () {
    assert.equal(false, isEqual(1, () => {}));
  });
  it('should return true when values are equal', function () {
    assert.equal(true, isEqual('1', '1'));
  });
  it('should return false when values are not equal', function () {
    assert.equal(false, isEqual('1', true));
  });
  it('should return false when values are not equal', function () {
    assert.equal(false, isEqual('1', NaN));
  });
  it('should return false when values are not equal', function () {
    assert.equal(false, isEqual('1', null));
  });
  it('should return false when values are not equal', function () {
    assert.equal(false, isEqual('1', undefined));
  });
  it('should return false when values are not equal', function () {
    assert.equal(false, isEqual('1', []));
  });
  it('should return false when values are not equal', function () {
    assert.equal(false, isEqual('1', {}));
  });
  it('should return false when values are not equal', function () {
    assert.equal(false, isEqual('1', () => {}));
  });
  it('should return true when values are equal', function () {
    assert.equal(true, isEqual(true, true));
  });
  it('should return true when values are equal', function () {
    assert.equal(true, isEqual(false, false));
  });
  it('should return false when values are not equal', function () {
    assert.equal(false, isEqual(false, NaN));
  });
  it('should return false when values are not equal', function () {
    assert.equal(false, isEqual(false, null));
  });
  it('should return false when values are not equal', function () {
    assert.equal(false, isEqual(false, undefined));
  });
  it('should return false when values are not equal', function () {
    assert.equal(false, isEqual(false, []));
  });
  it('should return false when values are not equal', function () {
    assert.equal(false, isEqual(false, {}));
  });
  it('should return false when values are not equal', function () {
    assert.equal(false, isEqual(true, NaN));
  });
  it('should return false when values are not equal', function () {
    assert.equal(false, isEqual(true, null));
  });
  it('should return false when values are not equal', function () {
    assert.equal(false, isEqual(true, undefined));
  });
  it('should return false when values are not equal', function () {
    assert.equal(false, isEqual(true, () => {}));
  });
  it('should return false when values are not equal', function () {
    assert.equal(false, isEqual(false, () => {}));
  });
  it('should return true when values are equal', function () {
    const testFunc = () => {}
    assert.equal(true, isEqual(testFunc, testFunc));
  });
  it('should return false when values are not equal', function () {
    assert.equal(false, isEqual(() => {}, () => {}));
  });
  it('should return false when values are not equal', function () {
    assert.equal(false, isEqual(() => {}, []));
  });
  it('should return false when values are not equal', function () {
    assert.equal(false, isEqual(() => {}, {}));
  });
  it('should return false when values are not equal', function () {
    assert.equal(false, isEqual(() => {}, null));
  });
  it('should return false when values are not equal', function () {
    assert.equal(false, isEqual(() => {}, undefined));
  });
  it('should return false when values are not equal', function () {
    assert.equal(false, isEqual(() => {}, NaN));
  });
  it('should return true when values are equal', function () {
    assert.equal(true, isEqual(NaN, NaN));
  });
  it('should return true when values are equal', function () {
    assert.equal(true, isEqual(null, null));
  });
  it('should return true when values are equal', function () {
    assert.equal(true, isEqual(undefined, undefined));
  });
  it('should return false when values are not equal', function () {
    assert.equal(false, isEqual(NaN, null));
  });
  it('should return false when values are not equal', function () {
    assert.equal(false, isEqual(NaN, undefined));
  });
  it('should return false when values are not equal', function () {
    assert.equal(false, isEqual(null, undefined));
  });
  it('should return false when values are not equal', function () {
    assert.equal(false, isEqual([], {}));
  });
  it('should return false when values are not equal', function () {
    const a = [1, 2, 3];
    const b = [1, 3, 4];
    assert.equal(false, isEqual(a, b));
  });
  it('should return false when values are not equal', function () {
    const a = [1, [2, 3], 3];
    const b = [1, 3, [2, 3]];
    assert.equal(false, isEqual(a, b));
  });
  it('should return false when values are not equal', function () {
    const a = [1, [2, {a: 1}], 3];
    const b = [1, [2, {a: 2}], 3];
    assert.equal(false, isEqual(a, b));
  });
  it('should return true when values are equal', function () {
    const a = [1, [2, 3], 3];
    const b = [1, [2, 3], 3];
    assert.equal(true, isEqual(a, b));
  });
  it('should return true when values are equal', function () {
    const a = [1, [2, {a: 1}], 3];
    const b = [1, [2, {a: 1}], 3];
    assert.equal(true, isEqual(a, b));
  });
  it('should return true when values are equal', function () {
    const a = [1, 2, 3];
    const b = [1, 2, 3];
    assert.equal(true, isEqual(a, b));
  });
  it('should return true when values are equal', function () {
    const obj1 = { a: 1, b: { c: [2], d: false, e: 3 } };
    const obj2 = { a: 1, b: { c: [2], d: false, e: 3 } };
    assert.equal(true, isEqual(obj1, obj2));
  });
  it('should return false when values are not equal', function () {
    const obj1 = { a: 1, b: { c: [2], d: false, e: 3 } };
    const obj2 = { a: 1, b: { c: [3], d: false, e: 3 } };
    assert.equal(false, isEqual(obj1, obj2));
  });
  it('should return false when values are not equal', function () {
    const obj1 = { a: 1, b: { c: [2], d: false, e: 3 } };
    const obj2 = { a: 1, b: { c: [2], d: true, e: 3 } };
    assert.equal(false, isEqual(obj1, obj2));
  });
  it('should return false when values are not equal', function () {
    const obj1 = { a: 1, b: { c: [2], d: false, e: 3 } };
    const obj2 = { a: 1, b: { c: [2], d: false, e: '123' } };
    assert.equal(false, isEqual(obj1, obj2));
  });
  it('should return false when values are not equal', function () {
    const obj1 = { a: 1, b: { c: [2], d: false, e: 3 } };
    const obj2 = { a: null, b: { c: [2], d: false, e: '123' } };
    assert.equal(false, isEqual(obj1, obj2));
  });
});
