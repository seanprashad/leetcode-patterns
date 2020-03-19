class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        int m = nums1.length;
        int n = nums2.length;
        int sum = m + n;
        int target = sum / 2;

        if (sum % 2 == 0) {
            return ((double) findKth(nums1, nums2, 0, 0, target) + findKth(nums1, nums2, 0, 0, target + 1)) / 2;
        } else {
            return (double) findKth(nums1, nums2, 0, 0, target + 1);
        }
    }

    private int findKth(int[] a, int[] b, int startA, int startB, int k) {
        if (startA >= a.length) {
            return b[startB + k - 1];
        }
        if (startB >= b.length) {
            return a[startA + k - 1];
        }
        if (k == 1) {
            return Math.min(a[startA], b[startB]);
        }

        int midAIdx = startA + k / 2 - 1;
        int midBIdx = startB + k / 2 - 1;

        int midA = (midAIdx >= a.length) ? Integer.MAX_VALUE : a[midAIdx];
        int midB = (midBIdx >= b.length) ? Integer.MAX_VALUE : b[midBIdx];

        if (midA > midB) {
            return findKth(a, b, startA, startB + k / 2, k - k / 2);
        } else {
            return findKth(a, b, startA + k / 2, startB, k - k / 2);
        }
    }
}
