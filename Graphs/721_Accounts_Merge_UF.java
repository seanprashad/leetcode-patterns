class Solution {
    public List<List<String>> accountsMerge(List<List<String>> accounts) {
        List<List<String>> result = new ArrayList<>();

        int n = accounts.size();

        UnionFind uf = new UnionFind(n);

        Map<String, Integer> emailToAccountIdx = new HashMap<>();

        /*
         * If we've seen an e-mail before, it means that it belongs to a previous
         * account! All we need to do is grab the idx of the account that it belongs to
         * and update our parents[] array in our UnionFind object using the union()
         * method
         */
        for (int i = 0; i < accounts.size(); i++) {
            for (int j = 1; j < accounts.get(i).size(); j++) {
                String email = accounts.get(i).get(j);

                if (emailToAccountIdx.containsKey(email)) {
                    /*
                     * If we've seen this e-mail before, it means that all e-mails in this new
                     * account actually belong to an existing user
                     *
                     * In this case, we can grab the account index of the user we've previously
                     * encountered and set it as the parent for this account
                     *
                     * For example, if account ID 2 already had "johnsmith@mail.com" and for account
                     * 7, we encounter "johnsmith@mail.com" once more, it means that ALL emails in
                     * account 7 actually belong to account 2!
                     *
                     * How do we represent this? By setting the parent of account 7 to point to
                     * account 2, or in more general terms, setting the parent ID of the current
                     * account to be the ID of the account for the email we've previously seen
                     */
                    int previousParent = emailToAccountIdx.get(email);
                    uf.union(previousParent, i);
                } else {
                    emailToAccountIdx.put(email, i);
                }
            }
        }

        Map<Integer, Set<String>> accountEmails = new HashMap<>();

        for (int i = 0; i < accounts.size(); i++) {
            int parent = uf.findParent(i);
            List<String> emails = accounts.get(i);

            accountEmails.putIfAbsent(parent, new HashSet<>());
            accountEmails.get(parent).addAll(emails.subList(1, emails.size()));
        }

        for (int key : accountEmails.keySet()) {
            List<String> temp = new ArrayList<>();
            temp.addAll(accountEmails.get(key));
            Collections.sort(temp);
            temp.add(0, accounts.get(key).get(0));
            result.add(temp);
        }

        return result;
    }

    private class UnionFind {
        private int[] parents;

        public UnionFind(int n) {
            parents = new int[n];

            for (int i = 0; i < n; i++) {
                parents[i] = i;
            }
        }

        public int findParent(int account) {
            if (parents[account] == account) {
                return account;
            }

            parents[account] = findParent(parents[account]);
            return parents[account];
        }

        public void union(int p1, int p2) {
            int i = findParent(p1), j = findParent(p2);
            parents[j] = i;
        }
    }
}
