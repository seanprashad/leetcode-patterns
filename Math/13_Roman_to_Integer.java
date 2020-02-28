class Solution {
    public int romanToInt(String s) {
        if (s == null || s.length() == 0) {
            return 0;
        }

        Map<Character, Integer> map = new HashMap<>();
        map.put('I', 1);
        map.put('V', 5);
        map.put('X', 10);
        map.put('L', 50);
        map.put('C', 100);
        map.put('D', 500);
        map.put('M', 1000);

        int result = 0;
        char prevChar = '\0';

        for (int i = s.length() - 1; i >= 0; i--) {
            char currChar = s.charAt(i);
            int value = map.get(currChar);

            if (value < result && currChar != prevChar) {
                result -= value;
            } else {
                result += value;
            }

            prevChar = currChar;
        }

        return result;
    }
}
