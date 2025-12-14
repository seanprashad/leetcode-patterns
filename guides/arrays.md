# Arrays Pattern

## Core Concept

Arrays are fundamental data structures that store elements in contiguous memory locations. While arrays themselves aren't a "pattern" per se, many array manipulation techniques form the foundation for other patterns. This guide covers common array techniques and problem-solving approaches.

## When to Use

Array techniques are used in:

- **Index manipulation**: Accessing, updating, or rearranging elements
- **In-place operations**: Modifying arrays without extra space
- **Prefix/Suffix arrays**: Precomputing cumulative values
- **Array rotation**: Rotating or shifting elements
- **Partitioning**: Dividing arrays into segments

### Problem Indicators

- "Given an array..."
- "Rearrange elements..."
- "Find missing/duplicate numbers"
- "Rotate array by k positions"
- "Partition array around pivot"

## Template Code

### In-place Array Modification

```python
def in_place_modification(arr):
    # Two pointers for in-place operations
    write_idx = 0
    
    for read_idx in range(len(arr)):
        if should_keep(arr[read_idx]):
            arr[write_idx] = arr[read_idx]
            write_idx += 1
    
    return write_idx  # New length
```

### Array Rotation

```python
def rotate_array(arr, k):
    n = len(arr)
    k = k % n  # Handle k > n
    
    # Reverse entire array
    arr.reverse()
    
    # Reverse first k elements
    arr[:k] = reversed(arr[:k])
    
    # Reverse remaining elements
    arr[k:] = reversed(arr[k:])
```

### Prefix Sum

```python
def prefix_sum(arr):
    prefix = [0] * (len(arr) + 1)
    
    for i in range(len(arr)):
        prefix[i + 1] = prefix[i] + arr[i]
    
    return prefix

# Query range sum [i, j]
def range_sum(prefix, i, j):
    return prefix[j + 1] - prefix[i]
```

### JavaScript Template

```javascript
function inPlaceModification(arr) {
    let writeIdx = 0;
    
    for (let readIdx = 0; readIdx < arr.length; readIdx++) {
        if (shouldKeep(arr[readIdx])) {
            arr[writeIdx] = arr[readIdx];
            writeIdx++;
        }
    }
    
    return writeIdx;
}

function rotateArray(arr, k) {
    const n = arr.length;
    k = k % n;
    
    reverse(arr, 0, n - 1);
    reverse(arr, 0, k - 1);
    reverse(arr, k, n - 1);
}

function reverse(arr, start, end) {
    while (start < end) {
        [arr[start], arr[end]] = [arr[end], arr[start]];
        start++;
        end--;
    }
}
```

## Common Techniques

1. **Two Pointers**: Often combined with arrays
2. **Sliding Window**: Subarray problems
3. **Hash Map**: Tracking frequencies or indices
4. **Sorting**: Many array problems benefit from sorting first
5. **Binary Search**: On sorted arrays

## Related Problems

View all Arrays problems in the [main question list](https://seanprashad.com/leetcode-patterns/).

Common problems include:
- Contains Duplicate
- Missing Number
- Product of Array Except Self
- Rotate Array
- Move Zeroes

## Time & Space Complexity

- **Time Complexity**: Varies by technique - O(n) for linear scans, O(n log n) if sorting needed
- **Space Complexity**: O(1) for in-place operations, O(n) if creating new arrays

## Tips

1. **Consider in-place**: Many problems can be solved without extra space
2. **Use indices wisely**: Array indices are powerful for tracking state
3. **Handle edge cases**: Empty arrays, single element, all same values
4. **Modulo for rotation**: Use modulo to handle k > array length

