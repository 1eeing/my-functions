/**
 * var state = reactive({a: 1, b: 2});
 *
 * watch(() => {
 *  console.log('hello ' + state.a);
 * });
 *
 * state.a++ // hello 2
 */

var listeners = [];
let inWatch = false
function watch(effect) {
  listeners.push(() => {
    try {
      inWatch = true;
      effect();
    } catch (e) { } finally {
      inWatch = false;
    }
  });
}

function reactive(obj) {
  let current = null;

  return new Proxy(obj, {
    get(target, key) {
      if (!inWatch) {
        return target[key];
      }
      if (current && current.key === key) {
        return current.value;
      }
      throw Error('error');
    },

    set(target, key, value) {
      current = {key, value};
      listeners.forEach(fn => {
        fn();
      });
      return target[key] = value;
    }
  })
}

var obj = reactive({ a: 1, b: 2 });

watch(() => {
  console.log('a change', obj.a);
})

watch(() => {
  console.log('b change', obj.b);
})

obj.a++;
// obj.b++;
