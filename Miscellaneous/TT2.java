import java.util.*;

public class TT2 {
    public class Task {
        public String name;
        public int weight;
        public long TTL;

        public Task(String n, int w, long ttl) {
            this.name = n;
            this.weight = w;
            this.TTL = currentTime + ttl;
        }
    }

    public class Server {
        public char name;
        public int totalWeight;
        public PriorityQueue<Task> tasks;

        public Server(char name) {
            this.name = name;
            this.totalWeight = 0;
            tasks = new PriorityQueue<>((t1, t2) -> t1.ttl - t2.ttl);
        }

        public void addTask(String taskName, int taskWeight, int taskTTL) {
            invalidateTasks();
            Task t = new Task(taskName, taskWeight, taskTTL);
            tasks.add(t);
            totalWeight += t.weight;
        }

        private void invalidateTasks() {
            while (!tasks.isEmpty() && currentTime >= tasks.peek().ttl) {
                tasks.poll();
            }
        }
    }

    public class LoadBalancer {
        public PriorityQueue<Server> servers;

        public LoadBalancer() {
            servers = new PriorityQueue<>((s1, s2) -> s1.totalWeight - s2.totalWeight);
        }

        public boolean addServer(char serverName) {
            Server s = new Server(serverName);
            servers.add(s);
            return true;
        }

        public boolean addTask(String taskName, int taskWeight, int taskTTL) {
            servers.peek().addTask(taskName, taskWeight, taskTTL);
            return true;
        }
    }

    public static void main(String[] args) {
        LoadBalancer lb = new LoadBalancer();
        for (char serverName : serverList) {
            lb.addServer(serverName);
        }

        for (int taskWeight : taskList) {
            lb.addTask("", taskWeight, TTL);
        }

        return;
    }
}
