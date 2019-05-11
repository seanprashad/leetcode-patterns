public class Practice_Recursive_FindPosition {
    public static int findPos(LinkedListNode head, int value) {
        if (head == null) {
            return -1;
        }

        if (head.data == value) {
            return 0;
        }

        int count = findPos(head.next, value);
        return (count == -1) ? -1 : ++count;
    }

    public static void main(String[] args) {
        LinkedListNode l1 = new LinkedListNode(1);
        LinkedListNode l2 = new LinkedListNode(2);
        LinkedListNode l3 = new LinkedListNode(3);
        LinkedListNode l4 = new LinkedListNode(3);
        l1.setNext(l2);
        l2.setNext(l3);
        l3.setNext(l4);
        System.out.println(findPos(l1, 3));
        return;
    }
}