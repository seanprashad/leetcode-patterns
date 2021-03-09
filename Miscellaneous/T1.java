import java.util.*;

public class T1 {
    // Epoch timestamp with list of users who had an action for the respective
    // timestamp
    private TreeMap<Integer, Set<Integer>> logs;

    public T1() {
        logs = new TreeMap<>();
    }

    public void put(int id, int timestamp) {
        logs.putIfAbsent(timestamp, new HashSet<>());
        logs.get(timestamp).add(id);
    }

    public List<Integer> retrieve(int totalMinutes, int intervalLength) {
        List<Integer> result = new ArrayList<>();

        int intervalStart = 0, intervalEnd = intervalStart + intervalLength;

        while (intervalStart <= totalMinutes) {
            int end = Math.min(totalMinutes, intervalEnd + 1);
            SortedMap<Integer, Set<Integer>> submap = logs.subMap(intervalStart, end);
            result.add(submap.size());

            intervalStart += intervalLength;
            intervalEnd += intervalLength;
        }

        return result;
    }

    public static void main(String[] args) {
        /*
         * [1, 1518290973]
         * [1, 1518291096]
         * [1, 1518291200]
         * [1, 1518291200]
         * [2, 1518291032]
         * [3, 1518291095]
         * [3, 1518291178]
         * [4, 1518291120]
         * 
         * 1 -> 3 minutes in total
         * 2 -> 1 minutes in total
         * 3 -> 2 minutes in total
         * 4 -> 1 minutes in total
         * 
         * 2 users spend 0-1 minutes in total - users 2 and 4
         * 2 users spend 2-3 minutes in total - users 1 and 3
         */
        int[][] logs = new int[][] { { 1, 1518290973 }, { 2, 1518291032 }, { 3, 1518291095 }, { 1, 1518291096 },
                { 4, 1518291120 }, { 3, 1518291178 }, { 1, 1518291200 }, { 1, 1518291200 } };

        T1 logRetrieval = new T1();

        for (int[] log : logs) {
            logRetrieval.put(log[0], log[1]);
        }

        for (int interval : logRetrieval.retrieve(1, 2)) {
            System.out.print(interval + ", ");
        }

        System.out.println();

        return;
    }
}