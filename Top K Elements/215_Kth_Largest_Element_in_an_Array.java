class Solution {
    public int findKthLargest(int[] nums, int k) {
        int start = 0, end = nums.length - 1, resultIdx = nums.length - k;
        
        while (start < end) {
            int pivotIdx = partition(nums, start, end);
            
            if (pivotIdx < resultIdx) { start = pivotIdx + 1; }
            else if (pivotIdx > resultIdx) { end = pivotIdx - 1; }
            else { return nums[pivotIdx]; }
        }
        
        return nums[start];
    }
    
    private int partition(int[] nums, int start, int end) {
        int pivot = end;
        
        while (start <= end) {
            while (start <= end && nums[start] <= nums[pivot]) { ++start; }
            while (start <= end && nums[end] > nums[pivot]) { --end; }
            
            if (start > end) { break; }
            
            swap(nums, start, end);
        }
        
        swap(nums, pivot, end);
        return end;
    }
    
    private void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
}
