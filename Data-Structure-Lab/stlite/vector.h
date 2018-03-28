/**
 * @Author: crazymousethief
 * @Date:   6/8/17
 */

#ifndef DATASTRUCTURELAB_VECTOR_H
#define DATASTRUCTURELAB_VECTOR_H

#include "container.h"

namespace stlite {

    template<typename Object>
    class vector : public container<Object> {
    public:
        vector(size_type initSize = 0) : __size{initSize} {
            __objects = new Object[__capacity];
        }
        ~vector() {
            delete [] __objects;
        }

    private:
        Object *__objects;
        size_type __capacity;
        size_type __size;
    };
}


#endif //DATASTRUCTURELAB_VECTOR_H
