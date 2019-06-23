import java.util.Stack;

public class Valid_Parentheses {
    public static boolean isValid(String s) {
        // Convert s to charArray
        // Loop through each element in charArray
        // if element is {[( then push onto stack
        // if element is }]) then pop stack, check if the popped element is the
        // corresponding opening bracket -> if it is, continue; if not, return
        // invalid
        // if end of array, check if stack empty -> if it is, then valid; if
        // not then invalid

        // boolean isValid = true;
        Stack<Character> st = new Stack<>();
        char[] chArray = s.toCharArray();

        for (int i = 0; i < chArray.length; i++) {
            // Push opening brackets onto our stack
            if (chArray[i] == '{' || chArray[i] == '[' || chArray[i] == '(') {
                st.push(chArray[i]);
            }

            // If we find a closing bracket in our chArray, peek from the stack
            // and see if it matches!
            else if (chArray[i] == '}' && !st.isEmpty() && st.peek() == '{') {
                st.pop();
            } else if (chArray[i] == ']' && !st.isEmpty() && st.peek() == '[') {
                st.pop();
            } else if (chArray[i] == ')' && !st.isEmpty() && st.peek() == '(') {
                st.pop();
            } else {
                return false;
            }
        }

        return st.isEmpty();
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
