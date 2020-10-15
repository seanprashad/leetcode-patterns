//Link to the leetcode medium difficulty problem : https://leetcode.com/problems/get-equal-substrings-within-budget/
//Solution contributed by : Khushaliketan

class Solution {
    public int equalSubstring(String s, String t, int maxCost) {
        if(maxCost == 0 && s.equals(t))
            return s.length();
        int[] diff = new int[s.length()];
        for(int i=0; i<diff.length ; ++i){
            diff[i] = Math.abs(s.charAt(i) - t.charAt(i));
        }
        int currCost = 0;
        int start=0, end=0, max=0;
        for(end = 0; end<diff.length ;++end){
            currCost += diff[end];
            while(currCost > maxCost && start<=end){
                currCost -= diff[start];
                ++start;
            }  
            max = Math.max(max, end-start+1);
        }
        return max;
    }
}
