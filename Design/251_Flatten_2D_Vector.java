class Vector2D {
    private int[][] v;
    private int outer, inner;

    public Vector2D(int[][] v) {
        this.v = v;
        outer = 0;
        inner = 0;
    }

    private void advancedToNext() {
        while (outer < v.length && inner == v[outer].length) {
            inner = 0;
            ++outer;
        }
    }

    public int next() {
        advancedToNext();
        return v[outer][inner++];
    }

    public boolean hasNext() {
        advancedToNext();
        return outer < v.length;
    }
}
