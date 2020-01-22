class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(-1), head = dummy;
        int remainder = 0;

        while (l1 != null || l2 != null || remainder > 0) {
            int sum = remainder;

            if (l1 != null) {
                sum += l1.val;
                l1 = l1.next;
            }

            if (l2 != null) {
                sum += l2.val;
                l2 = l2.next;
            }

            remainder = sum / 10;

            head.next = new ListNode(sum % 10);
            head = head.next;
        }

        return dummy.next;
    }
}
