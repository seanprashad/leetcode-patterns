class Solution {
    private int[] nums;
    private Random rand;

    public Solution(int[] nums) {
        rand = new Random();
        this.nums = nums;
    }

    public int[] reset() {
        return nums;
    }

    public int[] shuffle() {
        int[] randomNums = nums.clone();

        for (int i = 0; i < randomNums.length; i++) {
            int randIdx = rand.nextInt(i + 1);

            swap(randomNums, i, randIdx);
        }

        return randomNums;
    }

    private void swap(int[] randomNums, int i, int j) {
        int temp = randomNums[i];
        randomNums[i] = randomNums[j];
        randomNums[j] = temp;
    }
}
