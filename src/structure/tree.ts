interface Tree {
    value: any
    left?: Tree
    right?: Tree
}

/**
 * 前序遍历，指的是根节点在前访问，左右两个子节点依次在后访问
 * 一般用于依次打印树的结构
 */
export const preTreeMap = (tree: Tree): void => {
    console.log(tree.value);
    preTreeMap(tree.left);
    preTreeMap(tree.right);
}

/**
 * 中序遍历，指的是根节点在中间访问，先访问左节点，最后访问右节点
 * 一般用于将树从左到右排序
 */
export const midTreeMap = (tree: Tree): void => {
    midTreeMap(tree.left);
    console.log(tree.value);
    midTreeMap(tree.right);
}

/**
 * 后续遍历，指的是根节点最后访问，先依次访问左右两个节点
 * 一般用于先操作子节点，再操作父节点的场景
 */
export const backTreeMap = (tree: Tree): void => {
    backTreeMap(tree.left);
    backTreeMap(tree.right);
    console.log(tree.value);
}

/**
 * 层序遍历
 */
export const sequenceMap = (tree: Tree): void => {
    const queue: Tree[] = [];
    queue.push(tree);
    while(queue.length){
        const root = queue.shift();
        console.log(root.value);
        root.left && queue.push(root.left);
        root.right && queue.push(root.right);
    }
}

const tree: Tree = {
  value: '1',
  left: {
    value: '2-1',
    left: {
      value: '3-1',
      left: {
        value: '4-1',
      },
      right: {
        value: '4-2',
      }
    }
  },
  right: {
    value: '2-2',
    left: {
      value: '3-2',
      left: {
        value: '4-3',
      },
      right: {
        value: '4-4',
      }
    }
  }
}

sequenceMap(tree)
