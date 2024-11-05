pull#include <bits/stdc++.h>

// Struct to store a word and its meaning
struct Word {
    std::string english;
    std::string meaning;
};

// Function to load words and meanings from a file
void loadWords(const std::string& filename, std::vector<Word>& words) {
    std::ifstream file(filename);
    std::string line;
    while (std::getline(file, line)) {
        std::istringstream iss(line);
        std::string english, meaning;
        if (std::getline(iss, english, ':') && std::getline(iss, meaning)) {
            words.push_back({english, meaning});
        }
    }
}

int start_index(std::string subject, std::vector<Word> words){
   for(int i = 0; i < words.size(); i++){
        if(words[i].english == subject) return i;
   }
   return -1;
}

int end_index(std::string subject, std::vector<Word> words){
   for(int i = words.size()-1; i >= 0; i--){
        if(words[i].english == subject) return i;
   }
   return -1;
}

int main(int argc, char* args[]) {
    std::vector<Word> words;
    loadWords("words.txt", words);

    if (words.empty()) {
        std::cout << "No words loaded." << std::endl;
        return 1;
    }
    std::vector<std::string> subjects;
    subjects.push_back("//Money master");
    subjects.push_back("//Subjects");
    subjects.push_back("//Studying at college/university");
    subjects.push_back("//Action");
    subjects.push_back("//Everyday activities");
    subjects.push_back("//Sea");
    subjects.push_back("//The number kkkk");
    subjects.push_back("//Shopping");
    // Randomly select a word from the list
    std::cout << "Nhap chu de muon hoc: " << std::endl;
    for(int i = 0; i < subjects.size(); i++){
        std::cout << i + 1 << "." << subjects[i] << std::endl;
    }
    int choice; std::cin >> choice;
    std::string subject = subjects[choice-1];
    int start = start_index(subject,words) + 1;
    int end_ = end_index(subject,words) - 1;
    std::cout << start << " " << end_ << std::endl;
    int num = end_ - start + 1;
    std::string userAnswer;
    std::cin.ignore();
    do {
        std::srand((std::time(nullptr)));
        int randomIndex = std::rand() % num + start;
        std::cout << randomIndex << std::endl;
        int a = rand() % 2;

        if(a == 0){
            // Ask the user for the meaning of the word
            std::cout << "What is the meaning of the word: " << words[randomIndex].english << "?" << std::endl;
            std::getline(std::cin, userAnswer);

            // Check the result
            if (userAnswer == words[randomIndex].meaning) {
                std::cout << "YES" << std::endl;
            } else {
                std::cout << "NO" << std::endl;
                std::cout << "The correct meaning is: " << words[randomIndex].meaning << std::endl;
            }
        }else {
            std::cout << "Which word is:  " << words[randomIndex].meaning << "?" << std::endl;
            std::getline(std::cin, userAnswer);

            // Check the result
            if (userAnswer == words[randomIndex].english) {
                std::cout << "YES" << std::endl;
            } else {
                std::cout << "NO" << std::endl;
                std::cout << "The correct word is: " << words[randomIndex].english << std::endl;
            }
        }
        std::cout << std::endl;
    }while(userAnswer != "end");
    return 0;
}

