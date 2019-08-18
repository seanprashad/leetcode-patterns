class TrieNode {
    TrieNode[] children = new TrieNode[26];
    String Word;
}

class Solution {
    public List<String> findWords(char[][] board, String[] words) {
        Set<String> result = new HashSet<>();
        TrieNode root = buildTrie(words);
        
        for (int i = 0; i < board.length; i++) {
            for (int j = 0; j < board[i].length; j++) {
                dfs(board, i, j, root, result);
            }
        }
        
        return new ArrayList<>(result);
    }
    
    private void dfs(char[][] board, int x, int y, TrieNode root, Set<String> result) {
        if (x < 0 || y < 0 || x >= board.length || y >= board[x].length || board[x][y] == '*' || root.children[board[x][y] - 'a'] == null) { return; }
        
        char currChar = board[x][y];
        root = root.children[currChar - 'a'];
        
        if (root.Word != null) {
            result.add(root.Word);
        }
        
        board[x][y] = '*';
        
        dfs(board, x - 1, y, root, result);
        dfs(board, x + 1, y, root, result);
        dfs(board, x, y - 1, root, result);
        dfs(board, x, y + 1, root, result);
            
        board[x][y] = currChar;
    }
    
    private TrieNode buildTrie(String[] words) {
        if (words == null) { return null; }
        
        TrieNode root = new TrieNode();
        for (String word : words) {
            TrieNode curr = root;
            for (char c : word.toCharArray()) {
                int idx = c - 'a';
                if (curr.children[idx] == null) {
                    curr.children[idx] = new TrieNode();
                }
                curr = curr.children[idx];
            }
            
            curr.Word = word;
        }
        
        return root;
    }
}
