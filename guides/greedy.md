# Greedy Pattern

## Core Concept

Greedy algorithms make locally optimal choices at each step with the hope that these choices will lead to a globally optimal solution. The key is identifying when a greedy approach works - not all problems can be solved greedily.

Greedy works when:
- **Greedy choice property**: A global optimum can be reached by making locally optimal choices
- **Optimal substructure**: Optimal solution contains optimal solutions to subproblems

## When to Use

Use Greedy when:

- **Optimization problems**: Finding maximum or minimum
- **Local optimality**: Local optimal choice leads to global optimum
- **Activity selection**: Scheduling, interval problems
- **Coin change**: Making change with minimum coins (specific cases)
- **MST problems**: Minimum Spanning Tree algorithms

### Problem Indicators

- "Maximum/Minimum..."
- "Activity selection"
- "Interval scheduling"
- "Minimum coins"
- "Optimal arrangement"
- Problems where local choice doesn't affect future choices

## Template Code

### Activity Selection

```python
def activity_selection(activities):
    # Sort by finish time
    activities.sort(key=lambda x: x[1])
    
    selected = [activities[0]]
    last_finish = activities[0][1]
    
    for start, finish in activities[1:]:
        if start >= last_finish:
            selected.append((start, finish))
            last_finish = finish
    
    return selected
```

### Interval Scheduling

```python
def erase_overlap_intervals(intervals):
    if not intervals:
        return 0
    
    # Sort by end time
    intervals.sort(key=lambda x: x[1])
    
    count = 0
    end = intervals[0][1]
    
    for i in range(1, len(intervals)):
        if intervals[i][0] < end:
            count += 1  # Overlapping, remove this
        else:
            end = intervals[i][1]
    
    return count
```

### Coin Change (Greedy - works for certain coin systems)

```python
def coin_change_greedy(coins, amount):
    coins.sort(reverse=True)  # Use largest coins first
    count = 0
    
    for coin in coins:
        if amount >= coin:
            num_coins = amount // coin
            count += num_coins
            amount -= num_coins * coin
    
    return count if amount == 0 else -1
```

### JavaScript Template

```javascript
function activitySelection(activities) {
    activities.sort((a, b) => a[1] - b[1]);
    
    const selected = [activities[0]];
    let lastFinish = activities[0][1];
    
    for (let i = 1; i < activities.length; i++) {
        const [start, finish] = activities[i];
        if (start >= lastFinish) {
            selected.push(activities[i]);
            lastFinish = finish;
        }
    }
    
    return selected;
}
```

## Common Greedy Strategies

1. **Sort first**: Many greedy problems require sorting
2. **Take earliest/latest**: Choose based on start/end times
3. **Take largest/smallest**: Choose based on value/size
4. **Local optimization**: Make best local choice

## When Greedy Fails

Greedy doesn't work when:
- Local optimal doesn't lead to global optimal
- Need to consider future consequences
- Problem requires exploring all possibilities

Example: Coin change with coins [1, 3, 4] and amount 6:
- Greedy: 4 + 1 + 1 = 3 coins
- Optimal: 3 + 3 = 2 coins

## Related Problems

View all Greedy problems in the [main question list](https://seanprashad.com/leetcode-patterns/).

Common problems include:
- Non-overlapping Intervals
- Jump Game
- Gas Station
- Assign Cookies
- Best Time to Buy and Sell Stock

## Time & Space Complexity

- **Time Complexity**: Often O(n log n) due to sorting, then O(n) for processing
- **Space Complexity**: O(1) if not storing results, O(n) if storing

## Tips

1. **Prove correctness**: Ensure greedy choice leads to optimal solution
2. **Sort appropriately**: Sort by the right criteria (end time, value, etc.)
3. **Start simple**: Try greedy first, fall back to DP if needed
4. **Counter-examples**: Test with edge cases to verify greedy works

