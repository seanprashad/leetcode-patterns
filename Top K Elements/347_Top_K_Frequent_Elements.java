class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        if (nums == null || nums.length == 0) {
            return new int[0];
        }

        Map<Integer, Integer> hm = new HashMap<>();

        for (int num : nums) {
            hm.put(num, hm.getOrDefault(num, 0) + 1);
        }

        int i = 0;
        int[] unique = new int[hm.size()];
        for (int key : hm.keySet()) {
            unique[i++] = key;
        }

        int low = 0, high = unique.length - 1;

        while (low < high) {
            int idx = quickSelect(unique, hm, low, high);

            if (idx == k) {
                break;
            } else if (idx < k) {
                low = idx + 1;
            } else {
                high = idx - 1;
            }
        }

        return Arrays.copyOf(unique, k);
    }

    private int quickSelect(int[] nums, Map<Integer, Integer> hm, int low, int high) {
        int idx = low, pivot = high;
        int pivot_frequency = hm.get(nums[pivot]);

        for (int i = low; i < high; i++) {
            if (hm.get(nums[i]) > pivot_frequency) {
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
