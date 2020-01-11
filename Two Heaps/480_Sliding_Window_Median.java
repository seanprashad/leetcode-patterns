class Solution {
    public double[] medianSlidingWindow(int[] nums, int k) {
        if (nums == null || nums.length == 0) {
            return new double[] {};
        }

        MedianQueue mq = new MedianQueue();
        double[] result = new double[nums.length - k + 1];
        int idx = 0;

        for (int i = 0; i < nums.length; i++) {
            mq.offer(nums[i]);

            if (mq.size() == k) {
                result[idx++] = mq.getMedian();
                mq.remove(nums[i + 1 - k]);
            }
        }

        return result;
    }

    class MedianQueue {
        private PriorityQueue<Integer> maxHeap;
        private PriorityQueue<Integer> minHeap;

        public MedianQueue() {
            maxHeap = new PriorityQueue<>();
            minHeap = new PriorityQueue<>(Collections.reverseOrder());
        }

        public void offer(int num) {
            maxHeap.offer(num);
            minHeap.offer(maxHeap.poll());

            if (maxHeap.size() < minHeap.size()) {
                maxHeap.offer(minHeap.poll());
            }
        }

        public boolean remove(int num) {
            return maxHeap.remove(num) || minHeap.remove(num);
        }

        public int size() {
            return maxHeap.size() + minHeap.size();
        }

        public double getMedian() {
            return maxHeap.size() > minHeap.size() ? maxHeap.peek() : ((long) maxHeap.peek() + minHeap.peek()) / 2.0;
        }
    }
}