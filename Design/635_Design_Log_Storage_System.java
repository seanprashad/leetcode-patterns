class LogSystem {
    private Map<String, Integer> delimiterMap;
    private TreeMap<String, List<Integer>> logs;

    public LogSystem() {
        delimiterMap = new HashMap<>();
        logs = new TreeMap<>();

        delimiterMap.put("Year", 4);
        delimiterMap.put("Month", 7);
        delimiterMap.put("Day", 10);
        delimiterMap.put("Hour", 13);
        delimiterMap.put("Minute", 16);
        delimiterMap.put("Second", 19);
    }

    public void put(int id, String timestamp) {
        logs.putIfAbsent(timestamp, new ArrayList<>());
        logs.get(timestamp).add(id);
    }

    public List<Integer> retrieve(String start, String end, String granularity) {
        List<Integer> result = new ArrayList<>();

        int idx = delimiterMap.get(granularity);

        String searchStart = start.substring(0, idx);
        String searchEnd = end.substring(0, idx);

        for (String timestamp : logs.keySet()) {
            String tSubstring = timestamp.substring(0, idx);

            if (tSubstring.compareTo(searchStart) >= 0 && tSubstring.compareTo(searchEnd) <= 0) {
                result.addAll(logs.get(timestamp));
            }
        }

        return result;
    }
}
