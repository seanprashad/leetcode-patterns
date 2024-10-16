#include <iostream>
#include <vector>
#include <unordered_set>
#include<climits>

using namespace std;

class Solution {
public:
    bool isReflected(vector<vector<int>>& points) {
        int min_x = INT_MAX, max_x = INT_MIN;
        unordered_set<string> pointSet;
        
        // Find the min and max x-coordinates and store points in a set
        for (const auto& point : points) {
            min_x = min(min_x, point[0]);
            max_x = max(max_x, point[0]);
            pointSet.insert(to_string(point[0]) + "_" + to_string(point[1]));
        }
        
        // Calculate the potential line of reflection
        double mid = (min_x + max_x) / 2.0;
        
        // Check if every point has a corresponding reflected point
        for (const auto& point : points) {
            int reflected_x = 2 * mid - point[0];
            string reflectedPoint = to_string(reflected_x) + "_" + to_string(point[1]);
            if (pointSet.find(reflectedPoint) == pointSet.end()) {
                return false;
            }
        }
        
        return true;
    }
};

int main() {
    Solution sol;
    vector<vector<int>> points = {{1, 1}, {-1, 1}, {3, 2}, {-3, 2}};
    if (sol.isReflected(points)) {
        cout << "Points are symmetrical about a vertical line.\n";
    } else {
        cout << "Points are not symmetrical.\n";
    }
    return 0;
}
