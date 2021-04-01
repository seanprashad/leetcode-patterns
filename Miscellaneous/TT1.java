import java.util.*;

public class TT1 {
    enum Frequency {
        MINUTE, HOUR, DAY
    }

    private Map<String, TreeMap<Long, Integer>> tweets;

    public TT1() {
        tweets = new HashMap<>();
    }

    public void recordTweet(String tweetName, long time) {
        tweets.putIfAbsent(tweetName, new TreeMap<>());
        TreeMap<Long, Integer> times = tweets.get(tweetName);
        times.put(time, times.getOrDefault(time, 0) + 1);
    }

    public long[] getTweetCountsPerFrequency(Frequency freq, String tweetName, long startTime, long endTime) {
        TreeMap<Long, Integer> times = tweets.get(tweetName);

        long diff = endTime - startTime;
        long delta = getDelta(freq);
        long[] result = new long[(int) (diff / delta) + 1];

        long startInterval = startTime, endInterval = startInterval + delta;
        int idx = 0;

        while (startInterval <= endTime) {
            SortedMap<Long, Integer> subMap = times.subMap(startInterval, Math.min(endInterval, endTime + 1));
            long count = 0;

            for (long time : subMap.keySet()) {
                count += subMap.get(time);
            }

            result[idx] = count;
            ++idx;

            startInterval += delta;
            endInterval += delta;
        }

        return result;
    }

    private long getDelta(Frequency f) {
        if (Frequency.MINUTE == f) {
            return 60 * 1000;
        } else if (Frequency.HOUR == f) {
            return 60 * 60 * 1000;
        } else if (Frequency.DAY == f) {
            return 60 * 60 * 24 * 1000;
        } else {
            return 0L;
        }
    }

    public static void main(String[] args) {
        TT1 tweetCounts = new TT1();

        tweetCounts.recordTweet("tweet3", 0);
        tweetCounts.recordTweet("tweet3", 60000);
        tweetCounts.recordTweet("tweet3", 10000);
        tweetCounts.recordTweet("tweet3", 10000);

        System.out
                .println(Arrays.toString(tweetCounts.getTweetCountsPerFrequency(Frequency.MINUTE, "tweet3", 0, 59000)));
        System.out
                .println(Arrays.toString(tweetCounts.getTweetCountsPerFrequency(Frequency.MINUTE, "tweet3", 0, 60000)));

        tweetCounts.recordTweet("tweet3", 120000);

        System.out
                .println(Arrays.toString(tweetCounts.getTweetCountsPerFrequency(Frequency.HOUR, "tweet3", 0, 210000)));

        return;
    }
}
