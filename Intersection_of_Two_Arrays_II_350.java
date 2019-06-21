import java.util.ArrayList;
import java.util.HashMap;

public class Intersection_of_Two_Arrays_II_350 {
    public static int[] intersect(int[] nums1, int[] nums2) {
        HashMap<Integer, Integer> hm = new HashMap<>();
        ArrayList<Integer> intersection = new ArrayList<>();

        for (int i = 0; i < nums1.length; i++) {
            hm.put(nums1[i], hm.getOrDefault(nums1[i], 0) + 1);
        }

        for (int i = 0; i < nums2.length; i++) {
            int frequency = hm.getOrDefault(nums2[i], 0);
            if (frequency > 0) {
                intersection.add(nums2[i]);
                hm.put(nums2[i], frequency - 1);
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

        int[] result1 = intersect(arr1, arr2);
        for (int i : result1) {
            System.out.print(i + ", ");
        }

        System.out.println();

        int[] arr3 = new int[] { 4, 9, 5 };
        int[] arr4 = new int[] { 9, 4, 9, 8, 4 };

        int[] result2 = intersect(arr3, arr4);
        for (int i : result2) {
            System.out.print(i + ", ");
        }

        return;
    }
}
