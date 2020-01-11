class Solution {
    public ListNode deleteDuplicates(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }

        ListNode curr = head, fast = head.next;

        while (curr != null) {
            while (fast != null && curr.val == fast.val) {
                fast = fast.next;
            }

            curr.next = fast;
            curr = fast;
        }

        return head;
    }
}
