class Solution {
    public List<List<Integer>> getSkyline(int[][] buildings) {
        List<List<Integer>> result = new ArrayList<>();
        List<int[]> heights = new ArrayList<>();

        for (int[] building : buildings) {
            heights.add(new int[] { building[0], -building[2] });
            heights.add(new int[] { building[1], building[2] });
        }

        Collections.sort(heights, (a, b) -> {
            if (a[0] == b[0])
                return a[1] - b[1];
            return a[0] - b[0];
        });

        TreeMap<Integer, Integer> pq = new TreeMap<>();
        int prevMaxHeight = 0;

        pq.put(prevMaxHeight, 1);

        for (int[] h : heights) {
            int xCoord = h[0];
            int height = h[1];

            if (height < 0) {
                pq.put(-height, pq.getOrDefault(-height, 0) + 1);
            } else {
                if (pq.get(height) > 1) {
                    pq.put(height, pq.get(height) - 1);
                } else {
                    pq.remove(height);
                }
            }

            int maxHeightAtXCoord = pq.lastKey();

            if (maxHeightAtXCoord != prevMaxHeight) {
                result.add(Arrays.asList(new Integer[] { xCoord, maxHeightAtXCoord }));
                prevMaxHeight = maxHeightAtXCoord;
            }
        }

        return result;
    }
}
