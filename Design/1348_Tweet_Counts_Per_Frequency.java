class TweetCounts {
    private Map<String, TreeMap<Integer, Integer>> m;

    public TweetCounts() {
        m = new HashMap<>();
    }

    public void recordTweet(String tweetName, int time) {
        m.putIfAbsent(tweetName, new TreeMap<>());
        TreeMap<Integer, Integer> times = m.get(tweetName);
        times.put(time, times.getOrDefault(time, 0) + 1);
        m.put(tweetName, times);
    }

    public List<Integer> getTweetCountsPerFrequency(String freq, String tweetName, int startTime, int endTime) {
        if (!m.containsKey(tweetName)) {
            Collections.emptyList();
        }

        List<Integer> result = new ArrayList<>();
        TreeMap<Integer, Integer> times = m.get(tweetName);
        int delta = calculateDelta(freq);
        int intervalStart = startTime, intervalEnd = intervalStart + delta;

        while (intervalStart <= endTime) {
            // SortedMap<Integer, Integer> timesSubset = times.subMap(intervalStart, Math.min(intervalEnd, endTime + 1));

            int count = 0;
            for (Map.Entry<Integer, Integer> entry : times.subMap(intervalStart, Math.min(intervalEnd, endTime + 1))
                    .entrySet()) {
                count += entry.getValue();
            }

            result.add(count);
            intervalStart += delta;
            intervalEnd += delta;
        }

        return result;
    }

    private int calculateDelta(String freq) {
        if (freq.equals("minute")) {
            return 60;
        } else if (freq.equals("hour")) {
            return 60 * 60;
        } else {
            return 60 * 60 * 24;
        }
    }
}
