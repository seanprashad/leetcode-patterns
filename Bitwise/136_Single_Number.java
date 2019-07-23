public class Single_Number_136 {
    public int singleNumber(int[] nums) {
        int unique = 0;
        for (Integer n : nums) {
            unique ^= n;
        }
        return unique;
    }
}