import java.util.*;
import java.util.concurrent.*;

public class TT1 {
    private Map<String, TreeSet<Long>> tweets;

    public TT1() {
        tweets = new HashMap<>();
    }

    public void recordTweet(String tweetName, long time) {
        tweets.putIfAbsent(tweetName, new TreeSet<>());
        tweets.get(tweetName).add(time);
    }

    public long[] getTweetCountsPerFrequency(Frequency freq, String tweetName, long startTime, long endTime) {
        if (!tweets.containsKey(tweetName)) {
            return new long[0];
        }

        TreeSet<Long> tweetTimes = tweets.get(tweetName);

        long timePeriod = endTime - startTime;
        long delta = getDelta(freq, timePeriod);
        long[] result = new long[(int) delta + 1];
        long intervalStart = startTime, intervalEnd = intervalStart + delta;
        int idx = 0;

        while (intervalStart <= endTime) {
            SortedSet<Long> timesSubset = tweetTimes.subSet(intervalStart, Math.min(intervalEnd, endTime + 1));
            result[idx] = timesSubset.size();
            ++idx;
        }

        return result;
    }

    private long getDelta(Frequency f, long timePeriod) {
        TimeUnit tu = TimeUnit.MILLISECONDS;

        if (f.equals(Frequency.MINUTE)) {
            return tu.toSeconds(timePeriod);
        } else if (f.equals(Frequency.HOUR)) {
            return tu.toHours(timePeriod);
        } else {
            return tu.toDays(timePeriod);
        }
    }

    enum Frequency {
        MINUTE, HOUR, DAY
    }

    /*
     * Generate some random timestamps
     */
    public static class TimeMachine {
        public static long between(Date startInclusive, Date endExclusive) {
            long startMillis = startInclusive.getTime();
            long endMillis = endExclusive.getTime();
            long randomMillisSinceEpoch = ThreadLocalRandom.current().nextLong(startMillis, endMillis);
            return randomMillisSinceEpoch;
        }
    }

    public static void main(String[] args) {
        long now = new Date().getTime();
        Date tenDaysAgo = new Date(now - TimeUnit.DAYS.toMillis(10));
        Date tenMinsAgo = new Date(now - TimeUnit.MINUTES.toMillis(10));
        Date oneMinAgo = new Date(now - TimeUnit.MINUTES.toMillis(1));
        Date tenHoursAgo = new Date(now - TimeUnit.HOURS.toMillis(10));

        TT1 tc = new TT1();
        Date rightnow = new Date(now);

        for (int i = 0; i < 1000; i++) {
            long randomTime = TimeMachine.between(tenDaysAgo, rightnow);
            tc.recordTweet("tweet", randomTime);
        }

        System.out.println(Arrays.toString(
                tc.getTweetCountsPerFrequency(Frequency.MINUTE, "tweet", oneMinAgo.getTime(), rightnow.getTime())));
        System.out.println(Arrays.toString(
                tc.getTweetCountsPerFrequency(Frequency.MINUTE, "tweet", tenMinsAgo.getTime(), rightnow.getTime())));
        System.out.println(Arrays.toString(
                tc.getTweetCountsPerFrequency(Frequency.HOUR, "tweet", tenMinsAgo.getTime(), rightnow.getTime())));
        System.out.println(Arrays.toString(
                tc.getTweetCountsPerFrequency(Frequency.HOUR, "tweet", tenHoursAgo.getTime(), rightnow.getTime())));
        System.out.println(Arrays.toString(
                tc.getTweetCountsPerFrequency(Frequency.DAY, "tweet", tenDaysAgo.getTime(), rightnow.getTime())));

        return;
    }
}
