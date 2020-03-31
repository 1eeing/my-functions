/**
 * 垃圾回收简易版代码演示
 */

// 使用这个结构表示内存
interface MemoryNode {
  cons: any
  cdr: any
  mark: 1 | 0 // 用于标识是否有引用
}

// -------- 最基础的算法 --------
const memory = {} as MemoryNode;
// 标记引用
const collect = (root: MemoryNode) => {
  if (root.cons) {
    root.mark = 1;
    collect(root.cons);
  }
  if (root.cdr) {
    root.mark = 1;
    collect(root.cdr);
  }
}

// 开始标记
collect(memory);

// 标记完之后遍历全部的内存，去掉没有标记的，将有标记的重置为0
const tranverse = (root: MemoryNode) => {
  if (root.mark === 0) {
    root = null;
    return;
  } else {
    root.mark = 0;
  }
  if (root.cons) {
    tranverse(root.cons);
  }
  if (root.cdr) {
    tranverse(root.cdr);
  }
}

// 执行tranverse，完成垃圾回收
tranverse(memory);



// -------- 优化版 --------
// 不再标记，将有引用的copy到新内存中，最后用新内存覆盖旧的内存
let memory2 = {} as MemoryNode;
let tempMemory = {} as MemoryNode;

const collect2 = (root: MemoryNode, temp: MemoryNode) => {
  if (root.cons) {
    temp.cons = root.cons;
    collect2(root.cons, temp.cons);
  }
  if (root.cdr) {
    temp.cdr = root.cdr;
    collect2(root.cdr, temp.cdr);
  }
}

collect2(memory2, tempMemory);
memory2 = tempMemory;
tempMemory = null;
