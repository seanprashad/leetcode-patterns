# DFS (Depth-First Search) Pattern

## Core Concept

Depth-First Search (DFS) is a graph traversal algorithm that explores as far as possible along each branch before backtracking. DFS uses a stack data structure (or recursion, which uses the call stack) to maintain the order of nodes to visit.

Key characteristics:
- Explores depth first
- Uses stack (LIFO - Last In First Out) or recursion
- Visits nodes along a path until dead end, then backtracks
- Memory efficient (only stores path from root to current node)

## When to Use

Use DFS when:

- **Path exploration**: Need to explore all paths from a node
- **Backtracking problems**: Problems requiring backtracking
- **Tree problems**: Many tree problems naturally use DFS
- **Connected components**: Finding connected components in graphs
- **Topological sort**: Can be used for topological sorting
- **Memory constraint**: When memory is limited (DFS uses less memory than BFS)

### Problem Indicators

- "Find all paths"
- "Maximum depth"
- "Path sum"
- "Connected components"
- "Island problems"
- "Tree traversal"

## Template Code

### DFS Recursive (Tree)

```python
def dfs_tree(node, result):
    if not node:
        return
    
    # Pre-order: process before children
    result.append(node.val)
    
    dfs_tree(node.left, result)
    dfs_tree(node.right, result)
    
    # Post-order: process after children
    # result.append(node.val)
```

### DFS Iterative (Tree)

```python
def dfs_iterative(root):
    if not root:
        return []
    
    result = []
    stack = [root]
    
    while stack:
        node = stack.pop()
        result.append(node.val)
        
        # Push right first, then left (for pre-order)
        if node.right:
            stack.append(node.right)
        if node.left:
            stack.append(node.left)
    
    return result
```

### DFS on Graph (Recursive)

```python
def dfs_graph(node, graph, visited):
    visited.add(node)
    
    # Process node
    process(node)
    
    # Visit neighbors
    for neighbor in graph[node]:
        if neighbor not in visited:
            dfs_graph(neighbor, graph, visited)
```

### DFS on Graph (Iterative)

```python
def dfs_graph_iterative(start, graph):
    visited = set()
    stack = [start]
    
    while stack:
        node = stack.pop()
        
        if node not in visited:
            visited.add(node)
            process(node)
            
            for neighbor in graph[node]:
                if neighbor not in visited:
                    stack.append(neighbor)
```

### JavaScript Template

```javascript
function dfsTree(node, result) {
    if (!node) return;
    
    result.push(node.val); // Pre-order
    dfsTree(node.left, result);
    dfsTree(node.right, result);
}

function dfsGraphIterative(start, graph) {
    const visited = new Set();
    const stack = [start];
    
    while (stack.length > 0) {
        const node = stack.pop();
        
        if (!visited.has(node)) {
            visited.add(node);
            process(node);
            
            for (const neighbor of graph[node]) {
                if (!visited.has(neighbor)) {
                    stack.push(neighbor);
                }
            }
        }
    }
}
```

## DFS Traversal Orders

### Pre-order (Root → Left → Right)
Process node before children. Good for copying trees.

### In-order (Left → Root → Right)
Process left, then node, then right. Good for BST (gives sorted order).

### Post-order (Left → Right → Root)
Process children before node. Good for deleting trees.

## Common Variations

1. **Path tracking**: Maintain path from root to current node
2. **Memoization**: Cache results to avoid recomputation
3. **Early termination**: Return immediately when condition met
4. **State tracking**: Track additional state (e.g., parent, depth)

## Related Problems

View all DFS problems in the [main question list](https://seanprashad.com/leetcode-patterns/).

Common problems include:
- Maximum Depth of Binary Tree
- Path Sum
- Number of Islands
- Clone Graph
- Course Schedule
- Validate Binary Search Tree

## Time & Space Complexity

- **Time Complexity**: O(V + E) where V is vertices and E is edges
- **Space Complexity**: 
  - O(h) for trees where h is height
  - O(V) for graphs (visited set + recursion stack)

## DFS vs BFS

- **DFS**: Explores depth first, uses stack/recursion, less memory
- **BFS**: Explores level by level, uses queue, finds shortest path

## Tips

1. **Choose traversal order**: Pre-order, in-order, or post-order based on problem
2. **Handle cycles**: Use visited set in graphs to avoid infinite loops
3. **Backtrack properly**: Restore state when backtracking
4. **Recursive vs Iterative**: Recursive is cleaner, iterative gives more control

