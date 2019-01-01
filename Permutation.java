public class Permutation {
    public static boolean permutation(String s, String t) {
        if (s.length() != t.length()) {
            return false;
        }

        // Handle basic ASCII characters (a-zA-Z ideally)
        int[] letters = new int[128];
        int length = s.length();

        for (int i = 0; i < length; i++) {
            letters[s.charAt(i)]++;
            letters[t.charAt(i)]--;
        }

        for (int i = 0; i < letters.length; i++) {
            if (letters[i] != 0) {
                return false;
            }
        }

        return true;
    }

    public static void main(String[] args) {
        String[][] pairs = { { "apple", "papel" }, { "carrot", "tarroc" }, { "hello", "llloh" } };
        for (String[] pair : pairs) {
            String word1 = pair[0];
            String word2 = pair[1];
            boolean anagram = permutation(word1, word2);
            System.out.println(word1 + ", " + word2 + ": " + anagram);
        }
    }
}
