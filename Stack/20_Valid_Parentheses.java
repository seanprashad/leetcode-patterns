import java.util.Stack;

public class Valid_Parentheses_20 {
    public static boolean isValid(String s) {
        if (s == null || s.length() == 0) {
            return true;
        }

        Stack<Character> st = new Stack<Character>();

        for (Character c : s.toCharArray()) {
            if (c == '(') {
                st.push(')');
            } else if (c == '{') {
                st.push('}');
            } else if (c == '[') {
                st.push(']');
            } else if (st.empty() || st.pop() != c) {
                return false;
            }
        }

        if (!st.empty()) {
            return false;
        }

        return true;
    }

    public static void main(String[] args) {
        String valid = "{([])}";
        String inValidOne = "{[])}";
        String inValidTwo = "{{{{{{";
        String inValidThree = "}}}}}}}}}}";

        System.out.println(isValid(valid));
        System.out.println(isValid(inValidOne));
        System.out.println(isValid(inValidTwo));
        System.out.println(isValid(inValidThree));

        return;
    }
}
