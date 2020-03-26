class Solution {
    public Node connect(Node root) {
        if (root == null) {
            return null;
        }

        Node leftMostNode = root;

        while (leftMostNode.left != null) {
            Node head = leftMostNode;

            while (head != null) {
                head.left.next = head.right;

                if (head.next != null) {
                    head.right.next = head.next.left;
                }

                head = head.next;
            }

            leftMostNode = leftMostNode.left;
        }

        return root;
    }
}
