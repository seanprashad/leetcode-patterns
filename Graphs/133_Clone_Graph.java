class Solution {
    public Node cloneGraph(Node node) {
        if (node == null) {
            return null;
        }

        Map<Node, Node> map = new HashMap<>();
        map.put(node, new Node(node.val));

        Queue<Node> q = new LinkedList<>();
        q.offer(node);

        while (!q.isEmpty()) {
            Node n = q.poll();

            for (Node neighbor : n.neighbors) {
                if (!map.containsKey(neighbor)) {
                    map.put(neighbor, new Node(neighbor.val));
                    q.offer(neighbor);
                }

                map.get(n).neighbors.add(map.get(neighbor));
            }
        }

        return map.get(node);
    }
}