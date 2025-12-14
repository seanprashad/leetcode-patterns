# Graph Pattern

## Core Concept

Graphs are data structures consisting of nodes (vertices) connected by edges. Graph problems involve traversing, searching, or manipulating these connections. Common graph representations include:

- **Adjacency List**: List of lists, each inner list contains neighbors
- **Adjacency Matrix**: 2D matrix where matrix[i][j] indicates edge
- **Edge List**: List of tuples representing edges

## When to Use

Graph techniques are used when:

- **Relationships**: Data has relationships/connections between entities
- **Network problems**: Social networks, computer networks, dependencies
- **Path finding**: Finding paths between nodes
- **Cycle detection**: Detecting cycles in directed/undirected graphs
- **Connected components**: Finding groups of connected nodes

### Problem Indicators

- "Given a graph..."
- "Find path between nodes"
- "Detect cycle"
- "Find connected components"
- "Topological sort"
- "Shortest path"

## Template Code

### Graph Representation

```python
# Adjacency List
graph = {
    0: [1, 2],
    1: [0, 3],
    2: [0, 3],
    3: [1, 2]
}

# Adjacency Matrix
graph_matrix = [
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [0, 1, 1, 0]
]
```

### Detect Cycle (Undirected Graph)

```python
def has_cycle_undirected(graph):
    visited = set()
    
    def dfs(node, parent):
        visited.add(node)
        
        for neighbor in graph[node]:
            if neighbor not in visited:
                if dfs(neighbor, node):
                    return True
            elif neighbor != parent:
                return True  # Cycle found
        
        return False
    
    for node in graph:
        if node not in visited:
            if dfs(node, -1):
                return True
    
    return False
```

### Detect Cycle (Directed Graph)

```python
def has_cycle_directed(graph):
    WHITE, GRAY, BLACK = 0, 1, 2
    color = {node: WHITE for node in graph}
    
    def dfs(node):
        if color[node] == GRAY:
            return True  # Cycle found
        
        if color[node] == BLACK:
            return False
        
        color[node] = GRAY
        for neighbor in graph[node]:
            if dfs(neighbor):
                return True
        
        color[node] = BLACK
        return False
    
    for node in graph:
        if color[node] == WHITE:
            if dfs(node):
                return True
    
    return False
```

### Find Connected Components

```python
def connected_components(graph):
    visited = set()
    components = []
    
    def dfs(node, component):
        visited.add(node)
        component.append(node)
        
        for neighbor in graph[node]:
            if neighbor not in visited:
                dfs(neighbor, component)
    
    for node in graph:
        if node not in visited:
            component = []
            dfs(node, component)
            components.append(component)
    
    return components
```

### JavaScript Template

```javascript
// Adjacency List
const graph = {
    0: [1, 2],
    1: [0, 3],
    2: [0, 3],
    3: [1, 2]
};

function hasCycleUndirected(graph) {
    const visited = new Set();
    
    function dfs(node, parent) {
        visited.add(node);
        
        for (const neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                if (dfs(neighbor, node)) return true;
            } else if (neighbor !== parent) {
                return true; // Cycle found
            }
        }
        
        return false;
    }
    
    for (const node in graph) {
        if (!visited.has(parseInt(node))) {
            if (dfs(parseInt(node), -1)) return true;
        }
    }
    
    return false;
}
```

## Common Graph Algorithms

1. **BFS/DFS**: Basic traversal algorithms
2. **Topological Sort**: Ordering nodes in DAG
3. **Shortest Path**: Dijkstra, Bellman-Ford, Floyd-Warshall
4. **Minimum Spanning Tree**: Kruskal, Prim
5. **Strongly Connected Components**: Kosaraju, Tarjan

## Related Problems

View all Graph problems in the [main question list](https://seanprashad.com/leetcode-patterns/).

Common problems include:
- Clone Graph
- Course Schedule
- Number of Islands
- Redundant Connection
- Network Delay Time
- Critical Connections

## Time & Space Complexity

- **Time Complexity**: Typically O(V + E) for traversal, varies by algorithm
- **Space Complexity**: O(V) for visited set and recursion stack

## Graph Types

- **Directed vs Undirected**: Edges have direction or not
- **Weighted vs Unweighted**: Edges have weights or not
- **Cyclic vs Acyclic**: Contains cycles or not
- **Connected vs Disconnected**: All nodes reachable or not

## Tips

1. **Choose representation**: Adjacency list for sparse graphs, matrix for dense
2. **Handle cycles**: Different logic for directed vs undirected graphs
3. **Visited tracking**: Always track visited nodes to avoid infinite loops
4. **Edge cases**: Empty graph, single node, disconnected components

