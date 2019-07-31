class Solution {
    public Node connect(Node root) {
        Node head = root, dummy = new Node(), prev = dummy;

        while (root != null) {
            if (root.left != null) {
                prev.next = root.left;
                prev = prev.next;
            }

            if (root.right != null) {
                prev.next = root.right;
                prev = prev.next;
            }

            root = root.next;

            if (root == null) {
                root = dummy.next;
                prev = dummy;
                dummy.next = null;
            }
        }

        return head;
    }
}
