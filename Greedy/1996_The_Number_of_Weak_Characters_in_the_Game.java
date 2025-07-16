class Solution {
    public int numberOfWeakCharacters(int[][] properties) {
        Arrays.sort(properties, (p1, p2) -> p1[0] == p2[0] ? p2[1] - p1[1] : p1[0] - p2[0]);

        int result = 0, highestDefence = Integer.MIN_VALUE;

        for (int i = properties.length - 1; i >= 0; i--) {
            int defence = properties[i][1];
            highestDefence = Math.max(highestDefence, defence);

            if (defence < highestDefence) {
                ++result;
            }
        }

        return result;
        
    }
}
