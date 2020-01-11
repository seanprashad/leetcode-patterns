class Solution {
    public ListNode reverseList(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }

        ListNode prev = null, curr = head, next = head;

        while (next != null) {
            next = next.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }

        return prev;
    }
}
