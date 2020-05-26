//@ts-ignore
Array.prototype._splice = function (index: number, count: number, ...args: any[]) {
  const deletes = [];
  let res = [];
  let pushIndex;
  for(let i = 0; i < this.length; i++){
      if(i === index && args.length){
          pushIndex = i;
      }
      if(i >= index && i < (index+count)){
          deletes.push(this[i]);
          continue;
      }
      res.push(this[i]);
  }
  if(pushIndex !== void 0){
      const left = res.slice(0, pushIndex);
      const right = res.slice(pushIndex, res.length);
      res = [...left, ...args, ...right];
  }
  this.length = 0;
  this.push(...res);
  return deletes;
}
