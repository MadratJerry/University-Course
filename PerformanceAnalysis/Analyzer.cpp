/**
 * @Author: crazymousethief
 * @Date:   6/1/17
 */

#include "Analyzer.h"

const std::string &Analyzer::getFileName() const {
    return fileName;
}

void Analyzer::setFileName(const std::string &fileName) {
    Analyzer::fileName = fileName;
}

Analyzer::Analyzer(const std::string &fileName) {
    setFileName(fileName);
}
