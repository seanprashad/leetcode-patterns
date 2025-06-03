import java.util.HashMap;
import java.util.Map;

class Solution {
    public int deleteAndEarn(int[] nums) {
        Map<Integer, Integer> hm = new HashMap<>();
        int maxValue = 0;

        for (int num : nums) {
            hm.put(num, hm.getOrDefault(num, 0) + num);
            maxValue = Math.max(maxValue, num);
        }

        int[] memo = new int[maxValue + 1];
        memo[1] = hm.getOrDefault(1, 0);

        for (int i = 2; i < memo.length; i++) {
            memo[i] = Math.max(memo[i-1], hm.getOrDefault(i, 0) + memo[i-2]);
        }
        
        return memo[maxValue];
    }
}
