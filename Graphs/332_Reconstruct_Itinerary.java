class Solution {
    public List<String> findItinerary(List<List<String>> tickets) {
        if (tickets == null || tickets.size() == 0) {
            return Collections.emptyList();
        }

        LinkedList<String> result = new LinkedList<>();
        Map<String, PriorityQueue<String>> graph = new HashMap<>();

        for (List<String> t : tickets) {
            graph.putIfAbsent(t.get(0), new PriorityQueue<>());
            graph.get(t.get(0)).add(t.get(1));
        }

        dfs("JFK", graph, result);

        return result;
    }

    private void dfs(String departure, Map<String, PriorityQueue<String>> graph, LinkedList<String> path) {
        PriorityQueue<String> arrivals = graph.get(departure);

        while (arrivals != null && !arrivals.isEmpty()) {
            dfs(arrivals.poll(), graph, path);
        }

        path.addFirst(departure);
    }
}
