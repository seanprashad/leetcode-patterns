import java.util.*;

public class BB3 {
    public List<String> breakWords(String s, Set<String> wordDict) {
        return breakWordsHelper(s, wordDict, new HashMap<String, List<String>>());
    }

    private List<String> breakWordsHelper(String s, Set<String> wordDict, Map<String, List<String>> memo) {
        if (memo.containsKey(s)) {
            return memo.get(s);
        }

        List<String> result = new ArrayList<>();

        for (String word : wordDict) {
            if (s.startsWith(word)) {
                List<String> subList = breakWordsHelper(s.substring(word.length()), wordDict, memo);
                for (String subListWord : subList) {
                    result.add(subListWord);
                }

                result.add(word);
            }
        }

        memo.put(s, result);
        return result;
    }

    public static void main(String[] args) {
        BB3 wordBreak = new BB3();

        String[] words = { "cat", "cats", "and", "sand", "dog", "apple", "pen", "applepen", "pine", "pineapple", "cats",
                "dog", "sand", "and", "cat", "wash", "rag" };
        Set<String> wordDict = new HashSet<>(Arrays.asList(words));

        String toBreak1 = "catsanddog";
        String toBreak2 = "pineapplepenapple";
        String toBreak3 = "helloworld";

        List<String> splitWords1 = wordBreak.breakWords(toBreak1, wordDict);
        for (String w : splitWords1) {
            System.out.print(w + " ");
        }

        System.out.println();

        List<String> splitWords2 = wordBreak.breakWords(toBreak2, wordDict);
        for (String w : splitWords2) {
            System.out.print(w + " ");
        }

        System.out.println();

        List<String> splitWords3 = wordBreak.breakWords(toBreak3, wordDict);
        for (String w : splitWords3) {
            System.out.print(w + " ");
        }

        return;
    }
}
