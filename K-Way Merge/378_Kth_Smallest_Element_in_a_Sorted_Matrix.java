class Solution {
    public int kthSmallest(int[][] matrix, int k) {
        PriorityQueue<Element> pq = new PriorityQueue<>((a, b) -> a.val - b.val);

        for (int i = 0; i < matrix.length; i++) {
            Element e = new Element(matrix[0][i], 0, i);
            pq.offer(e);
        }

        for (int i = 0; i < k - 1; i++) {
            Element e = pq.poll();

            if (e.row == matrix.length - 1) {
                continue;
            }

            e.row = e.row + 1;
            e.val = matrix[e.row][e.col];
            pq.offer(e);
        }

        return pq.poll().val;
    }

    class Element {
        int val;
        int row;
        int col;

        public Element(int v, int r, int c) {
            val = v;
            row = r;
            col = c;
        }
    }
}
