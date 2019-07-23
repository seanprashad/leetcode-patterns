import java.util.HashMap;
import java.util.Map;

public class Majority_Element_169 {
    public static int majorityElement(int[] nums) {
        Map<Integer, Integer> hm = new HashMap<>();
        int n = nums.length;
        int result = 0;

        for (int i = 0; i < n; i++) {
            hm.put(nums[i], hm.getOrDefault(nums[i], 0) + 1);
            if (hm.get(nums[i]) > n / 2) {
                result = nums[i];
            }
        }

        return result;
    }
}
