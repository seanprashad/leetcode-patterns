class Solution {
    public List<List<String>> accountsMerge(List<List<String>> accounts) {
        List<List<String>> result = new ArrayList<>();

        Map<String, Set<String>> graph = new HashMap<>();
        Map<String, String> emailsToNames = new HashMap<>();

        for (List<String> account : accounts) {
            String name = account.get(0);

            for (int i = 1; i < account.size(); i++) {
                graph.putIfAbsent(account.get(i), new HashSet<>());
                emailsToNames.put(account.get(i), name);

                if (i == 1) {
                    continue;
                }

                graph.get(account.get(i)).add(account.get(i - 1));
                graph.get(account.get(i - 1)).add(account.get(i));
            }
        }

        Set<String> visited = new HashSet<>();

        for (String key : graph.keySet()) {
            List<String> temp = new ArrayList<>();
            if (visited.add(key)) {
                dfs(graph, visited, key, temp);
                Collections.sort(temp);
                temp.add(0, emailsToNames.get(key));
                result.add(temp);
            }
        }

        return result;
    }

    private void dfs(Map<String, Set<String>> graph, Set<String> visited, String email, List<String> temp) {
        temp.add(email);

        for (String neighbour : graph.get(email)) {
            if (visited.add(neighbour)) {
                dfs(graph, visited, neighbour, temp);
            }
        }
    }
}
