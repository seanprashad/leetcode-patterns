public class Codec {
    public String encode(List<String> strs) {
        StringBuilder sb = new StringBuilder();

        for (String str : strs) {
            sb.append(str.length()).append(':').append(str);
        }

        return sb.toString();
    }

    public List<String> decode(String s) {
        if (s == null || s.length() == 0) {
            return Collections.emptyList();
        }

        List<String> result = new ArrayList<>();
        int idx = 0;

        while (idx < s.length()) {
            int colonIdx = s.indexOf(":", idx);
            int strLen = Integer.valueOf(s.substring(idx, colonIdx));

            idx = colonIdx + 1;

            result.add(s.substring(idx, idx + strLen));

            idx += strLen;
        }

        return result;
    }
}
