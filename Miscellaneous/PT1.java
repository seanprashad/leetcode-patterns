import java.util.*;

class PinSystem {
    class Pin {
        int id;
        double score;

        public Pin(int id, double score) {
            this.id = id;
            this.score = score;
        }
    }

    Map<String, PriorityQueue<Pin>> hm;
    Set<Integer> usedIds;

    public PinSystem() {
        hm = new HashMap<>();
        usedIds = new HashSet<>();
    }

    public boolean addPin(int id, double score, String type) {
        if (usedIds.contains(id)) {
            return false;
        }

        hm.putIfAbsent(type, new PriorityQueue<Pin>((p1, p2) -> Double.compare(p2.score, p1.score)));
        hm.get(type).offer(new Pin(id, score));
        return usedIds.add(id);
    }

    public List<Integer> getTopK(String type, int k) {
        if (!hm.containsKey(type)) {
            return Collections.emptyList();
        }

        PriorityQueue<Pin> pins = hm.get(type);
        List<Pin> polledPins = new ArrayList<>();
        List<Integer> result = new ArrayList<>(k);

        k = Math.min(k, pins.size());

        while (k > 0) {
            polledPins.add(pins.poll());
            --k;
        }

        for (Pin p : polledPins) {
            result.add(p.id);
            pins.offer(p);
        }

        return result;
    }
}
