class Solution {
    public int[] intersect(int[] nums1, int[] nums2) {
        if (nums1 == null || nums2 == null) {
            return new int[0];
        }

        if (nums2.length > nums1.length) {
            return intersect(nums2, nums1);
        }

        Map<Integer, Integer> map = new HashMap<>();
        List<Integer> result = new ArrayList<>();

        for (int num : nums2) {
            map.put(num, map.getOrDefault(num, 0) + 1);
        }

        for (int num : nums1) {
            int frequency = map.getOrDefault(num, 0);

            if (frequency > 0) {
                result.add(num);
                map.put(num, frequency - 1);
            }
        }

        int[] arr = new int[result.size()];
        for (int i = 0; i < arr.length; i++) {
            arr[i] = result.get(i);
        }

        return arr;
    }
}
