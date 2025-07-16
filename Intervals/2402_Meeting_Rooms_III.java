public class 2402_Meeting_Rooms_III {
    
}
class Solution {
    public int mostBooked(int n, int[][] meetings) {
        Arrays.sort(meetings, (m1, m2) -> m1[0] == m2[0] ? m1[1] - m2[1] : m1[0] - m2[0]);
        
        PriorityQueue<Integer> freeRooms = new PriorityQueue<>();   // Index of free room indexes
        PriorityQueue<int[]> busyRooms = new PriorityQueue<>((r1, r2) -> r1[0] == r2[0] ? r1[1] - r2[1] : r1[0] - r2[0]);     // Pair of {end time, room index}
        int[] count = new int[n];

        for (int i = 0; i < n; i++) {
            freeRooms.offer(i);
        }

        for (int[] meeting : meetings) {
            int start = meeting[0], end = meeting[1];

            while (!busyRooms.isEmpty() && busyRooms.peek()[0] <= start) {
                int roomIndex = busyRooms.poll()[1];
                freeRooms.offer(roomIndex);
            }

            if (!freeRooms.isEmpty()) {
                int room = freeRooms.poll();
                busyRooms.offer(new int[]{end, room});
                count[room]++;
            } else {
                int[] nextAvailableRoom = busyRooms.poll();
                int newEndingTime = nextAvailableRoom[0] + end - start;
                int roomIndex = nextAvailableRoom[1];

                busyRooms.offer(new int[]{newEndingTime, roomIndex});
                count[roomIndex]++;
            }
        }

        int maxCount = 0, result = 0;

        for (int i = 0; i < count.length; i++) {
            if (count[i] > maxCount) {
                maxCount = count[i];
                result = i;
            }
        }

        return result;
    }
}
