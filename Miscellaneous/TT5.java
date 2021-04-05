import java.util.*;

public class TT5 {

    public static List<String> split(String message, int limit) {
        List<String> result = new ArrayList<>();

        if (message.length() < limit) {
            result.add(message);
            return result;
        }

        // maxLineLength is capped at 154, as the ending suffix can
        // not be larger than " (X/9)", or 9 separate SMS messages,
        // therefore implying we need to reserve 6 spaces for each line
        // in advance
        int maxLineLength = limit - 6;
        int left = 0, right = left + maxLineLength;

        while (right < message.length()) {
            if (!Character.isWhitespace(message.charAt(right))) {
                while (right >= left && !Character.isWhitespace(message.charAt(right))) {
                    --right;
                }
            }

            result.add(message.substring(left, right + 1));
            left = right + 1;
            right = left + maxLineLength;
        }

        result.add(message.substring(left, message.length()));

        for (int i = 0; i < result.size(); i++) {
            result.set(i, result.get(i) + "(" + (i + 1) + "/" + result.size() + ")");
        }

        return result;
    }

    public static void main(String[] args) {
        String exampleText1 = "njdksjfn jdfnds kjfdklsjf jsdofjsd f jdslkjfgdslkngdslkjg fljksdjflsfdsjfdslkfjdslkfmdsklmfgn ljsdglkdsfg d lkjgdslkgjdsljgdslkjgdsfjngds lkjsdlkgjdsgkldsjgsdlkg lkjdslkgjdslkgjdslgmnds glkjgdslkjgdslkjfgodsjfds g,mdsgkjdsngdlsknfgldsjfglkdsjfglkdsjglkdsjglkdsgjdsklgjdslk lkgjdslkgfjdslkgjdslkgjdsljfgdslkgjmdslkg kljghjdslkjgdslkjfg";

        String exampleText2 = "Write a function that splits long SMS string into smaller pieces. Each piece should be less than or equal to 160 characters and contains indices at the end. Function should not break words into pieces. If word does not fit -- it should go to the next SMS.";

        String exampleText3 = "Hi your Uber is here!";

        String exampleText4 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis partu sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore ver rup. Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa.";

        String exampleText5 = "The South Lake Union Streetcar is a streetcar route in Seattle, Washington, United States. Traveling 1.3 miles (2.1 km), it connects downtown to the South Lake Union neighborhood on Westlake Avenue, Terry Avenue, and Valley Street. It was the first modern Seattle Streetcar line, beginning service on December 12, 2007, two years after a separate heritage streetcar ceased operations. It was conceived as part of the redevelopment of South Lake Union into a technology hub, with lobbying and financial support from Paul Allen.";

        List<String> result1 = split(exampleText1, 160);
        for (String line : result1) {
            System.out.println(line);
        }

        System.out.println("\n---\n");

        List<String> result2 = split(exampleText2, 60);
        for (String line : result2) {
            System.out.println(line);
        }

        System.out.println("\n---\n");

        List<String> result3 = split(exampleText3, 15);
        for (String line : result3) {
            System.out.println(line);
        }

        System.out.println("\n---\n");

        List<String> result4 = split(exampleText4, 160);
        for (String line : result4) {
            System.out.println(line);
        }

        System.out.println("\n---\n");

        List<String> result5 = split(exampleText5, 84);
        for (String line : result5) {
            System.out.println(line);
        }

        return;
    }
}

/*
 * Input is a string of characters that represents a text message. You need to
 * segment this message into chunks of messages each of length 160 characters
 * and add suffix "(1/5)" (representing pagination) at the end of each segmented
 * message (Length of "(1/5)" is included in 160 length limit).
 *
 * Input:
 * "njdksjfn jdfnds kjfdklsjf jsdofjsd f jdslkjfgdslkngdslkjg fljksdjflsfdsjfdslkfjdslkfmdsklmfgn ljsdglkdsfg d lkjgdslkgjdsljgdslkjgdsfjngds lkjsdlkgjdsgkldsjgsdlkg lkjdslkgjdslkgjdslgmnds glkjgdslkjgdslkjfgodsjfds g,mdsgkjdsngdlsknfgldsjfglkdsjfglkdsjglkdsjglkdsgjdsklgjdslk lkgjdslkgfjdslkgjdslkgjdsljfgdslkgjmdslkg kljghjdslkjgdslkjfg"
 *
 * Output: ['njdksjfn jdfnds kjfdklsjf jsdofjsd f jdslkjfgdslkngdslkjg
 * fljksdjflsfdsjfdslkfjdslkfmdsklmfgn ljsdglkdsfg d
 * lkjgdslkgjdsljgdslkjgdsfjngds (1/3)', 'lkjsdlkgjdsgkldsjgsdlkg
 * lkjdslkgjdslkgjdslgmnds glkjgdslkjgdslkjfgodsjfds
 * g,mdsgkjdsngdlsknfgldsjfglkdsjfglkdsjglkdsjglkdsgjdsklgjdslk (2/3)',
 * 'lkgjdslkgfjdslkgjdslkgjdsljfgdslkgjmdslkg kljghjdslkjgdslkjfg(3/3)']
 */