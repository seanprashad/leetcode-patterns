class Solution {
    public List<Integer> sortArray(int[] nums) {
        if (nums == null || nums.length == 0) {
            return Collections.emptyList();
        }

        List<Integer> result = new ArrayList<>();
        mergeSort(nums, 0, nums.length - 1);

        for (int n : nums) {
            result.add(n);
        }
        return result;
    }

    private void mergeSort(int[] nums, int low, int high) {
        if (low < high) {
            int mid = low + ((high - low) / 2);

            mergeSort(nums, low, mid);
            mergeSort(nums, mid + 1, high);
            merge(nums, low, mid, high);
        }
    }

    private void merge(int[] nums, int low, int mid, int high) {
        int[] temp = new int[high - low + 1];
        int i = low, j = mid + 1, idx = 0;

        while (i <= mid && j <= high) {
            if (nums[i] < nums[j]) {
                temp[idx] = nums[i++];
            } else {
                temp[idx] = nums[j++];
            }

            ++idx;
        }

        while (i <= mid) {
            temp[idx++] = nums[i++];
        }
        while (j <= high) {
            temp[idx++] = nums[j++];
        }

        for (int k = 0; k < temp.length; k++) {
            nums[k + low] = temp[k];
        }
    }
}
