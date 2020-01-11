class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode prev = new ListNode(0);
        ListNode head = prev;

        int carry = 0;

        while (l1 != null || l2 != null | carry != 0) {
            ListNode curr = new ListNode(0);
            int sum = 0 + carry;

            if (l1 != null) {
                sum += l1.val;
                l1 = l1.next;
            }

            if (l2 != null) {
                sum += l2.val;
                l2 = l2.next;
            }

            curr.val = sum % 10;
            carry = sum / 10;
            prev.next = curr;
            prev = prev.next;
        }

        return head.next;
    }
}
