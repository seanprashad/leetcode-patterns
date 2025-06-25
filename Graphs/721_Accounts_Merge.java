class Solution {
    private class UnionFind {
        private Map<String, String> parent;

        public UnionFind() {
            parent = new HashMap<>();
        }

        public String find(String x) {
            // Upon adding a new item, its parent is itself
            parent.putIfAbsent(x, x);

            if (!parent.get(x).equals(x)) {
                parent.put(x, find(parent.get(x))); // Path compression; directly specify the parent via recursion
            }

            return parent.get(x);
        }

        public void union(String x, String y) {
            String rootX = find(x);
            String rootY = find(y);

            if (!rootX.equals(rootY)) {
                parent.put(rootX, rootY);
            }
        }
    }

    public List<List<String>> accountsMerge(List<List<String>> accounts) {
        Map<String, String> emailToName = new HashMap<>();
        UnionFind uf = new UnionFind();

        for (List<String> account : accounts) {
            String name = account.get(0);
            String initialEmail = account.get(1);

            for (int i = 1; i < account.size(); i++) {
                String email = account.get(i);
                emailToName.putIfAbsent(email, name);
                uf.union(initialEmail, email);
            }
        }

        Map<String, TreeSet<String>> unions = new HashMap<>();
        for (String email : emailToName.keySet()) {
            String root = uf.find(email);
            unions.computeIfAbsent(root, x -> new TreeSet<>()).add(email);
        }

        List<List<String>> result = new ArrayList<>();

        for (Map.Entry<String, TreeSet<String>> entry : unions.entrySet()) {
            List<String> temp = new ArrayList<>();
            temp.add(emailToName.get(entry.getKey()));
            temp.addAll(entry.getValue());
            result.add(temp);
        }

        return result;
    }
}
