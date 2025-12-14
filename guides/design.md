# Design Pattern

## Core Concept

Design problems require implementing data structures or systems with specific operations and constraints. These problems test your ability to:
- Choose appropriate data structures
- Design efficient APIs
- Handle edge cases
- Optimize for time/space complexity

## When to Use

Design problems appear when:

- **System design**: Designing systems with multiple operations
- **Data structure design**: Implementing custom data structures
- **API design**: Creating interfaces with specific operations
- **Caching**: Implementing cache systems
- **Concurrency**: Thread-safe data structures

### Problem Indicators

- "Design..."
- "Implement..."
- "LRU Cache"
- "Trie"
- "Time-based key-value store"
- "Design Twitter"

## Template Code

### LRU Cache

```python
from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity):
        self.cache = OrderedDict()
        self.capacity = capacity
    
    def get(self, key):
        if key not in self.cache:
            return -1
        
        # Move to end (most recently used)
        self.cache.move_to_end(key)
        return self.cache[key]
    
    def put(self, key, value):
        if key in self.cache:
            # Update existing
            self.cache.move_to_end(key)
        else:
            # Check capacity
            if len(self.cache) >= self.capacity:
                # Remove least recently used (first item)
                self.cache.popitem(last=False)
        
        self.cache[key] = value
```

### Design HashMap

```python
class MyHashMap:
    def __init__(self):
        self.size = 1000
        self.buckets = [[] for _ in range(self.size)]
    
    def _hash(self, key):
        return key % self.size
    
    def put(self, key, value):
        index = self._hash(key)
        bucket = self.buckets[index]
        
        for i, (k, v) in enumerate(bucket):
            if k == key:
                bucket[i] = (key, value)
                return
        
        bucket.append((key, value))
    
    def get(self, key):
        index = self._hash(key)
        bucket = self.buckets[index]
        
        for k, v in bucket:
            if k == key:
                return v
        
        return -1
    
    def remove(self, key):
        index = self._hash(key)
        bucket = self.buckets[index]
        
        for i, (k, v) in enumerate(bucket):
            if k == key:
                bucket.pop(i)
                return
```

### JavaScript Template

```javascript
class LRUCache {
    constructor(capacity) {
        this.cache = new Map();
        this.capacity = capacity;
    }
    
    get(key) {
        if (!this.cache.has(key)) return -1;
        
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value); // Move to end
        return value;
    }
    
    put(key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        } else if (this.cache.size >= this.capacity) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        
        this.cache.set(key, value);
    }
}
```

## Common Design Patterns

1. **Hash Map/Set**: Fast lookups
2. **Linked List**: For LRU, insertion order
3. **Heap**: For priority queues
4. **Trie**: For prefix matching
5. **Two Data Structures**: Combine for efficiency

## Related Problems

View all Design problems in the [main question list](https://seanprashad.com/leetcode-patterns/).

Common problems include:
- LRU Cache
- Design HashMap
- Design HashSet
- Design Twitter
- Time-based Key-Value Store

## Tips

1. **Choose data structures**: Pick appropriate DS for operations
2. **Trade-offs**: Consider time vs space trade-offs
3. **Edge cases**: Handle empty, single element, capacity limits
4. **API design**: Clear, intuitive method signatures

