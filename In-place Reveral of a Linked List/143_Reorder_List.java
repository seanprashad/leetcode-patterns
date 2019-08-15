class Solution {
    public void reorderList(ListNode head) {
        if (head == null) {
            return;
        }

        ListNode slow = head, fast = head;

        while (fast.next != null && fast.next.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }

        ListNode head2 = reverse(slow.next);
        slow.next = null;

        while (head != null && head2 != null) {
            ListNode t1 = head.next;
            ListNode t2 = head2.next;

            head.next = head2;
            head2.next = t1;

            head = t1;
            head2 = t2;
        }
    }

    private ListNode reverse(ListNode head) {
        ListNode prev = null, curr = head;

        while (curr != null) {
            ListNode tmp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = tmp;
        }

        return prev;
    }
}
