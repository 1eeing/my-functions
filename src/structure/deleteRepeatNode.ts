/**
 * 82. 删除排序链表中的重复元素 II
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

 class ListNode {
   val: number;
   next: ListNode | null;
   constructor(val?: number, next?: ListNode | null) {
     this.val = val === undefined ? 0 : val;
     this.next = next === undefined ? null : next;
   }
 }

 function deleteDuplicates(head: ListNode | null): ListNode | null {
    if (!head) return head;

    // 哑巴节点
    const dummy = new ListNode(0, head);

    let cur = dummy;
    while (cur.next && cur.next.next) {
        if (cur.next.val === cur.next.next.val) {
            const x = cur.next.val;
            while (cur.next && cur.next.val === x) {
                cur.next = cur.next.next;
            }
        } else {
            cur = cur.next;
        }
    }
    return dummy.next;
 };
