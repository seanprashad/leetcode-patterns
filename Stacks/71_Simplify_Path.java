class Solution {
    public String simplifyPath(String path) {
        if (path == null || path.isEmpty()) {
            return "";
        }

        Stack<String> st = new Stack<>();
        StringBuilder sb = new StringBuilder();
        String[] components = path.split("/");

        for (String s : components) {
            if (s.isEmpty() || s.equals(".")) {
                continue;
            } else if (s.equals("..")) {
                if (!st.isEmpty()) {
                    st.pop();
                }
            } else {
                st.push(s);
            }
        }

        for (String dir : st) {
            sb.append("/").append(dir);
        }

        return sb.length() == 0 ? "/" : sb.toString();
    }
}
