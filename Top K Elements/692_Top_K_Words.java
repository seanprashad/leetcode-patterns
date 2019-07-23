import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;

public class Top_K_Words_692 {
    public static List<String> topKFrequent(String[] words, int k) {
        List<String> result = new ArrayList<String>();
        HashMap<String, Integer> hm = new HashMap<String, Integer>();

        if (words == null || words.length == 0) {
            return result;
        }

        for (String s : words) {
            hm.put(s, hm.getOrDefault(s, 0) + 1);
        }

        PriorityQueue<Map.Entry<String, Integer>> maxHeap = new PriorityQueue<>(k,
                (a, b) -> a.getValue().equals(b.getValue()) ? a.getKey().compareTo(b.getKey())
                        : b.getValue() - a.getValue());

        for (Map.Entry<String, Integer> entry : hm.entrySet()) {
            maxHeap.add(entry);
        }

        while (result.size() < k) {
            result.add(maxHeap.poll().getKey());
        }

        return result;
    }

    public static void main(String[] args) {
        // #1 is "flower" with a count of 4
        // #2 is "hello" with a count of 3
        // #3 is "bird" with a count of 2
        // #4 is "ship" with a count of 3
        // #5 is "dog" with a count of 1
        // #6 is "cat" with a count of 1
        String sentence = "hello hello hello dog cat bird bird ship ship flower flower flower flower";

        int k = 6;
        List<String> topKWords = topKFrequent(sentence, k);

        System.out.println("Top " + k + " words are:\n");
        for (String s : topKWords) {
            System.out.println(s);
        }
    }
}
