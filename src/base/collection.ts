/**
 * 垃圾回收简易版代码演示
 */

// 使用这个结构表示内存
interface MemoryNode {
  cons: MemoryNode | null
  cdr: MemoryNode | null
  mark: 1 | 0 // 用于标识是否有引用
}

// -------- 最基础的标记清除算法 --------
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



// -------- 优化版标记清除算法 --------
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



// --------- v8下的垃圾回收机制 --------
// 首先分为新生代和老生代
// 新生代内存空间较小，存放一些短期存在的内存；老生代内存较大，存放一些长期存在的内存
//
// 由于新生代是用来存放短期存在的内存，于是collect2的算法就很适合他
// 新生代中一半空间命名为from，一半空间命名为to，from空间中复制出内存到to空间中，然后to空间再和from空间进行交换，以此完成新生代的垃圾回收
// 当一个内存节点经过多次交换过后，依然存在，则说明该内存是长期存在的内存，于是晋升到老生代中
//
// 老生代中采用上述的collect算法。因为老生代中内存空间较大，再使用空间复杂度高的算法就不合适了
// 使用collect算法垃圾回收后，会剩下一堆不连续的内存，在需要大的连续内存的时候，内存依然不够了
// 所以，老生代中还存在一个compact算法，用于在collect之后合并不连续的内存
