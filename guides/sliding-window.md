# Sliding Window Pattern

## Core Concept

The Sliding Window pattern is a technique used to solve problems involving subarrays or substrings of a fixed or variable size. Instead of recalculating values for every possible subarray, we maintain a "window" that slides through the array, efficiently updating our calculations as we move.

The key insight is that when moving the window, we only need to:
- Remove the element leaving the window
- Add the element entering the window
- Update our calculation based on these changes

## When to Use

Use the Sliding Window pattern when you encounter problems with these characteristics:

- **Subarray/Substring problems**: Finding subarrays or substrings that meet certain criteria
- **Fixed or variable window size**: Problems asking for subarrays of size k, or the longest/shortest subarray meeting a condition
- **Optimization problems**: Finding maximum, minimum, or count of subarrays
- **Common keywords**: "subarray", "substring", "contiguous", "window", "k elements"

### Problem Indicators

- "Find the maximum sum of k consecutive elements"
- "Find the longest substring with at most k distinct characters"
- "Find all subarrays of size k with sum less than target"
- "Minimum window substring"

## Template Code

### Fixed Window Size

```python
def sliding_window_fixed(arr, k):
    # Initialize window
    window_sum = sum(arr[:k])
    result = window_sum
    
    # Slide the window
    for i in range(k, len(arr)):
        # Remove leftmost element, add rightmost element
        window_sum = window_sum - arr[i - k] + arr[i]
        result = max(result, window_sum)  # or min, or other operation
    
    return result
```

### Variable Window Size (Two Pointers)

```python
def sliding_window_variable(arr, target):
    left = 0
    window_sum = 0
    result = float('inf')
    
    for right in range(len(arr)):
        # Expand window
        window_sum += arr[right]
        
        # Shrink window while condition is met
        while window_sum >= target:
            result = min(result, right - left + 1)
            window_sum -= arr[left]
            left += 1
    
    return result if result != float('inf') else 0
```

### JavaScript Template

```javascript
function slidingWindowFixed(arr, k) {
    let windowSum = arr.slice(0, k).reduce((a, b) => a + b, 0);
    let result = windowSum;
    
    for (let i = k; i < arr.length; i++) {
        windowSum = windowSum - arr[i - k] + arr[i];
        result = Math.max(result, windowSum);
    }
    
    return result;
}

function slidingWindowVariable(arr, target) {
    let left = 0;
    let windowSum = 0;
    let result = Infinity;
    
    for (let right = 0; right < arr.length; right++) {
        windowSum += arr[right];
        
        while (windowSum >= target) {
            result = Math.min(result, right - left + 1);
            windowSum -= arr[left];
            left++;
        }
    }
    
    return result === Infinity ? 0 : result;
}
```

## Common Variations

1. **Maximum/Minimum in Window**: Use a deque to track max/min efficiently
2. **Counting Subarrays**: Count subarrays meeting a condition
3. **Character Frequency**: Track character counts in substring problems
4. **Multiple Conditions**: Handle multiple constraints simultaneously

## Related Problems

View all Sliding Window problems in the [main question list](https://seanprashad.com/leetcode-patterns/).

Common problems include:
- Maximum Average Subarray
- Longest Substring Without Repeating Characters
- Minimum Window Substring
- Subarray Product Less Than K
- Maximum Sum Subarray of Size K

## Time & Space Complexity

- **Time Complexity**: Typically O(n) - each element is visited at most twice (once by left pointer, once by right pointer)
- **Space Complexity**: O(1) for fixed window, O(k) if storing window elements, or O(min(m,n)) for character frequency maps where m is character set size

## Tips

1. **Identify the window type**: Fixed size vs. variable size
2. **Determine what to track**: Sum, product, character frequency, etc.
3. **Define window validity**: When is the window valid? When should we shrink it?
4. **Handle edge cases**: Empty arrays, k > array length, etc.

