class Solution {
    public boolean canConstruct(String ransomNote, String magazine) {
        int[] letters = new int[26];

        for (char c : magazine.toCharArray()) {
            letters[c - 'a']++;
        }

        for (char c : ransomNote.toCharArray()) {
            letters[c - 'a']--;

            if (letters[c - 'a'] < 0) {
                return false;
            }
        }

        return true;
    }
}
