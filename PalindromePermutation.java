public class PalindromePermutation {
	// CASE SENSITIVE!
	public static boolean isPermutationOfPalindrome(String phrase) {
		if (phrase == null) {
			return false;
		}

		// Handle only standard ASCII characters
		int[] char_counts = new int[128];

		for (char c : phrase.toCharArray()) {
			if (c != ' ') {
				char_counts[Character.toLowerCase(c)]++;
			}
		}

		boolean foundOdd = false;
		for (int count : char_counts) {
			// If we have a remainder of 1, it implies that the
			// array index has a count that is odd! If we have 1
			// odd, that is OK as it can be in the middle of the
			// palindrome. If we have more than 1 odd, then it becomes
			// a problem as it implies the phrase can never be a palindrome
			if (count % 2 == 1) {
				if (foundOdd) {
					return false;
				}
				foundOdd = true;
			}
		}

		return true;
	}

	public static void main(String[] args) {
		String[] strings = { "Rats live on no evil star", "A man, a plan, a canal, panama", "Lleve", "Tacotac",
				"asda" };
		for (String s : strings) {
			boolean a = isPermutationOfPalindrome(s);
			System.out.println(s);
			System.out.println("Palindrome permutation? " + a);
			System.out.println();
		}
	}

}
