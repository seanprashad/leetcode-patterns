import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

public class Y1 {
    public static List<String> topColour(String[][] image) {
        List<String> result = new LinkedList<String>();
        HashMap<String, Integer> hm = new HashMap<String, Integer>();
        int highestFrequency = 0;

        if (image == null || image[0] == null) {
            return result;
        }

        for (String[] row : image) {
            for (String s : row) {
                int wordFrequency = hm.getOrDefault(s, 0) + 1;
                hm.put(s, wordFrequency);
                highestFrequency = Math.max(highestFrequency, wordFrequency);
            }
        }

        for (Map.Entry<String, Integer> entry : hm.entrySet()) {
            if (entry.getValue() == highestFrequency) {
                result.add(entry.getKey());
            }
        }

        Collections.sort(result);

        return result;
    }

    public static void main(String[] args) {
        String[][] imageOne = new String[][] { { "red", "red", "green" }, { "black", "blue", "black", },
                { "red", "yellow", "yellow" } };
        String[][] imageTwo = new String[][] { { "red", "green", "green" }, { "black", "blue", "black", },
                { "red", "yellow", "yellow" } };

        List<String> listImageOne = topColour(imageOne);
        List<String> listImageTwo = topColour(imageTwo);

        System.out.println(listImageOne);
        System.out.println(listImageTwo);
        return;
    }
}
