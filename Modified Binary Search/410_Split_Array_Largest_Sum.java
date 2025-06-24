class Solution {
    public int splitArray(int[] nums, int k) {
        int sum = 0, largestVal = Integer.MIN_VALUE;

        for (int num : nums) {
            sum += num;
            largestVal = Math.max(largestVal, num);
        }
        
        int low = largestVal, high = sum;
        while (low < high) {
            int mid = low + (high - low) / 2;

            if (splitArrayHelper(nums, mid, k)) {
                high = mid;
            } else {
                low = mid + 1;
            }
        }

        return low;
    }

    private boolean splitArrayHelper(int[] nums, int maxSumAllowed, int k) {
        int sum = 0, count = 1;

        for (int num : nums) {
            if (num + sum > maxSumAllowed) {
                ++count;
                sum = num;
            } else {
                sum += num;
            }
        }

        return count <= k;
    }
}
