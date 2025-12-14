# In-place Reversal of a Linked List Pattern

## Core Concept

In-place reversal of a linked list involves reversing the order of nodes without using extra space for a new list. This is done by manipulating pointers to change the direction of links.

## When to Use

Use this pattern when:

- **Reverse linked list**: Need to reverse entire or portion of list
- **In-place requirement**: Cannot use extra space
- **Pointer manipulation**: Comfortable with pointer operations
- **Partial reversal**: Reverse specific portion of list

### Problem Indicators

- "Reverse linked list"
- "Reverse nodes in k-group"
- "Reverse between positions"
- "Palindrome linked list" (reverse and compare)

## Template Code

### Reverse Entire List

```python
def reverse_list(head):
    prev = None
    current = head
    
    while current:
        next_node = current.next
        current.next = prev
        prev = current
        current = next_node
    
    return prev
```

### Reverse Between Positions

```python
def reverse_between(head, left, right):
    if not head or left == right:
        return head
    
    dummy = ListNode(0)
    dummy.next = head
    prev = dummy
    
    # Move to left position
    for _ in range(left - 1):
        prev = prev.next
    
    # Reverse from left to right
    current = prev.next
    for _ in range(right - left):
        next_node = current.next
        current.next = next_node.next
        next_node.next = prev.next
        prev.next = next_node
    
    return dummy.next
```

### Reverse in K-Groups

```python
def reverse_k_group(head, k):
    def reverse_linked_list(start, end):
        prev = end
        current = start
        
        while current != end:
            next_node = current.next
            current.next = prev
            prev = current
            current = next_node
        
        return prev
    
    # Count nodes
    count = 0
    current = head
    while current and count < k:
        current = current.next
        count += 1
    
    if count == k:
        # Reverse first k nodes
        current = reverse_k_group(current, k)
        head = reverse_linked_list(head, current)
    
    return head
```

### JavaScript Template

```javascript
function reverseList(head) {
    let prev = null;
    let current = head;
    
    while (current) {
        const next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    
    return prev;
}
```

## Common Variations

1. **Partial reversal**: Reverse specific portion
2. **K-group reversal**: Reverse in groups of k
3. **Alternating reversal**: Reverse every other group
4. **Recursive reversal**: Recursive approach

## Related Problems

View all In-place reversal problems in the [main question list](https://seanprashad.com/leetcode-patterns/).

Common problems include:
- Reverse Linked List
- Reverse Linked List II
- Reverse Nodes in k-Group
- Swap Nodes in Pairs

## Time & Space Complexity

- **Time Complexity**: O(n) - single pass through list
- **Space Complexity**: O(1) - only using pointers

## Tips

1. **Three pointers**: Use prev, current, next
2. **Dummy node**: Use dummy node for edge cases
3. **Draw it out**: Visualize pointer movements
4. **Handle edge cases**: Empty list, single node, etc.

