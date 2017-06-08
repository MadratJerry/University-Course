/**
 * @Author: crazymousethief
 * @Date:   6/8/17
 */

#ifndef DATASTRUCTURELAB_CONTAINER_H
#define DATASTRUCTURELAB_CONTAINER_H

namespace stlite {
    typedef unsigned long size_type;

    template<typename Object>
    class container {
    public:

        virtual size_type size() const;

        virtual void clear();

        virtual bool empty() const;

        virtual void push_back(const Object &x);

        virtual void pop_back();

        virtual const Object &back() const;

        virtual const Object &front() const;
    };
}

#endif //DATASTRUCTURELAB_CONTAINER_H
