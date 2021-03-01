class Solution {
    public List<String> fullJustify(String[] words, int maxWidth) {
        if (words == null || words.length == 0) {
            return Collections.emptyList();
        }

        List<String> result = new ArrayList<>();
        int left = 0;

        while (left < words.length) {
            int right = findRight(left, words, maxWidth);
            result.add(justify(left, right, words, maxWidth));
            left = right + 1;
        }

        return result;
    }

    private int findRight(int left, String[] words, int maxWidth) {
        int right = left;
        int sum = words[right].length();
        ++right;

        while (right < words.length && (sum + 1 + words[right].length()) <= maxWidth) {
            sum += words[right].length() + 1;
            ++right;
        }

        return right - 1;
    }

    private String justify(int left, int right, String[] words, int maxWidth) {
        StringBuilder sb = new StringBuilder();

        if (right - left == 0) {
            return padResult(words[left], maxWidth);
        }

        boolean isLastLine = right == words.length - 1;
        int numOfSpaces = right - left;
        int totalSpaces = maxWidth - wordsLength(left, right, words);

        String space = isLastLine ? " " : blank(totalSpaces / numOfSpaces);
        int remainder = isLastLine ? 0 : totalSpaces % numOfSpaces;

        for (int i = left; i <= right; i++) {
            sb.append(words[i]).append(space).append(remainder-- > 0 ? " " : "");
        }

        return padResult(sb.toString().trim(), maxWidth);
    }

    private int wordsLength(int left, int right, String[] words) {
        int length = 0;

        for (int i = left; i <= right; i++) {
            length += words[i].length();
        }

        return length;
    }

    private String padResult(String result, int maxWidth) {
        StringBuilder sb = new StringBuilder();
        sb.append(result).append(blank(maxWidth - result.length()));

        return sb.toString();
    }

    private String blank(int length) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < length; i++) {
            sb.append(" ");
        }

        return sb.toString();
    }
}
