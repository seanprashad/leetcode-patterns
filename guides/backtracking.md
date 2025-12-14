# Backtracking Pattern

## Core Concept

Backtracking is a systematic method for solving problems by trying partial solutions and then abandoning them ("backtracking") if they cannot lead to a valid complete solution. It's essentially a refined brute force approach that prunes invalid paths early.

The key idea is to:
1. Make a choice
2. Recursively solve with that choice
3. Undo the choice (backtrack) if it doesn't lead to a solution
4. Try the next choice

## When to Use

Use Backtracking when:

- **Constraint satisfaction**: Problems with constraints that must be satisfied
- **Generate all solutions**: Finding all possible combinations/permutations
- **Decision tree**: Problem can be represented as a decision tree
- **Pruning possible**: Can eliminate invalid paths early
- **Exhaustive search needed**: Need to explore all possibilities

### Problem Indicators

- "Find all combinations/permutations"
- "Generate all possible..."
- "Find all valid..."
- "N-Queens problem"
- "Sudoku solver"
- "Word search"
- "Subset generation"

## Template Code

### Standard Backtracking Template

```python
def backtrack(candidates, path, result):
    # Base case: solution found
    if is_solution(path):
        result.append(path[:])  # Make a copy
        return
    
    # Try all candidates
    for candidate in candidates:
        # Make choice
        if is_valid(candidate, path):
            path.append(candidate)
            
            # Recurse
            backtrack(candidates, path, result)
            
            # Backtrack (undo choice)
            path.pop()
```

### Generate All Subsets

```python
def subsets(nums):
    result = []
    
    def backtrack(start, path):
        result.append(path[:])
        
        for i in range(start, len(nums)):
            path.append(nums[i])
            backtrack(i + 1, path)
            path.pop()
    
    backtrack(0, [])
    return result
```

### Generate All Permutations

```python
def permutations(nums):
    result = []
    used = [False] * len(nums)
    
    def backtrack(path):
        if len(path) == len(nums):
            result.append(path[:])
            return
        
        for i in range(len(nums)):
            if not used[i]:
                used[i] = True
                path.append(nums[i])
                backtrack(path)
                path.pop()
                used[i] = False
    
    backtrack([])
    return result
```

### N-Queens Problem

```python
def solve_n_queens(n):
    result = []
    board = [['.'] * n for _ in range(n)]
    
    def is_safe(row, col):
        # Check column
        for i in range(row):
            if board[i][col] == 'Q':
                return False
        
        # Check diagonals
        for i, j in zip(range(row - 1, -1, -1), range(col - 1, -1, -1)):
            if board[i][j] == 'Q':
                return False
        
        for i, j in zip(range(row - 1, -1, -1), range(col + 1, n)):
            if board[i][j] == 'Q':
                return False
        
        return True
    
    def backtrack(row):
        if row == n:
            result.append([''.join(row) for row in board])
            return
        
        for col in range(n):
            if is_safe(row, col):
                board[row][col] = 'Q'
                backtrack(row + 1)
                board[row][col] = '.'
    
    backtrack(0)
    return result
```

### JavaScript Template

```javascript
function backtrack(candidates, path, result) {
    if (isSolution(path)) {
        result.push([...path]);
        return;
    }
    
    for (const candidate of candidates) {
        if (isValid(candidate, path)) {
            path.push(candidate);
            backtrack(candidates, path, result);
            path.pop(); // Backtrack
        }
    }
}
```

## Common Variations

1. **Pruning**: Skip invalid candidates early
2. **Memoization**: Cache results to avoid recomputation
3. **Early termination**: Stop when first solution found
4. **Constraint propagation**: Use constraints to reduce search space

## Related Problems

View all Backtracking problems in the [main question list](https://seanprashad.com/leetcode-patterns/).

Common problems include:
- Subsets
- Permutations
- Combination Sum
- N-Queens
- Sudoku Solver
- Word Search
- Generate Parentheses

## Time & Space Complexity

- **Time Complexity**: Often exponential O(2^n) or O(n!) depending on problem
- **Space Complexity**: O(n) for recursion stack, plus space for storing results

## Optimization Techniques

1. **Pruning**: Eliminate invalid paths early
2. **Memoization**: Cache computed results
3. **Constraint checking**: Check constraints before recursing
4. **Early termination**: Return immediately when solution found (if only one needed)

## Tips

1. **Identify constraints**: Understand what makes a solution valid
2. **Choose representation**: Pick efficient data structures for state
3. **Prune early**: Check validity before recursing
4. **Undo changes**: Always restore state after backtracking
5. **Base case**: Clearly define when to stop recursing

