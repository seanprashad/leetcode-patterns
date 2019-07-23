class Solution {
    public ListNode rotateRight(ListNode head, int k) {
        if (head == null || head.next == null) {
            return head;
        }

        ListNode runner = head;
        int len = 1;

        while (runner.next != null) {
            runner = runner.next;
            len++;
        }

        runner.next = head;

        k = k % len;

        for (int i = 0; i < (len - k); i++) {
            runner = runner.next;
        }

        head = runner.next;
        runner.next = null;
        return head;
    }
}
