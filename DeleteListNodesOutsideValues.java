public class DeleteListNodesOutsideValues {
    public static LinkedListNode deleteNodes(LinkedListNode head, int min, int max) {
        if (head == null) {
            return head;
        }
        LinkedListNode temp = new LinkedListNode(0); // Slow node
        LinkedListNode begin = temp;
        while (head != null) {
            // If head.data is > min && < max, temp's next
            // should be set to head, since it's value is VALID!
            // We will need to move forward temp to the latest node
            // that it points to as well.
            if (head.data > min && head.data < max) {
                temp.next = head;
                temp = temp.next;
            }
            head = head.next;
        }

        if (temp != null) {
            temp.next = null;
        }

        return begin.next;
    }

    public static void main(String[] args) {
        LinkedListNode head = new LinkedListNode(1);
        LinkedListNode first = new LinkedListNode(2);
        LinkedListNode second = new LinkedListNode(3);
        LinkedListNode third = new LinkedListNode(4);
        LinkedListNode fourth = new LinkedListNode(5);
        LinkedListNode fifth = new LinkedListNode(6);
        LinkedListNode sixth = new LinkedListNode(7);

        head.next = first;
        first.next = second;
        second.next = third;
        third.next = fourth;
        fourth.next = fifth;
        fifth.next = sixth;

        LinkedListNode result = deleteNodes(head, 1, 5);

        while (result != null) {
            System.out.println(result.data);
            result = result.next;
        }

        return;
    }
}
