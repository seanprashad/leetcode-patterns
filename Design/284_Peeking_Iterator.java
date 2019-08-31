class PeekingIterator implements Iterator<Integer> {
    private Integer next;
    private Iterator<Integer> it;

    public PeekingIterator(Iterator<Integer> iterator) {
        it = iterator;
        next = it.next();
    }

    // Returns the next element in the iteration without advancing the iterator.
    public Integer peek() {
        return next;
    }

    // hasNext() and next() should behave the same as in the Iterator interface.
    // Override them if needed.
    @Override
    public Integer next() {
        Integer result = next;

        if (it.hasNext()) {
            next = it.next();
        } else {
            next = null;
        }

        return result;
    }

    @Override
    public boolean hasNext() {
        return next != null;
    }
}
