class Solution {
    public Node connect(Node root) {
        if (root == null) {
            return null;
        }

        Queue<Node> q = new LinkedList<>();
        q.offer(root);

        Node placeholder = root;

        while (!q.isEmpty()) {
            int levelSize = q.size();

            for (int i = 0; i < levelSize; i++) {
                Node n = q.poll();
                if (i == levelSize - 1) {
                    n.next = null;
                } else {
                    n.next = q.peek();
                }

                if (n.left != null) {
                    q.offer(n.left);
                }
                if (n.right != null) {
                    q.offer(n.right);
                }
            }
        }

        return placeholder;
    }
}
