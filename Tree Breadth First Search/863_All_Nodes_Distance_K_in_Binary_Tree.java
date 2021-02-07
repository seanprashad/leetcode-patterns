class Solution {
    public List<Integer> distanceK(TreeNode root, TreeNode target, int K) {
        if (root == null) {
            return Collections.emptyList();
        }

        List<Integer> result = new ArrayList<>();
        Map<Integer, Set<Integer>> graph = new HashMap<>();
        buildGraph(root, graph);

        Set<Integer> visited = new HashSet<>();
        Queue<Integer> q = new LinkedList<>();
        q.offer(target.val);

        while (K >= 0) {
            int level = q.size();

            for (int i = 0; i < level; i++) {
                int node = q.poll();

                if (visited.contains(node)) {
                    continue;
                }
                visited.add(node);

                if (K == 0) {
                    result.add(node);
                }

                for (int neighbour : graph.get(node)) {
                    q.offer(neighbour);
                }
            }

            K--;
        }

        return result;
    }

    private void buildGraph(TreeNode root, Map<Integer, Set<Integer>> graph) {
        if (root == null) {
            return;
        }

        graph.putIfAbsent(root.val, new HashSet<>());

        if (root.left != null) {
            graph.putIfAbsent(root.left.val, new HashSet<>());

            graph.get(root.val).add(root.left.val);
            graph.get(root.left.val).add(root.val);
        }

        if (root.right != null) {
            graph.putIfAbsent(root.right.val, new HashSet<>());

            graph.get(root.val).add(root.right.val);
            graph.get(root.right.val).add(root.val);
        }

        buildGraph(root.left, graph);
        buildGraph(root.right, graph);
    }
}
