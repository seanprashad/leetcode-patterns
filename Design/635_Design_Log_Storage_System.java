class LogSystem {
    private TreeMap<String, List<Integer>> logs;
    private Map<String, Integer> delimeters;
    private static final String min = "2000:01:01:00:00:00";
    private static final String max = "2017:12:31:23:59:59";

    public LogSystem() {
        logs = new TreeMap<>();
        delimeters = new HashMap<>();

        delimeters.put("Year", 4);
        delimeters.put("Month", 7);
        delimeters.put("Day", 10);
        delimeters.put("Hour", 13);
        delimeters.put("Minute", 16);
        delimeters.put("Second", 19);
    }

    public void put(int id, String timestamp) {
        logs.putIfAbsent(timestamp, new ArrayList<>());
        logs.get(timestamp).add(id);
    }

    public List<Integer> retrieve(String start, String end, String granularity) {
        List<Integer> result = new ArrayList<>();

        int idx = delimeters.get(granularity);
        String searchStart = start.substring(0, idx) + min.substring(idx),
                searchEnd = end.substring(0, idx) + max.substring(idx);

        for (String timestamp : logs.subMap(searchStart, true, searchEnd, true).keySet()) {
            result.addAll(logs.get(timestamp));
        }

        return result;
    }
}