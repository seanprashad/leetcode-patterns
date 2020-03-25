class Solution {
    public String largestNumber(int[] nums) {
        if (nums == null || nums.length == 0) {
            return "";
        }

        StringBuilder sb = new StringBuilder();

        String[] strs = new String[nums.length];
        for (int i = 0; i < nums.length; i++) {
            strs[i] = String.valueOf(nums[i]);
        }

        Arrays.sort(strs, (a, b) -> {
            String s1 = a + b;
            String s2 = b + a;

            return s2.compareTo(s1);
        });

        if (strs[0].equals("0")) {
            return "0";
        }

        for (String str : strs) {
            sb.append(str);
        }

        return sb.toString();
    }
}
