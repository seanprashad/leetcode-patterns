class Solution {
    public Node cloneGraph(Node node) {
        if (node == null) {
            return null;
        }

        Queue<Node> q = new LinkedList<>();
        Map<Node, Node> clones = new HashMap<>();

        clones.put(node, new Node(node.val, new ArrayList<>()));
        q.offer(node);

        while (!q.isEmpty()) {
            Node n = q.poll();

            for (Node neighbour : n.neighbors) {
                if (!clones.containsKey(neighbour)) {
                    clones.put(neighbour, new Node(neighbour.val, new ArrayList<>()));
                    q.offer(neighbour);
                }
                clones.get(n).neighbors.add(clones.get(neighbour));
            }
        }

        return clones.get(node);
    }
}
