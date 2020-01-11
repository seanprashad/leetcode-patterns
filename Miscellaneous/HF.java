import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class HF {
    public static String reverseSentence(String s) {
        if (s == null || s.length() == 0) {
            return s;
        }

        String[] words = s.split(" ");
        StringBuilder sb = new StringBuilder();

        for (int i = words.length - 1; i >= 0; i--) {
            sb.append(words[i]);
            if (i != 0) {
                sb.append(" ");
            }
        }

        return sb.toString();
    }

    // Time complexity: O(n^2) - The contains() method of a list searchers
    // through every existing element in the list. This method nested in a for
    // loop is like 2 nested for loops.
    //
    // Space complexity: O(n) - The list, uniqueNames, will contain as many
    // unique entries as there are in both list_1 and list_2.
    public static List<String> removeDuplicateNames_1(List<String> list_1, List<String> list_2) {
        List<String> uniqueNames = new ArrayList<>();

        for (int i = 0; i < list_1.size(); i++) {
            if (!uniqueNames.contains(list_1.get(i))) {
                uniqueNames.add(list_1.get(i));
            }
        }

        for (int i = 0; i < list_2.size(); i++) {
            if (!uniqueNames.contains(list_2.get(i))) {
                uniqueNames.add(list_2.get(i));
            }
        }

        return uniqueNames;
    }

    // Time complexity: O(n)
    //
    // Space complexity: O(n)
    public static List<String> removeDuplicateNames_2(List<String> list_1, List<String> list_2) {
        Set<String> set = new HashSet<>();

        for (String name : list_1) {
            set.add(name);
        }

        for (String name : list_2) {
            set.add(name);
        }

        List<String> result = new ArrayList<>(set);

        return result;
    }

    public static void main(String[] args) {
        String s = "The quick brown fox";

        System.out.println(reverseSentence(s));

        List<String> list_1 = List.of("Natasha", "Tony", "Bruce", "Carol");
        List<String> list_2 = List.of("Peter", "Carol", "Steve");

        List<String> uniqueNames_1 = removeDuplicateNames_1(list_1, list_2);

        for (String name : uniqueNames_1) {
            System.out.print(name + " ");
        }

        System.out.println();

        List<String> uniqueNames_2 = removeDuplicateNames_2(list_1, list_2);

        for (String name : uniqueNames_2) {
            System.out.print(name + " ");
        }

        return;
    }
}
