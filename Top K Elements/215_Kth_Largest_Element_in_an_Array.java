class Solution {
    public int findKthLargest(int[] nums, int k) {
        if (nums == null || nums.length == 0) {
            return 0;
        }

        int low = 0, high = nums.length - 1;
        k = nums.length - k;

        while (low < high) {
            int position = quickSelect(nums, low, high);

            if (position == k) {
                break;
            } else if (position < k) {
                low = position + 1;
            } else {
                high = position - 1;
            }
        }

        return nums[k];
    }

    private int quickSelect(int[] nums, int low, int high) {
        int idx = low, pivot = high;
        int pivot_value = nums[pivot];

        for (int i = low; i < high; i++) {
            if (nums[i] < pivot_value) {
                swap(nums, i, idx);
                ++idx;
            }
        }

        swap(nums, idx, high);
        return idx;
    }

    private void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
        return;
    }
}
