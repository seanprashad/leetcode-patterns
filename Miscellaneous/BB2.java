import java.util.*;

public class BB2 {
    private Map<Character, Set<Character>> routes;

    public BB2() {
        this.routes = new HashMap<>();
    }

    public void addPath(char start, char end) {
        this.routes.putIfAbsent(start, new HashSet<>());
        this.routes.putIfAbsent(end, new HashSet<>());

        this.routes.get(start).add(end);
        this.routes.get(end).add(start);
    }

    public List<String> printAllPathsBetween(char start, char end) {
        List<String> result = new ArrayList<>();
        List<Character> currPath = new ArrayList<>();
        Set<Character> visited = new HashSet<>();

        currPath.add(start);
        visited.add(start);

        dfs(routes, visited, result, currPath, start, end);
        return result;
    }

    private void dfs(Map<Character, Set<Character>> routes, Set<Character> visited, List<String> result,
            List<Character> currPath, Character start, Character end) {
        if (start == end) {
            StringBuilder sb = new StringBuilder();

            for (int i = 0; i < currPath.size(); i++) {
                sb.append(currPath.get(i));

                if (i != currPath.size() - 1) {
                    sb.append(" -> ");
                }
            }

            result.add(sb.toString());
            return;
        }

        for (Character neighbour : routes.get(start)) {
            if (!visited.contains(neighbour)) {
                visited.add(neighbour);
                currPath.add(neighbour);

                dfs(routes, visited, result, currPath, neighbour, end);

                visited.remove(neighbour);
                currPath.remove(currPath.size() - 1);
            }
        }
    }

    public static void main(String[] args) {
        BB2 graph = new BB2();

        graph.addPath('A', 'B');
        graph.addPath('B', 'C');
        graph.addPath('B', 'C');
        graph.addPath('A', 'C');
        graph.addPath('A', 'D');
        graph.addPath('D', 'C');
        graph.addPath('F', 'E');

        List<String> validPathFromAtoC = graph.printAllPathsBetween('A', 'C');
        List<String> validPathFromBtoD = graph.printAllPathsBetween('B', 'D');
        List<String> invalidPathFromEtoA = graph.printAllPathsBetween('E', 'A');

        System.out.println("Valid Path - A to C:");
        for (String p : validPathFromAtoC) {
            System.out.println(p);
        }

        System.out.println("\nValid Path - B to D:");
        for (String p : validPathFromBtoD) {
            System.out.println(p);
        }

        System.out.println("\nInvalid Path - E to A:");
        for (String p : invalidPathFromEtoA) {
            System.out.println(p);
        }

        return;
    }
}
