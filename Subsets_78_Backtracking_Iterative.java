import java.util.ArrayList;
import java.util.List;

public class Subsets_78_Backtracking_Iterative {
    public static List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        result.add(new ArrayList<>());

        for (int n : nums) {
            int size = result.size();
            for (int i = 0; i < size; i++) {
                List<Integer> temp = new ArrayList<Integer>(result.get(i));
                temp.add(n);
                result.add(temp);
            }
        }

        return result;
    }

    public static void main(String[] args) {
        int[] nums = new int[] { 1, 2, 3 };
        List<List<Integer>> result = subsets(nums);

        System.out.println("All possible subsets are:");
        for (List<Integer> al : result) {
            for (Integer i : al) {
                System.out.print(i + ", ");
            }
            System.out.println();
        }

        return;
    }
}
