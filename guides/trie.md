# Trie Pattern

## Core Concept

A Trie (prefix tree) is a tree-like data structure used to store strings. Each node represents a character, and paths from root to nodes represent strings. Tries are efficient for:
- Prefix matching
- String search
- Autocomplete
- Word validation

Key advantages:
- Fast prefix lookups O(m) where m is string length
- Space efficient for common prefixes
- Easy to implement

## When to Use

Use Trie when:

- **Prefix matching**: Finding all strings with given prefix
- **String search**: Searching for words in dictionary
- **Autocomplete**: Implementing autocomplete functionality
- **Word validation**: Checking if word exists
- **Prefix problems**: Problems involving prefixes

### Problem Indicators

- "Prefix matching"
- "Word search"
- "Autocomplete"
- "Longest common prefix"
- "Add and search words"
- "Prefix tree"

## Template Code

### Basic Trie Implementation

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()
    
    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True
    
    def search(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                return False
            node = node.children[char]
        return node.is_end
    
    def starts_with(self, prefix):
        node = self.root
        for char in prefix:
            if char not in node.children:
                return False
            node = node.children[char]
        return True
```

### Search with Wildcard

```python
class WordDictionary:
    def __init__(self):
        self.root = TrieNode()
    
    def add_word(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True
    
    def search(self, word):
        def dfs(node, index):
            if index == len(word):
                return node.is_end
            
            char = word[index]
            if char == '.':
                # Try all children
                for child in node.children.values():
                    if dfs(child, index + 1):
                        return True
                return False
            else:
                if char not in node.children:
                    return False
                return dfs(node.children[char], index + 1)
        
        return dfs(self.root, 0)
```

### JavaScript Template

```javascript
class TrieNode {
    constructor() {
        this.children = {};
        this.isEnd = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }
    
    insert(word) {
        let node = this.root;
        for (const char of word) {
            if (!(char in node.children)) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEnd = true;
    }
    
    search(word) {
        let node = this.root;
        for (const char of word) {
            if (!(char in node.children)) {
                return false;
            }
            node = node.children[char];
        }
        return node.isEnd;
    }
    
    startsWith(prefix) {
        let node = this.root;
        for (const char of prefix) {
            if (!(char in node.children)) {
                return false;
            }
            node = node.children[char];
        }
        return true;
    }
}
```

## Common Variations

1. **Wildcard search**: Support '.' for any character
2. **Prefix counting**: Count words with given prefix
3. **Longest prefix**: Find longest common prefix
4. **Delete operation**: Remove words from trie

## Related Problems

View all Trie problems in the [main question list](https://seanprashad.com/leetcode-patterns/).

Common problems include:
- Implement Trie
- Add and Search Words
- Word Search II
- Longest Word in Dictionary
- Replace Words

## Time & Space Complexity

- **Insert**: O(m) where m is word length
- **Search**: O(m) where m is word length
- **Space**: O(ALPHABET_SIZE * N * M) where N is number of words, M is average length

## Tips

1. **Node structure**: Each node has children map and is_end flag
2. **Character mapping**: Use dictionary/map for children
3. **Prefix vs word**: Distinguish between prefix and complete word
4. **DFS for wildcards**: Use DFS when searching with wildcards

