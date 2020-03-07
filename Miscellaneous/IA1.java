import java.util.*;

abstract class Entry {
    private Directory parent;
    private String name;
    private long createdAt;
    private long lastUpdated;
    private long lastAccessed;

    public Entry(Directory p, String n) {
        parent = p;
        name = n;
        createdAt = System.currentTimeMillis();
        lastUpdated = System.currentTimeMillis();
        lastAccessed = System.currentTimeMillis();
    }

    public abstract int size();

    public boolean delete() {
        if (parent == null) {
            return false;
        }

        return parent.deleteEntry(this);
    }

    public Directory getParent() {
        return parent;
    }

    public String getName() {
        return name;
    }

    public long getCreatedAt() {
        return createdAt;
    }

    public long getLastUpdated() {
        return lastUpdated;
    }

    public long getLastAccessed() {
        return lastAccessed;
    }
}

class File extends Entry {
    private String contents;
    private int size;

    public File(Directory p, String n, int sz) {
        super(p, n);
        size = sz;
    }

    public int size() {
        return size;
    }

    public String getContents() {
        return contents;
    }

    public void setContents(String s) {
        contents = s;
    }
}

class Directory extends Entry {
    private List<Entry> contents;

    public Directory(Directory p, String n) {
        super(p, n);
        contents = new ArrayList<>();
    }

    public int size() {
        int size = 0;

        for (Entry e : contents) {
            size += e.size();
        }

        return size;
    }

    public void addContent(Entry e) {
        contents.add(e);
    }

    public boolean deleteEntry(Entry e) {
        return contents.remove(e);
    }
}

class Solution {
    public static void main(String[] args) {
        Directory root = new Directory(null, "root");
        File f1 = new File(root, "file 1", 100);
        File f2 = new File(root, "file 2", 200);

        root.addContent(f1);
        root.addContent(f2);

        System.out.println(root.size());

        Directory dir1 = new Directory(root, "directory 1");
        Directory dir2 = new Directory(dir1, "directory 2");
        Directory dir3 = new Directory(dir2, "directory 3");
        File f3 = new File(dir1, "file 3", 300);
        File f4 = new File(dir2, "file 4", 400);
        File f5 = new File(dir3, "file 5", 500);

        root.addContent(dir1);
        dir1.addContent(f3);
        dir1.addContent(dir2);
        dir2.addContent(f4);
        dir2.addContent(dir3);
        dir3.addContent(f5);

        System.out.println(root.size());

        return;
    }
}
