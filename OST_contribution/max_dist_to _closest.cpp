#include <vector>
#include <algorithm>
#include <iostream>
using namespace std;

int maxDistToClosest(std::vector<int>& seats) {
    int n = seats.size();
    int max_dist = 0;
    int last_person = -1;

    // Pass 1: Calculate max distance for the empty seats before the first occupied seat and in between.
    for (int i = 0; i < n; i++) {
        if (seats[i] == 1) {
            if (last_person == -1) {
                // If this is the first person, the distance to the closest person for all previous seats is just `i`.
                max_dist = i;
            } else {
                // Otherwise, for seats between two people, the max distance is half the gap.
                max_dist = std::max(max_dist, (i - last_person) / 2);
            }
            last_person = i;
        }
    }

    // Pass 2: Calculate max distance for the empty seats after the last occupied seat.
    max_dist = std::max(max_dist, n - 1 - last_person);

    return max_dist;
}

int main() 
{
    int n;
    cout<<"Enter the total no. of seats :"<<endl;
    cin>>n;
    std::vector<int> seats(n);
    cout<<"Enter the status of the seats(0 for empty and 1 for occupied):"<<endl;
    for(int i=0;i<n;i++)
    {
        cin>>seats[i];
    }
    std::cout << "Maximum Distance to Closest Person: " << maxDistToClosest(seats) << std::endl;
    return 0;
}
