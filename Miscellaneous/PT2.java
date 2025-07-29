import java.util.*;

class AccessSystem {
    Map<String, List<String>> children;
    Map<String, String> parents;
    Set<String> allRegions;
    Map<String, Set<String>> grants;
    Map<String, Set<String>> revokes;

    public AccessSystem(String[][] edges) {
        children = new HashMap<>();
        parents = new HashMap<>();
        allRegions = new HashSet<>();
        grants = new HashMap<>();
        revokes = new HashMap<>();

        for (String[] edge : edges) {
            String parent = edge[0], child = edge[1];

            children.putIfAbsent(parent, new ArrayList<>());
            children.get(parent).add(child);

            parents.put(child, parent);

            allRegions.add(child);
            allRegions.add(parent);
        }
    }

    public void grantAccess(String advertiserId, String regionId) {
        if (!allRegions.contains(regionId)) {
            return;
        }

        List<String> allSubRegions = getAllSubRegions(regionId);

        grants.putIfAbsent(advertiserId, new HashSet<>());
        revokes.putIfAbsent(advertiserId, new HashSet<>());

        for (String region : allSubRegions) {
            grants.get(advertiserId).add(region);
            revokes.get(advertiserId).remove(region);
        }
    }

    public void revokeAccess(String advertiserId, String regionId) {
        if (!allRegions.contains(regionId)) {
            return;
        }

        List<String> allSubRegions = getAllSubRegions(regionId);

        grants.putIfAbsent(advertiserId, new HashSet<>());
        revokes.putIfAbsent(advertiserId, new HashSet<>());

        for (String region : allSubRegions) {
            grants.get(advertiserId).remove(region);
            revokes.get(advertiserId).add(region);
        }
    }

    public boolean checkAccess(String advertiserId, String regionId) {
        if (!allRegions.contains(regionId)) {
            return false;
        }

        String curr = regionId;

        Set<String> grantedRegions = grants.getOrDefault(advertiserId, Collections.emptySet());
        Set<String> revokedRegions = revokes.getOrDefault(advertiserId, Collections.emptySet());

        while (curr != null) {
            if (revokedRegions.contains(curr)) { return false; }
            if (grantedRegions.contains(curr)) { return true; }

            curr = parents.get(curr);
        }

        return false;
    }

    private List<String> getAllSubRegions(String regionId) {
        if (!allRegions.contains(regionId)) {
            return Collections.emptyList();
        }

        List<String> result = new ArrayList<>();
        Queue<String> q = new LinkedList<>();
        q.offer(regionId);

        while (!q.isEmpty()) {
            String curr = q.poll();
            result.add(curr);

            for (String child : children.getOrDefault(curr, new ArrayList<>())) {
                q.offer(child);
            }
        }

        return result;
    }
}
