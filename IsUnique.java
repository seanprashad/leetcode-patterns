public class IsUnique {
	public static boolean isUniqueChars(String str) {
		if (str.length() > 128) {
			return false;
		}

		boolean[] char_set = new boolean[128];
		for (int i = 0; i < str.length(); i++) {
			if (char_set[str.charAt(i)]) {
				return false;
			}
			char_set[str.charAt(i)] = true;
		}

		return true;
	}

	public static void main(String[] args) {
		String[] words = { "abcde", "hello", "apple", "kite", "padle" };
		for (String word : words) {
			System.out.println(word + ": " + isUniqueChars(word));
		}
	}

}
