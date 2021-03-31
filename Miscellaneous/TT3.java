import java.util.*;

interface Playlist {
    Song getNextSong();

    boolean hasNextSong();
}

class Song {
    String name;

    public Song(String name) {
        this.name = name;
    }
}

class CollaborativePlaylist implements Playlist {
    private Deque<Playlist> dq;

    public CollaborativePlaylist(List<Playlist> playlists) {
        dq = new ArrayDeque<>();

        for (Playlist p : playlists) {
            dq.offer(p);
        }
    }

    @Override
    public Song getNextSong() {
        while (!dq.isEmpty()) {
            Playlist p = dq.pollFirst();

            if (p.hasNextSong()) {
                Song s = p.getNextSong();
                dq.offerLast(p);
                return s;
            }
        }

        return null;
    }

    @Override
    public boolean hasNextSong() {
        return !dq.isEmpty();
    }
}
