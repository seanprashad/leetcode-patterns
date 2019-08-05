package Top_K_Elements;

import java.util.PriorityQueue;

class Connect_N_Ropes {
    public static int minCost(int[] ropes) {
        if (ropes == null || ropes.length == 0) {
            return 0;
        }

        PriorityQueue<Integer> pq = new PriorityQueue<>((a, b) -> a - b);
        int cost = 0;

        for (int rope : ropes) {
            pq.add(rope);
        }

        while (pq.size() != 1) {
            int combinedRopes = pq.poll() + pq.poll();

            cost += combinedRopes;
            pq.offer(combinedRopes);
        }

        return cost;
    }

    public static void main(String args[]) {
        int len[] = { 4, 3, 2, 6 };

        System.out.println("Total cost for connecting ropes is " + minCost(len));
    }
}
