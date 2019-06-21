import java.util.ArrayList;
import java.util.List;

public class Pascale_Triangle_II_119 {
    public static List<Integer> getRow(int rowIndex) {
        List<Integer> row = new ArrayList<>();

        for (int i = 0; i <= rowIndex; i++) {
            row.add(0, 1);

            for (int j = 1; j < row.size() - 1; j++) {
                row.set(j, row.get(j) + row.get(j + 1));
            }
        }

        return row;
    }

    public static void main(String[] args) {
        int n = 3;
        List<Integer> result = getRow(n);

        for (Integer l : result) {
            System.out.print(l + ", ");
        }
        return;
    }
}
