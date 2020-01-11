class Solution {
    public char nextGreatestLetter(char[] letters, char target) {
        if (target + 1 < letters[0] || target + 1 > letters[letters.length - 1]) {
            return letters[0];
        }

        int start = 0, end = letters.length - 1;

        while (start < end) {
            int mid = start + (end - start) / 2;

            if (letters[mid] == target + 1) {
                return letters[mid];
            } else if (letters[mid] < target + 1) {
                start = mid + 1;
            } else {
                end = mid;
            }
        }

        return letters[end];
    }
}
