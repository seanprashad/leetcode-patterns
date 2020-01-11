class Solution {
    public List<Integer> findClosestElements(int[] arr, int k, int x) {
        int start = 0, end = arr.length - 1 - k;

        while (start <= end) {
            int mid = start + (end - start) / 2;

            if (Math.abs(x - arr[mid]) > Math.abs(x - arr[mid + k])) {
                start = mid + 1;
            } else {
                end = mid - 1;
            }
        }

        List<Integer> result = new ArrayList<>();
        for (int i = start; i < start + k; i++) {
            result.add(arr[i]);
        }

        return result;
    }
}
