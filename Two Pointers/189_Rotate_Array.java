class Solution {
    public void rotate(int[] nums, int k) {
    if(nums == null || nums.length <= 1 || k % nums.length == 0) {
			for(int i=0;i<nums.length;i++) {
			System.out.println(nums[i]);
		}
		}
		int n=nums.length;
        k = k % n; 
		swap(nums,0,n-1);
		swap(nums,0,k-1);
		swap(nums,k,n-1);
        for(int i=0;i<n;i++) {
			System.out.println(nums[i]);
		}
	}
	static void swap(int nums[],int s,int e) {
		while(s<e) {
			int temp=nums[s];
			nums[s]=nums[e];
			nums[e]=temp;
			s++;
			e--;
		}		
	}
}
