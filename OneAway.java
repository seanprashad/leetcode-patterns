public class OneAway {
	public static boolean oneEditReplace(String s1, String s2) {
		if (s1.length() != s2.length()) {
			return false;
		}

		boolean foundDifference = false;
		for (int i = 0; i < s1.length(); i++) {
			if (s1.charAt(i) != s2.charAt(i)) {
				if (foundDifference) {
					return false;
				}
				foundDifference = true;
			}
		}

		return true;
	}

	/* Check if you can insert a character into s1 to make s2 */
	public static boolean oneEditInsert(String s1, String s2) {
		// Check string lengths - are we off by more than 2 characters?
		int str1Idx = 0, str2Idx = 0;

		while (str1Idx < s1.length() && str2Idx < s2.length()) {
			if (s1.charAt(str1Idx) != s2.charAt(str2Idx)) {
				if (str1Idx != str2Idx) {
					return false;
				}
				str2Idx++;
			} else {
				str1Idx++;
				str2Idx++;
			}
		}

		return true;
	}

	public static boolean oneEditAway(String first, String second) {
		if (first.equals(second)) {
			return true;
		} else if (first.length() == second.length()) {
			return oneEditReplace(first, second);
		} else if (first.length() + 1 == second.length()) {
			return oneEditInsert(first, second);
		} else if (first.length() == second.length() + 1) {
			return oneEditInsert(second, first);
		}

		return false;
	}

	public static void test(String a, String b, boolean expected) {
		boolean resultA = oneEditAway(a, b);

		if (resultA == expected) {
			System.out.println(a + ", " + b + ": success");
		} else {
			System.out.println(a + ", " + b + ": error");
		}
	}

	public static void main(String[] args) {
		String[][] tests = { { "a", "b", "true" }, { "", "d", "true" }, { "d", "de", "true" },
				{ "pale", "pse", "false" }, { "acdsfdsfadsf", "acdsgdsfadsf", "true" },
				{ "acdsfdsfadsf", "acdsfdfadsf", "true" }, { "acdsfdsfadsf", "acdsfdsfads", "true" },
				{ "acdsfdsfadsf", "cdsfdsfadsf", "true" }, { "adfdsfadsf", "acdfdsfdsf", "false" },
				{ "adfdsfadsf", "bdfdsfadsg", "false" }, { "adfdsfadsf", "affdsfads", "false" },
				{ "pale", "pkle", "true" }, { "pkle", "pable", "false" } };
		for (int i = 0; i < tests.length; i++) {
			String[] test = tests[i];
			String a = test[0];
			String b = test[1];
			boolean expected = test[2].equals("true");

			test(a, b, expected);
			test(b, a, expected);
		}
	}
}