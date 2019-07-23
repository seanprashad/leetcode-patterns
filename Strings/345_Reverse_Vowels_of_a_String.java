class Solution {
    public String reverseVowels(String s) {
        if (s == null || s.length() == 0) {
            return s;
        }

        String vowels = "aeiouAEIOU";
        char[] sArr = s.toCharArray();
        int start = 0, end = s.length() - 1;

        while (start < end) {
            while (start < end && vowels.indexOf(sArr[start]) == -1) {
                start++;
            }
            while (start < end && vowels.indexOf(sArr[end]) == -1) {
                end--;
            }

            char temp = sArr[start];
            sArr[start++] = sArr[end];
            sArr[end--] = temp;
        }

        return new String(sArr);
    }
}
