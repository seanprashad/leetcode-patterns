class Solution {
    public boolean isBipartite(int[][] graph) {
        int[] colours = new int[graph.length];

        for (int i = 0; i < graph.length; i++) {
            if (colours[i] == 0 && !hasValidColour(graph, colours, i, 1)) {
                return false;
            }
        }

        return true;
    }

    private boolean hasValidColour(int[][] graph, int[] colours, int idx, int colour) {
        if (colours[idx] != 0) {
            return colours[idx] == colour;
        }

        colours[idx] = colour;

        for (int neighbour : graph[idx]) {
            if (!hasValidColour(graph, colours, neighbour, -colour)) {
                return false;
            }
        }

        return true;
    }
}
