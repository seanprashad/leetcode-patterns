class Solution {
    public static void mergeSort(int[] arr) {
        int len = arr.length;
        if (len < 2)
            return;

        int mid = len / 2;
        int[] left = new int[mid];
        int[] right = new int[len - mid];

        for (int i = 0; i < mid; i++) {
            left[i] = arr[i];
        }
        for (int j = 0; j < len - mid; j++) {
            right[j] = arr[mid + j];
        }

        mergeSort(left);
        mergeSort(right);
        merge(left, right, arr);
    }

    private static void merge(int[] left, int[] right, int[] original) {
        int lenLeft = left.length, lenRight = right.length;
        int i = 0, j = 0, k = 0;

        while (i < lenLeft && j < lenRight) {
            if (left[i] < right[j]) {
                original[k++] = left[i++];
            } else {
                original[k++] = right[j++];
            }
        }

        while (i < lenLeft) {
            original[k++] = left[i++];
        }

        while (j < lenRight) {
            original[k++] = right[j++];
        }
    }

    public static void main(String[] args) {
        int[] arr = { 89, 78, 68, 77, 45, 30, 90, 83, 75, 78, 68, 11, 35, 8, 93, 73, 63, 44, 18, 62, 34, 90, 87, 82, 61,
                36, 55, 98, 55, 72, 81, 18, 1, 71, 61, 87, 42, 49, 41, 75, 61, 45, 38, 18, 92, 89, 71, 60, 57, 1, 13, 3,
                82, 76, 51, 3, 90, 18, 21, 14, 23, 20, 27, 38, 72, 57, 96, 78, 73, 93, 13, 36, 90, 68, 47, 36, 8, 94, 5,
                67, 66, 58, 77, 35, 62, 69, 100, 30, 34, 53, 66, 89, 67, 33, 40, 37, 88, 98, 22, 19 };

        System.out.println("Before mergeSort: ");
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + ", ");
        }

        mergeSort(arr);

        System.out.println("\nAfter mergeSort: ");
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + ", ");
        }

        return;
    }
}
