class Solution {
    public List<String> removeInvalidParentheses(String s) {
        List<String> result = new ArrayList<>();

        if (s == null) {
            return result;
        }

        Queue<String> q = new LinkedList<>();
        Set<String> visited = new HashSet<>();

        q.offer(s);
        visited.add(s);

        boolean finished = false;

        while (!q.isEmpty()) {
            s = q.poll();

            if (isValid(s)) {
                result.add(s);
                finished = true;
            }

            if (finished) {
                continue;
            }

            for (int i = 0; i < s.length(); i++) {
                if (s.charAt(i) != '(' && s.charAt(i) != ')') {
                    continue;
                }

                String t = s.substring(0, i) + s.substring(i + 1);

                if (!visited.contains(t)) {
                    q.offer(t);
                    visited.add(t);
                }
            }
        }

        return result;
    }

    private boolean isValid(String s) {
        int count = 0;

        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == '(') {
                count++;
            }
            if (s.charAt(i) == ')' && count-- == 0) {
                return false;
            }
        }

        return count == 0;
    }
}
