class Solution {
    public Node lowestCommonAncestor(Node p, Node q) {
        Set<Node> pParents = new HashSet<>();

        while (p != null) {
            pParents.add(p);
            p = p.parent;
        }

        while (q != null) {
            if (pParents.contains(q)) {
                return q;
            }

            q = q.parent;
        }

        return null;
    }
}
