class SparseVector {
    private Map<Integer, Integer> indexMap;
    
    public SparseVector(int[] nums) {
        indexMap = new HashMap<>();

        for (int i = 0; i < nums.length; i++) {
            if (nums[i] != 0) { indexMap.put(i, nums[i]); }
        }
    }
    
	// Return the dotProduct of two sparse vectors
    public int dotProduct(SparseVector vec) {
        int product = 0;
        Map<Integer, Integer> vecMap = vec.indexMap;

        for (Map.Entry<Integer, Integer> entry : indexMap.entrySet()) {
            if (!vecMap.containsKey(entry.getKey())) {
                continue;
            }

            product += entry.getValue() * vecMap.get(entry.getKey());
        }
        
        return product;
    }
}

// Your SparseVector object will be instantiated and called as such:
// SparseVector v1 = new SparseVector(nums1);
// SparseVector v2 = new SparseVector(nums2);
// int ans = v1.dotProduct(v2);
