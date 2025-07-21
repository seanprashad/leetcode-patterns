/*
// Definition for an Interval.
class Interval {
    public int start;
    public int end;

    public Interval() {}

    public Interval(int _start, int _end) {
        start = _start;
        end = _end;
    }
};
*/

class Solution {
    public List<Interval> employeeFreeTime(List<List<Interval>> schedule) {
        List<Interval> result = new ArrayList<>();

        PriorityQueue<Interval> pq = new PriorityQueue<>(Comparator.comparing(i -> i.start));
        schedule.forEach(i -> pq.addAll(i));

        Interval prev = pq.poll();

        while (!pq.isEmpty()) {
            Interval curr = pq.poll();

            if (prev.end < curr.start) {
                result.add(new Interval(prev.end, curr.start));
                prev = curr;
            } else {
                prev.end = Math.max(prev.end, curr.end);
            }
        }

        return result;
    }
}
