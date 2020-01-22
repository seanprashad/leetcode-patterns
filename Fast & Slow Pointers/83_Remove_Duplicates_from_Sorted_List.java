class Solution {
    public ListNode deleteDuplicates(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }

        ListNode curr = head, prev = head;

        while (curr != null) {
            if (prev.val == curr.val) {
                curr = curr.next;
            } else {
                prev.next = curr;
                prev = prev.next;
            }
        }

        prev.next = curr;

        return head;
    }
}
