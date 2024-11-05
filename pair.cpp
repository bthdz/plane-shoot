#include<bits/stdc++.h>
using namespace std;
int main() {
    pair<int, char>  p = {10 , 'c'};
    cout << p.first << " " << p.second;
    pair<int, string> a[3];
    for(int i = 0; i < 3; i++){
        cin >> a[i].first >> a[i].second;
    }
    for(auto x : a){
        cout << x.first << " " << x.second << endl;
    }
    vector<pair<int, int>> b;
    pair<int, pair<int,int>> c{10, {12, 13}};
    cout << c.first << " " << c.second.first;
    int a[7]= {5,5,1,2,3,4,1};
    set<int> se(a, a+7);
    auto it = se.find(4);
    it--;
    cout << *it << " ";
}
