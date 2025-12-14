# Intervals Pattern

## Core Concept

Interval problems involve working with ranges of values, typically represented as [start, end] pairs. Common operations include:
- Merging overlapping intervals
- Finding non-overlapping intervals
- Inserting intervals
- Finding intersections

## When to Use

Use Interval techniques when:

- **Range problems**: Working with time ranges, number ranges
- **Overlap detection**: Finding or removing overlapping intervals
- **Scheduling**: Meeting rooms, event scheduling
- **Merge operations**: Combining overlapping intervals
- **Coverage problems**: Finding coverage, gaps

### Problem Indicators

- "Merge intervals"
- "Non-overlapping intervals"
- "Meeting rooms"
- "Insert interval"
- "Interval intersection"
- "Range problems"

## Template Code

### Merge Intervals

```python
def merge_intervals(intervals):
    if not intervals:
        return []
    
    # Sort by start time
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]
    
    for current in intervals[1:]:
        last = merged[-1]
        
        # If overlapping, merge
        if current[0] <= last[1]:
            last[1] = max(last[1], current[1])
        else:
            merged.append(current)
    
    return merged
```

### Insert Interval

```python
def insert_interval(intervals, new_interval):
    result = []
    i = 0
    
    # Add all intervals before new_interval
    while i < len(intervals) and intervals[i][1] < new_interval[0]:
        result.append(intervals[i])
        i += 1
    
    # Merge overlapping intervals
    while i < len(intervals) and intervals[i][0] <= new_interval[1]:
        new_interval[0] = min(new_interval[0], intervals[i][0])
        new_interval[1] = max(new_interval[1], intervals[i][1])
        i += 1
    
    result.append(new_interval)
    
    # Add remaining intervals
    result.extend(intervals[i:])
    return result
```

### Find Non-Overlapping Intervals

```python
def erase_overlap_intervals(intervals):
    if not intervals:
        return 0
    
    # Sort by end time (greedy: keep intervals that end earliest)
    intervals.sort(key=lambda x: x[1])
    
    count = 0
    end = intervals[0][1]
    
    for i in range(1, len(intervals)):
        if intervals[i][0] < end:
            count += 1  # Remove overlapping interval
        else:
            end = intervals[i][1]
    
    return count
```

### Interval Intersection

```python
def interval_intersection(intervals1, intervals2):
    result = []
    i = j = 0
    
    while i < len(intervals1) and j < len(intervals2):
        # Find overlap
        start = max(intervals1[i][0], intervals2[j][0])
        end = min(intervals1[i][1], intervals2[j][1])
        
        if start <= end:
            result.append([start, end])
        
        # Move pointer of interval that ends first
        if intervals1[i][1] < intervals2[j][1]:
            i += 1
        else:
            j += 1
    
    return result
```

### JavaScript Template

```javascript
function mergeIntervals(intervals) {
    if (intervals.length === 0) return [];
    
    intervals.sort((a, b) => a[0] - b[0]);
    const merged = [intervals[0]];
    
    for (let i = 1; i < intervals.length; i++) {
        const current = intervals[i];
        const last = merged[merged.length - 1];
        
        if (current[0] <= last[1]) {
            last[1] = Math.max(last[1], current[1]);
        } else {
            merged.push(current);
        }
    }
    
    return merged;
}
```

## Common Operations

1. **Sorting**: Usually sort by start time or end time
2. **Overlap check**: `interval1[0] <= interval2[1] and interval2[0] <= interval1[1]`
3. **Merge**: `[min(start1, start2), max(end1, end2)]`
4. **Greedy selection**: Keep intervals that end earliest

## Related Problems

View all Intervals problems in the [main question list](https://seanprashad.com/leetcode-patterns/).

Common problems include:
- Merge Intervals
- Non-overlapping Intervals
- Meeting Rooms
- Insert Interval
- Interval List Intersections

## Time & Space Complexity

- **Time Complexity**: O(n log n) for sorting, then O(n) for processing
- **Space Complexity**: O(n) for storing results

## Tips

1. **Sort first**: Most interval problems require sorting
2. **Choose sort key**: Sort by start time or end time based on problem
3. **Overlap condition**: Understand when intervals overlap
4. **Greedy approach**: Often use greedy (keep earliest ending intervals)

