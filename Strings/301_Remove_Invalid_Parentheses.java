class Solution {
    public List<String> removeInvalidParentheses(String s) {
        if (s == null) {
            return Collections.emptyList();
        }

        Queue<String> q = new LinkedList<>();
        Set<String> visited = new HashSet<>();

        q.offer(s);
        visited.add(s);

        boolean found = false;
        List<String> result = new ArrayList<>();

        while (!q.isEmpty()) {
            s = q.poll();

            if (isValid(s)) {
                result.add(s);
                found = true;
            }

            if (found) {
                continue;
            }

            for (int i = 0; i < s.length(); i++) {
                if (s.charAt(i) != '(' && s.charAt(i) != ')') {
                    continue;
                }

                String temp = s.substring(0, i) + s.substring(i + 1);

                if (!visited.contains(temp)) {
                    q.offer(temp);
                    visited.add(temp);
                }
            }
        }

        return result;
    }

    private boolean isValid(String s) {
        int leftCount = 0;

        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == '(') {
                ++leftCount;
            }
            if (s.charAt(i) == ')') {
                if (leftCount == 0) {
                    return false;
                }
                --leftCount;
            }
        }

        return leftCount == 0;
    }
}
