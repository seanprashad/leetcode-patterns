class Solution {
    public Node connect(Node root) {
        Node head = root, prev = root;

        while (prev != null) {
            Node curr = prev;

            while (curr != null) {
                if (curr.left != null) {
                    curr.left.next = curr.right;
                }

                if (curr.right != null && curr.next != null) {
                    curr.right.next = curr.next.left;
                }

                curr = curr.next;
            }

            prev = prev.left;
        }

        return head;
    }
}
