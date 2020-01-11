interface Obj {
  key: string
  total: number
  value: string | number
  event_variable?: Obj[]
}

const mergeBy = (arr1: Obj[] = [], arr2: Obj[] = [], aggrator: 'sum' | 'count' = 'count'): Obj[] => {
  const finalArr = [...arr1, ...arr2];
  const map = {};
  finalArr.forEach(item => {
    const key = item.key;
    if (!map[key]) {
      map[key] = item;
      return;
    }
    const oldItem = map[key];
    const value = Number(item.value) || 0;
    const oldTotal = Number(oldItem.total) || 0;
    map[key] = {
      ...oldItem,
      ...item,
      total: oldTotal + (aggrator === 'count' ? 1 : value),
      event_variable: mergeBy(oldItem.event_variable, item.event_variable, 'sum'),
    }
  })
  return Object.values(map);
}

module.exports = mergeBy;
