class TweetCounts {
    private Map<String, TreeSet<Integer>> tweets;

    public TweetCounts() {
        tweets = new HashMap<>();
    }

    public void recordTweet(String tweetName, int time) {
        tweets.putIfAbsent(tweetName, new TreeSet<>());
        tweets.get(tweetName).add(time);
    }

    public List<Integer> getTweetCountsPerFrequency(String freq, String tweetName, int startTime, int endTime) {
        List<Integer> result = new ArrayList<>();

        int delta = calcDelta(freq);
        int intervalStart = startTime, intervalEnd = intervalStart + delta;
        TreeSet<Integer> times = tweets.get(tweetName);

        while (intervalStart <= endTime) {
            SortedSet<Integer> timesSubset = times.subSet(intervalStart, Math.min(intervalEnd, endTime + 1));
            int intervalCount = 0;

            for (int frequency : timesSubset) {
                intervalCount += 1;
            }

            result.add(intervalCount);

            intervalStart = intervalEnd;
            intervalEnd = intervalStart + delta;
        }

        return result;
    }

    private int calcDelta(String freq) {
        if (freq.equals("minute")) {
            return 60;
        } else if (freq.equals("hour")) {
            return 60 * 60;
        } else {
            return 60 * 60 * 24;
        }
    }
}
