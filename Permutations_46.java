import java.util.ArrayList;

public class Permutations_46 {
    public static ArrayList<ArrayList<Integer>> permute(int[] nums) {
        ArrayList<ArrayList<Integer>> result = new ArrayList<>();
        ArrayList<Integer> tempResult = new ArrayList<>();
        backtrack(result, tempResult, nums);
        return result;
    }

    public static void backtrack(ArrayList<ArrayList<Integer>> result, ArrayList<Integer> tempResult, int[] nums) {

        if (tempResult.size() == nums.length) {
            result.add(new ArrayList<>(tempResult));
            return;
        } else {
            for (int i = 0; i < nums.length; i++) {
                if (tempResult.contains(nums[i]))
                    continue;
                tempResult.add(nums[i]);
                backtrack(result, tempResult, nums);
                tempResult.remove(tempResult.size() - 1);
            }
        }
    }

    public static void main(String[] args) {
        int[] nums = new int[] { 1, 2, 3 };
        ArrayList<ArrayList<Integer>> result = permute(nums);

        System.out.println("All possible permutations are:");
        for (ArrayList<Integer> al : result) {
            for (Integer i : al) {
                System.out.print(i + ", ");
            }
            System.out.println();
        }

        return;
    }
}
