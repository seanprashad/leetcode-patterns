class Solution {
    public Node connect(Node root) {
        if (root == null) {
            return null;
        }

        Node curr = root;

        while (curr != null) {
            Node next = curr.left;

            if (next == null) {
                break;
            }

            while (curr != null) {
                curr.left.next = curr.right;

                if (curr.next != null) {
                    curr.right.next = curr.next.left;
                }

                curr = curr.next;
            }

            curr = next;
        }

        return root;
    }
}
