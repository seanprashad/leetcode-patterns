class Solution {
    public int[] nextGreaterElement(int[] nums1, int[] nums2) {
        Map<Integer, Integer> hm = new HashMap<>();
        Stack<Integer> s = new Stack<>();
        int[] result = new int[nums1.length];

        for (int num : nums2) {
            while (!s.isEmpty() && num > s.peek()) {
                hm.put(s.pop(), num);
            }

            s.push(num);
        }

        for (int i = 0; i < nums1.length; i++) {
            result[i] = hm.getOrDefault(nums1[i], -1);
        }

        return result;
    }
}
