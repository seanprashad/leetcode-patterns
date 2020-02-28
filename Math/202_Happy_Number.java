class Solution {
    public boolean isHappy(int n) {
        if (n < 0) {
            return false;
        }

        int tortoise = n, hare = getNext(n);

        while (hare != 1 && tortoise != hare) {
            tortoise = getNext(tortoise);
            hare = getNext(getNext(hare));
        }

        return hare == 1;
    }

    private int getNext(int n) {
        int totalSum = 0;

        while (n > 0) {
            int digit = n % 10;
            totalSum += digit * digit;
            n /= 10;
        }

        return totalSum;
    }
}
