class Solution {
    public int findUnsortedSubarray(int[] nums) {
        if (nums == null || nums.length == 0) {
            return 0;
        }

        int[] temp = nums.clone();
        int left = 0, right = temp.length - 1;

        Arrays.sort(temp);

        while (left <= right && nums[left] == temp[left]) {
            ++left;
        }
        while (left <= right && nums[right] == temp[right]) {
            --right;
        }

        return right - left + 1;
    }
}
