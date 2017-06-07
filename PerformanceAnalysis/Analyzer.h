/**
 * @Author: crazymousethief
 * @Date:   6/1/17
 */

#ifndef DATASTRUCTURELAB_ANALYZER_H
#define DATASTRUCTURELAB_ANALYZER_H


#include <string>
#include <vector>

class Analyzer {
private:
    std::string fileName;
    std::vector<std::string> v;
public:
    Analyzer(const std::string &fileName);

    const std::string &getFileName() const;

    void setFileName(const std::string &fileName);

    void loadData();

    void storeData();
};


#endif //DATASTRUCTURELAB_ANALYZER_H
