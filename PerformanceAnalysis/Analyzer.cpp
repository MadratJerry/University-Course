/**
 * @Author: crazymousethief
 * @Date:   6/1/17
 */

#include "Analyzer.h"
#include <fstream>
#include <iostream>

const std::string &Analyzer::getFileName() const {
    return fileName;
}

void Analyzer::setFileName(const std::string &fileName) {
    Analyzer::fileName = fileName;
}

Analyzer::Analyzer(const std::string &fileName) {
    setFileName(fileName);
}

void Analyzer::loadData() {
    std::ifstream fin("input.txt", std::ios::in);
    std::string str;
    std::getline(fin, str);
    str = str.data();
    std::cout << str.length() << std::endl;
}
