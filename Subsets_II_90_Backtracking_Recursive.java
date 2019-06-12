import java.util.ArrayList;
import java.util.Arrays;

public class Subsets_II_90_Backtracking_Recursive {
    public static ArrayList<ArrayList<Integer>> subsets(int[] nums) {
        ArrayList<ArrayList<Integer>> result = new ArrayList<>();
        ArrayList<Integer> tempResult = new ArrayList<>();
        Arrays.sort(nums);
        backtrack(result, tempResult, nums, 0);
        return result;
    }

    public static void backtrack(ArrayList<ArrayList<Integer>> result, ArrayList<Integer> tempResult, int[] nums,
            int start) {
        result.add(new ArrayList<>(tempResult));

        for (int i = start; i < nums.length; i++) {
            if (i > start && nums[i] == nums[i - 1])
                continue;

            tempResult.add(nums[i]);
            backtrack(result, tempResult, nums, i + 1);
            tempResult.remove(tempResult.size() - 1);
        }
    }

    public static void main(String[] args) {
        int[] nums = new int[] { 1, 2, 2 };
        ArrayList<ArrayList<Integer>> result = subsets(nums);

        System.out.println("All possible subsets are:");
        for (ArrayList<Integer> al : result) {
            for (Integer i : al) {
                System.out.print(i + ", ");
            }
            System.out.println();
        }

        return;
    }
}
