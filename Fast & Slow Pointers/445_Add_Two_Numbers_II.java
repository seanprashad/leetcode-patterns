class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        Stack<Integer> st1 = new Stack<>();
        Stack<Integer> st2 = new Stack<>();

        while (l1 != null) {
            st1.push(l1.val);
            l1 = l1.next;
        }

        while (l2 != null) {
            st2.push(l2.val);
            l2 = l2.next;
        }

        ListNode dummy = null;
        int remainder = 0;

        while (!st1.empty() || !st2.empty() || remainder != 0) {
            if (!st1.empty()) {
                remainder += st1.pop();
            }

            if (!st2.empty()) {
                remainder += st2.pop();
            }

            ListNode n = new ListNode(remainder % 10);
            n.next = dummy;
            dummy = n;

            remainder /= 10;
        }

        return dummy;
    }
}
