class Solution {
    public int firstUniqChar(String s) {
        if (s == null || s.isEmpty()) {
            return -1;
        }

        HashMap<Character, Integer> hmChar = new HashMap<Character, Integer>();
        HashMap<Character, Integer> hmIdx = new HashMap<Character, Integer>();
        char[] sArray = s.toCharArray();

        for (int i = 0; i < sArray.length; i++) {
            hmChar.put(sArray[i], hmChar.getOrDefault(sArray[i], 0) + 1);
            hmIdx.put(sArray[i], hmIdx.getOrDefault(sArray[i], i));
        }

        for (Character c : sArray) {
            int frequency = hmChar.get(c);
            if (frequency == 1) {
                return hmIdx.get(c);
            }
        }

        return -1;
    }
}
