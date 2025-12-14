# Heap Pattern

## Core Concept

A Heap is a complete binary tree that satisfies the heap property:
- **Min Heap**: Parent ≤ children (root is minimum)
- **Max Heap**: Parent ≥ children (root is maximum)

Heaps are typically implemented as arrays where:
- Parent at index `i` has children at `2i + 1` and `2i + 2`
- Child at index `i` has parent at `(i - 1) // 2`

## When to Use

Use Heaps when:

- **Priority queue**: Need to repeatedly get min/max element
- **K largest/smallest**: Find k largest or smallest elements
- **Merge k sorted**: Merging k sorted lists/arrays
- **Scheduling**: Task scheduling with priorities
- **Median finding**: Finding running median

### Problem Indicators

- "K largest/smallest"
- "Top K elements"
- "Merge k sorted"
- "Find median"
- "Priority queue"
- "Frequent elements"

## Template Code

### Python (using heapq)

```python
import heapq

# Min heap (default)
heap = []
heapq.heappush(heap, 3)
heapq.heappush(heap, 1)
heapq.heappush(heap, 2)
min_val = heapq.heappop(heap)  # Returns 1

# Max heap (negate values)
max_heap = []
heapq.heappush(max_heap, -3)
heapq.heappush(max_heap, -1)
max_val = -heapq.heappop(max_heap)  # Returns 3

# K largest elements
def k_largest(nums, k):
    return heapq.nlargest(k, nums)

# K smallest elements
def k_smallest(nums, k):
    return heapq.nsmallest(k, nums)
```

### Custom Heap Implementation

```python
class MinHeap:
    def __init__(self):
        self.heap = []
    
    def parent(self, i):
        return (i - 1) // 2
    
    def left_child(self, i):
        return 2 * i + 1
    
    def right_child(self, i):
        return 2 * i + 2
    
    def insert(self, val):
        self.heap.append(val)
        self._heapify_up(len(self.heap) - 1)
    
    def extract_min(self):
        if not self.heap:
            return None
        
        if len(self.heap) == 1:
            return self.heap.pop()
        
        min_val = self.heap[0]
        self.heap[0] = self.heap.pop()
        self._heapify_down(0)
        return min_val
    
    def _heapify_up(self, i):
        while i > 0 and self.heap[self.parent(i)] > self.heap[i]:
            p = self.parent(i)
            self.heap[i], self.heap[p] = self.heap[p], self.heap[i]
            i = p
    
    def _heapify_down(self, i):
        smallest = i
        left = self.left_child(i)
        right = self.right_child(i)
        
        if left < len(self.heap) and self.heap[left] < self.heap[smallest]:
            smallest = left
        
        if right < len(self.heap) and self.heap[right] < self.heap[smallest]:
            smallest = right
        
        if smallest != i:
            self.heap[i], self.heap[smallest] = self.heap[smallest], self.heap[i]
            self._heapify_down(smallest)
```

### JavaScript Template

```javascript
// JavaScript doesn't have built-in heap, use array with manual implementation
// Or use a library like 'heap' npm package

class MinHeap {
    constructor() {
        this.heap = [];
    }
    
    parent(i) {
        return Math.floor((i - 1) / 2);
    }
    
    leftChild(i) {
        return 2 * i + 1;
    }
    
    rightChild(i) {
        return 2 * i + 2;
    }
    
    insert(val) {
        this.heap.push(val);
        this.heapifyUp(this.heap.length - 1);
    }
    
    extractMin() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();
        
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);
        return min;
    }
    
    heapifyUp(i) {
        while (i > 0 && this.heap[this.parent(i)] > this.heap[i]) {
            const p = this.parent(i);
            [this.heap[i], this.heap[p]] = [this.heap[p], this.heap[i]];
            i = p;
        }
    }
    
    heapifyDown(i) {
        let smallest = i;
        const left = this.leftChild(i);
        const right = this.rightChild(i);
        
        if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
            smallest = left;
        }
        
        if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
            smallest = right;
        }
        
        if (smallest !== i) {
            [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
            this.heapifyDown(smallest);
        }
    }
}
```

## Common Variations

1. **K-way merge**: Merge k sorted lists using heap
2. **Top K frequent**: Use heap with frequency counts
3. **Median**: Use two heaps (min + max)
4. **Custom comparator**: Heap with custom comparison function

## Related Problems

View all Heap problems in the [main question list](https://seanprashad.com/leetcode-patterns/).

Common problems include:
- Kth Largest Element
- Merge K Sorted Lists
- Top K Frequent Elements
- Find Median from Data Stream
- Meeting Rooms II

## Time & Space Complexity

- **Insert**: O(log n)
- **Extract min/max**: O(log n)
- **Peek**: O(1)
- **Build heap**: O(n)
- **Space**: O(n)

## Tips

1. **Use library**: Python's `heapq` is efficient
2. **Max heap trick**: Negate values for max heap in Python
3. **K problems**: Maintain heap of size k
4. **Two heaps**: Use two heaps for median problems

