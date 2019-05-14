class Single_Number_136_XOR {
    public int singleNumber(int[] nums) {
        int unique = 0;
        for (Integer n : nums) {
            unique ^= n;
        }
        return unique;
    }
}