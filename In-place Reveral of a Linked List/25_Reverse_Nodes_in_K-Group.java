class Solution {
    public ListNode reverseKGroup(ListNode head, int k) {
        if (head == null || head.next == null || k <= 1) {
            return head;
        }

        ListNode dummy = new ListNode(-1);
        dummy.next = head;
        ListNode begin = dummy;
        int cnt = 0;

        while (head != null) {
            ++cnt;

            if (cnt % k == 0) {
                begin = reverse(begin, head.next);
                head = begin.next;
            } else {
                head = head.next;
            }
        }

        return dummy.next;
    }

    private ListNode reverse(ListNode begin, ListNode end) {
        ListNode prev = begin.next, curr = begin.next.next;

        while (curr != end) {
            prev.next = curr.next;
            curr.next = begin.next;
            begin.next = curr;
            curr = prev.next;
        }

        return prev;
    }
}
