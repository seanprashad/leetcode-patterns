public class NestedIterator implements Iterator<Integer> {
    private Deque<Iterator<NestedInteger>> st;
    private Integer next;

    public NestedIterator(List<NestedInteger> nestedList) {
        st = new ArrayDeque<>();
        st.push(nestedList.iterator());
        advance();
    }

    private void advance() {
        next = null;

        while (!st.isEmpty()) {
            Iterator<NestedInteger> it = st.peekFirst();

            if (!it.hasNext()) {
                st.pollFirst();
            } else {
                NestedInteger n = it.next();

                if (n.isInteger()) {
                    next = n.getInteger();
                    return;
                } else {
                    st.push(n.getList().iterator());
                }
            }
        }
    }

    @Override
    public Integer next() {
        Integer n = next;
        advance();
        return n;
    }

    @Override
    public boolean hasNext() {
        return next != null;
    }
}
