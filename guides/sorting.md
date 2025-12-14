# Sorting Pattern

## Core Concept

Sorting is the process of arranging elements in a particular order (ascending or descending). While sorting itself is a fundamental operation, many problems become easier after sorting the input.

## When to Use

Use Sorting when:

- **Order matters**: Need elements in specific order
- **Simplify problem**: Sorting makes problem easier to solve
- **Two pointers**: Sorted array enables two-pointer technique
- **Binary search**: Requires sorted array
- **Grouping**: Group similar elements together

### Problem Indicators

- "Sort array"
- "Find kth largest/smallest"
- "Merge sorted arrays"
- "Intersection of arrays"
- Problems where order helps

## Template Code

### Built-in Sort

```python
# Python
arr.sort()  # In-place
sorted_arr = sorted(arr)  # New array

# Custom comparator
arr.sort(key=lambda x: x[1])  # Sort by second element
arr.sort(key=lambda x: (-x[0], x[1]))  # Sort by first desc, second asc
```

### Quick Sort

```python
def quicksort(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        quicksort(arr, low, pi - 1)
        quicksort(arr, pi + 1, high)

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1
```

### Merge Sort

```python
def mergesort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = mergesort(arr[:mid])
    right = mergesort(arr[mid:])
    
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    result.extend(left[i:])
    result.extend(right[j:])
    return result
```

### JavaScript Template

```javascript
// Built-in sort
arr.sort((a, b) => a - b); // Ascending
arr.sort((a, b) => b - a); // Descending

// Custom comparator
arr.sort((a, b) => {
    if (a[0] !== b[0]) return a[0] - b[0];
    return a[1] - b[1];
});
```

## Common Use Cases

1. **Two Sum on sorted array**: Use two pointers
2. **K largest/smallest**: Sort and take first/last k
3. **Merge intervals**: Sort by start time
4. **Anagrams**: Sort characters to group anagrams

## Related Problems

View all Sorting problems in the [main question list](https://seanprashad.com/leetcode-patterns/).

Common problems include:
- Sort Colors
- Merge Sorted Array
- Kth Largest Element
- Meeting Rooms
- Group Anagrams

## Time & Space Complexity

- **Comparison sorts**: O(n log n) best case
- **Counting sort**: O(n + k) for small range
- **Space**: O(1) for in-place, O(n) for merge sort

## Tips

1. **Use built-in**: Python's `sort()` is highly optimized
2. **Custom comparator**: Learn to write custom comparison functions
3. **Stability**: Some algorithms maintain relative order of equal elements
4. **When to sort**: Sort if it simplifies the problem

