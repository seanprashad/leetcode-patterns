class Solution {
    public List<List<Integer>> combine(int n, int k) {
        if (n == 0 || k > n) {
            return Collections.emptyList();
        }

        List<List<Integer>> result = new ArrayList<>();
        helper(n, k, 1, result, new ArrayList<>());
        return result;
    }

    private void helper(int end, int numbersLeft, int start, List<List<Integer>> result, List<Integer> temp) {
        if (numbersLeft == 0) {
            result.add(new ArrayList<>(temp));
            return;
        }

        for (int i = start; i <= end; i++) {
            temp.add(i);
            helper(end, numbersLeft - 1, i + 1, result, temp);
            temp.remove(temp.size() - 1);
        }
    }
}
