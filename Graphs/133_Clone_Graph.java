class Solution {
    public Node cloneGraph(Node node) {
        Map<Node, Node> m = new HashMap<>();
        return helper(node, m);
    }

    private Node helper(Node node, Map<Node, Node> m) {
        if (node == null) {
            return null;
        }

        if (m.containsKey(node)) {
            return m.get(node);
        }

        Node copy = new Node(node.val);
        m.put(node, copy);

        for (Node neighbour : node.neighbors) {
            Node neighbourCopy = helper(neighbour, m);
            m.get(node).neighbors.add(neighbourCopy);
        }

        return m.get(node);
    }
}
