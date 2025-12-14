# Bucket Sort Pattern

## Core Concept

Bucket Sort distributes elements into buckets, sorts each bucket, and concatenates the results. It's efficient when:
- Input is uniformly distributed
- Range of values is known
- Need O(n) average time complexity

## When to Use

Use Bucket Sort when:

- **Uniform distribution**: Input values are uniformly distributed
- **Known range**: Range of values is known
- **Linear time needed**: Need O(n) average time
- **Floating point**: Sorting floating point numbers in range [0, 1)

### Problem Indicators

- "Sort with O(n) time"
- "Uniformly distributed values"
- "Floating point sorting"
- "Top K frequent" (can use bucket sort)

## Template Code

### Basic Bucket Sort

```python
def bucket_sort(arr):
    if not arr:
        return arr
    
    # Find min and max
    min_val = min(arr)
    max_val = max(arr)
    
    # Create buckets
    num_buckets = len(arr)
    buckets = [[] for _ in range(num_buckets)]
    
    # Distribute elements into buckets
    for num in arr:
        index = int((num - min_val) / (max_val - min_val + 1) * num_buckets)
        buckets[index].append(num)
    
    # Sort each bucket and concatenate
    result = []
    for bucket in buckets:
        bucket.sort()
        result.extend(bucket)
    
    return result
```

### Top K Frequent (Bucket Sort Approach)

```python
def top_k_frequent(nums, k):
    from collections import Counter
    
    # Count frequencies
    count = Counter(nums)
    
    # Create buckets (index = frequency)
    buckets = [[] for _ in range(len(nums) + 1)]
    for num, freq in count.items():
        buckets[freq].append(num)
    
    # Collect top k
    result = []
    for i in range(len(buckets) - 1, -1, -1):
        result.extend(buckets[i])
        if len(result) >= k:
            break
    
    return result[:k]
```

### JavaScript Template

```javascript
function bucketSort(arr) {
    if (arr.length === 0) return arr;
    
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const numBuckets = arr.length;
    const buckets = Array.from({ length: numBuckets }, () => []);
    
    for (const num of arr) {
        const index = Math.floor((num - min) / (max - min + 1) * numBuckets);
        buckets[index].push(num);
    }
    
    const result = [];
    for (const bucket of buckets) {
        bucket.sort((a, b) => a - b);
        result.push(...bucket);
    }
    
    return result;
}
```

## Related Problems

View all Bucket Sort problems in the [main question list](https://seanprashad.com/leetcode-patterns/).

Common problems include:
- Top K Frequent Elements
- Sort Colors (counting sort variant)
- Maximum Gap

## Time & Space Complexity

- **Time Complexity**: O(n) average, O(n²) worst case
- **Space Complexity**: O(n) for buckets

## Tips

1. **Uniform distribution**: Works best with uniform distribution
2. **Bucket count**: Choose appropriate number of buckets
3. **Bucket sorting**: Use efficient sort for each bucket
4. **Frequency problems**: Useful for top K frequent problems

