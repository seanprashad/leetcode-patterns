class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        if (nums == null || nums.length == 0) {
            return Collections.emptyList();
        }

        Arrays.sort(nums);

        List<List<Integer>> result = new ArrayList<>();

        for (int i = 0; i < nums.length - 2; i++) {
            if (i == 0 || nums[i] != nums[i - 1]) {
                int j = i + 1, k = nums.length - 1;

                while (j < k) {
                    int sum = nums[i] + nums[j] + nums[k];

                    if (sum == 0) {
                        result.add(Arrays.asList(nums[i], nums[j], nums[k]));

                        while (j < k && nums[j] == nums[j + 1]) {
                            ++j;
                        }
                        while (j < k && nums[k] == nums[k - 1]) {
                            --k;
                        }

                        ++j;
                        --k;
                    } else if (sum < 0) {
                        ++j;
                    } else {
                        --k;
                    }
                }
            }
        }

        return result;
    }
}