class Solution {
    public String reverseWords(String s) {
        if (s == null || s.length() == 0) {
            return "";
        }

        StringBuilder sb = new StringBuilder();
        String[] reversed = s.split("\\s+");

        for (int i = 0; i < reversed.length; i++) {
            int len = reversed[i].length() - 1;

            while (len >= 0) {
                sb.append(reversed[i].charAt(len));
                --len;
            }

            if (i != reversed.length - 1) {
                sb.append(" ");
            }
        }

        return sb.toString();
    }
}
