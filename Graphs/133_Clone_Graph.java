class Solution {
    public Node cloneGraph(Node node) {
        Map<Node, Node> map = new HashMap<>();
        return helper(node, map);
    }

    private Node helper(Node node, Map<Node, Node> visited) {
        if (node == null) {
            return null;
        }

        if (visited.containsKey(node)) {
            return visited.get(node);
        }

        Node cloned = new Node(node.val);
        visited.put(node, cloned);

        for (Node n : node.neighbors) {
            cloned.neighbors.add(helper(n, visited));
        }

        return cloned;
    }
}
