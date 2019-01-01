public class URLify {
	// NOTE: We assume the string has sufficient free space at the end!
	// If not, we'll get an IndexOutOfBounds exception
	public static void replaceSpaces(char[] str, int trueLength) {
		int spacesCount = 0;

		for (int i = 0; i < trueLength; i++) {
			if (str[i] == ' ') {
				++spacesCount;
			}
		}

		int idx = trueLength + spacesCount * 2;

		// Set the null-terminating char to reflect the
		// actual amount of letters (without trailing spaces)
		str[idx] = '\0';

		// Setting the loop to the ending position of
		// the old char array will let us copy each letter
		// into it's new spot, using the newIndex position
		for (int i = trueLength - 1; i >= 0; i--) {
			if (str[i] == ' ') {
				str[--idx] = '0';
				str[--idx] = '2';
				str[--idx] = '%';
			} else {
				str[--idx] = str[i];
			}
		}
	}

	public static int findLastCharacter(char[] str) {
		for (int i = str.length - 1; i >= 0; i--) {
			if (str[i] != ' ') {
				return i;
			}
		}
		return -1;
	}

	public static void main(String[] args) {
		String str = "Mr John Smith     ";
		char[] arr = str.toCharArray();
		int trueLength = findLastCharacter(arr) + 1;
		replaceSpaces(arr, trueLength);
		System.out.println("\"" + new String(arr) + "\"");
	}
}
