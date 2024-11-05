#include<bits/stdc++.h>
using namespace std;
int main() {
    vector<int> v(3, 100); // them 3 so 100 vao mang
    for(auto &x : v){
        cout << x << " ";
        x = 2;
    }
    cout << endl;
    for(auto x : v){
        cout << x << " ";
    }
    cout << *(v.begin()+1) << " ";
    v.insert(v.begin() + 2, 49);
    v.erase(v.begin() + 1);
    v.pop_back();
    v.resize(1); // thay doi kich thuoc mang
    for(vector<int>::iterator it = v.begin(); it != v.end(); it++){
        cout << *it << " ";
    }
    v.clear(); // xoa toan bo phan tu
}
