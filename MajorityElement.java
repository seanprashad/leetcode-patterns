import java.util.HashMap;

public class MajorityElement {
    public static int majorityElement(int[] nums) {
        HashMap<Integer, Integer> hm = new HashMap<>();
        int n = nums.length;
        int output = 0;

        for (int i = 0; i < n; i++) {
            hm.put(nums[i], hm.getOrDefault(nums[i], 0) + 1);
            if (hm.get(nums[i]) > n / 2) {
                output = nums[i];
            }
        }

        return output;
    }

    public static void main(String[] args) {
        int[] nums = new int[] { 2, 2, 2, 2, 9, 9, 9, 9, 9, 9, 2, 2, 2, 2, 1 };

        int result = majorityElement(nums);

        System.out.println("The majority element is: " + result);
        return;
    }
}
