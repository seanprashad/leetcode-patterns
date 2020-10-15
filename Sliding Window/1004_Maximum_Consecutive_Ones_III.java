class Solution {
    public int longestOnes(int[] a, int k) {
        if(a.length==0)
            return 0;
        int max = 0;
        int left = 0;
        int right = 0;
        int countZeros = 0;
        for(right = 0 ; right < a.length ; ++right){
            if(a[right]==0)
                ++countZeros;
            while(countZeros > k){
                if(a[left]==0)
                    --countZeros;
                ++left;
            }
            max = Math.max(max, right-left+1);
        }
        return max;
    }
}
