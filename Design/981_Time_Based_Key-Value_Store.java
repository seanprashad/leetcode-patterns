class TimeMap {
    private Map<String, List<Node>> hm;

    public TimeMap() {
        hm = new HashMap<>();
    }

    public void set(String key, String value, int timestamp) {
        hm.putIfAbsent(key, new ArrayList<>());
        hm.get(key).add(new Node(timestamp, value));
    }

    public String get(String key, int timestamp) {
        if (!hm.containsKey(key)) {
            return "";
        }

        List<Node> nodes = hm.get(key);
        int low = 0, high = nodes.size() - 1;

        while (low < high) {
            int mid = low + (high - low) / 2;

            if (nodes.get(mid).timestamp == timestamp) {
                return nodes.get(mid).value;
            }

            if (nodes.get(mid).timestamp < timestamp) {
                if (nodes.get(mid + 1).timestamp > timestamp) {
                    return nodes.get(mid).value;
                }

                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return nodes.get(low).timestamp <= timestamp ? nodes.get(low).value : "";
    }

    private class Node {
        private int timestamp;
        private String value;

        public Node(int t, String v) {
            timestamp = t;
            value = v;
        }
    }
}
