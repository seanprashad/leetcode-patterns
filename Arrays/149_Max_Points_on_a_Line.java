class Solution {
    public int maxPoints(int[][] points) {
        if (points == null || points.length == 0) {
            return 0;
        }

        int result = 0;
        Map<String, Integer> map = new HashMap<>();

        for (int i = 0; i < points.length; i++) {
            map.clear();

            int overlap = 0, count = 0;

            for (int j = i + 1; j < points.length; j++) {
                int x = points[i][0] - points[j][0];
                int y = points[i][1] - points[j][1];

                if (x == 0 && y == 0) {
                    ++overlap;
                    continue;
                }

                int gcd = gcd(x, y);

                x /= gcd;
                y /= gcd;

                String key = x + ":" + y;

                map.put(key, map.getOrDefault(key, 0) + 1);
                count = Math.max(count, map.get(key));
            }

            result = Math.max(result, overlap + count + 1);
        }

        return result;
    }

    private int gcd(int a, int b) {
        if (b == 0) {
            return a;
        }
        return gcd(b, a % b);
    }
}
