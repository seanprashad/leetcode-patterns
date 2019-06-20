import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;

public class TopNLongestStrings {
    public static List<String> topNLongestStrings(List<String> words, int n) {
        HashMap<String, Integer> hm = new HashMap<String, Integer>();
        for (String s : words) {
            hm.put(s, s.length());
        }

        PriorityQueue<Map.Entry<String, Integer>> maxHeap = new PriorityQueue<Map.Entry<String, Integer>>(
                (a, b) -> a.getValue().equals(b.getValue()) ? a.getKey().compareTo(b.getKey())
                        : b.getValue() - a.getValue());
        for (Map.Entry<String, Integer> entry : hm.entrySet()) {
            maxHeap.add(entry);
        }

        List<String> longestStrings = new LinkedList<String>();
        for (int i = 1; i <= n; i++) {
            longestStrings.add(maxHeap.poll().getKey());
        }

        return longestStrings;
    }

    public static void main(String[] args) {
        List<String> words = new LinkedList<String>();
        words.add("Sean");
        words.add("ShibaInu");
        words.add("Katherine");
        words.add("SuccThiccSleep");
        words.add("SuccThiccSbeep");
        words.add("SuccThiccSceep");
        words.add("Elon");
        words.add("GophaOK");
        words.add("SuccThiccSheep");
        words.add("SuccThiccSaeep");

        int n = 5;
        List<String> topKWords = topNLongestStrings(words, n);
        // Result: [“SuccThiccSleep”, “Katherine”, “ShibaInu”]

        System.out.println("Top " + n + " words are:\n");
        for (String s : topKWords) {
            System.out.println(s);
        }
        return;
    }
}
