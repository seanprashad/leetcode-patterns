class Solution {
    public int[] intersection(int[] nums1, int[] nums2) {
        Set<Integer> set = new HashSet<>();
        Set<Integer> intersection = new HashSet<>();

        for (int i = 0; i < nums1.length; i++) {
            set.add(nums1[i]);
        }

        for (int i = 0; i < nums2.length; i++) {
            if (set.contains(nums2[i])) {
                intersection.add(nums2[i]);
            }
        }

        int[] result = new int[intersection.size()];
        int idx = 0;
        for (int i : intersection) {
            result[idx++] = i;
        }

        return result;
    }
}
