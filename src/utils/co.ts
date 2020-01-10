// 自动运行generator
const co = (gen: GeneratorFunction) => {
  const g = gen();

  const next = () => {
    const res = g.next();
    if (res.done) return res.value;
    return next();
  }

  next();
}
