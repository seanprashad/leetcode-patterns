import java.io.File;
import java.util.Scanner;

public class IC1 {
    private static void openFile() {
        try {
            File f = new File("/Users/sean/projects/leetcode-patterns/Miscellaneous/foo.txt");
            Scanner s = new Scanner(f);

            while (s.hasNextLine()) {
                String l = s.nextLine();
                System.out.println(l);
            }

            s.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        openFile();
        return;
    }
}
