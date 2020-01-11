class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        if (strs == null || strs.length == 0) {
            return Collections.emptyList();
        }

        Map<String, List<String>> hm = new HashMap<>();

        for (String s : strs) {
            char[] sArr = s.toCharArray();
            Arrays.sort(sArr);

            String keyStr = String.valueOf(sArr);
            if (!hm.containsKey(keyStr)) {
                hm.put(keyStr, new ArrayList<>());
            }

            hm.get(keyStr).add(s);
        }

        return new ArrayList<List<String>>(hm.values());
    }
}
