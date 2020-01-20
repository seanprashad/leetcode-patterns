/**
 * Definition for singly-linked list. public class ListNode { int val; ListNode
 * next; ListNode(int x) { val = x; } }
 */
class Solution {
    public boolean isPalindrome(ListNode head) {
        if (head == null || head.next == null) {
            return true;
        }

        ListNode tortoise = head, hare = head;

        while (hare != null && hare.next != null) {
            tortoise = tortoise.next;
            hare = hare.next.next;
        }

        if (hare != null) {
            tortoise = tortoise.next;
        }

        tortoise = reverse(tortoise);
        hare = head;

        while (tortoise != null) {
            if (tortoise.val != hare.val) {
                return false;
            }

            tortoise = tortoise.next;
            hare = hare.next;
        }

        return true;
    }

    private ListNode reverse(ListNode head) {
        ListNode prev = null;

        while (head != null) {
            ListNode next = head.next;
            head.next = prev;
            prev = head;
            head = next;
        }

        return prev;
    }
}
