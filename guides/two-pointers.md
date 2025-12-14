# Two Pointers Pattern

## Core Concept

The Two Pointers pattern uses two pointers (indices) that traverse a data structure in a coordinated manner. The pointers can move:
- **Towards each other** (from both ends)
- **In the same direction** (both from start, or both from end)
- **At different speeds** (fast and slow pointers)

This pattern eliminates the need for nested loops in many cases, reducing time complexity from O(n²) to O(n).

## When to Use

Use the Two Pointers pattern when:

- **Sorted arrays**: Problems involving sorted arrays or linked lists
- **Pair searching**: Finding pairs that meet certain criteria
- **Palindrome checking**: Verifying if a sequence is a palindrome
- **Partitioning**: Dividing elements into groups based on conditions
- **Cycle detection**: Detecting cycles in linked lists (fast & slow pointers)

### Problem Indicators

- "Find two numbers that sum to target in sorted array"
- "Remove duplicates from sorted array"
- "Check if string is palindrome"
- "Partition array around a pivot"
- "Detect cycle in linked list"

## Template Code

### Opposite Ends (Converging)

```python
def two_pointers_converging(arr, target):
    left = 0
    right = len(arr) - 1
    
    while left < right:
        current_sum = arr[left] + arr[right]
        
        if current_sum == target:
            return [left, right]
        elif current_sum < target:
            left += 1  # Need larger sum
        else:
            right -= 1  # Need smaller sum
    
    return [-1, -1]
```

### Same Direction (Sliding Window Variant)

```python
def two_pointers_same_direction(arr):
    slow = 0
    
    for fast in range(len(arr)):
        if should_keep(arr[fast]):
            arr[slow] = arr[fast]
            slow += 1
    
    return slow  # New length
```

### Fast & Slow Pointers (Cycle Detection)

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

### JavaScript Template

```javascript
function twoPointersConverging(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left < right) {
        const sum = arr[left] + arr[right];
        
        if (sum === target) {
            return [left, right];
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    
    return [-1, -1];
}

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
```

## Common Variations

1. **Three Pointers**: Extend to three pointers for 3Sum problems
2. **Multiple Arrays**: Use pointers on different arrays simultaneously
3. **Partitioning**: Use pointers to partition elements (e.g., Dutch National Flag)
4. **In-place Operations**: Modify arrays in-place without extra space

## Related Problems

View all Two Pointers problems in the [main question list](https://seanprashad.com/leetcode-patterns/).

Common problems include:
- Two Sum (sorted array)
- Remove Duplicates from Sorted Array
- Valid Palindrome
- Container With Most Water
- 3Sum
- Trapping Rain Water

## Time & Space Complexity

- **Time Complexity**: O(n) - each element is visited at most once by each pointer
- **Space Complexity**: O(1) - only using a constant amount of extra space for pointers

## Tips

1. **Sort first**: Many two-pointer problems require sorted input
2. **Identify pointer movement**: Determine when each pointer should move
3. **Handle duplicates**: Be careful with duplicate values in sorted arrays
4. **Edge cases**: Empty arrays, single element, all elements same

