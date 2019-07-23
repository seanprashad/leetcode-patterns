class Solution {
    public void sortColors(int[] nums) {
        if (nums == null || nums.length <= 1) {
            return;
        }

        int j = 0, k = nums.length - 1;

        for (int i = 0; i <= k; i++) {
            if (nums[i] == 0) {
                swap(nums, i, j);
                j++;
            } else if (nums[i] == 2) {
                swap(nums, i, k);
                i--;
                k--;
            }
        }

        return;
    }

    private void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
}
