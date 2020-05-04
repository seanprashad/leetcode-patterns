public class Codec {
    private String DELIMETER = ",";

    public String serialize(TreeNode root) {
        StringBuilder sb = new StringBuilder();
        preorder(root, sb);
        return sb.toString();
    }

    private void preorder(TreeNode root, StringBuilder sb) {
        if (root == null) {
            return;
        }

        sb.append(root.val).append(DELIMETER);
        preorder(root.left, sb);
        preorder(root.right, sb);
    }

    public TreeNode deserialize(String data) {
        if (data == null || data.length() == 0) {
            return null;
        }

        Queue<String> q = new LinkedList<>(Arrays.asList(data.split(DELIMETER)));
        return deserialize(q, Integer.MIN_VALUE, Integer.MAX_VALUE);
    }

    private TreeNode deserialize(Queue<String> q, int min, int max) {
        if (q.isEmpty())
            return null;
        if (Integer.valueOf(q.peek()) < min || Integer.valueOf(q.peek()) > max) {
            return null;
        }

        int rootVal = Integer.valueOf(q.poll());

        TreeNode t = new TreeNode(rootVal);
        t.left = deserialize(q, min, rootVal);
        t.right = deserialize(q, rootVal, max);

        return t;
    }
}
