class FreqStack {
    private List<Stack<Integer>> sList;
    private Map<Integer, Integer> m;

    public FreqStack() {
        sList = new ArrayList<>();
        m = new HashMap<>();
    }

    public void push(int x) {
        m.put(x, m.getOrDefault(x, 0) + 1);

        if (sList.size() < m.get(x)) {
            sList.add(new Stack<>());
        }
        sList.get(m.get(x) - 1).push(x);
    }

    public int pop() {
        int result = sList.get(sList.size() - 1).pop();
        m.put(result, m.get(result) - 1);

        if (sList.get(sList.size() - 1).isEmpty()) {
            sList.remove(sList.size() - 1);
        }

        return result;
    }
}
