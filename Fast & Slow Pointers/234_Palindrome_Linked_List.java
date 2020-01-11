class Solution {
    public boolean isPalindrome(ListNode head) {
        if (head == null || head.next == null) {
            return true;
        }

        Stack<Integer> stack = new Stack<>();

        ListNode curr = head;

        while (curr != null) {
            stack.push(curr.val);
            curr = curr.next;
        }

        while (!stack.isEmpty()) {
            if (head.val != stack.pop()) {
                return false;
            }
            head = head.next;
        }

        return true;
    }
}
