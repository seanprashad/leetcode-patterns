class Solution {
    public int evalRPN(String[] tokens) {
        Stack<Integer> st = new Stack<>();

        Set<String> operators = buildOperators();

        for (String token : tokens) {
            if (!operators.contains(token)) {
                st.push(Integer.valueOf(token));
                continue;
            }

            Integer num2 = st.pop();
            Integer num1 = st.pop();

            int tempResult = 0;

            switch (token) {
                case "+":
                    tempResult = num1 + num2;
                    break;
                case "-":
                    tempResult = num1 - num2;
                    break;
                case "*":
                    tempResult = num1 * num2;
                    break;
                case "/":
                    tempResult = num1 / num2;
                    break;
            }

            st.push(tempResult);
        }

        return st.pop();
    }

    private Set<String> buildOperators() {
        Set<String> operators = new HashSet<>();

        operators.add("+");
        operators.add("-");
        operators.add("*");
        operators.add("/");

        return operators;
    }
}
