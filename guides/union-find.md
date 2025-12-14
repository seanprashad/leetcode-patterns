# Union Find Pattern

## Core Concept

Union Find (Disjoint Set Union - DSU) is a data structure that tracks a set of elements partitioned into disjoint subsets. It supports two main operations:
- **Find**: Determine which subset an element belongs to
- **Union**: Merge two subsets into one

It's efficient for:
- Detecting cycles in graphs
- Finding connected components
- Network connectivity problems
- Kruskal's algorithm for MST

## When to Use

Use Union Find when:

- **Connected components**: Finding connected components in graphs
- **Cycle detection**: Detecting cycles in undirected graphs
- **Dynamic connectivity**: Adding edges and checking connectivity
- **Network problems**: Social networks, computer networks
- **MST algorithms**: Kruskal's algorithm

### Problem Indicators

- "Connected components"
- "Detect cycle"
- "Friend circles"
- "Number of islands"
- "Redundant connection"
- "Accounts merge"

## Template Code

### Basic Union Find

```python
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
    
    def find(self, x):
        if self.parent[x] != x:
            # Path compression
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]
    
    def union(self, x, y):
        root_x = self.find(x)
        root_y = self.find(y)
        
        if root_x == root_y:
            return False  # Already connected
        
        # Union by rank
        if self.rank[root_x] < self.rank[root_y]:
            self.parent[root_x] = root_y
        elif self.rank[root_x] > self.rank[root_y]:
            self.parent[root_y] = root_x
        else:
            self.parent[root_y] = root_x
            self.rank[root_x] += 1
        
        return True
    
    def connected(self, x, y):
        return self.find(x) == self.find(y)
```

### Count Components

```python
def count_components(n, edges):
    uf = UnionFind(n)
    
    for u, v in edges:
        uf.union(u, v)
    
    # Count distinct roots
    roots = set()
    for i in range(n):
        roots.add(uf.find(i))
    
    return len(roots)
```

### Detect Cycle

```python
def has_cycle(n, edges):
    uf = UnionFind(n)
    
    for u, v in edges:
        if not uf.union(u, v):
            return True  # Cycle detected
    
    return False
```

### JavaScript Template

```javascript
class UnionFind {
    constructor(n) {
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.rank = new Array(n).fill(0);
    }
    
    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]); // Path compression
        }
        return this.parent[x];
    }
    
    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);
        
        if (rootX === rootY) return false;
        
        // Union by rank
        if (this.rank[rootX] < this.rank[rootY]) {
            this.parent[rootX] = rootY;
        } else if (this.rank[rootX] > this.rank[rootY]) {
            this.parent[rootY] = rootX;
        } else {
            this.parent[rootY] = rootX;
            this.rank[rootX]++;
        }
        
        return true;
    }
    
    connected(x, y) {
        return this.find(x) === this.find(y);
    }
}
```

## Optimizations

1. **Path Compression**: Flatten tree during find operation
2. **Union by Rank**: Always attach smaller tree to larger tree
3. **Both together**: Nearly O(1) amortized time complexity

## Related Problems

View all Union Find problems in the [main question list](https://seanprashad.com/leetcode-patterns/).

Common problems include:
- Number of Connected Components
- Redundant Connection
- Accounts Merge
- Friend Circles
- Most Stones Removed

## Time & Space Complexity

- **Find (with optimizations)**: Nearly O(1) amortized
- **Union (with optimizations)**: Nearly O(1) amortized
- **Space**: O(n) for parent and rank arrays

## Tips

1. **Initialize properly**: Parent[i] = i initially
2. **Use optimizations**: Path compression and union by rank
3. **Count components**: Count distinct roots
4. **Cycle detection**: If union returns false, cycle exists

