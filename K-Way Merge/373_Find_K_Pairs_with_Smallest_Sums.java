class Solution {
    public List<List<Integer>> kSmallestPairs(int[] nums1, int[] nums2, int k) {
        if (nums1 == null || nums2 == null || nums1.length == 0 || nums2.length == 0) {
            return Collections.emptyList();
        }

        List<List<Integer>> result = new ArrayList<>();
        PriorityQueue<int[]> pq = new PriorityQueue<int[]>((p1, p2) -> (p1[0] + p1[1]) - (p2[0] + p2[1]));

        for (int i = 0; i < nums1.length; i++) {
            pq.offer(new int[] { nums1[i], nums2[0], 0 });
        }

        for (int i = 0; i < Math.min(nums1.length * nums2.length, k); i++) {
            int[] pair = pq.poll();

            result.add(Arrays.asList(pair[0], pair[1]));

            if (pair[2] < nums2.length - 1) {
                int nextIdx = pair[2] + 1;
                pq.offer(new int[] { pair[0], nums2[nextIdx], nextIdx });
            }
        }

        return result;
    }
}
