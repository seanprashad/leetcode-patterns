class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> map = new HashMap<>();

        for (int i = 0; i < strs.length; i++) {
            int[] ch = new int[26];

            for (int j = 0; j < strs[i].length(); j++) {
                ch[strs[i].charAt(j) - 'a']++;
            }

            StringBuilder sb = new StringBuilder();

            for (int j = 0; j < 26; j++) {
                sb.append(ch[j]);
            }

            map.putIfAbsent(sb.toString(), new ArrayList<>());
            map.get(sb.toString()).add(strs[i]);
        }

        return new ArrayList<>(map.values());
    }
}
