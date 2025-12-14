# BFS (Breadth-First Search) Pattern

## Core Concept

Breadth-First Search (BFS) is a graph traversal algorithm that explores all nodes at the current depth level before moving to nodes at the next depth level. BFS uses a queue data structure to maintain the order of nodes to visit.

Key characteristics:
- Explores level by level
- Guarantees shortest path in unweighted graphs
- Uses queue (FIFO - First In First Out)
- Visits all nodes at distance k before nodes at distance k+1

## When to Use

Use BFS when:

- **Level-order traversal**: Need to process nodes level by level
- **Shortest path**: Finding shortest path in unweighted graphs
- **Level information**: Need to know which level/depth a node is at
- **Closest nodes first**: Want to visit closest nodes before distant ones
- **Tree/Graph traversal**: Traversing trees or graphs level by level

### Problem Indicators

- "Level order traversal"
- "Shortest path"
- "Minimum steps to reach target"
- "Find nodes at distance k"
- "Clone graph"
- "Word ladder"

## Template Code

### BFS on Tree

```python
from collections import deque

def bfs_tree(root):
    if not root:
        return []
    
    result = []
    queue = deque([root])
    
    while queue:
        level_size = len(queue)
        level = []
        
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        
        result.append(level)
    
    return result
```

### BFS on Graph

```python
from collections import deque

def bfs_graph(start, graph):
    visited = set()
    queue = deque([start])
    visited.add(start)
    
    while queue:
        node = queue.popleft()
        
        # Process node
        process(node)
        
        # Visit neighbors
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
```

### Shortest Path (Unweighted Graph)

```python
from collections import deque

def shortest_path(start, target, graph):
    if start == target:
        return 0
    
    queue = deque([(start, 0)])  # (node, distance)
    visited = {start}
    
    while queue:
        node, distance = queue.popleft()
        
        for neighbor in graph[node]:
            if neighbor == target:
                return distance + 1
            
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, distance + 1))
    
    return -1  # Not reachable
```

### JavaScript Template

```javascript
function bfsTree(root) {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        const level = [];
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            level.push(node.val);
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        result.push(level);
    }
    
    return result;
}
```

## Common Variations

1. **Level-order with levels**: Track which level each node belongs to
2. **Bidirectional BFS**: Start from both source and target
3. **Multi-source BFS**: Start from multiple nodes simultaneously
4. **BFS with state**: Track additional state (e.g., keys collected)

## Related Problems

View all BFS problems in the [main question list](https://seanprashad.com/leetcode-patterns/).

Common problems include:
- Binary Tree Level Order Traversal
- Shortest Path in Binary Matrix
- Word Ladder
- Clone Graph
- Rotting Oranges
- Perfect Squares

## Time & Space Complexity

- **Time Complexity**: O(V + E) where V is vertices and E is edges
- **Space Complexity**: O(V) for queue and visited set

## BFS vs DFS

- **BFS**: Uses queue, explores level by level, finds shortest path
- **DFS**: Uses stack (recursion), explores depth first, uses less memory

## Tips

1. **Use deque**: Python's `collections.deque` is efficient for queue operations
2. **Track levels**: Use level size to process nodes level by level
3. **Mark visited**: Always mark nodes as visited when adding to queue
4. **Handle cycles**: Use visited set to avoid revisiting nodes in graphs

