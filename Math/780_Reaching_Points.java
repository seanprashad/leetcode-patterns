class Solution {
    public boolean reachingPoints(int sx, int sy, int tx, int ty) {
        if (tx < sx || ty < sy) {
            return false;
        }

        if (sx == tx && (ty - sy) % sx == 0) {
            return true;
        }
        if (sy == ty && (tx - sx) % sy == 0) {
            return true;
        }

        return reachingPoints(sx, sy, tx % ty, ty % tx);
    }
}
