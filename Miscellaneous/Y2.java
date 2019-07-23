import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;

public class Y2 {
    public static String favoriteRestaurant(List<String> restaurants_1, List<String> restaurants_2) {
        HashMap<String, Integer> hm = new HashMap<>();
        int list1Rank = restaurants_1.size() - 1;
        int list2Rank = restaurants_2.size() - 1;
        String result = "Yelpwich";

        for (String s : restaurants_1) {
            Integer rank = hm.get(s);
            if (rank == null) {
                rank = 0;
            }

            hm.put(s, rank - list1Rank--);
        }

        for (String s : restaurants_2) {
            Integer rank = hm.get(s);
            if (rank == null) {
                rank = 0;
            }

            hm.put(s, rank - list2Rank--);
        }

        PriorityQueue<Map.Entry<String, Integer>> maxHeap = new PriorityQueue<>((a, b) -> a.getValue() - b.getValue());

        for (Map.Entry<String, Integer> entry : hm.entrySet()) {
            maxHeap.add(entry);
        }

        while (!maxHeap.isEmpty()) {
            Map.Entry<String, Integer> entry = maxHeap.poll();
            if (restaurants_1.contains(entry.getKey()) && restaurants_2.contains(entry.getKey())) {
                result = entry.getKey();
                break;
            }
        }

        return result;
    }

    public static void main(String[] args) {
        // Input One
        //
        // Ayola,Fresh Rolls,Curry Up Now
        // Eatsa,Chez Fayala,Working Girls
        //
        // Returns "Yelpwich"
        List<String> restaurants_1 = List.of("Ayola", "Fresh Rolls", "Curry Up Now");
        List<String> restaurants_2 = List.of("Eatsa", "Chez Fayala", "Working Girls");
        System.out.println(favoriteRestaurant(restaurants_1, restaurants_2));

        // Input Two
        //
        // El Farolito,Japa Curry,Eatsa
        // Japa Curry,Eatsa,Ayola,Working Girls
        //
        // Returns "Japa Curry"
        List<String> restaurants_3 = List.of("El Farolito", "Japa Curry", "Eatsa");
        List<String> restaurants_4 = List.of("Japa Curry", "Eatsa,Ayola", "Working Girls");
        System.out.println(favoriteRestaurant(restaurants_3, restaurants_4));

        return;
    }
}
