import java.util.*;

public class TT4 {

    public static List<String> split(String exampleText, int limit) {
        String[] words = exampleText.split("\\s+");

        List<String> result = new ArrayList<>();
        int left = 0, currPage = 1, totalPages = countTotalChars(words) / limit + 1;

        while (left < words.length) {
            StringBuilder sb = new StringBuilder();
            int right = findRight(words, left, limit - 8);

            while (left <= right) {
                sb.append(words[left]).append(" ");
                left++;
            }

            sb.append("(").append(currPage).append("/").append(totalPages).append(")").append(" ")
                    .append(sb.length() - 1);
            result.add(sb.toString());

            currPage++;
            left = right + 1;
        }

        return result;
    }

    private static int findRight(String[] words, int left, int limit) {
        int right = left;
        int sum = words[right].length();
        ++right;

        while (right < words.length && 1 + sum + words[right].length() <= limit) {
            sum += words[right].length() + 1;
            ++right;
        }

        return right - 1;
    }

    private static int countTotalChars(String[] words) {
        int count = 0;

        for (int i = 0; i < words.length; i++) {
            count += words[i].length();

            if (i != words.length - 1) {
                count += 1;
            }
        }

        return count;
    }

    public static void main(String[] args) {
        String exampleText1 = "Write a function that splits long SMS string"
                + " into smaller pieces. Each piece should be less than or"
                + " equal to 160 characters and contains indices at the end."
                + " Function should not break words into pieces. If word does"
                + " not fit -- it should go to the next SMS.";

        List<String> result1 = split(exampleText1, 60);

        for (String line : result1) {
            System.out.println(line);
        }

        return;
    }
}
