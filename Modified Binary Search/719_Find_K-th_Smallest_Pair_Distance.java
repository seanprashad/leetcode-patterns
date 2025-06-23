class Solution {
    public int smallestDistancePair(int[] nums, int k) {
        Arrays.sort(nums);
        int low = 0, high = nums[nums.length - 1] - nums[0];

        while (low < high) {
            int mid = low + (high - low) / 2;

            int count = smallestDistancePairHelper(nums, mid);
            if (count < k) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }

        return low;
    }

    private int smallestDistancePairHelper(int[] nums, int maxValue) {
        int left = 0, right = 0, count = 0;

        while (right < nums.length) {
            while (left < right && nums[right] - nums[left] > maxValue) {
                ++left;
            }

            count += right - left;
            ++right;
        }

        return count;
    }
}
