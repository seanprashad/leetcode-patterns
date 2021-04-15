import java.util.*;

public class PR1 {

    public static boolean detectCycle(int[][] edgeList) {
        if (edgeList.length == 0) {
            return false;
        }

        Map<Integer, Set<Integer>> graph = new HashMap<>();

        for (int[] edge : edgeList) {
            graph.putIfAbsent(edge[0], new HashSet<>());
            graph.get(edge[0]).add(edge[1]);
        }

        for (int key : graph.keySet()) {
            Set<Integer> visited = new HashSet<>();

            if (dfs(graph, key, visited)) {
                return true;
            }
        }

        return false;
    }

    private static boolean dfs(Map<Integer, Set<Integer>> graph, int startNode, Set<Integer> visited) {
        if (visited.contains(startNode)) {
            return true;
        }

        visited.add(startNode);

        for (int neighbour : graph.getOrDefault(startNode, new HashSet<>())) {
            if (dfs(graph, neighbour, visited)) {
                return true;
            }
        }

        visited.remove(startNode);
        return false;
    }

    public static void main(String[] args) {
        int[][] edgeList1 = new int[][] { { 0, 1 }, { 1, 3 }, { 2, 3 }, { 1, 2 }, { 4, 1 }, { 0, 4 }, { 1, 3 } };
        int[][] edgeList2 = new int[][] { { 0, 1 }, { 1, 3 }, { 2, 3 }, { 3, 4 }, { 1, 2 }, { 4, 1 }, { 0, 4 } };

        System.out.println(detectCycle(edgeList1)); // no cycle - return false
        System.out.println(detectCycle(edgeList2)); // cycle present - return true

        return;
    }
}
