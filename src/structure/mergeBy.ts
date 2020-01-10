interface Obj {
  key: string
  total: number
  value: string | number
  event_variable?: Obj[]
}

const mergeBy = (arr1: Obj[] = [], arr2: Obj[] = [], aggrator: 'sum' | 'count' = 'count') => {
  const map = {};
  if (!arr1.length) return arr2;
  if (!arr2.length) return arr1;
  arr1.forEach(item => {
    map[item.key] = item;
  });
  const res = arr2.map(item => {
    const oldItem = map[item.key];
    if (!oldItem) {
      return item;
    }
    const value = Number(item.value) || 0;
    const oldTotal = oldItem.total || 0;
    return {
      ...oldItem,
      ...item,
      total: oldTotal + (aggrator === 'count' ? 1 : value),
      event_variable: mergeBy(oldItem.event_variable, item.event_variable, 'sum'),
    }
  })
  return res;
}

module.exports = mergeBy;
