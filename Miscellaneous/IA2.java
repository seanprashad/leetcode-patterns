import java.util.*;

public class IA2 {
    public static int generatePhoneCombinations(char[][] keypad, Map<Character, Set<Character>> reachableDigits,
            int maxLen, char startDigit, char[] phoneNum, int phoneNumIdx) {
        if (phoneNumIdx == maxLen) {
            return 1;
        }

        int totalCombinations = 0;

        for (char digit : reachableDigits.get(startDigit)) {
            phoneNum[phoneNumIdx] = digit;
            totalCombinations += generatePhoneCombinations(keypad, reachableDigits, maxLen, digit, phoneNum,
                    phoneNumIdx + 1);
            phoneNum[phoneNumIdx] = '\0';
        }

        return totalCombinations;
    }

    public static void main(String[] args) {
        char[][] keypad = new char[][] { { '1', '2', '3' }, { '4', '5', '6' }, { '7', '8', '9' }, { 'x', '0', 'x' } };

        Map<Character, Set<Character>> reachableDigits = populateKeypadCombinations();
        int maxLen = 7;
        char startChar = '0';
        char[] phoneNum = new char[7];
        phoneNum[0] = startChar;

        System.out.println("The total number of combinations with a starting key of " + startChar + " is: "
                + generatePhoneCombinations(keypad, reachableDigits, maxLen, startChar, phoneNum, 1) + ".");

        return;
    }

    private static Map<Character, Set<Character>> populateKeypadCombinations() {
        Map<Character, Set<Character>> map = new HashMap<>();

        map.put('1', new HashSet<>());
        map.get('1').add('3');
        map.get('1').add('5');
        map.get('1').add('7');

        map.put('2', new HashSet<>());
        map.get('2').add('4');
        map.get('2').add('6');
        map.get('2').add('8');

        map.put('3', new HashSet<>());
        map.get('3').add('1');
        map.get('3').add('5');
        map.get('3').add('9');

        map.put('4', new HashSet<>());
        map.get('4').add('2');
        map.get('4').add('6');
        map.get('4').add('8');

        map.put('5', new HashSet<>());
        map.get('5').add('0');
        map.get('5').add('1');
        map.get('5').add('3');
        map.get('5').add('7');
        map.get('5').add('9');

        map.put('6', new HashSet<>());
        map.get('6').add('2');
        map.get('6').add('4');
        map.get('6').add('8');

        map.put('7', new HashSet<>());
        map.get('7').add('0');
        map.get('7').add('1');
        map.get('7').add('5');
        map.get('7').add('9');

        map.put('8', new HashSet<>());
        map.get('8').add('2');
        map.get('8').add('4');
        map.get('8').add('6');

        map.put('9', new HashSet<>());
        map.get('9').add('0');
        map.get('9').add('3');
        map.get('9').add('5');
        map.get('9').add('7');

        map.put('0', new HashSet<>());
        map.get('0').add('5');
        map.get('0').add('7');
        map.get('0').add('9');

        return map;
    }
}
