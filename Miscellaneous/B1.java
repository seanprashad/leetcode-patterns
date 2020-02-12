import java.util.Stack;

public class B1 {
    private static String expandEquation(String eqn) {
        if (eqn == null || eqn.length() == 0) {
            return null;
        }

        StringBuilder sb = new StringBuilder();
        Stack<Integer> s = new Stack<>();
        int i = 0;

        // 0 represents the same value, 1 represents toggle
        s.push(0);

        while (i < eqn.length()) {
            if (eqn.charAt(i) == '-') {
                if (s.peek() == 1) {
                    sb.append('+');
                } else {
                    sb.append('-');
                }
            } else if (eqn.charAt(i) == '+') {
                if (s.peek() == 1) {
                    sb.append('-');
                } else {
                    sb.append('+');
                }
            } else if (eqn.charAt(i) == '(' && i > 0) {
                char preSign = eqn.charAt(i - 1);

                // For nested brackets, if the outtermost sign is a
                // negative sign, then check if we need to negate
                // the sign.
                //
                // If the outtermost sign is a positive sign,
                // then push the previous toggle value as
                // positive sign's don't negate anything.
                if (preSign == '-') {
                    if (s.peek() == 1) {
                        s.push(0);
                    } else {
                        s.push(1);
                    }
                } else {
                    s.push(s.peek());
                }
            } else if (eqn.charAt(i) == ')') {
                s.pop();
            } else {
                sb.append(eqn.charAt(i));
            }

            ++i;
        }

        return sb.toString();
    }

    public static void main(String[] args) {
        String equation1 = "-(a+b)";
        String equation2 = "-(a+b)+c-(d-e)";
        String equation3 = "a-b+(c-d)";
        String equation4 = "a-(b+c)";
        String equation5 = "a-(b-c-(d+e))-f";

        System.out.println(expandEquation(equation1));
        System.out.println(expandEquation(equation2));
        System.out.println(expandEquation(equation3));
        System.out.println(expandEquation(equation4));
        System.out.println(expandEquation(equation5));

        return;
    }
}
