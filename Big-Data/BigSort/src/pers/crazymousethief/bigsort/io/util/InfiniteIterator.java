package pers.crazymousethief.bigsort.io.util;

import java.util.Iterator;

public class InfiniteIterator<T> implements Iterator<T> {

    private Infinite<T> infinite;

    public InfiniteIterator(Infinite infinite) {
        this.infinite = infinite;
    }

    @Override
    public boolean hasNext() {
        return true;
    }

    @Override
    public T next() {
        return infinite.next();
    }
}
