class Solution {
    public List<List<Integer>> kSmallestPairs(int[] nums1, int[] nums2, int k) {
        if (nums1.length == 0 || nums2.length == 0 || k == 0) {
            return Collections.emptyList();
        }

        List<List<Integer>> result = new ArrayList<>();
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> (a[0] + a[1]) - (b[0] + b[1]));

        for (int i = 0; i < nums1.length; i++) {
            pq.offer(new int[] { nums1[i], nums2[0], 0 });
        }

        for (int i = 0; i < Math.min(nums1.length * nums2.length, k); i++) {
            int[] curr = pq.poll();

            List<Integer> temp = new ArrayList<>();
            temp.add(curr[0]);
            temp.add(curr[1]);

            result.add(temp);

            if (curr[2] < nums2.length - 1) {
                int idx = curr[2] + 1;
                pq.offer(new int[] { curr[0], nums2[idx], idx });
            }
        }

        return result;
    }
}
