import java.util.HashMap;

class Single_Number_136_HashMap {
    public int singleNumber(int[] nums) {
        HashMap<Integer, Integer> hm = new HashMap<Integer, Integer>();

        int unique = Integer.MIN_VALUE;

        for (Integer n : nums) {
            Integer cnt = hm.get(n);
            if (cnt != null) {
                hm.put(n, ++cnt);
            } else {
                hm.put(n, 1);
            }
        }

        for (Integer key : hm.keySet()) {
            Integer cnt = hm.get(key);
            if (cnt == 1) {
                unique = key;
            }
        }

        return unique;
    }
}