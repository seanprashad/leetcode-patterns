class Solution {
    public String minRemoveToMakeValid(String s) {
        if (s == null || s.length() == 0) { return new String(); }
        
        StringBuilder sb = new StringBuilder();
        Stack<Integer> st = new Stack<>();
        Set<Integer> invalidIndices = new HashSet<>();
        
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            
            if (c == '(') { st.push(i); }
            else if (c ==')') {
                if (st.isEmpty()) { invalidIndices.add(i); }
                else { st.pop(); }
            }
        }
        
        while (!st.isEmpty()) { invalidIndices.add(st.pop()); }

        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            
            if (invalidIndices.contains(i)) { continue; }
            sb.append(c);
        }
            
        return sb.toString();
    }
}
