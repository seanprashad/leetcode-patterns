import java.util.HashSet;
import java.util.Set;

public class Intersection_of_Two_Arrays_349 {
    public static int[] intersection(int[] nums1, int[] nums2) {
        Set<Integer> set = new HashSet<>();
        Set<Integer> intersection = new HashSet<>();

        for (int i = 0; i < nums1.length; i++) {
            set.add(nums1[i]);
        }

        for (int i = 0; i < nums2.length; i++) {
            if (set.contains(nums2[i])) {
                intersection.add(nums2[i]);
            }
        }

        int[] result = new int[intersection.size()];
        int idx = 0;
        for (int i : intersection) {
            result[idx++] = i;
        }

        return result;
    }

    public static void main(String[] args) {
        int[] arr1 = new int[] { 1, 2, 2, 1 };
        int[] arr2 = new int[] { 2, 2 };

        int[] result1 = intersection(arr1, arr2);
        for (int i : result1) {
            System.out.print(i + ", ");
        }

        System.out.println();

        int[] arr3 = new int[] { 4, 9, 5 };
        int[] arr4 = new int[] { 9, 4, 9, 8, 4 };

        int[] result2 = intersection(arr3, arr4);
        for (int i : result2) {
            System.out.print(i + ", ");
        }

        return;
    }
}
