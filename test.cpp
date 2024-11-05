#include<bits/stdc++.h>

using namespace std;

struct Node
{
    int value;
    Node* next;
};



Node* insert(Node* head, int value)
{
    // Your code here
    Node* newNode = new Node;
    newNode->value = value;
    newNode->next = NULL;

    if(head == NULL) return newNode;

    Node* tail = head;
    Node* prev = NULL;

    while(tail->value < value) {
        prev = tail;
        tail = tail->next;
    }

    prev->next = newNode;
    prev->next = tail;

    return head;
}

int main() {

}
