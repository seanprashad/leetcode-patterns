# QuickSelect Pattern

## Core Concept

QuickSelect is a selection algorithm to find the kth smallest (or largest) element in an unsorted array. It's based on QuickSort's partition algorithm but only recurses into the partition containing the desired element.

## When to Use

Use QuickSelect when:

- **Kth element**: Finding kth smallest/largest element
- **Partial sorting**: Need k smallest/largest elements
- **O(n) average**: Need better than O(n log n) for selection
- **In-place**: Need in-place algorithm

### Problem Indicators

- "Find kth largest"
- "Find kth smallest"
- "Top K elements"
- "Median of array"
- "K closest points"

## Template Code

### Find Kth Largest

```python
def find_kth_largest(nums, k):
    def quickselect(left, right, k_smallest):
        if left == right:
            return nums[left]
        
        pivot_index = partition(left, right, left)
        
        if k_smallest == pivot_index:
            return nums[pivot_index]
        elif k_smallest < pivot_index:
            return quickselect(left, pivot_index - 1, k_smallest)
        else:
            return quickselect(pivot_index + 1, right, k_smallest)
    
    def partition(left, right, pivot_index):
        pivot_value = nums[pivot_index]
        # Move pivot to end
        nums[pivot_index], nums[right] = nums[right], nums[pivot_index]
        
        store_index = left
        for i in range(left, right):
            if nums[i] < pivot_value:
                nums[store_index], nums[i] = nums[i], nums[store_index]
                store_index += 1
        
        # Move pivot to final position
        nums[right], nums[store_index] = nums[store_index], nums[right]
        return store_index
    
    # kth largest is (n - k)th smallest
    return quickselect(0, len(nums) - 1, len(nums) - k)
```

### JavaScript Template

```javascript
function findKthLargest(nums, k) {
    function quickSelect(left, right, kSmallest) {
        if (left === right) return nums[left];
        
        const pivotIndex = partition(left, right, left);
        
        if (kSmallest === pivotIndex) {
            return nums[pivotIndex];
        } else if (kSmallest < pivotIndex) {
            return quickSelect(left, pivotIndex - 1, kSmallest);
        } else {
            return quickSelect(pivotIndex + 1, right, kSmallest);
        }
    }
    
    function partition(left, right, pivotIndex) {
        const pivotValue = nums[pivotIndex];
        [nums[pivotIndex], nums[right]] = [nums[right], nums[pivotIndex]];
        
        let storeIndex = left;
        for (let i = left; i < right; i++) {
            if (nums[i] < pivotValue) {
                [nums[storeIndex], nums[i]] = [nums[i], nums[storeIndex]];
                storeIndex++;
            }
        }
        
        [nums[right], nums[storeIndex]] = [nums[storeIndex], nums[right]];
        return storeIndex;
    }
    
    return quickSelect(0, nums.length - 1, nums.length - k);
}
```

## Related Problems

View all QuickSelect problems in the [main question list](https://seanprashad.com/leetcode-patterns/).

Common problems include:
- Kth Largest Element
- K Closest Points to Origin
- Top K Frequent Elements (with heap or quickselect)

## Time & Space Complexity

- **Time Complexity**: O(n) average, O(n²) worst case
- **Space Complexity**: O(1) for iterative, O(log n) for recursive

## Tips

1. **Random pivot**: Use random pivot for better average performance
2. **Kth largest**: Convert to (n-k)th smallest
3. **Partition logic**: Similar to QuickSort partition
4. **Early termination**: Stop when kth element found

