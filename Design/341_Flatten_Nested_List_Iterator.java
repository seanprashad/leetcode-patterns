public class NestedIterator implements Iterator<Integer> {
    private Queue<NestedInteger> q;

    public NestedIterator(List<NestedInteger> nestedList) {
        q = new LinkedList<>();
        flatten(nestedList);
    }

    private void flatten(List<NestedInteger> nestedList) {
        if (nestedList == null) {
            return;
        }

        for (NestedInteger n : nestedList) {
            if (n.isInteger()) {
                q.offer(n);
            } else {
                flatten(n.getList());
            }
        }
    }

    @Override
    public Integer next() {
        return hasNext() ? q.poll().getInteger() : null;
    }

    @Override
    public boolean hasNext() {
        return !q.isEmpty();
    }
}
