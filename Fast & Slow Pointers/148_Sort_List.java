class Solution {
    public ListNode sortList(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }

        ListNode tortoise = head, hare = head, prev = tortoise;

        while (hare != null && hare.next != null) {
            prev = tortoise;
            tortoise = tortoise.next;
            hare = hare.next.next;
        }

        prev.next = null;

        ListNode h1 = sortList(head);
        ListNode h2 = sortList(tortoise);

        return merge(h1, h2);
    }

    private ListNode merge(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(-1), curr = dummy;

        while (l1 != null && l2 != null) {
            if (l1.val < l2.val) {
                curr.next = l1;
                l1 = l1.next;
            } else {
                curr.next = l2;
                l2 = l2.next;
            }

            curr = curr.next;
        }

        if (l1 != null) {
            curr.next = l1;
        }

        if (l2 != null) {
            curr.next = l2;
        }

        return dummy.next;
    }
}
