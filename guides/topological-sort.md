# Topological Sort Pattern

## Core Concept

Topological Sort is an ordering of vertices in a directed acyclic graph (DAG) such that for every directed edge (u, v), vertex u comes before v in the ordering. It's used for:
- Task scheduling with dependencies
- Build systems
- Course prerequisites
- Event ordering

## When to Use

Use Topological Sort when:

- **Dependencies**: Tasks/events have dependencies
- **Ordering required**: Need to find valid ordering
- **DAG problems**: Working with directed acyclic graphs
- **Prerequisites**: Course prerequisites, build dependencies
- **Scheduling**: Task scheduling with constraints

### Problem Indicators

- "Course schedule"
- "Task ordering"
- "Build order"
- "Dependencies"
- "Prerequisites"
- "Find ordering"

## Template Code

### Kahn's Algorithm (BFS-based)

```python
from collections import deque

def topological_sort_kahn(num_nodes, edges):
    # Build graph and in-degree
    graph = {i: [] for i in range(num_nodes)}
    in_degree = [0] * num_nodes
    
    for u, v in edges:
        graph[u].append(v)
        in_degree[v] += 1
    
    # Find all nodes with in-degree 0
    queue = deque([i for i in range(num_nodes) if in_degree[i] == 0])
    result = []
    
    while queue:
        node = queue.popleft()
        result.append(node)
        
        # Remove this node and update in-degrees
        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    # Check if all nodes processed (no cycle)
    return result if len(result) == num_nodes else []
```

### DFS-based Topological Sort

```python
def topological_sort_dfs(num_nodes, edges):
    # Build graph
    graph = {i: [] for i in range(num_nodes)}
    for u, v in edges:
        graph[u].append(v)
    
    WHITE, GRAY, BLACK = 0, 1, 2
    color = {i: WHITE for i in range(num_nodes)}
    result = []
    
    def dfs(node):
        if color[node] == GRAY:
            return False  # Cycle detected
        if color[node] == BLACK:
            return True
        
        color[node] = GRAY
        for neighbor in graph[node]:
            if not dfs(neighbor):
                return False
        
        color[node] = BLACK
        result.append(node)
        return True
    
    for node in range(num_nodes):
        if color[node] == WHITE:
            if not dfs(node):
                return []  # Cycle exists
    
    return result[::-1]  # Reverse for correct order
```

### JavaScript Template

```javascript
function topologicalSortKahn(numNodes, edges) {
    const graph = Array.from({ length: numNodes }, () => []);
    const inDegree = new Array(numNodes).fill(0);
    
    for (const [u, v] of edges) {
        graph[u].push(v);
        inDegree[v]++;
    }
    
    const queue = [];
    for (let i = 0; i < numNodes; i++) {
        if (inDegree[i] === 0) {
            queue.push(i);
        }
    }
    
    const result = [];
    while (queue.length > 0) {
        const node = queue.shift();
        result.push(node);
        
        for (const neighbor of graph[node]) {
            inDegree[neighbor]--;
            if (inDegree[neighbor] === 0) {
                queue.push(neighbor);
            }
        }
    }
    
    return result.length === numNodes ? result : [];
}
```

## Cycle Detection

Topological sort can detect cycles:
- If result length < num_nodes, cycle exists
- In DFS version, gray node indicates back edge (cycle)

## Related Problems

View all Topological Sort problems in the [main question list](https://seanprashad.com/leetcode-patterns/).

Common problems include:
- Course Schedule
- Course Schedule II
- Alien Dictionary
- Sequence Reconstruction
- Find Eventual Safe States

## Time & Space Complexity

- **Time Complexity**: O(V + E) where V is vertices, E is edges
- **Space Complexity**: O(V) for graph, in-degree, and result

## Tips

1. **Choose algorithm**: Kahn's is iterative, DFS is recursive
2. **Cycle detection**: Check if all nodes processed
3. **Build graph correctly**: Understand edge direction
4. **Multiple solutions**: DAGs can have multiple valid orderings

