class Solution {
    public int[] smallestRange(List<List<Integer>> nums) {
        PriorityQueue<Element> pq = new PriorityQueue<>((a, b) -> a.val - b.val);

        int min = Integer.MAX_VALUE, max = Integer.MIN_VALUE, range = Integer.MAX_VALUE;

        for (int i = 0; i < nums.size(); i++) {
            Element e = new Element(nums.get(i).get(0), i, 0);
            pq.offer(e);
            max = Math.max(max, nums.get(i).get(0));
        }

        int start = -1, end = -1;

        while (pq.size() == nums.size()) {
            Element e = pq.poll();

            if (max - e.val < range) {
                range = max - e.val;
                start = e.val;
                end = max;
            }

            if (e.col + 1 < nums.get(e.row).size()) {
                e.col = e.col + 1;
                e.val = nums.get(e.row).get(e.col);

                pq.offer(e);

                if (e.val > max) {
                    max = e.val;
                }
            }
        }

        return new int[] { start, end };
    }

    class Element {
        private int val;
        private int row;
        private int col;

        public Element(int v, int r, int c) {
            val = v;
            row = r;
            col = c;
        }
    }
}
