# Fast & Slow Pointers Pattern

## Core Concept

The Fast & Slow Pointers pattern (also known as the "Tortoise and Hare" algorithm) uses two pointers that move through a data structure at different speeds. Typically:
- **Slow pointer**: Moves one step at a time
- **Fast pointer**: Moves two steps at a time

This pattern is particularly useful for:
- Detecting cycles in linked lists
- Finding the middle of a linked list
- Finding the kth element from the end
- Detecting palindromes in linked lists

## When to Use

Use Fast & Slow Pointers when:

- **Cycle detection**: Need to detect if a linked list has a cycle
- **Finding middle**: Need to find the middle element of a linked list
- **Linked list problems**: Many linked list problems benefit from this pattern
- **Palindrome in linked list**: Checking if a linked list is a palindrome
- **Finding kth from end**: Locating the kth element from the end

### Problem Indicators

- "Detect if linked list has a cycle"
- "Find the middle of a linked list"
- "Check if linked list is palindrome"
- "Find the kth node from the end"
- "Remove the nth node from end"

## Template Code

### Cycle Detection

```python
def has_cycle(head):
    if not head or not head.next:
        return False
    
    slow = head
    fast = head.next
    
    while fast and fast.next:
        if slow == fast:
            return True
        slow = slow.next
        fast = fast.next.next
    
    return False
```

### Finding Middle Node

```python
def find_middle(head):
    slow = head
    fast = head
    
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    
    return slow
```

### Finding Cycle Start (Floyd's Algorithm)

```python
def detect_cycle_start(head):
    # Step 1: Detect if cycle exists
    slow = fast = head
    
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            break
    else:
        return None  # No cycle
    
    # Step 2: Find cycle start
    slow = head
    while slow != fast:
        slow = slow.next
        fast = fast.next
    
    return slow
```

### JavaScript Template

```javascript
function hasCycle(head) {
    if (!head || !head.next) return false;
    
    let slow = head;
    let fast = head.next;
    
    while (fast && fast.next) {
        if (slow === fast) return true;
        slow = slow.next;
        fast = fast.next.next;
    }
    
    return false;
}

function findMiddle(head) {
    let slow = head;
    let fast = head;
    
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    return slow;
}
```

## Common Variations

1. **Different Speeds**: Adjust speeds (e.g., 1:3 ratio) for specific problems
2. **Kth from End**: Use two pointers with k distance between them
3. **Palindrome Check**: Reverse second half and compare
4. **Cycle Length**: Find the length of the cycle

## Related Problems

View all Fast & Slow Pointers problems in the [main question list](https://seanprashad.com/leetcode-patterns/).

Common problems include:
- Linked List Cycle
- Middle of the Linked List
- Palindrome Linked List
- Remove Nth Node From End of List
- Reorder List

## Time & Space Complexity

- **Time Complexity**: O(n) - linear traversal of the linked list
- **Space Complexity**: O(1) - only using two pointers, constant extra space

## Mathematical Insight

Floyd's Cycle Detection Algorithm works because:
- If there's a cycle, the fast pointer will eventually catch up to the slow pointer
- When they meet, the distance from head to cycle start equals the distance from meeting point to cycle start
- This allows us to find the cycle start with a second pass

## Tips

1. **Initialize carefully**: Start both pointers appropriately (same node or one step apart)
2. **Check for null**: Always check if fast and fast.next exist before accessing
3. **Edge cases**: Handle empty list, single node, no cycle scenarios
4. **Visualize**: Draw the linked list to understand pointer movement

