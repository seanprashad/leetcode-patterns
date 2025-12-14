# Binary Search Pattern

## Core Concept

Binary Search is a divide-and-conquer algorithm that efficiently searches for a target in a sorted array by repeatedly dividing the search space in half. The key requirement is that the array must be sorted (or have some ordering property).

Binary Search can be applied beyond simple search:
- Finding boundaries (first/last occurrence)
- Search in rotated arrays
- Finding peak elements
- Search in 2D matrices

## When to Use

Use Binary Search when:

- **Sorted data**: Array is sorted (or can be sorted)
- **Search optimization**: Need O(log n) instead of O(n) linear search
- **Boundary finding**: Finding first/last occurrence, insertion point
- **Monotonic property**: Problem has a monotonic property (increasing/decreasing)
- **Optimization problems**: Finding minimum/maximum value satisfying condition

### Problem Indicators

- "Find target in sorted array"
- "Find first/last occurrence"
- "Search in rotated sorted array"
- "Find peak element"
- "Find minimum/maximum satisfying condition"

## Template Code

### Standard Binary Search

```python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1  # Not found
```

### Finding Left Boundary (First Occurrence)

```python
def find_left_boundary(arr, target):
    left, right = 0, len(arr) - 1
    result = -1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if arr[mid] == target:
            result = mid
            right = mid - 1  # Continue searching left
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return result
```

### Finding Right Boundary (Last Occurrence)

```python
def find_right_boundary(arr, target):
    left, right = 0, len(arr) - 1
    result = -1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if arr[mid] == target:
            result = mid
            left = mid + 1  # Continue searching right
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return result
```

### Search in Rotated Array

```python
def search_rotated(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if arr[mid] == target:
            return mid
        
        # Left half is sorted
        if arr[left] <= arr[mid]:
            if arr[left] <= target < arr[mid]:
                right = mid - 1
            else:
                left = mid + 1
        # Right half is sorted
        else:
            if arr[mid] < target <= arr[right]:
                left = mid + 1
            else:
                right = mid - 1
    
    return -1
```

### JavaScript Template

```javascript
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}
```

## Common Variations

1. **Search Space Reduction**: Binary search on answer (e.g., finding minimum capacity)
2. **2D Binary Search**: Searching in sorted 2D matrix
3. **Finding Peak**: Using binary search to find peak element
4. **Square Root**: Using binary search for numerical problems

## Related Problems

View all Binary Search problems in the [main question list](https://seanprashad.com/leetcode-patterns/).

Common problems include:
- Binary Search
- Search in Rotated Sorted Array
- Find First and Last Position
- Search a 2D Matrix
- Find Peak Element
- Sqrt(x)

## Time & Space Complexity

- **Time Complexity**: O(log n) - halves search space each iteration
- **Space Complexity**: O(1) for iterative, O(log n) for recursive

## Important Notes

1. **Avoid overflow**: Use `left + (right - left) // 2` instead of `(left + right) // 2`
2. **Boundary conditions**: Carefully handle `<=` vs `<` in while condition
3. **Update bounds**: Always move `left = mid + 1` or `right = mid - 1` to avoid infinite loops
4. **Edge cases**: Empty array, single element, target not found

## Tips

1. **Identify sorted property**: Look for sorted or partially sorted data
2. **Monotonic function**: If problem has monotonic property, binary search may apply
3. **Template selection**: Choose appropriate template (standard, left boundary, right boundary)
4. **Test boundaries**: Always test with edge cases

