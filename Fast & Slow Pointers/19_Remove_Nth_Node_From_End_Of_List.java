//Link to question: https://leetcode.com/problems/remove-nth-node-from-end-of-list/

class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        
        ListNode temp=head;
        ListNode temp1=head;
        ListNode secondlast=head;
        int count=1;
        while(head.next!=null){
            head=head.next;
            count++;
        }
        if(count==0 || count==1)
            return null;
        else if(count-n+1==count){
            while(secondlast.next.next!=null)
                secondlast=secondlast.next;
            secondlast.next=null;
            return temp1;
        }
        else if(count-n+1==1){
            temp.val=temp.next.val;
            temp.next=temp.next.next;
            return(temp1);
        }
        else{
            n=count-n;
            for(int i=1;i<=n;++i){
                temp=temp.next;
            }
            temp.val=temp.next.val;
            temp.next=temp.next.next;
            return(temp1);
        }
    }
}
