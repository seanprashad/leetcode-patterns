public class StringCompression {
	public static String compress(String str) {
		if (str == null) {
			return null;
		}

		StringBuilder compressedString = new StringBuilder();
		int consecutiveCount = 0;

		for (int i = 0; i < str.length(); i++) {
			consecutiveCount++;

			// If we're at the end of the string, append the last character
			if (i + 1 >= str.length() || str.charAt(i) != str.charAt(i + 1)) {
				compressedString.append(str.charAt(i)).append(consecutiveCount);
				consecutiveCount = 0;
			}
		}

		return str.length() < compressedString.length() ? str : compressedString.toString();
	}

	public static void main(String[] args) {
		String str1 = "a";
		String str2 = "bb";
		String str3 = "aaaaabbbbaaaabbddc";
		System.out.println(str1);
		System.out.println(compress(str1));
		System.out.println(str2);
		System.out.println(compress(str2));
		System.out.println(str3);
		System.out.println(compress(str3));
	}
}
