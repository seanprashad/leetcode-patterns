class Solution {
    public ListNode deleteDuplicates(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }

        ListNode dummy = new ListNode(-1), slow = dummy, fast = head;
        dummy.next = head;

        while (fast != null) {
            while (fast.next != null && fast.next.val == fast.val) {
                fast = fast.next;
            }

            if (slow.next != fast) {
                slow.next = fast.next;
                fast = fast.next;
            } else {
                slow = slow.next;
                fast = fast.next;
            }
        }

        return dummy.next;
    }
}
