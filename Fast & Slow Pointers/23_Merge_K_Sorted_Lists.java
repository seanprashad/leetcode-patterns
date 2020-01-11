class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        if (lists == null || lists.length == 0) {
            return null;
        }

        PriorityQueue<ListNode> minHeap = new PriorityQueue<>((a, b) -> a.val - b.val);
        ListNode dummy = new ListNode(-1);
        ListNode curr = dummy;

        for (ListNode l : lists) {
            if (l != null) {
                minHeap.add(l);
            }
        }

        while (!minHeap.isEmpty()) {
            curr.next = minHeap.poll();
            curr = curr.next;

            if (curr.next != null) {
                minHeap.add(curr.next);
            }
        }

        return dummy.next;
    }
}
