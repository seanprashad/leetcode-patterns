import java.util.*;

class IC2 {
    private class Pair {
        private long ts;
        private String value;

        public Pair(long t, String v) {
            ts = t;
            value = v;
        }
    }

    private Map<String, List<Pair>> m;

    public IC2() {
        m = new HashMap<>();
    }

    public String get(String key) {
        if (!m.containsKey(key)) {
            return null;
        }

        List<Pair> times = m.get(key);
        return times.get(times.size() - 1).value;
    }

    public String get(String key, long ts) {
        if (!m.containsKey(key)) {
            return null;
        }

        List<Pair> times = m.get(key);
        int idx = Collections.binarySearch(times, new Pair(ts, null), (p1, p2) -> (int) p1.ts - (int) p2.ts);
        return times.get(idx).value;
    }

    public long set(String key, String value) {
        m.putIfAbsent(key, new ArrayList<>());
        long ts = System.currentTimeMillis() / 1000L;
        m.get(key).add(new Pair(ts, value));
        return ts;
    }

    public static void main(String[] args) throws Exception {
        IC2 store = new IC2();

        long ts1 = store.set("foo", "bar");
        Thread.sleep(1000);

        long ts2 = store.set("foo", "bar2");
        Thread.sleep(1000);

        long ts3 = store.set("foo", "bar3");
        Thread.sleep(1000);

        System.out.println(store.get("foo", ts1)); // Prints bar
        System.out.println(store.get("foo", ts2)); // Prints bar2
        System.out.println(store.get("foo", ts3)); // Prints bar3
    }
}
