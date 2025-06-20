class Solution {
    public int compress(char[] chars) {
        int read = 0, write = 0;

        while (read < chars.length) { 
            char c = chars[read];
            int groupLen = 0;

            while (read < chars.length && chars[read] == c) {
                ++read;
                ++groupLen;
            }

            chars[write] = c;
            write++;
            if (groupLen > 1) {
                char[] groupLenChars = String.valueOf(groupLen).toCharArray();
                for (char groupLenChar : groupLenChars) {
                    chars[write] = groupLenChar;
                    ++write;
                }
            }
        }

        return write;
    }
}
