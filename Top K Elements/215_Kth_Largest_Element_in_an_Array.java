class Solution {
    public int findKthLargest(int[] nums, int k) {
        int start = 0, end = nums.length - 1, target = nums.length - k;

        while (start < end) {
            int pivot = partition(nums, start, end);

            if (pivot == target) {
                return nums[pivot];
            } else if (pivot < target) {
                start = pivot + 1;
            } else {
                end = pivot - 1;
            }
        }

        return nums[start];
    }

    private int partition(int[] nums, int start, int end) {
        int pivot = start;

        while (start <= end) {
            while (start <= end && nums[start] <= nums[pivot]) {
                start++;
            }
            while (start <= end && nums[end] > nums[pivot]) {
                end--;
            }

            if (start > end)
                break;

            swap(nums, start, end);
        }

        swap(nums, end, pivot);
        return end;
    }

    private void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
}
