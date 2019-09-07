class Solution {
    public void nextPermutation(int[] nums) {
        if (nums == null || nums.length == 0) {
            return;
        }

        int n = nums.length - 1, idx = -1;

        for (int i = n - 1; i >= 0; i--) {
            if (nums[i] < nums[i + 1]) {
                idx = i;
                break;
            }
        }

        if (idx == -1) {
            reverseArray(nums, 0, n);
            return;
        }

        for (int i = n; i >= 0; i--) {
            if (nums[i] > nums[idx]) {
                swap(nums, i, idx);
                break;
            }
        }

        reverseArray(nums, idx + 1, n);
    }

    private void reverseArray(int[] nums, int start, int end) {
        while (start < end) {
            swap(nums, start, end);
            ++start;
            --end;
        }
    }

    private void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
}
