# Bit Manipulation Pattern

## Core Concept

Bit Manipulation involves directly manipulating bits (0s and 1s) in binary representations of numbers. This technique can lead to highly efficient solutions by leveraging bitwise operations.

Common bitwise operations:
- **AND (&)**: Both bits must be 1
- **OR (|)**: At least one bit must be 1
- **XOR (^)**: Bits must be different
- **NOT (~)**: Flip all bits
- **Left Shift (<<)**: Multiply by 2
- **Right Shift (>>)**: Divide by 2

## When to Use

Use Bit Manipulation when:

- **Efficient operations**: Need O(1) operations on bits
- **Space optimization**: Represent sets/arrays as bits
- **Power of 2**: Problems involving powers of 2
- **Counting bits**: Problems about bit counts
- **Set operations**: Efficient set union/intersection

### Problem Indicators

- "Single number" (find unique element)
- "Power of two"
- "Count set bits"
- "Bitwise operations"
- "Set representation"
- "XOR problems"

## Template Code

### Basic Bit Operations

```python
# Check if bit is set
def is_bit_set(num, pos):
    return (num >> pos) & 1 == 1

# Set a bit
def set_bit(num, pos):
    return num | (1 << pos)

# Clear a bit
def clear_bit(num, pos):
    return num & ~(1 << pos)

# Toggle a bit
def toggle_bit(num, pos):
    return num ^ (1 << pos)

# Count set bits
def count_set_bits(num):
    count = 0
    while num:
        count += num & 1
        num >>= 1
    return count

# Count set bits (Brian Kernighan's algorithm)
def count_set_bits_fast(num):
    count = 0
    while num:
        num &= num - 1  # Clear least significant set bit
        count += 1
    return count
```

### Find Single Number (XOR)

```python
def single_number(nums):
    result = 0
    for num in nums:
        result ^= num
    return result
```

### Power of Two

```python
def is_power_of_two(n):
    return n > 0 and (n & (n - 1)) == 0
```

### JavaScript Template

```javascript
function isBitSet(num, pos) {
    return ((num >> pos) & 1) === 1;
}

function setBit(num, pos) {
    return num | (1 << pos);
}

function clearBit(num, pos) {
    return num & ~(1 << pos);
}

function countSetBits(num) {
    let count = 0;
    while (num) {
        count += num & 1;
        num >>= 1;
    }
    return count;
}
```

## Common Tricks

1. **XOR properties**: `a ^ a = 0`, `a ^ 0 = a`, `a ^ b ^ a = b`
2. **Power of 2**: `n & (n - 1) == 0` if n is power of 2
3. **Get rightmost set bit**: `n & -n`
4. **Clear rightmost set bit**: `n & (n - 1)`

## Related Problems

View all Bit Manipulation problems in the [main question list](https://seanprashad.com/leetcode-patterns/).

Common problems include:
- Single Number
- Number of 1 Bits
- Power of Two
- Missing Number
- Reverse Bits

## Time & Space Complexity

- **Time Complexity**: Often O(1) for single operations, O(n) for array traversal
- **Space Complexity**: O(1) - operations are in-place

## Tips

1. **Know bitwise operations**: Master AND, OR, XOR, shifts
2. **XOR for duplicates**: XOR cancels duplicates
3. **Power of 2 trick**: `n & (n - 1) == 0`
4. **Bit masks**: Use masks to extract specific bits

