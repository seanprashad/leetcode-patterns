import java.util.*;

public class PR2 {

    public static boolean detectCycle(int[][] edgeList) {
        if (edgeList.length == 0) {
            return false;
        }

        Map<Integer, Set<Integer>> graph = new HashMap<>();
        int[] inorder = new int[edgeList.length];

        for (int[] edge : edgeList) {
            graph.putIfAbsent(edge[0], new HashSet<>());
            graph.get(edge[0]).add(edge[1]);

            inorder[edge[1]]++;
        }

        Queue<Integer> q = new LinkedList<>();

        for (int i = 0; i < inorder.length; i++) {
            if (inorder[i] == 0) {
                q.offer(i);
            }
        }

        int nodeCount = 0;

        while (!q.isEmpty()) {
            int key = q.poll();
            ++nodeCount;

            if (!graph.containsKey(key)) {
                continue;
            }

            for (int neighbour : graph.get(key)) {
                inorder[neighbour]--;

                if (inorder[neighbour] == 0) {
                    q.offer(neighbour);
                }
            }
        }

        return edgeList.length - nodeCount > 1;
    }

    public static void main(String[] args) {
        int[][] edgeList1 = new int[][] { { 0, 1 }, { 1, 3 }, { 2, 3 }, { 1, 2 }, { 4, 1 }, { 0, 4 }, { 1, 3 } };
        int[][] edgeList2 = new int[][] { { 0, 1 }, { 1, 3 }, { 2, 3 }, { 3, 4 }, { 1, 2 }, { 4, 1 }, { 0, 4 } };

        System.out.println(detectCycle(edgeList1)); // no cycle - return false
        System.out.println(detectCycle(edgeList2)); // cycle present - return true

        return;
    }
}
