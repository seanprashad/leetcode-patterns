public class Reverse_Vowels_345 {
    public static String reverseVowels(String s) {
        if (s == null || s.length() == 0) {
            return s;
        }

        String vowels = "aeiouAEIOU";
        char[] sArr = s.toCharArray();
        int start = 0, end = s.length() - 1;

        while (start < end) {
            // Move the start and end pointers until we find a vowel for
            // both of them!
            while (start < end && vowels.indexOf(sArr[start]) == -1) {
                start++;
            }
            while (start < end && vowels.indexOf(sArr[end]) == -1) {
                end--;
            }

            char temp = sArr[start];
            sArr[start] = sArr[end];
            sArr[end] = temp;

            start++;
            end--;
        }

        return new String(sArr);
    }

    public static void main(String[] args) {
        String phrase = "Hello World!";
        System.out.println(reverseVowels(phrase));

        return;
    }
}
