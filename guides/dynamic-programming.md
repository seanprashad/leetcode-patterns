# Dynamic Programming Pattern

## Core Concept

Dynamic Programming (DP) is an optimization technique that solves complex problems by breaking them down into simpler subproblems. It stores the results of subproblems to avoid redundant calculations. The key principle is: **optimal substructure** - the optimal solution to a problem contains optimal solutions to its subproblems.

DP problems can be approached in two ways:
- **Top-down (Memoization)**: Recursive approach with caching
- **Bottom-up (Tabulation)**: Iterative approach building up from base cases

## When to Use

Use Dynamic Programming when:

- **Overlapping subproblems**: The same subproblem is solved multiple times
- **Optimal substructure**: Optimal solution can be constructed from optimal solutions of subproblems
- **Optimization problems**: Finding maximum, minimum, or counting possibilities
- **Decision problems**: Making choices that affect future states

### Problem Indicators

- "Find the maximum/minimum..."
- "Count the number of ways..."
- "Find the longest/shortest..."
- "What is the optimal way to..."
- Problems asking for all possible combinations/permutations
- Problems with constraints and choices

## Template Code

### Top-Down (Memoization)

```python
def dp_memoization(n, memo={}):
    # Base cases
    if n <= 1:
        return n
    
    # Check if already computed
    if n in memo:
        return memo[n]
    
    # Compute and store
    memo[n] = dp_memoization(n - 1, memo) + dp_memoization(n - 2, memo)
    return memo[n]
```

### Bottom-Up (Tabulation)

```python
def dp_tabulation(n):
    # Base cases
    if n <= 1:
        return n
    
    # Initialize DP array
    dp = [0] * (n + 1)
    dp[0] = 0
    dp[1] = 1
    
    # Fill DP array
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    
    return dp[n]
```

### Space-Optimized (1D DP)

```python
def dp_optimized(n):
    if n <= 1:
        return n
    
    prev2 = 0
    prev1 = 1
    
    for i in range(2, n + 1):
        current = prev1 + prev2
        prev2 = prev1
        prev1 = current
    
    return prev1
```

### 2D DP Template

```python
def dp_2d(m, n):
    # Initialize 2D DP array
    dp = [[0] * n for _ in range(m)]
    
    # Base cases (first row and column)
    for i in range(m):
        dp[i][0] = 1
    for j in range(n):
        dp[0][j] = 1
    
    # Fill DP array
    for i in range(1, m):
        for j in range(1, n):
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
    
    return dp[m - 1][n - 1]
```

### JavaScript Template

```javascript
// Memoization
function dpMemoization(n, memo = {}) {
    if (n <= 1) return n;
    if (n in memo) return memo[n];
    
    memo[n] = dpMemoization(n - 1, memo) + dpMemoization(n - 2, memo);
    return memo[n];
}

// Tabulation
function dpTabulation(n) {
    if (n <= 1) return n;
    
    const dp = new Array(n + 1).fill(0);
    dp[0] = 0;
    dp[1] = 1;
    
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}
```

## Common DP Patterns

### 1. Fibonacci Pattern
- Climbing Stairs
- House Robber
- Decode Ways

### 2. Knapsack Pattern
- 0/1 Knapsack
- Coin Change
- Partition Equal Subset Sum

### 3. Longest Common Subsequence (LCS)
- Longest Common Subsequence
- Edit Distance
- Longest Palindromic Subsequence

### 4. Matrix DP
- Unique Paths
- Minimum Path Sum
- Maximal Square

### 5. String DP
- Longest Palindromic Substring
- Word Break
- Regular Expression Matching

## Steps to Solve DP Problems

1. **Identify the state**: What information do we need to track?
2. **Define the recurrence relation**: How do we compute current state from previous states?
3. **Base cases**: What are the simplest subproblems?
4. **Choose approach**: Top-down (memoization) or bottom-up (tabulation)
5. **Optimize space**: Can we reduce space complexity?

## Related Problems

View all Dynamic Programming problems in the [main question list](https://seanprashad.com/leetcode-patterns/).

Common problems include:
- Climbing Stairs
- House Robber
- Coin Change
- Longest Common Subsequence
- Edit Distance
- Unique Paths
- Word Break
- Longest Increasing Subsequence

## Time & Space Complexity

- **Time Complexity**: Typically O(n) for 1D, O(n²) for 2D, O(n³) for 3D
- **Space Complexity**: 
  - O(n) for 1D memoization/tabulation
  - O(n²) for 2D problems
  - Can often be optimized to O(1) or O(n) with space optimization

## Tips

1. **Start with brute force**: Understand the problem first, then optimize
2. **Draw the state space**: Visualize subproblems and dependencies
3. **Identify overlapping subproblems**: Look for repeated calculations
4. **Practice pattern recognition**: Many DP problems follow similar patterns
5. **Space optimization**: After solving, see if you can reduce space complexity

