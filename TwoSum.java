import java.util.HashMap;

public class TwoSum {
    public static int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> hm = new HashMap<>();
        int[] indices = new int[2];

        for (int i = 0; i < nums.length; i++) {
            int remainder = target - nums[i];
            if (hm.containsKey(remainder)) {
                indices[0] = hm.get(remainder);
                indices[1] = i;
                break;
            }

            hm.put(nums[i], i);
        }

        return indices;
    }

    public static void main(String[] args) {
        int[] nums = new int[] { -1, -2, 2, 6, 9, -10, -3 };
        int target = 0;

        int[] result = twoSum(nums, target);

        System.out.println("The indicies of the two values that add up to " + target + " are: ");
        for (Integer i : result) {
            System.out.println(i);
        }
        return;
    }
}
