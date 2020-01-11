class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        if (lists == null || lists.length == 0) {
            return null;
        }

        ListNode dummy = new ListNode(-1);
        ListNode curr = dummy;

        PriorityQueue<ListNode> pq = new PriorityQueue<>((l1, l2) -> l1.val - l2.val);

        for (ListNode ln : lists) {
            if (ln != null) {
                pq.offer(ln);
            }
        }

        while (!pq.isEmpty()) {
            ListNode l = pq.poll();

            if (l.next != null) {
                pq.offer(l.next);
            }

            curr.next = l;
            curr = curr.next;
        }

        return dummy.next;
    }
}
