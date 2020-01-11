class Solution {
    public boolean backspaceCompare(String s, String t) {
        String sTrimmed = trimString(s);
        String tTrimmed = trimString(t);

        return sTrimmed.equals(tTrimmed);
    }

    private String trimString(String str) {
        StringBuilder sb = new StringBuilder();
        int hyphenCnt = 0;

        for (int i = str.length() - 1; i >= 0; i--) {
            if (str.charAt(i) == '#') {
                hyphenCnt++;
            } else {
                if (hyphenCnt == 0) {
                    sb.append(str.charAt(i));
                } else {
                    hyphenCnt--;
                }
            }
        }

        return sb.reverse().toString();
    }
}
