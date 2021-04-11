import java.util.*;

public class TT6 {

    public static List<int[]> compress(int[] a) {
        List<int[]> result = new ArrayList<>();
        int count = 1;

        for (int i = 1; i < a.length; i++) {
            while (i < a.length && a[i] == a[i - 1]) {
                ++count;
                ++i;
            }

            result.add(new int[] { a[i - 1], count });
            count = 1;
        }

        return result;
    }

    public static int dotProduct(List<int[]> v1, List<int[]> v2) {
        int result = 0;

        int i = 0, j = 0;

        while (i < v1.size() && j < v2.size()) {
            int[] a = v1.get(i), b = v2.get(j);

            int counter = Math.min(a[1], b[1]);

            a[1] -= counter;
            b[1] -= counter;

            result += a[0] * b[0] * counter;

            if (a[1] == 0) {
                ++i;
            }

            if (b[1] == 0) {
                ++j;
            }
        }

        return result;
    }

    public static void main(String[] args) {
        int[] a = new int[] { 1, 1, 4, 4, 4, 4, 7, 7, 7, 7, 7, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 };
        int[] b = new int[] { 2, 2, 5, 5, 5, 5, 5, 5, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3 };

        List<int[]> result1 = compress(a);
        List<int[]> result2 = compress(b);

        for (int[] pair : result1) {
            System.out.println(pair[0] + ", " + pair[1]);
        }

        System.out.println("\n---\n");

        for (int[] pair : result2) {
            System.out.println(pair[0] + ", " + pair[1]);
        }

        System.out.println("\n---\n");

        System.out.println(dotProduct(result1, result2) == 291);

        return;
    }
}
