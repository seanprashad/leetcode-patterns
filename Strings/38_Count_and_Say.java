class Solution {
    public String countAndSay(int n) {
        String result = "1";

        for (int i = 1; i < n; i++) {
            result = countIdx(result);
        }

        return result;
    }

    private String countIdx(String s) {
        StringBuilder sb = new StringBuilder();

        char prevChar = s.charAt(0);
        int frequency = 1;

        for (int i = 1; i < s.length(); i++) {
            if (s.charAt(i) == prevChar) {
                ++frequency;
            } else {
                sb.append(frequency);
                sb.append(prevChar);

                prevChar = s.charAt(i);
                frequency = 1;
            }
        }

        sb.append(frequency);
        sb.append(prevChar);

        return sb.toString();
    }
}
