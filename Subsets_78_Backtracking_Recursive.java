import java.util.ArrayList;

public class Subsets_78_Backtracking_Recursive {
    public static ArrayList<ArrayList<Integer>> subsets(int[] nums) {
        ArrayList<ArrayList<Integer>> result = new ArrayList<>();
        ArrayList<Integer> tempResult = new ArrayList<>();
        backtrack(result, tempResult, nums, 0);
        return result;
    }

    public static void backtrack(ArrayList<ArrayList<Integer>> result, ArrayList<Integer> tempResult, int[] nums,
            int start) {
        result.add(new ArrayList<>(tempResult));

        for (int i = start; i < nums.length; i++) {
            tempResult.add(nums[i]);
            backtrack(result, tempResult, nums, i + 1);
            tempResult.remove(tempResult.size() - 1);
        }
    }

    public static void main(String[] args) {
        int[] nums = new int[] { 1, 2, 3, 4, 5 };
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
