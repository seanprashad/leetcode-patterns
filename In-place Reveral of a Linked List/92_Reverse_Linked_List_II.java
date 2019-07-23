class Solution {
    public ListNode reverseBetween(ListNode head, int m, int n) {
        ListNode dummy = new ListNode(-1);
        dummy.next = head;

        ListNode begin = dummy;

        for (int i = 0; i < m - 1; i++) {
            begin = begin.next;
        }

        ListNode start = begin.next, then = start.next;

        for (int i = 0; i < n - m; i++) {
            start.next = then.next;
            then.next = begin.next;
            begin.next = then;
            then = start.next;
        }

        return dummy.next;
    }
}
