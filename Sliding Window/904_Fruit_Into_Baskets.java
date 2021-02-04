class Solution {
    public int totalFruit(int[] tree) {
        if (tree == null || tree.length == 0) {
            return 0;
        }

        Map<Integer, Integer> hm = new HashMap<>();
        int s = 0, e = 0, result = 0;

        while (e < tree.length) {
            hm.put(tree[e], hm.getOrDefault(tree[e], 0) + 1);
            ++e;

            while (hm.size() > 2) {
                hm.put(tree[s], hm.get(tree[s]) - 1);
                if (hm.get(tree[s]) == 0) {
                    hm.remove(tree[s]);
                }
                ++s;
            }

            result = Math.max(result, e - s);
        }

        return result;
    }
}
