class Solution {
    public ListNode reverseBetween(ListNode head, int m, int n) {
        if (head == null) {
            return null;
        }

        ListNode dummy = new ListNode(-1);
        dummy.next = head;

        ListNode prev = dummy;

        for (int i = 0; i < m - 1; i++) {
            prev = prev.next;
        }

        ListNode start = prev.next;

        for (int i = 0; i < n - m; i++) {
            ListNode then = start.next;

            start.next = then.next;
            then.next = prev.next;
            prev.next = then;
        }

        return dummy.next;
    }
}
