/**
 * 一道合并请求的题目
 * 存在一个可以根据id批量进行请求的服务 fetchBooksInfo
 * 需要设计一个函数getBooksInfo，有以下要求
 * 1、100ms内多次请求，只会发起一个请求
 * 2、如果有请求失败的id，需要进行错误处理
 * 3、接口最多支持100个id的查询
 * 4、查询要去重
 */

const fetchBooksInfo = (bookIds: string[]): Promise<{ id: string }[]> => new Promise(resolve => {
  resolve([{ id: '123' }]);
});

const delay = 100;

let map = {};
let timer = null;

const handler = () => {
  const backUpMap = { ...map };
  map = {};
  const ids = Object.keys(backUpMap);
  if (!ids.length) {
    return;
  }
  fetchBooksInfo(ids).then(res => {
    const resMap = {};
    res.forEach(item => {
      resMap[item.id] = item;
    });

    ids.forEach(id => {
      const promises = backUpMap[id];
      promises.forEach(p => {
        if (resMap[id]) { // 成功了，通知该id下所有的resolve
          p.resolve(resMap[id]);
        } else { // 失败了，通知该id下所有的reject
          p.reject(id + '没有找到');
        }
      })
    });
  });
}

const getBooksInfo = (id: string) => new Promise((resolve, reject) => {
  const prevIds = Object.keys(map);
  map[id] = map[id] || [];
  map[id].push(resolve, reject);
  const curIds = Object.keys(map);

  if (!prevIds.length) { // 如果是第一次请求，就启动一个定时器，到点后消费期间所有的请求
    timer = setTimeout(() => {
      handler();
    }, delay);
  } else if (curIds.length >= 100) { // 超过100个，立马请求
    clearTimeout(timer);
    handler();
  }
});

export default getBooksInfo;
