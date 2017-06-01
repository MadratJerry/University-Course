/**
 * @Author: crazymousethief
 * @Date:   6/1/17
 */

#ifndef DATASTRUCTURELAB_ANALYZER_H
#define DATASTRUCTURELAB_ANALYZER_H


#include <string>

class Analyzer {
private:
    std::string fileName;
public:
    Analyzer(const std::string &fileName);

    const std::string &getFileName() const;

    void setFileName(const std::string &fileName);

    void loadData();

    void storeData();
};


#endif //DATASTRUCTURELAB_ANALYZER_H
