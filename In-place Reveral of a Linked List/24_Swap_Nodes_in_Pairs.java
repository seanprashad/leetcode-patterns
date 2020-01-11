class Solution {
    public ListNode swapPairs(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }

        ListNode dummy = new ListNode(-1);
        dummy.next = head;
        ListNode p0 = dummy;

        while (p0.next != null && p0.next.next != null) {
            ListNode p1 = p0.next;
            ListNode p2 = p0.next.next;

            p0.next = p2;
            p1.next = p2.next;
            p2.next = p1;
            p0 = p1;
        }

        return dummy.next;
    }
}
