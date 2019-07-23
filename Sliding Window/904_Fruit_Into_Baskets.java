class Solution {
    public int totalFruit(int[] tree) {
        if (tree == null || tree.length == 0) {
            return 0;
        }

        int start = 0, end = 0, result = 0;
        Map<Integer, Integer> hm = new HashMap<>();

        while (end < tree.length) {
            hm.put(tree[end], end++);

            if (hm.size() > 2) {
                int minIdx = Collections.min(hm.values());
                start = minIdx + 1;

                hm.remove(tree[minIdx]);
            }

            result = Math.max(result, end - start);
        }

        return result;
    }
}
