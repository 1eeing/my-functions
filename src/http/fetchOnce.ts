const fetchOnce = (fn) => {
  const queue = [];
  let result;
  let error;

  const clearQueue = () => {
    queue.length = 0;
  }

  return new Promise((resolve, reject) => {
    if (result) {
      return resolve(result);
    }
    queue.push(fn);
    while (queue.length) {
      const _fn = queue.shift();
      _fn.then(res => {
        result = res;
        resolve(result);
        clearQueue();
      }).catch(e => {
        error = e;
      })
    }
    if (error) {
      reject(error);
    }
  })
}
