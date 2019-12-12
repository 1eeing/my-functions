interface ListNode {
  next: ListNode
  value: any
}

const reverseListNode = (listNode: ListNode): ListNode => {
  if (!listNode || !listNode.next) return listNode;
  const next = listNode.next;
  listNode.next = null;
  const cur = reverseListNode(next);
  next.next = listNode;
  return cur;
}
