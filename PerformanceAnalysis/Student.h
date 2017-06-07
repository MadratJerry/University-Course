/**
 * @Author: crazymousethief
 * @Date:   6/1/17
 */

#ifndef DATASTRUCTURELAB_STUDENT_H
#define DATASTRUCTURELAB_STUDENT_H


#include <string>
#include <vector>
#include <map>

class Student {

    class Score;

private:
    std::string name;
    unsigned int id;
    Score *score;

public:
    Student(unsigned int id, const std::string name, const std::vector<std::string> &v);

    ~Student();

    const std::string &getName() const;

    void setName(const std::string &name);

    unsigned int getId() const;

    void setId(unsigned int id);
};

class Student::Score {
private:
    std::map<std::string, float> m;
public:
    Score(const std::vector<std::string> &v);

    void setScore(const std::string &name, float score);

    float getScore(const std::string name);
};

#endif //DATASTRUCTURELAB_STUDENT_H
