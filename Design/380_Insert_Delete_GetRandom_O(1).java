class RandomizedSet {
    private List<Integer> list;
    private Map<Integer, Integer> hm;

    /** Initialize your data structure here. */
    public RandomizedSet() {
        list = new ArrayList<>();
        hm = new HashMap<>();
    }

    /**
     * Inserts a value to the set. Returns true if the set did not already contain
     * the specified element.
     */
    public boolean insert(int val) {
        if (hm.containsKey(val)) {
            return false;
        }

        list.add(val);
        hm.put(val, list.size() - 1);
        return true;
    }

    /**
     * Removes a value from the set. Returns true if the set contained the specified
     * element.
     */
    public boolean remove(int val) {
        if (!hm.containsKey(val)) {
            return false;
        }

        int idx = hm.get(val);
        int lastElement = list.get(list.size() - 1);

        list.set(idx, lastElement);
        list.remove(list.size() - 1);
        hm.put(lastElement, idx);
        hm.remove(val);

        return true;
    }

    /** Get a random element from the set. */
    public int getRandom() {
        Random rand = new Random();
        int randIdx = rand.nextInt(list.size());

        return list.get(randIdx);
    }
}
